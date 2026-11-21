const { app } = require('@azure/functions');
const { TableClient } = require('@azure/data-tables');
const delivery = require('./contactSubmit');
const { createHandler } = require('../../lib/assessmentHandler');

async function reserveSlot(client, partitionKey, keys) {
  for (const rowKey of keys) {
    try { await client.createEntity({ partitionKey, rowKey }); return true; }
    catch (e) { if (e.statusCode !== 409) throw e; }
  }
  return false;
}
async function handler(request, context) {
  const config = delivery.getConfig();
  const ready = !delivery.getConfigError(config) && !!config.storageConnectionString;
  async function send({ to, replyTo, subject, text }) {
    const payload = { fromEmail: config.fromEmail, toEmail: to, replyTo, subject, text,
      html: `<div style="font-family:Arial,sans-serif;line-height:1.6;max-width:720px"><pre style="white-space:pre-wrap;font-family:inherit">${delivery.escapeHtml(text)}</pre></div>` };
    const timeout = AbortSignal.timeout(15000);
    if (config.provider === 'smtp') return delivery.sendViaSmtp({ ...payload, host: config.smtpHost, port: config.smtpPort, secure: config.smtpSecure, user: config.smtpUser, pass: config.smtpPass });
    // Reuse the website's configured provider, including its Brevo account.
    if (config.provider === 'brevo') {
      const response = await fetch('https://api.brevo.com/v3/smtp/email', { method: 'POST', signal: timeout,
        headers: { 'api-key': config.brevoApiKey, 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ sender: { email: payload.fromEmail, name: 'InnoWeb Ventures' }, to: [{ email: to }], replyTo: { email: replyTo }, subject, textContent: text, htmlContent: payload.html, tags: ['workflow-assessment'] }) });
      if (!response.ok) throw new Error('Email provider rejected request');
      return;
    }
    if (config.provider === 'resend') return delivery.sendViaResend({ ...payload, apiKey: config.resendApiKey });
    return delivery.sendViaSendGrid({ ...payload, apiKey: config.sendgridApiKey });
  }
  return createHandler({
    config: { ready }, secret: config.storageConnectionString,
    allowedOrigins: ['https://www.innowebventures.com', 'https://innowebventures.com', ...(process.env.CONTACT_ALLOWED_ORIGINS || '').split(',').map(s => s.trim()).filter(s => s && s !== '*')],
    reserve: async ({ email, ip, nonce, issuedAt, now, sign }) => {
      const client = TableClient.fromConnectionString(config.storageConnectionString, 'WorkflowAssessmentLimits');
      await client.createTable();
      // Purge a bounded batch of expired rate-limit identifiers during normal requests.
      try {
        const cutoff = new Date(now - 7 * 86400000).toISOString();
        let removed = 0;
        for await (const row of client.listEntities({ queryOptions: { filter: `Timestamp lt datetime'${cutoff}'`, select: ['PartitionKey', 'RowKey'] } })) {
          await client.deleteEntity(row.partitionKey, row.rowKey);
          if (++removed >= 30) break;
        }
      } catch { context.warn('Assessment limit-record cleanup deferred'); }
      // Atomic storage keys enforce limits across serverless instances. No raw IP or email is stored here.
      if (!await reserveSlot(client, 'recipient-' + Math.floor(now / 900000), [sign(email)])) return false;
      if (!await reserveSlot(client, 'token-' + Math.floor(issuedAt / 7200000), [sign(nonce)])) return false;
      if (!await reserveSlot(client, 'ip-' + Math.floor(now / 3600000), Array.from({ length: 5 }, (_, i) => sign(ip) + '-' + i))) return false;
      return reserveSlot(client, 'daily-' + new Date(now).toISOString().slice(0,10), Array.from({ length: 100 }, (_, i) => String(i)));
    },
    deliver: ({ email, text }) => send({ to: email, replyTo: config.toEmail, subject: 'Your free workflow assessment | InnoWeb Ventures', text }),
    notify: ({ name, email, company, text, followUp }) => send({ to: config.toEmail, replyTo: email, subject: 'New workflow assessment request', text: `Name: ${name}\nEmail: ${email}\nCompany: ${company || 'Not provided'}\nRequests personal follow-up: ${followUp ? 'Yes' : 'No'}\n\n${text}` }),
  })(request, context);
}
app.http('workflowAssessment', { route: 'workflow-assessment', methods: ['GET', 'POST', 'OPTIONS'], authLevel: 'anonymous', handler });
