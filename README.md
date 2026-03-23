# InnoWeb Ventures Ltd — Landing

Static landing site (Vite + React + TS) deployed with Azure Static Web Apps.

## Contact form email delivery and storage audit trail

The contact page quick form posts to an Azure Function at `/api/contact`.
That function sends enquiry emails to `mauricio.jardim1@gmail.com` by default,
with the visitor email set as `Reply-To`, and also writes each submission to
Azure Table Storage so the team has a delivery audit trail.

Configure these application settings in Azure Static Web Apps:

1. `CONTACT_TO_EMAIL` = destination inbox, defaults to `mauricio.jardim1@gmail.com`
2. Optional provider API key:
   - `RESEND_API_KEY`, or
   - `SENDGRID_API_KEY`
3. Optional sender setting:
   - `CONTACT_FROM_EMAIL` (required for SendGrid, recommended for Resend)
4. Optional storage override:
   - `CONTACT_STORAGE_CONNECTION_STRING`
5. Optional table name override:
   - `CONTACT_SUBMISSIONS_TABLE` (defaults to `ContactSubmissions`)

For local Azure Functions development, copy `api/local.settings.example.json` to
`api/local.settings.json` and replace the placeholder values with your own.

For local Azure Functions development, copy `api/local.settings.example.json` to
`api/local.settings.json` and replace the placeholder values with your own.

Notes:

- If `CONTACT_STORAGE_CONNECTION_STRING` is not set, the API falls back to `AzureWebJobsStorage`, which works well when the Static Web App is already linked to an Azure storage account.
- Each submission is logged with request metadata plus a `pending`, `sent`, or `failed` delivery status in Azure Table Storage.
- If `RESEND_API_KEY` is set and `CONTACT_FROM_EMAIL` is missing, the API falls back to `onboarding@resend.dev`.
- If neither provider key is set, the API falls back to server-side FormSubmit delivery.
- For SendGrid, `CONTACT_FROM_EMAIL` must be set to a verified sender.

## Local development

- Frontend only: `npm run dev`
- Frontend production build: `npm run build`
- Contact form with local API: run Azure Functions locally on `http://127.0.0.1:7071`
  (or set `VITE_API_PROXY_TARGET` to another API origin before `npm run dev`)

Notes:

- `vite` now proxies `/api/*` requests to the local API target during development, so the contact form does not hit the SPA fallback and return `405`.
- `staticwebapp.config.json` excludes `/api/*` from the navigation fallback so Azure Static Web Apps does not rewrite contact submissions to `index.html`.
- The production build now copies `staticwebapp.config.json` into `dist/` because Azure Static Web Apps only applies that file when it is present in the final deployed output.

To test the contact form end-to-end locally, run the site through Azure Static Web Apps
with the API included, or run the frontend plus the Functions API together with the settings above.
