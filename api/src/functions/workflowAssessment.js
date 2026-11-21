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
  async function send({ to, replyTo, subject, text, tag = "workflow-assessment" }) {
    const payload = { fromEmail: config.fromEmail, toEmail: to, replyTo, subject, text,
      html: `<div style="font-family:Arial,sans-serif;line-height:1.6;max-width:720px"><pre style="white-space:pre-wrap;font-family:inherit">${delivery.escapeHtml(text)}</pre></div>` };
    const timeout = AbortSignal.timeout(15000);
    if (config.provider === 'smtp') return delivery.sendViaSmtp({ ...payload, host: config.smtpHost, port: config.smtpPort, secure: config.smtpSecure, user: config.smtpUser, pass: config.smtpPass });
    // Reuse the website's configured provider, including its Brevo account.
    if (config.provider === 'brevo') {
      const response = await fetch('https://api.brevo.com/v3/smtp/email', { method: 'POST', signal: timeout,
        headers: { 'api-key': config.brevoApiKey, 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ sender: { email: payload.fromEmail, name: 'InnoWeb Ventures' }, to: [{ email: to }], replyTo: { email: replyTo }, subject, textContent: text, htmlContent: payload.html, tags: [tag] }) });
      if (!response.ok) {
        const error = new Error('Email provider rejected request');
        error.code = response.status === 401 ? 'DELIVERY_AUTH' : response.status === 403 ? 'DELIVERY_PERMISSION' : response.status === 429 ? 'DELIVERY_LIMIT' : 'DELIVERY_PROVIDER';
        // Classify sender setup problems without returning provider content or credentials.
        const detail = await response.text();
        if (response.status === 400 && /sender|from.*(?:valid|verif)|domain/i.test(detail)) error.code = 'DELIVERY_SENDER';
        throw error;
      }
      return;
    }
    if (config.provider === 'resend') return delivery.sendViaResend({ ...payload, apiKey: config.resendApiKey });
    return delivery.sendViaSendGrid({ ...payload, apiKey: config.sendgridApiKey });
  }
  return createHandler({
    config: { ready, deliveryRoute: config.provider === 'smtp' ? /brevo|sendinblue/i.test(config.smtpHost) ? 'Brevo SMTP' : 'SMTP' : config.provider }, secret: config.storageConnectionString,
    allowedOrigins: ['https://www.innowebventures.com', 'https://innowebventures.com', ...(process.env.CONTACT_ALLOWED_ORIGINS || '').split(',').map(s => s.trim()).filter(s => s && s !== '*')],
    reserve: async ({ email, assessmentType, ip, nonce, issuedAt, now, sign }) => {
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
      if (!await reserveSlot(client, 'recipient-' + assessmentType + '-' + Math.floor(now / 900000), [sign(email)])) return false;
      if (!await reserveSlot(client, 'token-' + Math.floor(issuedAt / 7200000), [sign(nonce)])) return false;
      if (!await reserveSlot(client, 'ip-' + Math.floor(now / 3600000), Array.from({ length: 5 }, (_, i) => sign(ip) + '-' + i))) return false;
      return reserveSlot(client, 'daily-' + new Date(now).toISOString().slice(0,10), Array.from({ length: 100 }, (_, i) => String(i)));
    },
    release: async ({ email, assessmentType, reservedAt, sign }) => {
      const client = TableClient.fromConnectionString(config.storageConnectionString, 'WorkflowAssessmentLimits');
      await client.deleteEntity('recipient-' + assessmentType + '-' + Math.floor(reservedAt / 900000), sign(email));
    },
    deliver: ({ email, text, assessmentType }) => send({ to: email, replyTo: config.toEmail, subject: assessmentType === 'readiness' ? 'Your AI readiness assessment | InnoWeb Ventures' : 'Your free workflow assessment | InnoWeb Ventures', text, tag: assessmentType === 'readiness' ? 'ai-readiness-assessment' : 'workflow-assessment' }),
    notify: ({ name, email, company, text, followUp, assessmentType }) => send({ to: config.toEmail, replyTo: email, subject: assessmentType === 'readiness' ? 'New AI readiness assessment result' : 'New workflow assessment request', text: `Name: ${name}\nEmail: ${email}\nCompany: ${company || 'Not provided'}\nRequests personal follow-up: ${followUp ? 'Yes' : 'No'}\n\n${text}`, tag: assessmentType === 'readiness' ? 'ai-readiness-assessment' : 'workflow-assessment' }),
  })(request, context);
}
app.http('workflowAssessment', { route: 'workflow-assessment', methods: ['GET', 'POST', 'OPTIONS'], authLevel: 'anonymous', handler });
