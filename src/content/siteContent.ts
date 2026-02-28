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
  inputsOutputs: string;
  outcomes: string[];
  howItWorks: string[];
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

export const headerNav: NavItem[] = [
  { label: "Products", to: "/products" },
  { label: "Services", to: "/services" },
  { label: "Work", to: "/work" },
  { label: "How We Build", to: "/how-we-build" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export const homeTrustChips = [
  "Human-in-the-loop governance",
  "Clear cost and scope ceilings",
  "Built for real-world operations",
];

export const homeSummary =
  "InnoWeb Ventures collaborates with partners across a broad range of professional services, including engineering, construction, civil delivery, commercial operations, and go-to-market functions, to build logic-based applications that automate workflow handoffs with AI assistance. We focus on practical systems that monitor, coordinate, and reduce manual workload while keeping critical decisions with humans.";

export const homePaths: SummaryPath[] = [
  {
    title: "Services",
    description: "Start with a low-risk review, then prototype and build in controlled milestones.",
    to: "/services",
    cta: "See services",
  },
  {
    title: "Work",
    description: "Browse delivery snapshots that show workflow challenge, build approach, and outcomes.",
    to: "/work",
    cta: "See case studies",
  },
  {
    title: "How We Build",
    description: "Understand our human-in-control method and cost guardrails.",
    to: "/how-we-build",
    cta: "See method",
  },
];

export const products: Product[] = [
  {
    slug: "concordia",
    name: "Concordia",
    audience: "Infrastructure and delivery leaders handling high-volume contracts",
    summary:
      "Concordia extracts obligations, milestones, and risk signals from contract packs so teams can decide faster.",
    inputsOutputs:
      "Inputs: contract PDFs, annexes, procurement notes. Outputs: obligation register, risk summary, action checklist.",
    outcomes: [
      "Reduces contract review time across fragmented documents.",
      "Surfaces hidden obligations before project kickoff.",
      "Creates a traceable decision log for governance.",
    ],
    howItWorks: [
      "Upload contract pack and define project context.",
      "Concordia maps clauses to obligations and risk levels.",
      "Team reviews flagged actions and exports work-ready outputs.",
    ],
    relatedProductSlugs: ["tad", "catalog-cruncher"],
  },
  {
    slug: "catalog-cruncher",
    name: "Catalog Cruncher",
    audience: "Operations teams managing supplier catalogues and internal part lists",
    summary:
      "Catalog Cruncher standardises inconsistent catalogue records and recommends clean mappings for downstream systems.",
    inputsOutputs:
      "Inputs: CSV/Excel catalogues, ERP extracts. Outputs: normalised catalogue, match confidence report, exception queue.",
    outcomes: [
      "Removes duplicate and conflicting item records.",
      "Improves procurement search and pricing consistency.",
      "Cuts manual reconciliation effort each cycle.",
    ],
    howItWorks: [
      "Ingest catalogue data and define target schema.",
      "Model clusters duplicates and suggests canonical entries.",
      "Ops approves exceptions and publishes a clean catalogue.",
    ],
    relatedProductSlugs: ["concordia", "luxpulse-ai"],
  },
  {
    slug: "tad",
    name: "TAD",
    audience: "Trading and decision teams needing signal clarity",
    summary:
      "TAD reduces noise in high-frequency information streams and highlights decision-ready signals with context.",
    inputsOutputs:
      "Inputs: market/event feeds, analyst notes. Outputs: prioritised signal board, trigger alerts, audit trail.",
    outcomes: [
      "Improves decision speed without sacrificing control.",
      "Creates a consistent signal triage process.",
      "Provides traceability for post-event review.",
    ],
    howItWorks: [
      "Connect event feeds and define relevance rules.",
      "TAD ranks signals against risk and confidence thresholds.",
      "Team validates alerts and acts with full context.",
    ],
    relatedProductSlugs: ["concordia", "luxpulse-ai"],
  },
  {
    slug: "luxpulse-ai",
    name: "Luxpulse-AI",
    audience: "Product and customer teams improving digital experience",
    summary:
      "Luxpulse-AI identifies drop-off patterns and suggests workflow-level improvements for faster user outcomes.",
    inputsOutputs:
      "Inputs: product events, funnel metrics, support signals. Outputs: friction map, prioritised improvements, impact tracker.",
    outcomes: [
      "Highlights the journeys causing avoidable friction.",
      "Aligns teams on the highest-impact improvements first.",
      "Tracks intervention impact against baseline metrics.",
    ],
    howItWorks: [
      "Connect usage and support data sources.",
      "Luxpulse-AI maps friction points by segment and flow.",
      "Teams ship targeted fixes and monitor outcome shifts.",
    ],
    relatedProductSlugs: ["catalog-cruncher", "tad"],
  },
];

export const services: Service[] = [
  {
    slug: "automation-audit",
    name: "Automation Audit",
    duration: "1 week",
    summary:
      "A rapid diagnostic to identify automation opportunities, risk points, and the fastest path to measurable wins.",
    whatYouGet: [
      "Current-state workflow map",
      "Opportunity and risk register",
      "Prioritized 30-day action plan",
    ],
    timeline: "5 working days from kickoff to readout.",
    clientNeeds:
      "Access to key process owners, sample workflow data, and one decision-maker for readouts.",
    guardrails: [
      "Cost ceiling agreed before analysis starts.",
      "Human sign-off gates on all recommended automations.",
      "No production changes during audit week.",
    ],
  },
  {
    slug: "prototype-sprint",
    name: "Prototype Sprint",
    duration: "10 days",
    summary:
      "A focused sprint to prove a workflow with a working prototype and a clear go/no-go decision.",
    whatYouGet: [
      "Working prototype for one priority workflow",
      "Validation session with stakeholders",
      "Delivery plan for production build",
    ],
    timeline: "10 working days, including demo and decision checkpoint.",
    clientNeeds:
      "Single workflow owner, access to representative data, and 2-3 feedback touchpoints across the sprint.",
    guardrails: [
      "Scope locked to one workflow to keep risk low.",
      "Human-in-control review before demo release.",
      "Explicit budget cap for prototype phase.",
    ],
  },
  {
    slug: "build-integrate",
    name: "Build & Integrate",
    duration: "4-8 weeks",
    summary:
      "Production delivery for validated workflows with integration into your existing tools, controls, and reporting.",
    whatYouGet: [
      "Production-grade workflow system",
      "Integration with existing stack",
      "Operational handover and enablement",
    ],
    timeline: "Typically 4-8 weeks based on integration complexity.",
    clientNeeds:
      "Access to target systems, technical counterpart, and weekly steering decisions.",
    guardrails: [
      "Milestone-based releases with rollback paths.",
      "Usage and cost telemetry from day one.",
      "Approval checkpoints for governance and security.",
    ],
  },
  {
    slug: "support-optimisation",
    name: "Support & Optimisation",
    duration: "Retainer",
    summary:
      "Ongoing support to improve performance, cost efficiency, and operational reliability as your workflows evolve.",
    whatYouGet: [
      "Monthly optimisation backlog",
      "Performance and cost review cadence",
      "Issue response and incremental enhancements",
    ],
    timeline: "Rolling monthly cycles with agreed service windows.",
    clientNeeds:
      "Named owner for priorities, shared KPI targets, and a monthly review session.",
    guardrails: [
      "Cost thresholds monitored continuously.",
      "Operational changes reviewed with human checkpointing.",
      "Security and governance controls revalidated each cycle.",
    ],
  },
];

export const caseStudies: CaseStudy[] = [
  {
    slug: "concordia-infrastructure",
    name: "Concordia for Infrastructure Delivery",
    problem: "Contract obligations were scattered across large document packs.",
    build: "Obligation extraction and risk flagging workflow with review checkpoints.",
    result: "Faster readiness reviews with a single action register.",
    context:
      "A delivery team needed to reduce late surprises in contract-heavy programmes while preserving governance control.",
    whatWasBuilt: [
      "Clause classification pipeline for obligation mapping",
      "Risk scoring model with human review queue",
      "Export-ready checklist for delivery teams",
    ],
    measurableValue: [
      "Placeholder: 25-35% reduction in initial contract review cycle time",
      "Placeholder: improved obligation traceability across programme teams",
      "Placeholder: faster escalation on high-risk clauses",
    ],
    screenshots: [
      { title: "Obligation dashboard", imagePath: "branding/innoweb-hero-bg-desktop.jpeg" },
      { title: "Risk review queue", imagePath: "branding/innoweb-hero-bg-mobile.jpeg" },
    ],
  },
  {
    slug: "tad-signal-ops",
    name: "TAD Signal Operations",
    problem: "Decision teams were overwhelmed by high-noise event streams.",
    build: "Signal ranking pipeline with confidence and risk thresholds.",
    result: "Cleaner triage and more consistent actioning.",
    context:
      "A fast-moving operations function needed a repeatable way to separate high-value signals from routine noise.",
    whatWasBuilt: [
      "Ingestion from event and note feeds",
      "Priority scoring tuned to operational thresholds",
      "Action board with full audit trail",
    ],
    measurableValue: [
      "Placeholder: 30% faster triage during peak periods",
      "Placeholder: improved consistency in signal handling decisions",
      "Placeholder: reduced manual escalation churn",
    ],
    screenshots: [
      { title: "Signal board", imagePath: "branding/innoweb-hero-bg-desktop.jpeg" },
      { title: "Event detail", imagePath: "branding/innoweb-hero-bg-mobile.jpeg" },
    ],
  },
  {
    slug: "luxpulse-experience-loop",
    name: "Luxpulse-AI Experience Loop",
    problem: "Product teams lacked a shared view of friction across key journeys.",
    build: "Friction mapping and recommendation flow linked to outcome tracking.",
    result: "Prioritized improvements tied to measurable shifts.",
    context:
      "A growth-stage product team wanted to target interventions where customer friction had the highest impact.",
    whatWasBuilt: [
      "Journey-level friction detection",
      "Recommendation scoring based on impact potential",
      "Outcome tracker for shipped improvements",
    ],
    measurableValue: [
      "Placeholder: 15-20% improvement in target funnel completion",
      "Placeholder: faster prioritisation of UX improvements",
      "Placeholder: clearer alignment across product and ops teams",
    ],
    screenshots: [
      { title: "Friction map", imagePath: "branding/innoweb-hero-bg-desktop.jpeg" },
      { title: "Impact tracker", imagePath: "branding/innoweb-hero-bg-mobile.jpeg" },
    ],
  },
];

export const howWeBuildPillars = [
  {
    title: "Workflow-first",
    description: "We map decisions and handoffs first, then choose tooling.",
  },
  {
    title: "Human-in-control loop",
    description: "Critical actions always include review and override controls.",
  },
  {
    title: "Cost ceilings built-in",
    description: "Budgets are treated as product constraints, not afterthoughts.",
  },
  {
    title: "Security & governance",
    description: "Controls and traceability are part of the architecture from day one.",
  },
];

export const deliveryPhases = ["Discover", "Prototype", "Build", "Support"];

export const footerNextSteps: NextStep[] = [
  {
    label: "Explore Products",
    to: "/products",
    description: "See app capabilities and choose a fit for your workflow.",
  },
  {
    label: "Review Services",
    to: "/services",
    description: "Choose a low-risk engagement path to get started.",
  },
  {
    label: "Book a Build Review",
    to: "/contact",
    description: "Book a 20-minute session to scope next steps.",
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
