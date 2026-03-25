# InnoWeb Ventures Ltd — Landing

Static landing site (Vite + React + TS) deployed with Azure Static Web Apps.

## Contact form email delivery

The contact page quick form now posts to an Azure Function at `/api/contact`.
That function sends enquiry emails to `mauricio.jardim1@gmail.com` by default,
with the visitor email set as `Reply-To`.

Configure these application settings in Azure Static Web Apps:

1. `CONTACT_TO_EMAIL` = destination inbox, defaults to `mauricio.jardim1@gmail.com`
2. Azure Storage (recommended, Azure-only lead capture):
   - `STORAGE_CONNECTION_STRING` (Storage account connection string)
   - Optional `CONTACT_TABLE_NAME` (defaults to `ContactEnquiries`)
3. Optional provider API key for email notifications:
   - `RESEND_API_KEY`, or
   - `SENDGRID_API_KEY`
4. Optional sender setting:
   - `CONTACT_FROM_EMAIL` (required for SendGrid, recommended for Resend)

For local Azure Functions development, copy `api/local.settings.example.json` to
`api/local.settings.json` and replace the placeholder values with your own.

Notes:

- If `RESEND_API_KEY` is set and `CONTACT_FROM_EMAIL` is missing, the API falls back to `onboarding@resend.dev`.
- If provider keys are not set, submissions can still be captured in Azure Table Storage via `STORAGE_CONNECTION_STRING`.
- For SendGrid, `CONTACT_FROM_EMAIL` must be set to a verified sender.


Important routing note:

- `staticwebapp.config.json` excludes `/api/*` from SPA fallback rewrites so POST requests to `/api/contact` are sent to Azure Functions instead of being rewritten to `index.html` (which causes 405 for form submits).
- The GitHub Actions deploy workflow must set `api_location: "api"` so the function app is deployed together with the front-end.
- No Cloudflare/FormSubmit dependency is required; submissions can be stored directly in your Azure Storage account.

## Local development

- Frontend only: `npm run dev`
- Frontend production build: `npm run build`

To test the contact form end-to-end locally, run the site through Azure Static Web Apps
with the API included, or deploy to Azure Static Web Apps with the settings above.
