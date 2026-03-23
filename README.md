# InnoWeb Ventures Ltd — Landing

Static landing site (Vite + React + TS) deployed with Azure Static Web Apps.

## Contact form email delivery

The contact page quick form now posts to an Azure Function at `/api/contact`.
That function sends enquiry emails to `mauricio.jardim1@gmail.com` by default,
with the visitor email set as `Reply-To`.

Configure these application settings in Azure Static Web Apps:

1. `CONTACT_TO_EMAIL` = destination inbox, defaults to `mauricio.jardim1@gmail.com`
2. Optional provider API key:
   - `RESEND_API_KEY`, or
   - `SENDGRID_API_KEY`
3. Optional sender setting:
   - `CONTACT_FROM_EMAIL` (required for SendGrid, recommended for Resend)

For local Azure Functions development, copy `api/local.settings.example.json` to
`api/local.settings.json` and replace the placeholder values with your own.

Notes:

- If `RESEND_API_KEY` is set and `CONTACT_FROM_EMAIL` is missing, the API falls back to `onboarding@resend.dev`.
- If neither provider key is set, the API falls back to server-side FormSubmit delivery.
- For SendGrid, `CONTACT_FROM_EMAIL` must be set to a verified sender.

## Local development

- Frontend only: `npm run dev`
- Frontend production build: `npm run build`

To test the contact form end-to-end locally, run the site through Azure Static Web Apps
with the API included, or deploy to Azure Static Web Apps with the settings above.
