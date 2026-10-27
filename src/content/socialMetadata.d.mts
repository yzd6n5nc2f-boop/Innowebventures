export type SocialConfig = {
  siteUrl: string;
  defaultImage: string;
  defaultImageAlt: string;
  width: number;
  height: number;
  images: Record<string, { image: string; alt: string }>;
};
export function getSocialMetadata(config: SocialConfig, route: string, metadata: { title: string; description: string }): {
  canonical: string;
  properties: Record<string, string>;
  names: Record<string, string>;
};
