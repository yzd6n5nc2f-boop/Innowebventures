# CI Failure Investigation (GitHub Actions)

## What I inspected

- Workflow configuration in `.github/workflows/azure-static-web-apps-gray-bay-0d8f29410.yml`.
- Local production build via `npm run build`.

## Findings

1. **Only one CI workflow exists, and it directly runs Azure Static Web Apps deploy action.**
   - There is no standalone install/build/test/lint job that can validate pull requests independently of deployment credentials.
   - This means check status depends on deployment action behavior, not just code health.

2. **Deploy and PR-close jobs require a repository secret token.**
   - Both jobs use `azure_static_web_apps_api_token: ${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN_GRAY_BAY_0D8F29410 }}`.
   - For pull requests from forks, GitHub does not expose repository secrets, so Azure deploy steps commonly fail even when code is valid.

3. **Local build is healthy.**
   - `npm run build` completed successfully (`tsc -b && vite build`) and produced a `dist/` output.
   - This suggests the likely CI failures are workflow/secrets/deployment-path related rather than TypeScript/Vite compilation issues.

## Likely root cause

The failing GitHub checks are likely caused by using a deployment-only workflow as the required PR check, combined with secret-dependent Azure deploy steps that are not gated for untrusted PR contexts (for example, forked pull requests).

## Focused fix plan

1. **Split validation from deployment.**
   - Add a CI workflow/job that runs on `pull_request` and `push` with:
     - `actions/checkout@v4`
     - `actions/setup-node@v4` (pin to Node 20)
     - `npm ci`
     - `npm run build`
   - Make this validation job the required status check.

2. **Gate Azure deployment to trusted contexts only.**
   - Keep Azure deploy on `push` to `main`.
   - For PR preview deploys, add a guard such as:
     - `if: github.event.pull_request.head.repo.full_name == github.repository`
   - This prevents secret-dependent steps from running when secrets are unavailable.

3. **Add explicit failure messaging for missing secret (optional but useful).**
   - Add a preflight step that checks whether `AZURE_STATIC_WEB_APPS_API_TOKEN_GRAY_BAY_0D8F29410` is present and emits a clear skip/warning message when absent.

4. **Validate workflow behavior before enforcing required checks.**
   - Open an internal PR and verify:
     - Validation job passes.
     - Deploy job runs only in intended events.
     - Fork PRs no longer fail due to missing secrets.
