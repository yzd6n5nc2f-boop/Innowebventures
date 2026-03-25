const { app } = require("@azure/functions");
const { TableClient } = require("@azure/data-tables");

const DEFAULT_TO_EMAIL = "mauricio.jardim1@gmail.com";
const DEFAULT_RESEND_FROM_EMAIL = "onboarding@resend.dev";
const DEFAULT_TABLE_NAME = "ContactEnquiries";

function json(status, body) {
  return {
    status,
    jsonBody: body,
    headers: {
      "Content-Type": "application/json",
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
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getConfig() {
  const toEmail = sanitizeEmail(process.env.CONTACT_TO_EMAIL) || DEFAULT_TO_EMAIL;
  const explicitFromEmail = sanitizeEmail(process.env.CONTACT_FROM_EMAIL);
  const resendApiKey = sanitizeString(process.env.RESEND_API_KEY);
  const sendgridApiKey = sanitizeString(process.env.SENDGRID_API_KEY);
  const storageConnectionString = sanitizeString(process.env.STORAGE_CONNECTION_STRING);
  const tableName = sanitizeString(process.env.CONTACT_TABLE_NAME) || DEFAULT_TABLE_NAME;

  const provider = resendApiKey ? "resend" : sendgridApiKey ? "sendgrid" : "none";
  const fromEmail = explicitFromEmail || (provider === "resend" ? DEFAULT_RESEND_FROM_EMAIL : "");

  return {
    toEmail,
    fromEmail,
    hasExplicitFromEmail: Boolean(explicitFromEmail),
    resendApiKey,
    sendgridApiKey,
    provider,
    storageConnectionString,
    tableName,
  };
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

function buildStorageEntity({ name, email, company, challenge, pageUrl }) {
  const timestamp = new Date();
  const partitionKey = timestamp.toISOString().slice(0, 7).replace("-", "");
  const rowKey = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

  return {
    partitionKey,
    rowKey,
    createdAtUtc: timestamp.toISOString(),
    name,
    email,
    company: company || "",
    challenge,
    pageUrl: pageUrl || "",
  };
}

async function saveToAzureTable({ connectionString, tableName, submission }) {
  const tableClient = TableClient.fromConnectionString(connectionString, tableName);
  await tableClient.createTable();
  await tableClient.createEntity(buildStorageEntity(submission));
}

app.http("contactSubmit", {
  route: "contact",
  methods: ["POST"],
  authLevel: "anonymous",
  handler: async (request, context) => {
    const body = await parseBody(request);
    if (!body) {
      return json(400, { error: "Invalid JSON body." });
    }

    const name = sanitizeString(body.name);
    const email = sanitizeEmail(body.email);
    const company = sanitizeString(body.company);
    const challenge = sanitizeString(body.challenge);
    const pageUrl = sanitizeString(body.pageUrl);

    if (!name) {
      return json(400, { error: "Name is required." });
    }
    if (!email) {
      return json(400, { error: "A valid email is required." });
    }
    if (!challenge) {
      return json(400, { error: "Please describe what you want to improve." });
    }

    const config = getConfig();
    const shouldStoreInAzure = Boolean(config.storageConnectionString);

    if (!shouldStoreInAzure && config.provider === "none") {
      context.error("Missing storage and email provider configuration.");
      return json(500, {
        error:
          "Contact form backend is not configured. Set STORAGE_CONNECTION_STRING (Azure Table Storage) and/or RESEND_API_KEY or SENDGRID_API_KEY.",
      });
    }

    if (config.provider !== "none" && !config.fromEmail) {
      context.error("Missing CONTACT_FROM_EMAIL configuration.");
      return json(500, {
        error: "Email delivery is missing CONTACT_FROM_EMAIL for the selected provider.",
      });
    }
    if (config.provider === "resend" && !config.hasExplicitFromEmail) {
      context.warn(`CONTACT_FROM_EMAIL not set. Using default sender ${DEFAULT_RESEND_FROM_EMAIL}.`);
    }

    const submission = {
      name,
      email,
      company,
      challenge,
      pageUrl,
    };

    const message = buildEmail(submission);

    try {
      if (shouldStoreInAzure) {
        await saveToAzureTable({
          connectionString: config.storageConnectionString,
          tableName: config.tableName,
          submission,
        });
      }

      if (config.provider === "resend") {
        await sendViaResend({
          apiKey: config.resendApiKey,
          fromEmail: config.fromEmail,
          toEmail: config.toEmail,
          replyTo: email,
          subject: message.subject,
          text: message.text,
          html: message.html,
        });
      } else if (config.provider === "sendgrid") {
        await sendViaSendGrid({
          apiKey: config.sendgridApiKey,
          fromEmail: config.fromEmail,
          toEmail: config.toEmail,
          replyTo: email,
          subject: message.subject,
          text: message.text,
          html: message.html,
        });
      }

      return json(200, {
        success: true,
        message: shouldStoreInAzure
          ? "Thanks. Your enquiry was saved in Azure and we will reply soon."
          : `Thanks. Your enquiry was sent to ${config.toEmail} successfully and we will reply soon.`,
      });
    } catch (error) {
      context.error("Contact submit failed", error);
      return json(500, {
        error: "We could not send your enquiry right now. Please try again in a moment.",
      });
    }
  },
});
