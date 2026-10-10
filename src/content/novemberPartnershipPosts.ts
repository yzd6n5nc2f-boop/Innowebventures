import type { BlogPost } from "./blogPosts";
import campaignPosts from "./novemberPartnershipPosts.json";

export type PartnershipPost = BlogPost & { publishAt: string };
export const novemberPartnershipPosts: PartnershipPost[] = campaignPosts;

export function getNovemberPartnershipPost(slug: string) {
  return novemberPartnershipPosts.find((post) => post.slug === slug);
}

export function getPublishedPartnershipPosts(now = Date.now()) {
  return novemberPartnershipPosts.filter((post) => Date.parse(post.publishAt) <= now);
}
