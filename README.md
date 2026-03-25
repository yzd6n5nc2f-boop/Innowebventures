# InnoWeb Ventures Ltd - Landing

Static landing site (Vite + React + TypeScript) deployed with Azure Static Web Apps.

## Contact form delivery and storage audit trail

The contact form posts to an Azure Function at `/api/contact`.
That function sends enquiries to your inbox and stores each submission in Azure Table Storage for traceability.

Configure these application settings in Azure Static Web Apps:

1. `CONTACT_TO_EMAIL` (destination inbox; required)
2. One provider API key:
   - `RESEND_API_KEY`, or
   - `SENDGRID_API_KEY`
3. `CONTACT_FROM_EMAIL` (required for SendGrid, recommended for Resend)
4. `CONTACT_STORAGE_CONNECTION_STRING` (optional; falls back to `AzureWebJobsStorage`)
5. `CONTACT_SUBMISSIONS_TABLE` (optional; defaults to `ContactSubmissions`)
6. `CONTACT_ALLOWED_ORIGINS` (optional CSV list for CORS, e.g. `https://innowebventures.com,https://www.innowebventures.com`; leave empty to allow all origins)

For local Azure Functions development, copy `api/local.settings.example.json` to
`api/local.settings.json` and replace the placeholder values with your own.

Notes:

- Each submission is recorded with request metadata and a delivery status (`pending`, `sent`, `failed`) in Azure Table Storage.
- If `RESEND_API_KEY` is set and `CONTACT_FROM_EMAIL` is missing, the API falls back to `onboarding@resend.dev`.
- If neither provider key is set, the API falls back to server-side FormSubmit delivery.
- For SendGrid, `CONTACT_FROM_EMAIL` must be a verified sender.


Important routing note:

- `staticwebapp.config.json` excludes `/api/*` from SPA fallback rewrites so POST requests to `/api/contact` are sent to Azure Functions instead of being rewritten to `index.html` (which causes 405 for form submits).
- The GitHub Actions deploy workflow must set `api_location: "api"` so the function app is deployed together with the front-end.

## Local development

- Frontend only: `npm run dev`
- Frontend production build: `npm run build`
- API only: `cd api && npm install && func start --port 7071`

For local API settings, copy `api/local.settings.example.json` to `api/local.settings.json` and replace placeholders.

Routing notes:

- Vite proxies `/api/*` requests to `http://127.0.0.1:7071` by default during local development.
- `staticwebapp.config.json` excludes `/api/*` from SPA fallback rewriting.
- The production build copies `staticwebapp.config.json` into `dist/` so Azure Static Web Apps applies it after deployment.
