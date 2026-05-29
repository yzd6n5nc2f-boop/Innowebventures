export type NavItem = {
  label: string;
  to: string;
};

export type SummaryPath = {
  title: string;
  description: string;
  to: string;
  cta: string;
};

export type Product = {
  slug: string;
  name: string;
  audience: string;
  summary: string;
  positioning: string;
  tagline: string;
  brandLine: string;
  role: string;
  glyph: string;
  accent: string;
  accentSoft: string;
  secondaryAccent: string;
  whatItDoes: string[];
  whyItMatters: string[];
  roleInSuite: string;
  usedFor: string[];
  outcomes: string[];
  relatedProductSlugs: string[];
};

export type Service = {
  slug: string;
  name: string;
  duration: string;
  summary: string;
  whatYouGet: string[];
  timeline: string;
  clientNeeds: string;
  guardrails: string[];
};

export type CaseStudy = {
  slug: string;
  name: string;
  problem: string;
  build: string;
  result: string;
  context: string;
  whatWasBuilt: string[];
  measurableValue: string[];
  screenshots: { title: string; imagePath: string }[];
};

export type NextStep = {
  label: string;
  to: string;
  description: string;
};

export type PlatformLayer = {
  title: string;
  summary: string;
  detail: string;
  accent: string;
  accentSoft: string;
};

export const headerNav: NavItem[] = [
  { label: "Forge Suite", to: "/forge-suite" },
  { label: "Platform", to: "/platform" },
  { label: "How It Works", to: "/how-it-works" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export const homeTrustChips = [
  "Free operational assessment available",
  "Human-controlled AI systems",
  "Operational governance built in",
  "Tailored for real industry adoption",
];

export const homeSummary =
  "InnoWeb Ventures Limited is the main company. We design and deploy tailored automation, software, and AI systems for real businesses using our own internal platform stack. NeuralForge shapes the bespoke intelligence, Forge Coder builds the system and interface layer, and ForgeOps runs, governs, and helps deploy the operational layer. The Forge Suite is not something we are trying to sell on its own. It is the proprietary stack we use, alongside specialist sector knowledge, to engineer solutions around the workflows, budgets, and operating reality of each client.";

export const homePaths: SummaryPath[] = [
  {
    title: "Forge Suite",
    description: "See the proprietary platform stack we use to shape intelligence, build systems, and govern operations.",
    to: "/forge-suite",
    cta: "Explore the Forge Suite",
  },
  {
    title: "Platform",
    description: "Understand how we combine intelligence, software, hardware, and deployment into tailored operational solutions.",
    to: "/platform",
    cta: "See the platform",
  },
  {
    title: "How It Works",
    description: "Review how we assess workflows, shape the right stack, and keep deployment measurable and human-led.",
    to: "/how-it-works",
    cta: "Learn how it works",
  },
];

export const products: Product[] = [
  {
    slug: "neuralforge",
    name: "NeuralForge",
    audience: "Businesses needing sector-specific intelligence shaped around their own workflow context",
    summary:
      "NeuralForge is the bespoke intelligence layer we use to shape, fine-tune, and configure AI capability for the specific operational environment we are solving for.",
    positioning:
      "The bespoke brain layer used to shape intelligence around sector-specific workflows, language, and operational context.",
    tagline: "Shape the intelligence layer.",
    brandLine: "by InnoWeb",
    role: "Intelligence layer",
    glyph: "NF",
    accent: "#7A5CFF",
    accentSoft: "rgba(122, 92, 255, 0.16)",
    secondaryAccent: "#B14DFF",
    whatItDoes: [
      "Shapes AI behaviour around sector language, workflow logic, and real operational needs.",
      "Supports fine-tuning, configuration, and specialist knowledge adaptation for bespoke use cases.",
      "Provides the intelligence foundation for tailored systems rather than generic off-the-shelf outputs.",
    ],
    whyItMatters: [
      "Useful automation starts with intelligence that fits the business, not just the model.",
      "Sector-specific shaping improves relevance, control, and practical output quality.",
      "It lets us engineer the solution around the client instead of forcing the client around a generic tool.",
    ],
    roleInSuite:
      "NeuralForge is the intelligence layer we often start with when a solution needs a bespoke brain. It shapes how the wider system understands context, responds to domain-specific inputs, and supports operational decisions.",
    usedFor: [
      "Fine-tuning and intelligence shaping",
      "Sector-specific AI capability",
      "Domain adaptation",
      "Specialist knowledge workflows",
    ],
    outcomes: [
      "More relevant intelligence for the client's real workflow environment.",
      "A stronger foundation for tailored automation and software design.",
      "Greater control over how AI behaves inside the final solution.",
    ],
    relatedProductSlugs: ["forge-coder", "forgeops"],
  },
  {
    slug: "forge-coder",
    name: "Forge Coder",
    audience: "Businesses needing tailored system build, interface design, and workflow software around the shaped intelligence layer",
    summary:
      "Forge Coder is the build layer we use to turn the intelligence and workflow design into software, interfaces, user journeys, and operational tooling.",
    positioning:
      "The systems and interface layer used to build the front end, workflow experience, and application structure around the bespoke intelligence.",
    tagline: "Build the systems layer.",
    brandLine: "by InnoWeb",
    role: "Build layer",
    glyph: "FC",
    accent: "#00D8FF",
    accentSoft: "rgba(0, 216, 255, 0.16)",
    secondaryAccent: "#2F6BFF",
    whatItDoes: [
      "Builds the front end, workflow system, and supporting software around the tailored intelligence layer.",
      "Provides a structured layer for assembling modular tools, interfaces, and system logic.",
      "Supports rapid build without exposing the full internal architecture externally.",
    ],
    whyItMatters: [
      "It turns strategy and workflow design into something usable by the client team.",
      "It lets us tailor interfaces and system behaviour to the operating reality of the business.",
      "It connects the bespoke intelligence layer to a working software experience.",
    ],
    roleInSuite:
      "Forge Coder is the systems layer inside the Forge Suite. It builds the client-facing and workflow-facing parts of the solution around the intelligence we have shaped and the operational model we have designed.",
    usedFor: [
      "Front-end and interface build",
      "Workflow assembly",
      "AI-powered internal tooling",
      "Structured application delivery",
    ],
    outcomes: [
      "A tailored system layer that reflects how the business actually operates.",
      "Cleaner user journeys and workflow handling around the bespoke AI capability.",
      "A stronger bridge from intelligence shaping into deployment and live use.",
    ],
    relatedProductSlugs: ["neuralforge", "forgeops"],
  },
  {
    slug: "forgeops",
    name: "ForgeOps",
    audience: "Operations leaders, directors, COOs, and teams needing oversight, rollout, and control of deployed systems",
    summary:
      "ForgeOps is the operational layer we use to run, monitor, govern, and help deploy the finished system in a controlled way.",
    positioning:
      "The operational command layer that runs, monitors, governs, and helps deploy the built system and its intelligence safely in live use.",
    tagline: "Govern the operational layer.",
    brandLine: "by InnoWeb",
    role: "Operations and governance layer",
    glyph: "FO",
    accent: "#00CFA3",
    accentSoft: "rgba(0, 207, 163, 0.16)",
    secondaryAccent: "#7EF0D2",
    whatItDoes: [
      "Runs live workflows with checkpoints, approvals, and human review where needed.",
      "Provides visibility into deployment, runtime behaviour, and operational state.",
      "Supports governance, monitoring, and controlled rollout of agents, interfaces, and system logic.",
    ],
    whyItMatters: [
      "A tailored solution only works if it can be managed properly in real operation.",
      "Clients need monitoring, oversight, and confidence once systems are live.",
      "It keeps the deployed solution measurable, governed, and commercially credible.",
    ],
    roleInSuite:
      "ForgeOps is the operational layer inside the Forge Suite. It brings together deployment, monitoring, approvals, and runtime control so the finished solution can function safely and effectively in the client's environment.",
    usedFor: [
      "Workflow orchestration",
      "Deployment support",
      "Runtime monitoring",
      "Governance and oversight",
    ],
    outcomes: [
      "More controlled deployment of bespoke systems into live business use.",
      "Better operational visibility and accountability once the solution is running.",
      "A clearer route from custom build into stable day-to-day operation.",
    ],
    relatedProductSlugs: ["neuralforge", "forge-coder"],
  },
];

export const services: Service[] = [
  {
    slug: "platform-discovery",
    name: "Platform Discovery",
    duration: "1 week",
    summary:
      "A short discovery engagement to identify the right Forge Suite entry point, operational constraints, and governance priorities.",
    whatYouGet: [
      "Current workflow and systems map",
      "Forge Suite entry recommendation",
      "Deployment pathway and control plan",
    ],
    timeline: "5 working days from kickoff to architecture readout.",
    clientNeeds:
      "Access to operational stakeholders, representative workflow context, and one decision-maker for alignment.",
    guardrails: [
      "Scope and decision questions agreed before work begins.",
      "Human review points built into all recommendations.",
      "No production changes during discovery.",
    ],
  },
  {
    slug: "deployment-sprint",
    name: "Deployment Sprint",
    duration: "10 days",
    summary:
      "A focused sprint to stand up one controlled Forge Suite deployment pathway and validate the operating model quickly.",
    whatYouGet: [
      "Live deployment plan for one priority workflow",
      "Validation checkpoint with stakeholders",
      "Operational recommendation for next rollout stage",
    ],
    timeline: "10 working days, including review and deployment checkpoint.",
    clientNeeds:
      "A named workflow owner, access to representative data, and timely feedback during the sprint.",
    guardrails: [
      "Scope locked to one deployment path.",
      "Human-in-control approvals before live progression.",
      "Budget boundaries agreed at the outset.",
    ],
  },
  {
    slug: "integration-rollout",
    name: "Integration & Rollout",
    duration: "4-8 weeks",
    summary:
      "Structured rollout of Forge Suite capabilities into existing systems, operational workflows, and reporting layers.",
    whatYouGet: [
      "Integrated platform deployment",
      "Workflow and systems rollout plan",
      "Operational enablement and handover",
    ],
    timeline: "Typically 4-8 weeks depending on systems and governance complexity.",
    clientNeeds:
      "Access to target systems, technical counterparts, and a weekly steering decision cadence.",
    guardrails: [
      "Milestone releases with rollback paths.",
      "Usage, cost, and runtime telemetry from day one.",
      "Governance checkpoints before expansion.",
    ],
  },
  {
    slug: "optimisation-governance-support",
    name: "Optimisation & Governance Support",
    duration: "Retainer",
    summary:
      "Ongoing support to tune platform performance, reinforce governance, and improve operational outcomes over time.",
    whatYouGet: [
      "Monthly optimisation and governance backlog",
      "Runtime and cost review cadence",
      "Incremental platform and workflow refinements",
    ],
    timeline: "Rolling monthly cycles with agreed response and review windows.",
    clientNeeds:
      "A named operating owner, KPI alignment, and a recurring review forum.",
    guardrails: [
      "Cost thresholds monitored continuously.",
      "Operational changes reviewed with human checkpointing.",
      "Security and governance controls revisited each cycle.",
    ],
  },
];

export const caseStudies: CaseStudy[] = [
  {
    slug: "operational-build-layer",
    name: "Operational Build Layer",
    problem: "Legacy workflows slowed down software delivery for operational teams.",
    build: "Structured build layer for AI-enabled workflow software and internal tools.",
    result: "Faster movement from workflow concept to controlled system delivery.",
    context:
      "Representative platform pattern showing how the Forge Suite build layer can support serious internal software creation.",
    whatWasBuilt: [
      "Structured workflow assembly layer",
      "Reusable software components for operational tooling",
      "Controlled handoff into governed deployment",
    ],
    measurableValue: [
      "Pattern example: faster movement from workflow mapping to working system",
      "Pattern example: reduced fragmentation across internal tool development",
      "Pattern example: stronger architectural consistency at deployment time",
    ],
    screenshots: [
      { title: "Build layer overview", imagePath: "branding/innoweb-hero-bg-desktop.jpeg" },
      { title: "Workflow assembly view", imagePath: "branding/innoweb-hero-bg-mobile.jpeg" },
    ],
  },
  {
    slug: "governed-runtime-operations",
    name: "Governed Runtime Operations",
    problem: "AI workflows needed approval, oversight, and auditability in live environments.",
    build: "Operational governance layer with runtime visibility and human checkpointing.",
    result: "Clearer control over how deployed AI workflows behave in production.",
    context:
      "Representative platform pattern showing how operational oversight becomes part of live AI infrastructure.",
    whatWasBuilt: [
      "Runtime command surface",
      "Approval and escalation pathway design",
      "Audit and oversight structure",
    ],
    measurableValue: [
      "Pattern example: stronger runtime visibility for operational owners",
      "Pattern example: clearer approval handling in live workflows",
      "Pattern example: better governance posture for production AI usage",
    ],
    screenshots: [
      { title: "Operations board", imagePath: "branding/innoweb-hero-bg-desktop.jpeg" },
      { title: "Approval view", imagePath: "branding/innoweb-hero-bg-mobile.jpeg" },
    ],
  },
  {
    slug: "specialised-intelligence-layer",
    name: "Specialised Intelligence Layer",
    problem: "Generic model behaviour lacked domain fit for specialist operational use.",
    build: "Intelligence shaping layer for domain adaptation and specialist knowledge behaviour.",
    result: "Higher relevance and stronger operational fit for AI-assisted outputs.",
    context:
      "Representative platform pattern showing how specialised intelligence can sit inside a governed AI stack.",
    whatWasBuilt: [
      "Domain adaptation flow",
      "Specialised intelligence configuration layer",
      "Outcome monitoring against operational context",
    ],
    measurableValue: [
      "Pattern example: stronger domain relevance in system outputs",
      "Pattern example: clearer intelligence specialization by workflow",
      "Pattern example: improved operational fit for AI-enabled systems",
    ],
    screenshots: [
      { title: "Intelligence map", imagePath: "branding/innoweb-hero-bg-desktop.jpeg" },
      { title: "Specialisation view", imagePath: "branding/innoweb-hero-bg-mobile.jpeg" },
    ],
  },
];

export const platformLayers: PlatformLayer[] = [
  {
    title: "Intelligence layer",
    summary: "NeuralForge shapes the bespoke brain around sector-specific context and workflow reality.",
    detail:
      "This layer fine-tunes and configures intelligence so the final solution responds to the actual language, logic, and operational needs of the business.",
    accent: "#7A5CFF",
    accentSoft: "rgba(122, 92, 255, 0.16)",
  },
  {
    title: "Build layer",
    summary: "Forge Coder builds the software, interface, and workflow layer around that bespoke intelligence.",
    detail:
      "This layer turns the shaped intelligence and workflow design into usable software, interface flows, and system structure for the client environment.",
    accent: "#00D8FF",
    accentSoft: "rgba(0, 216, 255, 0.16)",
  },
  {
    title: "Governance layer",
    summary: "ForgeOps runs, monitors, and governs the live operational layer once the tailored solution is deployed.",
    detail:
      "This layer handles rollout, orchestration, oversight, approvals, and ongoing control so the finished system performs safely in day-to-day operation.",
    accent: "#00CFA3",
    accentSoft: "rgba(0, 207, 163, 0.16)",
  },
];

export const howWeBuildPillars = [
  {
    title: "Workflow-first architecture",
    description: "Operational decisions and handoffs are mapped before system logic is deployed.",
  },
  {
    title: "Human-in-control runtime",
    description: "Critical actions stay reviewable, overrideable, and visible in live operation.",
  },
  {
    title: "Measured cost control",
    description: "Usage ceilings, telemetry, and cost awareness are built into deployment from the start.",
  },
  {
    title: "Security and governance by default",
    description: "Controls, traceability, and accountability sit inside the platform architecture itself.",
  },
];

export const deliveryPhases = ["Discover", "Deploy", "Operate", "Refine"];

export const footerNextSteps: NextStep[] = [
  {
    label: "Understand Our Stack",
    to: "/forge-suite",
    description: "See how NeuralForge, Forge Coder, and ForgeOps work together behind tailored solutions.",
  },
  {
    label: "See the Platform",
    to: "/platform",
    description: "Review how we combine intelligence, software, and operations into controlled deployments.",
  },
  {
    label: "Request a Free Assessment",
    to: "/contact",
    description: "Discuss your processes and see where automation could improve your operation.",
  },
];

export function getProductBySlug(slug?: string) {
  return products.find((item) => item.slug === slug);
}

export function getServiceBySlug(slug?: string) {
  return services.find((item) => item.slug === slug);
}

export function getCaseStudyBySlug(slug?: string) {
  return caseStudies.find((item) => item.slug === slug);
}
