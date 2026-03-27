# InnoWeb Ventures Ltd - Landing

Static landing site (Vite + React + TypeScript) deployed with Azure Static Web Apps.

This repo does not use Cloudflare. The hosting path in the codebase is Azure Static Web Apps for the frontend and Azure Functions for the contact form API.

## Contact form delivery and storage audit trail

The contact form posts to an Azure Function at `/api/contact`.
That function sends enquiries to your inbox and stores each submission in Azure Table Storage for traceability.

Configure these application settings in Azure Static Web Apps:

1. `CONTACT_TO_EMAIL` (destination inbox; required)
2. `CONTACT_EMAIL_PROVIDER` (required: `smtp`, `resend`, or `sendgrid`)
3. Provider credentials:
   - SMTP:
     - `SMTP_HOST`
     - `SMTP_PORT` (for example `587` or `465`)
     - `SMTP_USER`
     - `SMTP_PASS`
     - `SMTP_SECURE` (optional; `true`/`false`, defaults to `true` for port `465`)
   - Resend:
     - `RESEND_API_KEY`
   - SendGrid:
     - `SENDGRID_API_KEY`
4. `CONTACT_FROM_EMAIL` (required sender address; for SMTP it defaults to `SMTP_USER` if that is a valid email)
5. `CONTACT_STORAGE_CONNECTION_STRING` (optional; falls back to `AzureWebJobsStorage`)
6. `CONTACT_SUBMISSIONS_TABLE` (optional; defaults to `ContactSubmissions`)
7. `CONTACT_ALLOWED_ORIGINS` (optional CSV list for CORS, e.g. `https://innowebventures.com,https://www.innowebventures.com`; leave empty to allow all origins)

If your domain has changed, update `CONTACT_ALLOWED_ORIGINS` to include the new public domain(s). If the frontend and API are no longer served from the same origin, set `VITE_CONTACT_ENDPOINT` at build time to the full API URL and rebuild the frontend.

Quick start (no Gmail password):

- `CONTACT_EMAIL_PROVIDER=resend`
- `RESEND_API_KEY=<your-resend-api-key>`
- `CONTACT_TO_EMAIL=<your-gmail-address>`
- `CONTACT_FROM_EMAIL=onboarding@resend.dev` (testing to your own Resend account email)

For production, use a verified domain for `CONTACT_FROM_EMAIL` (for example `hello@yourdomain.com`).

Frontend runtime overrides are optional and only needed if you want to move away from the built-in defaults:

- `VITE_SITE_URL`
- `VITE_CONTACT_ENDPOINT` (defaults to `/api/contact`)
- `VITE_LIVE_WORK_TAD_URL`
- `VITE_LIVE_WORK_CONCORDIA_URL`
- `VITE_LIVE_WORK_LUXPULSE_URL`

Those values are baked into the Vite build, so any change requires a rebuild and redeploy.

If `CONTACT_EMAIL_PROVIDER` is not set, the backend will auto-select:

- `smtp` when all `SMTP_*` credentials are present
- otherwise `resend` if `RESEND_API_KEY` is present
- otherwise `sendgrid` if `SENDGRID_API_KEY` is present

For local Azure Functions development, copy `api/local.settings.example.json` to
`api/local.settings.json` and replace the placeholder values with your own.

Notes:

- Each submission is recorded with request metadata and a delivery status (`pending`, `sent`, `failed`) in Azure Table Storage.
- This backend now uses only server-side providers (`smtp`, `resend`, `sendgrid`) for reliable API delivery from Azure Functions.
- For SendGrid and Resend, `CONTACT_FROM_EMAIL` must be a verified sender/domain.


Important routing note:

- `staticwebapp.config.json` excludes `/api/*` from SPA fallback rewrites so POST requests to `/api/contact` are sent to Azure Functions instead of being rewritten to `index.html` (which causes 405 for form submits).
- The GitHub Actions deploy workflow must set `api_location: "api"` so the function app is deployed together with the front-end.
- Response errors now include provider-specific details to speed up configuration/debugging.

## Local development

- Frontend only: `npm run dev`
- Frontend production build: `npm run build`
- API only: `cd api && npm install && func start --port 7071`

For local API settings, copy `api/local.settings.example.json` to `api/local.settings.json` and replace placeholders.

Routing notes:

- Vite proxies `/api/*` requests to `http://127.0.0.1:7071` by default during local development.

## Custom domain troubleshooting (Azure Static Web Apps)

If a newly linked domain still does not open the deployed app, this is usually DNS or hosting configuration, not a front-end code issue.

Use this quick checklist:

1. **Confirm DNS records point to the hosting provider**
   - `www` should typically be a `CNAME` to your Azure Static Web App hostname (for example `your-app-name.azurestaticapps.net`).
   - Apex/root domains (for example `innowebventures.com`) should use Azure-supported apex mapping (`ALIAS`/`ANAME`) instead of pointing to unrelated static `A` records.
2. **Verify the exact same hostname in Azure**
   - Ensure both `innowebventures.com` and `www.innowebventures.com` are added as custom domains if you want both to work.
3. **Wait for propagation and SSL certificate issuance**
   - DNS and certificate updates can take time after verification.
4. **Check for 403/404 at the edge**
   - A `403` response with no app content commonly indicates the host header is not recognized by the configured app or endpoint.
5. **Re-check domain registrar forwarding**
   - If domain forwarding is enabled at the registrar, it can override your intended DNS routing.
- `staticwebapp.config.json` excludes `/api/*` from SPA fallback rewriting.
- The production build copies `staticwebapp.config.json` into `dist/` so Azure Static Web Apps applies it after deployment.
