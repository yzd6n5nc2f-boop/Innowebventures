function trimTrailingSlash(value: string | undefined) {
  const trimmed = value?.trim();
  return trimmed ? trimmed.replace(/\/+$/, "") : "";
}

function normalizeAbsoluteUrl(value: string | undefined) {
  const trimmed = trimTrailingSlash(value);

  if (!trimmed) {
    return "";
  }

  const withProtocol = /^[a-zA-Z][a-zA-Z\d+.-]*:\/\//.test(trimmed) ? trimmed : `https://${trimmed}`;

  try {
    const parsed = new URL(withProtocol);

    if (parsed.protocol === "http:" || parsed.protocol === "https:") {
      return parsed.toString().replace(/\/+$/, "");
    }

    return "";
  } catch {
    return "";
  }
}

export const CONTACT_ENDPOINT = trimTrailingSlash(import.meta.env.VITE_CONTACT_ENDPOINT) || "/api/contact";

export const SITE_URL = normalizeAbsoluteUrl(import.meta.env.VITE_SITE_URL);

export const LIVE_WORK_URLS = {
  tad:
    normalizeAbsoluteUrl(import.meta.env.VITE_LIVE_WORK_TAD_URL) ||
    "https://lively-bush-0409b5010.1.azurestaticapps.net",
  concordia:
    normalizeAbsoluteUrl(import.meta.env.VITE_LIVE_WORK_CONCORDIA_URL) ||
    "https://white-mushroom-039e8e310.6.azurestaticapps.net",
  luxpulseAi:
    normalizeAbsoluteUrl(import.meta.env.VITE_LIVE_WORK_LUXPULSE_URL) ||
    "https://orange-bush-0d6e2d310.1.azurestaticapps.net",
} as const;
