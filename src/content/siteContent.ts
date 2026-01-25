export type MenuLink = {
  label: string;
  to?: string;
  href?: string;
  external?: boolean;
};

export const menuLinks: MenuLink[] = [
  { label: "Home", to: "/" },
  { label: "Capabilities", to: "/capabilities" },
  { label: "Work", to: "/work" },
  // Add external links here when needed, e.g. { label: "LinkedIn", href: "https://...", external: true }
];

export const heroHighlights = [
  { label: "Neutral networks", to: "/capabilities" },
  { label: "Automation", to: "/capabilities" },
  { label: "Cloud-native delivery", to: "/capabilities" },
  { label: "Design-first experience", to: "/capabilities" },
];

export const capabilities = [
  {
    title: "Neutral networks",
    description: "AI plus network intelligence that adapts without the noise.",
    highlight: true,
  },
  {
    title: "Automation",
    description: "Workflow-first systems that remove manual drag and error.",
  },
  {
    title: "Cloud-native delivery",
    description: "Cost-aware architecture designed to scale responsibly.",
  },
  {
    title: "Design-first experience",
    description: "Calm, usable interfaces that keep humans in control.",
  },
];

export const methodColumns = [
  {
    title: "Built with intent, not excess",
    items: [
      "Workflows before features.",
      "AI where it creates leverage.",
      "Cloud costs driven down.",
      "Humans in control.",
    ],
  },
  {
    title: "Intelligence, engineered",
    items: [
      "Event-driven AI.",
      "Batch processing over always-on.",
      "Clear cost ceilings by design.",
    ],
  },
  {
    title: "Globally connected, UK-led",
    locations: "London | Dublin | South Africa | APAC",
  },
];

export const liveWorkItems = [
  {
    title: "TAD",
    subtitle: "Trading clarity without noise",
    badge: "LIVE",
    badgeTone: "live",
    url: "https://lively-bush-0409b5010.1.azurestaticapps.net",
    previewTitle: "TAD live preview",
  },
  {
    title: "Concordia",
    subtitle: "Contract intelligence for infrastructure",
    badge: "LIVE",
    badgeTone: "live",
    url: "https://white-mushroom-039e8e310.6.azurestaticapps.net",
    previewTitle: "Concordia live preview",
  },
  {
    title: "Luxpulse-AI",
    subtitle: "AI-powered product experience",
    badge: "LIVE",
    badgeTone: "live",
    url: "https://orange-bush-0d6e2d310.1.azurestaticapps.net",
    previewTitle: "Luxpulse-AI live preview",
  },
];

export const secondaryWorkItems = [
  {
    title: "Workflow Engine",
    subtitle: "Designing operations before they break",
    badge: "PROTOTYPE",
    badgeTone: "concept",
  },
  {
    title: "Compliance Lens",
    subtitle: "Seeing risk before it’s cost",
    badge: "CONCEPT",
    badgeTone: "concept",
  },
];
