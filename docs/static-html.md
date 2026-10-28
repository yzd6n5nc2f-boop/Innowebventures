# Public HTML generation

The site stays on React 18, Vite and Azure Static Web Apps. No paid rendering
service, extra backend, new subscription or hosting plan upgrade is used.

The last step in npm run build is scripts/build-prerender.mjs. It uses Vite
to compile src/entry-prerender.tsx, renders every React URL discovered in the
generated sitemap, and inserts the body into that URL's existing HTML file.
The title, description, canonical and social tags remain controlled by
src/content/pageMetadata.json, src/content/socialMetadata.json and
scripts/build-page-metadata.mjs. Standalone privacy and 404 HTML stay intact.

src/main.tsx hydrates generated markup. The homepage product gallery is part
of its React component, so names and links are available without JavaScript.
SiteEnhancements starts the animated visual only after hydration.

Adding or editing a page or article in the repository automatically rebuilds
and deploys the HTML when pushed to main. New URLs still need approved page
metadata; the build deliberately fails if it is missing. Scheduled article
visibility in the initial HTML is evaluated at build time: deploy a new build
at the publication time to refresh the listing. Browser navigation evaluates
the current time after hydration. Direct article URLs remain unchanged.

Azure's exact public rewrites, redirects, protected implementation files and
real 404 handling are retained. There is no catch-all SPA fallback.
The build rejects a deployment at or above 250 MB or 15,000 files, before
deployment, to stay below the documented single-environment Free-plan limits.
This is a deployment-size guard, not a check of account-wide storage or traffic.

Verification:
- npm run test:prerender checks every public document and every article paragraph.
- Existing sitemap, routing and metadata tests continue to run before deployment.
- Static HTML validation uses a standard public GitHub runner and temporary
  Playwright installation to verify all pages with and without JavaScript,
  hydration, navigation, the mobile menu, a mocked form submission and 404.
  It does not submit a real enquiry or upload build artifacts.
