const { app } = require("@azure/functions");
const { TableClient } = require("@azure/data-tables");
const crypto = require("node:crypto");

const DEFAULT_RESEND_FROM_EMAIL = "onboarding@resend.dev";
const DEFAULT_CONTACT_SUBMISSIONS_TABLE = "ContactSubmissions";

function json(status, body, extraHeaders = {}) {
  return {
    status,
    jsonBody: body,
    headers: {
      "Content-Type": "application/json",
      ...extraHeaders,
    },
  };
}

function noContent(status, headers = {}) {
  return {
    status,
    headers: {
      ...headers,
    },
  };
}

function sanitizeString(value) {
  return typeof value === "string" ? value.trim() : "";
}

function sanitizeEmail(value) {
  const email = sanitizeString(value);
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : "";
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function sanitizeKeySegment(value, fallback) {
  const sanitized = sanitizeString(value).replace(/[^A-Za-z0-9_-]/g, "-").slice(0, 64);
  return sanitized || fallback;
}

function getConfig() {
  const toEmail = sanitizeEmail(process.env.CONTACT_TO_EMAIL);
  const explicitFromEmail = sanitizeEmail(process.env.CONTACT_FROM_EMAIL);
  const resendApiKey = sanitizeString(process.env.RESEND_API_KEY);
  const sendgridApiKey = sanitizeString(process.env.SENDGRID_API_KEY);
  const provider = resendApiKey ? "resend" : sendgridApiKey ? "sendgrid" : "formsubmit";
  const fromEmail = explicitFromEmail || (provider === "resend" ? DEFAULT_RESEND_FROM_EMAIL : "");
  const storageConnectionString =
    sanitizeString(process.env.CONTACT_STORAGE_CONNECTION_STRING) ||
    sanitizeString(process.env.AzureWebJobsStorage);
  const submissionsTableName =
    sanitizeKeySegment(process.env.CONTACT_SUBMISSIONS_TABLE, DEFAULT_CONTACT_SUBMISSIONS_TABLE);

  return {
    toEmail,
    fromEmail,
    hasExplicitFromEmail: Boolean(explicitFromEmail),
    resendApiKey,
    sendgridApiKey,
    provider,
    storageConnectionString,
    submissionsTableName,
  };
}

function parseCsv(value) {
  return sanitizeString(value)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function getCorsHeaders(request) {
  const allowedOrigins = parseCsv(process.env.CONTACT_ALLOWED_ORIGINS);
  const requestOrigin = sanitizeString(request.headers.get("origin"));
  const hasOrigin = Boolean(requestOrigin);
  const allowAllOrigins = allowedOrigins.length === 0 || allowedOrigins.includes("*");
  const allowRequestOrigin = allowAllOrigins || allowedOrigins.includes(requestOrigin);
  const accessControlOrigin = hasOrigin && allowRequestOrigin ? requestOrigin : allowAllOrigins ? "*" : "";
  const headers = {
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Accept",
    "Access-Control-Max-Age": "86400",
  };

  if (accessControlOrigin) {
    headers["Access-Control-Allow-Origin"] = accessControlOrigin;
  }
  if (!allowAllOrigins && hasOrigin) {
    headers.Vary = "Origin";
  }

  return headers;
}

async function parseBody(request) {
  try {
    return await request.json();
  } catch {
    return null;
  }
}

function buildEmail({ name, email, company, challenge, pageUrl }) {
  const companyLine = company || "-";
  const challengeLine = challenge || "-";
  const pageLine = pageUrl || "-";
  const subject = `New website enquiry${company ? ` - ${company}` : ""}`;

  return {
    subject,
    text: [
      "New website enquiry",
      `Name: ${name}`,
      `Email: ${email}`,
      `Company: ${companyLine}`,
      `Challenge: ${challengeLine}`,
      `Page URL: ${pageLine}`,
    ].join("\n"),
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.5;color:#1f2937;">
        <h2>New website enquiry</h2>
        <table style="border-collapse:collapse;width:100%;max-width:720px;">
          <tr><td style="padding:8px;border:1px solid #d1d5db;font-weight:600;">Name</td><td style="padding:8px;border:1px solid #d1d5db;">${escapeHtml(name)}</td></tr>
          <tr><td style="padding:8px;border:1px solid #d1d5db;font-weight:600;">Email</td><td style="padding:8px;border:1px solid #d1d5db;">${escapeHtml(email)}</td></tr>
          <tr><td style="padding:8px;border:1px solid #d1d5db;font-weight:600;">Company</td><td style="padding:8px;border:1px solid #d1d5db;">${escapeHtml(companyLine)}</td></tr>
          <tr><td style="padding:8px;border:1px solid #d1d5db;font-weight:600;">Challenge</td><td style="padding:8px;border:1px solid #d1d5db;">${escapeHtml(challengeLine)}</td></tr>
          <tr><td style="padding:8px;border:1px solid #d1d5db;font-weight:600;">Page URL</td><td style="padding:8px;border:1px solid #d1d5db;">${escapeHtml(pageLine)}</td></tr>
        </table>
      </div>
    `,
  };
}

async function sendViaResend({ apiKey, fromEmail, toEmail, replyTo, subject, text, html }) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      subject,
      text,
      html,
      ...(replyTo ? { reply_to: replyTo } : {}),
    }),
  });

  if (!response.ok) {
    throw new Error(`Resend error ${response.status}: ${await response.text()}`);
  }
}

async function sendViaSendGrid({ apiKey, fromEmail, toEmail, replyTo, subject, text, html }) {
  const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      personalizations: [
        {
          to: [{ email: toEmail }],
          subject,
        },
      ],
      from: { email: fromEmail },
      content: [
        { type: "text/plain", value: text },
        { type: "text/html", value: html },
      ],
      ...(replyTo ? { reply_to: { email: replyTo } } : {}),
    }),
  });

  if (!response.ok) {
    throw new Error(`SendGrid error ${response.status}: ${await response.text()}`);
  }
}

async function sendViaFormSubmit({ toEmail, name, email, company, challenge, pageUrl, subject }) {
  const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(toEmail)}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      company,
      challenge,
      pageUrl,
      _subject: subject,
      _captcha: "false",
      _replyto: email,
      _template: "table",
    }),
  });

  const rawBody = await response.text();
  let payload = null;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    payload = null;
  }

  const payloadFailed =
    payload && (payload.success === false || String(payload.success ?? "").toLowerCase() === "false");

  if (!response.ok || payloadFailed) {
    const providerMessage = sanitizeString(payload?.message) || rawBody;
    throw new Error(`FormSubmit error ${response.status}: ${providerMessage || "Request rejected."}`);
  }
}

async function getTableClient(config, context) {
  if (!config.storageConnectionString) {
    context.warn("Azure Table Storage logging skipped because no storage connection string is configured.");
    return null;
  }

  try {
    const client = TableClient.fromConnectionString(config.storageConnectionString, config.submissionsTableName);
    await client.createTable();
    return client;
  } catch (error) {
    context.error("Azure Table Storage logging unavailable", error);
    return null;
  }
}

function buildSubmissionEntity({ request, name, email, company, challenge, pageUrl, provider }) {
  const submittedAt = new Date().toISOString();
  const partitionKey = submittedAt.slice(0, 10);
  const rowKey = `${Date.now()}-${crypto.randomUUID()}`;

  return {
    partitionKey,
    rowKey,
    name,
    email,
    company: company || "",
    challenge,
    pageUrl: pageUrl || "",
    provider,
    deliveryStatus: "pending",
    submittedAt,
    userAgent: sanitizeString(request.headers.get("user-agent")),
    referer: sanitizeString(request.headers.get("referer")),
    origin: sanitizeString(request.headers.get("origin")),
    xForwardedFor: sanitizeString(request.headers.get("x-forwarded-for")),
  };
}

async function createSubmissionLog(client, entity, context) {
  if (!client) {
    return false;
  }

  try {
    await client.createEntity(entity);
    return true;
  } catch (error) {
    context.error("Failed to create contact submission log entry", error);
    return false;
  }
}

async function updateSubmissionLog(client, entity, updates, context) {
  if (!client) {
    return;
  }

  try {
    await client.updateEntity(
      {
        partitionKey: entity.partitionKey,
        rowKey: entity.rowKey,
        ...updates,
      },
      "Merge",
    );
  } catch (error) {
    context.error("Failed to update contact submission log entry", error);
  }
}

app.http("contactSubmit", {
  route: "contact",
  methods: ["POST", "OPTIONS"],
  authLevel: "anonymous",
  handler: async (request, context) => {
    const corsHeaders = getCorsHeaders(request);

    if (request.method === "OPTIONS") {
      return noContent(204, corsHeaders);
    }

    const body = await parseBody(request);
    if (!body) {
      return json(400, { error: "Invalid JSON body." }, corsHeaders);
    }

    const name = sanitizeString(body.name);
    const email = sanitizeEmail(body.email);
    const company = sanitizeString(body.company);
    const challenge = sanitizeString(body.challenge);
    const pageUrl = sanitizeString(body.pageUrl);

    if (!name) {
      return json(400, { error: "Name is required." }, corsHeaders);
    }
    if (!email) {
      return json(400, { error: "A valid email is required." }, corsHeaders);
    }
    if (!challenge) {
      return json(400, { error: "Please describe what you want to improve." }, corsHeaders);
    }

    const config = getConfig();
    if (!config.toEmail) {
      context.error("Missing CONTACT_TO_EMAIL configuration.");
      return json(500, {
        error: "Email delivery is missing CONTACT_TO_EMAIL. Set it in your Static Web App application settings.",
      }, corsHeaders);
    }
    if (config.provider !== "formsubmit" && !config.fromEmail) {
      context.error("Missing CONTACT_FROM_EMAIL configuration.");
      return json(500, {
        error: "Email delivery is missing CONTACT_FROM_EMAIL for the selected provider.",
      }, corsHeaders);
    }
    if (config.provider === "resend" && !config.hasExplicitFromEmail) {
      context.warn(`CONTACT_FROM_EMAIL not set. Using default sender ${DEFAULT_RESEND_FROM_EMAIL}.`);
    }

    const message = buildEmail({
      name,
      email,
      company,
      challenge,
      pageUrl,
    });

    const tableClient = await getTableClient(config, context);
    const submissionEntity = buildSubmissionEntity({
      request,
      name,
      email,
      company,
      challenge,
      pageUrl,
      provider: config.provider,
    });
    const hasSubmissionLog = await createSubmissionLog(tableClient, submissionEntity, context);

    try {
      const payload = {
        apiKey: config.provider === "resend" ? config.resendApiKey : config.sendgridApiKey,
        fromEmail: config.fromEmail,
        toEmail: config.toEmail,
        replyTo: email,
        subject: message.subject,
        text: message.text,
        html: message.html,
      };

      if (config.provider === "resend") {
        await sendViaResend(payload);
      } else if (config.provider === "sendgrid") {
        await sendViaSendGrid(payload);
      } else {
        await sendViaFormSubmit({
          toEmail: config.toEmail,
          name,
          email,
          company,
          challenge,
          pageUrl,
          subject: message.subject,
        });
      }

      await updateSubmissionLog(
        tableClient,
        submissionEntity,
        {
          deliveryStatus: "sent",
          deliveredAt: new Date().toISOString(),
        },
        context,
      );

      return json(200, {
        success: true,
        message: hasSubmissionLog
          ? "Thanks. Your enquiry was received and logged successfully."
          : "Thanks. Your enquiry was received successfully and we will reply soon.",
      }, corsHeaders);
    } catch (error) {
      context.error("Contact submit failed", error);
      await updateSubmissionLog(
        tableClient,
        submissionEntity,
        {
          deliveryStatus: "failed",
          failedAt: new Date().toISOString(),
          errorMessage: sanitizeString(error instanceof Error ? error.message : "Unknown error").slice(0, 1024),
        },
        context,
      );
      return json(500, {
        error: "We could not send your enquiry right now. Please try again in a moment.",
      }, corsHeaders);
    }
  },
});
