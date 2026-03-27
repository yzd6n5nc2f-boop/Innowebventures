function trimTrailingSlash(value: string | undefined) {
  const trimmed = value?.trim();
  return trimmed ? trimmed.replace(/\/+$/, "") : "";
}

export const CONTACT_ENDPOINT = trimTrailingSlash(import.meta.env.VITE_CONTACT_ENDPOINT) || "/api/contact";

export const SITE_URL = trimTrailingSlash(import.meta.env.VITE_SITE_URL);

export const LIVE_WORK_URLS = {
  tad:
    trimTrailingSlash(import.meta.env.VITE_LIVE_WORK_TAD_URL) ||
    "https://lively-bush-0409b5010.1.azurestaticapps.net",
  concordia:
    trimTrailingSlash(import.meta.env.VITE_LIVE_WORK_CONCORDIA_URL) ||
    "https://white-mushroom-039e8e310.6.azurestaticapps.net",
  luxpulseAi:
    trimTrailingSlash(import.meta.env.VITE_LIVE_WORK_LUXPULSE_URL) ||
    "https://orange-bush-0d6e2d310.1.azurestaticapps.net",
} as const;
