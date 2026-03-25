# InnoWeb Ventures Ltd — Landing

Static landing site (Vite + React + TS) deployed with Azure Static Web Apps.

_Current implementation focus: Contact API adds Azure Table Storage persistence, tightens Azure SWA workflow, and updates docs._

## Quick summary

- Front-end + API are deployed by `.github/workflows/azure-static-web-apps-gray-bay-0d8f29410.yml`.
- Contact form submits to `/api/contact`.
- Leads are stored in Azure Table Storage when `STORAGE_CONNECTION_STRING` is set.
- Optional email notifications use `RESEND_API_KEY` or `SENDGRID_API_KEY`.
- Keep `AZURE_STATIC_WEB_APPS_API_TOKEN_GRAY_BAY_0D8F29410` aligned to the same Azure Static Web App.

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



### What this workflow controls

- `.github/workflows/azure-static-web-apps-gray-bay-0d8f29410.yml` deploys your **front-end + `/api` Azure Functions** to your Azure Static Web App.
- Your **Storage account connection** is configured in Azure Static Web App **Application Settings** via `STORAGE_CONNECTION_STRING` (not hardcoded in the workflow file).
- Keep the workflow secret `AZURE_STATIC_WEB_APPS_API_TOKEN_GRAY_BAY_0D8F29410` mapped to the same Static Web App resource.

### Required names (exact)

- GitHub Actions secret: `AZURE_STATIC_WEB_APPS_API_TOKEN_GRAY_BAY_0D8F29410`
- Azure Static Web App app setting: `STORAGE_CONNECTION_STRING`
- Optional Azure Static Web App app setting: `CONTACT_TABLE_NAME` (default `ContactEnquiries`)
- Contact API endpoint: `/api/contact`

Important routing note:

- `staticwebapp.config.json` excludes `/api/*` from SPA fallback rewrites so POST requests to `/api/contact` are sent to Azure Functions instead of being rewritten to `index.html` (which causes 405 for form submits).
- The GitHub Actions deploy workflow must set `api_location: "api"` so the function app is deployed together with the front-end.
- No Cloudflare/FormSubmit dependency is required; submissions can be stored directly in your Azure Storage account.

## Local development

- Frontend only: `npm run dev`
- Frontend production build: `npm run build`

To test the contact form end-to-end locally, run the site through Azure Static Web Apps
with the API included, or deploy to Azure Static Web Apps with the settings above.


## Custom domain troubleshooting (remove Cloudflare path)

If your domain is still resolving through Cloudflare, traffic can still be proxied there even after app changes.

1. In your DNS provider, set your domain records to the Azure Static Web Apps host (`<your-app>.azurestaticapps.net`).
2. If using Cloudflare DNS, set records to **DNS only** (gray cloud), not proxied.
3. Remove old Cloudflare nameservers at the registrar if you want Cloudflare fully out of the path.
4. In Azure Static Web Apps, add/verify your custom domain and wait for DNS propagation.

Note: the email `4mjvd8vr5y@privaterelay.appleid.com` is an Apple relay address and is unrelated to DNS routing.

## GitHub push troubleshooting (`Unauthorized to access requested resource`)

If pushes fail with `Unauthorized to access requested resource`, check these in order:

1. Verify the repo remote is configured correctly:
   - `git remote -v`
   - expected URL should point to your repo (SSH or HTTPS).
2. If using HTTPS + PAT, ensure the token has at least:
   - `repo` scope (private repos), and
   - SSO authorization enabled if your org enforces SSO.
3. If using SSH, verify your key is uploaded to GitHub and loaded locally:
   - `ssh -T git@github.com`
4. Confirm you have write access to the target repo/org and branch protection is not requiring PR-only workflow.
