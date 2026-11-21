const crypto = require('node:crypto');
const workflow = require('./workflowAssessment');
const readiness = require('./readinessAssessment');
const json = (status, body, headers = {}) => ({ status, jsonBody: body, headers: { 'Cache-Control': 'no-store', ...headers } });
const emailValid = value => typeof value === 'string' && value.length <= 254 && /^[^\s@<>\r\n]+@[^\s@<>\r\n]+\.[^\s@<>\r\n]+$/.test(value);
const short = (value, max) => typeof value === 'string' && value.trim().length <= max && !/[\r\n]/.test(value) ? value.trim() : '';
function createHandler({ config, reserve, deliver, notify, now = Date.now, secret, allowedOrigins }) {
  return async (request, context) => {
    const origin = request.headers.get('origin');
    const permitted = !origin || allowedOrigins.includes(origin);
    const headers = origin && permitted ? { 'Access-Control-Allow-Origin': origin, 'Vary': 'Origin' } : {};
    if (!permitted) return json(403, { error: 'Please use the assessment on the InnoWeb website.' });
    if (request.method === 'OPTIONS') return { status: 204, headers: { ...headers, 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type, Accept' } };
    if (!secret || !config.ready) return json(503, { error: 'Email delivery is temporarily unavailable. Your answers have not been submitted. Please try again later or use the contact page.' }, headers);
    const sign = text => crypto.createHmac('sha256', secret).update(text).digest('hex');
    if (request.method === 'GET') {
      const payload = `${now()}.${crypto.randomUUID()}`;
      return json(200, { token: `${payload}.${sign(payload)}` }, headers);
    }
    let body;
    try {
      const raw = await request.text();
      if (Buffer.byteLength(raw) > 12000) return json(413, { error: 'Please shorten your answers.' }, headers);
      body = JSON.parse(raw);
      if (!body || typeof body !== 'object' || Array.isArray(body)) throw Error();
    } catch { return json(400, { error: 'Please check the form and try again.' }, headers); }
    if (body.website) return json(400, { error: 'Please check the form and try again.' }, headers);
    const parts = typeof body.token === 'string' ? body.token.split('.') : [];
    const payload = parts.slice(0, 2).join('.');
    const age = now() - Number(parts[0]);
    if (parts.length !== 3 || !/^[a-f0-9]{64}$/.test(parts[2]) || !crypto.timingSafeEqual(Buffer.from(parts[2]), Buffer.from(sign(payload))) || age < 2000 || age > 7200000) return json(400, { error: 'Please refresh the email form and try again.' }, headers);
    const name = short(body.name, 120), company = short(body.company || '', 160);
    if (!name || !emailValid(body.email) || typeof body.company === 'string' && body.company.trim().length > 160 || body.requestResults !== true || typeof body.followUp !== 'boolean') return json(400, { error: 'Please enter your name, a valid email and confirm you want the assessment emailed.' }, headers);
    if (body.assessmentType !== undefined && body.assessmentType !== 'workflow' && body.assessmentType !== 'readiness') return json(400, { error: 'Unknown assessment type.' }, headers);
    const assessmentType = body.assessmentType === 'readiness' ? 'readiness' : 'workflow';
    const rules = assessmentType === 'readiness' ? readiness : workflow;
    let answers;
    try { answers = rules.validateAnswers(body.answers); } catch (e) { return json(400, { error: e.message }, headers); }
    const email = body.email.trim().toLowerCase();
    const result = rules.assess(answers);
    try {
      const ok = await reserve({ email, assessmentType, ip: request.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown', nonce: parts[1], issuedAt: Number(parts[0]), now: now(), sign });
      if (!ok) return json(429, { error: 'An assessment has recently been requested. Please check your inbox or try again later.' }, { ...headers, 'Retry-After': '900' });
    } catch {
      context.error('Assessment rate-limit store unavailable');
      return json(503, { error: 'We could not submit your request right now. Please try again later.' }, headers);
    }
    const text = `Hello ${name},\n\n${rules.reportText(answers, result)}`;
    try { await deliver({ email, name, text, assessmentType }); }
    catch (e) {
      const known = ['DELIVERY_AUTH', 'DELIVERY_PERMISSION', 'DELIVERY_LIMIT', 'DELIVERY_PROVIDER', 'DELIVERY_SENDER'];
      const deliveryCode = known.includes(e.code) ? e.code : e.code === 'EAUTH' ? 'DELIVERY_AUTH' : e.code === 'EENVELOPE' ? 'DELIVERY_SENDER' : ['ECONNECTION', 'ESOCKET', 'ETIMEDOUT'].includes(e.code) ? 'DELIVERY_CONNECTION' : 'DELIVERY_UNAVAILABLE';
      context.error('Assessment email delivery failed: ' + deliveryCode);
      return json(502, { deliveryCode, error: 'The email could not be sent. Please try again in 15 minutes or contact us.' }, headers);
    }
    try { await notify({ name, email, company, answers, result, followUp: body.followUp, text, assessmentType }); }
    catch { context.warn('Assessment delivered; team notification failed. Check transactional delivery records.'); }
    return json(200, { success: true, message: 'Your assessment has been sent. Please check your inbox and spam folder.', result }, headers);
  };
}
module.exports = { createHandler };
