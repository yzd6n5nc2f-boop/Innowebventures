# Free workflow assessment

Public route: `/workflow-assessment`. API: `/api/workflow-assessment` (GET requests a signed short-lived form token; POST validates answers, applies rules, sends the requested report and separately notifies the team).

## Hosting and configuration

Runs on the existing Azure Static Web App and its managed Azure Functions API. No VPS, VPN, model server or AI subscription is required. The function reuses CONTACT_EMAIL_PROVIDER and its existing credentials, CONTACT_FROM_EMAIL (a verified sender), CONTACT_TO_EMAIL (notification inbox / reply-to), and CONTACT_STORAGE_CONNECTION_STRING (or AzureWebJobsStorage). For Brevo API delivery use CONTACT_EMAIL_PROVIDER=brevo and BREVO_API_KEY. Existing SMTP settings are supported too. Keep all credentials in Azure application settings, never VITE_ variables or source files.

Email submissions fail closed if a delivery configuration or storage connection is missing. The page still provides its local preliminary finding. If VITE_CONTACT_ENDPOINT points at another API host, its final `/contact` segment is replaced by `/workflow-assessment`; deploy the new function to that same host as well. Add the production origin to CONTACT_ALLOWED_ORIGINS if needed.

The report is sent transactionally. No marketing list is created or updated. Optional personal follow-up is recorded in the team notification; no automatic follow-up campaign is scheduled.

## Assessment and limits

Active minutes per run × 20 working days / four weekly runs / one monthly run yields approximate current monthly workload. This is not time saved or ROI. Recommendations depend on difficulty, information sensitivity and human approval needs. No model is called; the API recalculates results rather than accepting browser-generated output.

WorkflowAssessmentLimits stores HMAC identifiers and counters only, using the storage connection string as the signing secret. Atomic records enforce one request per recipient per 15-minute bucket, five per network per hour bucket, 100 per day overall, and form-token replay limits. Limits use fixed time buckets, so requests near boundaries can fall in adjacent windows. A token is valid between 2 seconds and 2 hours after issue. The platform must supply a trustworthy x-forwarded-for header; unknown networks share a limit. Review delivery logs for abuse. Each submission removes a bounded batch of rate-limit records older than seven days. If the service is inactive or cleanup fails, records can remain longer; include this table in normal storage housekeeping. Rotating the storage secret invalidates existing tokens.

Email bodies contain supplied answers. Review transactional-provider retention and access as part of operational privacy management. Avoid sending sensitive records; use general descriptions. Names, reply-to and email HTML are validated/escaped. Server error details and credentials are not returned to clients.

## Verification

Run `npm run build`, existing site checks and `npm run test:assessment`. On production, verify GET /api/workflow-assessment returns a token (no email is sent). Submit one consented test using the site owner's address; check the actual recipient inbox and team notification, plus Brevo transactional status, before claiming end-to-end inbox delivery. Delivery acceptance by Brevo is not proof of arrival. Check missing configuration, invalid input, duplicate requests, errors and optional follow-up behaviour.
