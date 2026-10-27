# InnoWeb Ventures Ltd - Landing

Static landing site (Vite + React + TypeScript) deployed with Azure Static Web Apps.

## Automatic XML sitemap

The public sitemap is `https://www.innowebventures.com/sitemap.xml`.
`scripts/build-sitemap.mjs` generates `dist/sitemap.xml` and `dist/robots.txt`
at the end of every `npm run build`; GitHub Actions deploys these with the site.
Do not edit the generated XML by hand.

- Public React pages are discovered from `src/App.tsx`. Redirects and the wildcard
  fallback are omitted. Both existing product URL families are included because
  both currently render public content rather than redirecting.
- Product/service slugs and all blog posts are discovered from the content files
  imported by their detail components, including JSON collections. New posts in
  those collections and new ordinary routes are picked up automatically.
- Standalone HTML pages in `public`, including the privacy policy, are discovered
  automatically. Asset/branding HTML, pages marked `noindex`, and admin, test,
  preview and thank-you paths are excluded.
- Future-dated posts are included while their direct URLs remain public. The blog
  listing schedule is not an access restriction.
- Every URL uses the fixed `https://www.innowebventures.com` origin. `lastmod` uses
  Git history for the route, page dependencies and individual content object;
  it is not replaced with the build date on every deployment. Editing one post
  does not change the dates of other posts in the same collection.
- The origin, exclusion rule and mappings for new dynamic page types live at the
  top of `scripts/build-sitemap.mjs`. A new dynamic page type must be registered
  there; the build fails rather than silently leaving it out.
- Both CI checkouts use `fetch-depth: 0` for trustworthy dates. A shallow checkout
  deliberately fails sitemap generation; run `git fetch --unshallow` locally.
- `staticwebapp.config.json` specifies XML/text content types and the custom 404
  response. There is no broad SPA fallback.

Run `npm run test:sitemap` to check route/post discovery, exclusions, individual
article dates and reproducibility across unchanged builds.

## Real HTTP 404 responses

`scripts/build-routing.mjs` runs after sitemap generation on every build. It
uses the discovered public URLs to write exact Azure rewrites into
`dist/staticwebapp.config.json`. Existing standalone privacy/campaign rewrites
are preserved. New public pages and post slugs therefore receive hosting rules
automatically, without allowing arbitrary slugs to return HTTP 200.
The deployment job builds the site first, verifies the generated routing, then
uploads `dist` with `skip_app_build: true` and `config_file_location: "dist"`.
This ensures Azure receives the generated rules alongside the matching files.

The broad `navigationFallback` is removed: Azure serves missing paths with HTTP
404 and `responseOverrides["404"]` supplies the standalone `public/404.html`.
That page works without JavaScript and links to Services, Insights and Contact.
It is marked `noindex` and is not included in the sitemap. Azure matches each
exact rule with or without a trailing slash; duplicate slash rules must not be
generated. Explicit legacy redirects are discovered from `Navigate` routes in `src/App.tsx`.
The old `/work/:slug` redirect is restricted to the three known legacy case-study
slugs so arbitrary missing case studies can return 404.

React's wildcard and invalid content slugs render `src/pages/NotFound.tsx` during
in-app navigation. HTTP status codes are supplied by Azure on document requests;
client-side route changes alone do not generate an HTTP response.

Run `npm run test:routing` after a production build to check valid routes,
unknown paths, legacy redirects, metadata rewrites and the custom 404 document.

## Search titles and descriptions

The approved copy is maintained in `src/content/pageMetadata.json`, keyed by
public URL path. Keep each title under 60 characters and each description under
155 characters. Product aliases intentionally share their matching product's
metadata; the 404 page remains `noindex`.

`scripts/build-page-metadata.mjs` runs after route generation. It injects the
approved title and description into the actual HTML returned for each public
route, including all blog posts and the standalone privacy/error pages. Existing
campaign sharing metadata and images are preserved, with sharing titles and
descriptions aligned to the approved copy. Internal HTML files are served through
exact route rewrites; direct requests to their storage paths return HTTP 404.

`src/components/PageMetadata.tsx` keeps titles and descriptions in sync during
React navigation. Article headlines and body copy are unchanged. Sitemap lastmod
dates include changes to each page's own metadata entry.

Add a metadata entry when introducing a new page or post. The production build
fails on missing metadata or over-length copy, rather than shipping a generic
title. `npm run test:metadata` verifies the HTML, copy limits, preserved 404s and
client navigation behaviour in CI and before deployment.

Every public page also gets a self-referencing canonical URL on
`https://www.innowebventures.com`, Open Graph metadata and a Twitter
`summary_large_image` card. `src/content/socialMetadata.json` selects the branded
default share image or a page-specific image. All share images are 1200 x 630
JPEGs under `public/branding/social`; the four existing November campaign
artworks retain separate originals and use landscape sharing variants.
The shared `src/content/socialMetadata.mjs` helper keeps the generated HTML and
React navigation consistent, including canonical URLs, image URLs and alt text.
Metadata checks verify one canonical per page, all sharing tags, actual image
dimensions and updates when visitors navigate between articles and other pages.

This repo does not use Cloudflare. The hosting path in the codebase is Azure Static Web Apps for the frontend and Azure Functions for the contact form API.

## Contact form delivery and storage audit trail

The contact form posts to an Azure Function at `/api/contact`.
That function sends enquiries to your inbox and stores each submission in Azure Table Storage for traceability.

Configure these application settings in Azure Static Web Apps:

1. `CONTACT_TO_EMAIL` (destination inbox; required)
2. `CONTACT_EMAIL_PROVIDER` (required: `smtp`, `resend`, `brevo`, or `sendgrid`)
3. Provider credentials:
   - SMTP:
     - `SMTP_HOST`
     - `SMTP_PORT` (for example `587` or `465`)
     - `SMTP_USER`
     - `SMTP_PASS`
     - `SMTP_SECURE` (optional; `true`/`false`, defaults to `true` for port `465`)
   - Resend:
     - `RESEND_API_KEY`
   - Brevo:
     - `BREVO_API_KEY`
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

Quick start (Brevo transactional email):

- `CONTACT_EMAIL_PROVIDER=brevo`
- `BREVO_API_KEY=<your-brevo-api-key>`
- `CONTACT_TO_EMAIL=<your-inbox-address>`
- `CONTACT_FROM_EMAIL=<a sender address you have verified in Brevo>`

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
- otherwise `brevo` if `BREVO_API_KEY` is present
- otherwise `sendgrid` if `SENDGRID_API_KEY` is present

For local Azure Functions development, copy `api/local.settings.example.json` to
`api/local.settings.json` and replace the placeholder values with your own.

Notes:

- Each submission is recorded with request metadata and a delivery status (`pending`, `sent`, `failed`) in Azure Table Storage.
- This backend now uses only server-side providers (`smtp`, `resend`, `brevo`, `sendgrid`) for reliable API delivery from Azure Functions.
- For SendGrid, Resend, and Brevo, `CONTACT_FROM_EMAIL` must be a verified sender/domain.


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
