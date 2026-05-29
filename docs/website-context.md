# InnoWeb Ventures Website Context

This file summarizes the current website implemented in `/Users/mauriciojardim/Innowebventures/src`. It is intended as a handoff context file for another model, so it includes brand cues, colors, page structure, and the exact user-facing copy currently present in the routed pages.

## Brand Summary

- Brand name shown in header: `InnoWeb Ventures Ltd`
- Brand name shown in footer: `InnoWeb Ventures Limited`
- Primary positioning:
  - `AI-first, logic-led`
  - `We build workflow systems where AI assists, and people stay in control.`
  - `Workflow-first delivery. Human-controlled automation.`
- Brand tone:
  - controlled
  - technical
  - operational
  - governance-aware
  - pragmatic rather than flashy
- Visual identity:
  - dark interface
  - bright cyan accent
  - translucent glassmorphism-style panels
  - network/data themed hero background
  - black-and-white logo with a circular mark combining stylized letters and a human profile silhouette

## Visual System

### Core Colors

These are the main CSS variables defined in `/Users/mauriciojardim/Innowebventures/src/styles/home.module.css`.

- Accent: `#0dcfdf`
- Deep teal: `#143747`
- Ink / near-black background: `#0a0d12`
- Muted text: `#5f6c75`
- Main text: `#edeff2`

### Supporting Color Usage

- Body background: `#05070b`
- Primary CTA gradient: accent cyan into lighter cyan
- Secondary surfaces: transparent dark overlays with cyan borders
- Success text: `#8ee8c7`
- Error text: `#ffb2b2`

### Typography

- Global font: `Inter`, then system sans-serif fallbacks
- Header brand text is uppercase, bold, tightly spaced
- Page language uses short, direct, consultancy-style copy

### Imagery / Atmosphere

- Desktop hero background: a dark blue network of glowing connected points and lines
- Mobile hero background: a vertical crop of the same network image
- Overlays:
  - cyan radial glow
  - muted gray radial glow
  - subtle dark gradient wash
  - very faint grid texture

## Global Layout

### Shared Shell

Every routed page uses the same site shell:

1. Fixed top navigation
2. Main content area
3. Footer

### Header

- Left:
  - logo image
  - brand text: `InnoWeb Ventures Ltd`
- Center desktop nav:
  - `Services`
  - `How We Build`
  - `About`
  - `Contact`
- Right:
  - CTA button: `Book a 20-min Build Review`
  - mobile hamburger menu on smaller screens

### Footer

- `InnoWeb Ventures Limited`
- `Workflow-first delivery. Human-controlled automation.`

### Shared Layout Patterns

- Large centered content container, max width about `1080px`
- Rounded, bordered cards on nearly every page
- Repeated section types:
  - intro panel
  - three-column card grid
  - two-column detail grid
  - full-width summary card
  - shared `Next step` section with three cards
- On mobile:
  - top nav collapses to menu
  - multi-column grids collapse to one column
  - hero text aligns left instead of centered

## Information Architecture

### Routed Pages

- `/` landing page
- `/products`
- `/products/:slug`
- `/services`
- `/services/:slug`
- `/work`
- `/work/:slug`
- `/how-we-build`
- `/about`
- `/contact`

### Routing Notes

- `/capabilities` redirects to `/how-we-build`
- unknown routes fall back to `/`
- `/products` and `/work` are live pages, but they are not present in the top header nav

## Shared Reusable Section

### `Next step`

This appears at the bottom of the main content on every routed page.

- Section title: `Next step`
- It always contains 3 linked cards
- Every card ends with the same CTA label: `Continue`

## Exact Page Content And Layout

## `/` Landing Page

### Layout Order

1. Full-height hero section
2. Trust chip row
3. `What we do` summary card
4. Three path cards
5. `Next step` section

### Hero

- Kicker: `AI-first, logic-led`
- H1: `We build workflow systems where AI assists, and people stay in control.`
- Subtitle: `Analog thinking. Digital execution. Human-in-the-loop by design.`
- Primary CTA: `Book a 20-min Build Review`
- Secondary CTA: `See what we do`

### Trust Chips

- `Human-in-the-loop governance`
- `Clear cost and scope ceilings`
- `Built for real-world operations`

### Summary Card

- Heading: `What we do`
- Body: `InnoWeb Ventures collaborates with partners across a broad range of professional services, including engineering, construction, civil delivery, commercial operations, and go-to-market functions, to build logic-based applications that automate workflow handoffs with AI assistance. We focus on practical systems that monitor, coordinate, and reduce manual workload while keeping critical decisions with humans.`

### Path Cards

- `Services`
  - `Start with a low-risk review, then prototype and build in controlled milestones.`
  - CTA: `See services`
- `Work`
  - `Browse delivery snapshots that show workflow challenge, build approach, and outcomes.`
  - CTA: `See case studies`
- `How We Build`
  - `Understand our human-in-control method and cost guardrails.`
  - CTA: `See method`

### Next Step Cards

- `Book a Build Review`
  - `Bring one workflow challenge. Leave with a practical next step.`
- `Compare Services`
  - `Choose a low-risk entry point from review to build.`
- `Review Case Studies`
  - `See how similar workflows were delivered.`

## `/products`

### Layout Order

1. Intro card
2. Product card grid
3. `Next step` section

### Intro

- Kicker: `Capabilities`
- H1: `Logic-based applications for workflow automation.`
- Body: `We build and integrate tailored systems that connect people, processes, and data, using AI where it helps and human oversight where it matters.`

### Product Cards

Each card includes:

- product name
- `Who it is for:`
- `What it does:`
- `Inputs/Outputs:`
- CTA: `View product`

#### Concordia

- Audience: `Infrastructure and delivery leaders handling high-volume contracts`
- Summary: `Concordia extracts obligations, milestones, and risk signals from contract packs so teams can decide faster.`
- Inputs/Outputs: `Inputs: contract PDFs, annexes, procurement notes. Outputs: obligation register, risk summary, action checklist.`

#### Catalog Cruncher

- Audience: `Operations teams managing supplier catalogues and internal part lists`
- Summary: `Catalog Cruncher standardises inconsistent catalogue records and recommends clean mappings for downstream systems.`
- Inputs/Outputs: `Inputs: CSV/Excel catalogues, ERP extracts. Outputs: normalised catalogue, match confidence report, exception queue.`

#### TAD

- Audience: `Trading and decision teams needing signal clarity`
- Summary: `TAD reduces noise in high-frequency information streams and highlights decision-ready signals with context.`
- Inputs/Outputs: `Inputs: market/event feeds, analyst notes. Outputs: prioritised signal board, trigger alerts, audit trail.`

#### Luxpulse-AI

- Audience: `Product and customer teams improving digital experience`
- Summary: `Luxpulse-AI identifies drop-off patterns and suggests workflow-level improvements for faster user outcomes.`
- Inputs/Outputs: `Inputs: product events, funnel metrics, support signals. Outputs: friction map, prioritised improvements, impact tracker.`

### Next Step Cards

- `Pick a Service`
  - `Match your chosen product to the right delivery option.`
- `See Work Proof`
  - `Review recent builds and delivery outcomes.`
- `Book Build Review`
  - `Discuss your use case in a 20-minute call.`

## `/products/:slug`

### Shared Layout Order

1. Breadcrumbs
2. Intro card
3. Two-column detail grid
4. Summary card with contact CTAs
5. Related products section
6. `Next step` section

### Shared Labels

- Breadcrumb root: `Products`
- Kicker: `Product detail`
- Section: `Key outcomes`
- Section: `How it works`
- Section: `Inputs and outputs`
- CTA: `Book a demo`
- CTA: `Book a 20-min Build Review`
- Related section heading: `Related products`

### Product Detail Copy

#### Concordia

- Summary: `Concordia extracts obligations, milestones, and risk signals from contract packs so teams can decide faster.`
- Key outcomes:
  - `Reduces contract review time across fragmented documents.`
  - `Surfaces hidden obligations before project kickoff.`
  - `Creates a traceable decision log for governance.`
- How it works:
  - `Upload contract pack and define project context.`
  - `Concordia maps clauses to obligations and risk levels.`
  - `Team reviews flagged actions and exports work-ready outputs.`
- Inputs and outputs: `Inputs: contract PDFs, annexes, procurement notes. Outputs: obligation register, risk summary, action checklist.`
- Related products:
  - `TAD`
  - `Catalog Cruncher`

#### Catalog Cruncher

- Summary: `Catalog Cruncher standardises inconsistent catalogue records and recommends clean mappings for downstream systems.`
- Key outcomes:
  - `Removes duplicate and conflicting item records.`
  - `Improves procurement search and pricing consistency.`
  - `Cuts manual reconciliation effort each cycle.`
- How it works:
  - `Ingest catalogue data and define target schema.`
  - `Model clusters duplicates and suggests canonical entries.`
  - `Ops approves exceptions and publishes a clean catalogue.`
- Inputs and outputs: `Inputs: CSV/Excel catalogues, ERP extracts. Outputs: normalised catalogue, match confidence report, exception queue.`
- Related products:
  - `Concordia`
  - `Luxpulse-AI`

#### TAD

- Summary: `TAD reduces noise in high-frequency information streams and highlights decision-ready signals with context.`
- Key outcomes:
  - `Improves decision speed without sacrificing control.`
  - `Creates a consistent signal triage process.`
  - `Provides traceability for post-event review.`
- How it works:
  - `Connect event feeds and define relevance rules.`
  - `TAD ranks signals against risk and confidence thresholds.`
  - `Team validates alerts and acts with full context.`
- Inputs and outputs: `Inputs: market/event feeds, analyst notes. Outputs: prioritised signal board, trigger alerts, audit trail.`
- Related products:
  - `Concordia`
  - `Luxpulse-AI`

#### Luxpulse-AI

- Summary: `Luxpulse-AI identifies drop-off patterns and suggests workflow-level improvements for faster user outcomes.`
- Key outcomes:
  - `Highlights the journeys causing avoidable friction.`
  - `Aligns teams on the highest-impact improvements first.`
  - `Tracks intervention impact against baseline metrics.`
- How it works:
  - `Connect usage and support data sources.`
  - `Luxpulse-AI maps friction points by segment and flow.`
  - `Teams ship targeted fixes and monitor outcome shifts.`
- Inputs and outputs: `Inputs: product events, funnel metrics, support signals. Outputs: friction map, prioritised improvements, impact tracker.`
- Related products:
  - `Catalog Cruncher`
  - `TAD`

### Not Found State

- H1: `Product not found`
- Body: `The requested product does not exist in this catalogue.`
- CTA: `Back to products`

### Next Step Cards

- `Choose Delivery Service`
  - `Select the engagement model for this product.`
- `Review Similar Work`
  - `See how similar builds performed in practice.`
- `Book Build Review`
  - `Get a scoped recommendation in 20 minutes.`

## `/services`

### Layout Order

1. Intro card
2. Services card grid
3. `Next step` section

### Intro

- Kicker: `Services`
- H1: `Low-risk delivery options from audit to optimisation.`
- Body: `Pick a service path based on certainty, speed, and integration scope.`

### Service Cards

Each card includes:

- service name
- `Timeline:`
- summary
- CTA: `View service`

#### Automation Audit

- Duration: `1 week`
- Summary: `A rapid diagnostic to identify automation opportunities, risk points, and the fastest path to measurable wins.`

#### Prototype Sprint

- Duration: `10 days`
- Summary: `A focused sprint to prove a workflow with a working prototype and a clear go/no-go decision.`

#### Build & Integrate

- Duration: `4-8 weeks`
- Summary: `Production delivery for validated workflows with integration into your existing tools, controls, and reporting.`

#### Support & Optimisation

- Duration: `Retainer`
- Summary: `Ongoing support to improve performance, cost efficiency, and operational reliability as your workflows evolve.`

### Next Step Cards

- `Match with Products`
  - `See which products fit your selected service path.`
- `See Delivery Proof`
  - `Review case studies before starting the engagement.`
- `Book Build Review`
  - `Validate scope and timeline in a short call.`

## `/services/:slug`

### Shared Layout Order

1. Breadcrumbs
2. Intro card
3. First two-column detail grid
4. Second two-column detail grid
5. Summary card
6. `Next step` section

### Shared Labels

- Breadcrumb root: `Services`
- Kicker: `Service detail`
- Section: `What you get`
- Section: `Typical timeline`
- Section: `What we need from you`
- Section: `Cost guardrails and checkpoints`
- Summary card heading: `Ready to scope this service?`
- Summary body: `We will align the workflow, timeline, and control checkpoints in a short working session.`
- CTA: `Book a 20-min Build Review`

### Service Detail Copy

#### Automation Audit

- Summary: `A rapid diagnostic to identify automation opportunities, risk points, and the fastest path to measurable wins.`
- What you get:
  - `Current-state workflow map`
  - `Opportunity and risk register`
  - `Prioritized 30-day action plan`
- Typical timeline:
  - `5 working days from kickoff to readout.`
  - Duration: `1 week`
- What we need from you: `Access to key process owners, sample workflow data, and one decision-maker for readouts.`
- Guardrails:
  - `Cost ceiling agreed before analysis starts.`
  - `Human sign-off gates on all recommended automations.`
  - `No production changes during audit week.`

#### Prototype Sprint

- Summary: `A focused sprint to prove a workflow with a working prototype and a clear go/no-go decision.`
- What you get:
  - `Working prototype for one priority workflow`
  - `Validation session with stakeholders`
  - `Delivery plan for production build`
- Typical timeline:
  - `10 working days, including demo and decision checkpoint.`
  - Duration: `10 days`
- What we need from you: `Single workflow owner, access to representative data, and 2-3 feedback touchpoints across the sprint.`
- Guardrails:
  - `Scope locked to one workflow to keep risk low.`
  - `Human-in-control review before demo release.`
  - `Explicit budget cap for prototype phase.`

#### Build & Integrate

- Summary: `Production delivery for validated workflows with integration into your existing tools, controls, and reporting.`
- What you get:
  - `Production-grade workflow system`
  - `Integration with existing stack`
  - `Operational handover and enablement`
- Typical timeline:
  - `Typically 4-8 weeks based on integration complexity.`
  - Duration: `4-8 weeks`
- What we need from you: `Access to target systems, technical counterpart, and weekly steering decisions.`
- Guardrails:
  - `Milestone-based releases with rollback paths.`
  - `Usage and cost telemetry from day one.`
  - `Approval checkpoints for governance and security.`

#### Support & Optimisation

- Summary: `Ongoing support to improve performance, cost efficiency, and operational reliability as your workflows evolve.`
- What you get:
  - `Monthly optimisation backlog`
  - `Performance and cost review cadence`
  - `Issue response and incremental enhancements`
- Typical timeline:
  - `Rolling monthly cycles with agreed service windows.`
  - Duration: `Retainer`
- What we need from you: `Named owner for priorities, shared KPI targets, and a monthly review session.`
- Guardrails:
  - `Cost thresholds monitored continuously.`
  - `Operational changes reviewed with human checkpointing.`
  - `Security and governance controls revalidated each cycle.`

### Not Found State

- H1: `Service not found`
- Body: `The requested service page is not available.`
- CTA: `Back to services`

### Next Step Cards

- `Browse Products`
  - `Pair this service with the right product capability.`
- `See Case Studies`
  - `Review delivery examples before you commit.`
- `Contact Team`
  - `Start with a clear scope and next action plan.`

## `/work`

### Layout Order

1. Intro card
2. Case study card grid
3. `Next step` section

### Intro

- Kicker: `Case studies`
- H1: `Proof-focused delivery snapshots.`
- Body: `Scan each build by problem, implementation approach, and outcome.`

### Case Study Cards

Each card includes:

- case study name
- `Problem:`
- `Build:`
- `Result:`
- CTA: `Read case study`

#### Concordia for Infrastructure Delivery

- Problem: `Contract obligations were scattered across large document packs.`
- Build: `Obligation extraction and risk flagging workflow with review checkpoints.`
- Result: `Faster readiness reviews with a single action register.`

#### TAD Signal Operations

- Problem: `Decision teams were overwhelmed by high-noise event streams.`
- Build: `Signal ranking pipeline with confidence and risk thresholds.`
- Result: `Cleaner triage and more consistent actioning.`

#### Luxpulse-AI Experience Loop

- Problem: `Product teams lacked a shared view of friction across key journeys.`
- Build: `Friction mapping and recommendation flow linked to outcome tracking.`
- Result: `Prioritized improvements tied to measurable shifts.`

### Next Step Cards

- `Explore Products`
  - `See the apps behind these delivery outcomes.`
- `Review Services`
  - `Choose a delivery model that matches your starting point.`
- `Discuss Your Build`
  - `Bring your use case and leave with clear next actions.`

## `/work/:slug`

### Shared Layout Order

1. Breadcrumbs
2. Intro card
3. Two-column detail grid
4. Screenshot section
5. Summary card
6. `Next step` section

### Shared Labels

- Breadcrumb root: `Work`
- Kicker: `Case study`
- Section: `What was built`
- Section: `Measurable value`
- Section: `Screenshots`
- Summary heading: `Need a similar outcome?`
- Summary body: `We can scope a comparable build and define a low-risk start plan in one short session.`
- CTA: `Discuss a similar build`

### Case Study Detail Copy

#### Concordia for Infrastructure Delivery

- Context: `A delivery team needed to reduce late surprises in contract-heavy programmes while preserving governance control.`
- What was built:
  - `Clause classification pipeline for obligation mapping`
  - `Risk scoring model with human review queue`
  - `Export-ready checklist for delivery teams`
- Measurable value:
  - `Placeholder: 25-35% reduction in initial contract review cycle time`
  - `Placeholder: improved obligation traceability across programme teams`
  - `Placeholder: faster escalation on high-risk clauses`
- Screenshot captions:
  - `Obligation dashboard`
  - `Risk review queue`

#### TAD Signal Operations

- Context: `A fast-moving operations function needed a repeatable way to separate high-value signals from routine noise.`
- What was built:
  - `Ingestion from event and note feeds`
  - `Priority scoring tuned to operational thresholds`
  - `Action board with full audit trail`
- Measurable value:
  - `Placeholder: 30% faster triage during peak periods`
  - `Placeholder: improved consistency in signal handling decisions`
  - `Placeholder: reduced manual escalation churn`
- Screenshot captions:
  - `Signal board`
  - `Event detail`

#### Luxpulse-AI Experience Loop

- Context: `A growth-stage product team wanted to target interventions where customer friction had the highest impact.`
- What was built:
  - `Journey-level friction detection`
  - `Recommendation scoring based on impact potential`
  - `Outcome tracker for shipped improvements`
- Measurable value:
  - `Placeholder: 15-20% improvement in target funnel completion`
  - `Placeholder: faster prioritisation of UX improvements`
  - `Placeholder: clearer alignment across product and ops teams`
- Screenshot captions:
  - `Friction map`
  - `Impact tracker`

### Not Found State

- H1: `Case study not found`
- Body: `The requested case study does not exist.`
- CTA: `Back to work`

### Next Step Cards

- `See Products`
  - `Review the product capabilities used in these projects.`
- `Compare Services`
  - `Choose the most suitable engagement route.`
- `Book Build Review`
  - `Align scope, timeline, and budget guardrails.`

## `/how-we-build`

### Layout Order

1. Intro card
2. Four-pillar card grid
3. Delivery phases summary card
4. `Next step` section

### Intro

- Kicker: `How we build`
- H1: `A short, controlled delivery model designed for clarity.`
- Body: `We optimize for workflow value, governance, and predictable cost boundaries.`

### Pillars

- `Workflow-first`
  - `We map decisions and handoffs first, then choose tooling.`
- `Human-in-control loop`
  - `Critical actions always include review and override controls.`
- `Cost ceilings built-in`
  - `Budgets are treated as product constraints, not afterthoughts.`
- `Security & governance`
  - `Controls and traceability are part of the architecture from day one.`

### Delivery Phases Card

- Heading: `Delivery phases`
- Phase chips:
  - `Discover`
  - `Prototype`
  - `Build`
  - `Support`

### Next Step Cards

- `Start with Services`
  - `Pick a delivery option that matches your readiness.`
- `See Work Examples`
  - `Review how the method performs in real builds.`
- `Book Build Review`
  - `Get a practical recommendation for your workflow.`

## `/about`

### Layout Order

1. Intro card
2. Two-column detail grid
3. `Next step` section

### Intro

- Kicker: `About`
- H1: `InnoWeb Ventures Limited`
- Body: `We are a UK-led delivery collective working with partners across a broad range of professional services, from engineering and construction to commercial and go-to-market teams, to build practical AI-assisted automation systems for real operational workflows.`

### Detail Cards

#### Our story

- `We started InnoWeb Ventures to close the gap between ambitious digital strategy and day-to-day execution. Our model combines focused product capability with delivery services that keep risk low and momentum high.`

#### Principles

- `Ship useful systems quickly, then improve in controlled cycles.`
- `Design for operators, not just dashboards.`
- `Treat cost, security, and governance as first-class constraints.`

### Next Step Cards

- `See Products`
  - `Understand what we have already built and deployed.`
- `Review Services`
  - `Choose your preferred delivery entry point.`
- `Contact InnoWeb`
  - `Start a direct conversation about your workflow goals.`

## `/contact`

### Layout Order

1. Intro card
2. Booking summary card
3. Two-column detail grid
4. `Next step` section

### Intro

- Kicker: `Contact`
- H1: `Book a 20-min Build Review`
- Body: `Bring one workflow challenge. We will map a practical low-risk next step.`

### Booking Summary Card

- Heading: `Booking`
- Body: `Use the quick form below to send your enquiry through our secure server-side contact endpoint and save it in our linked Azure storage account.`
- CTA: `Start quick form`

### Left Card: Quick Form

- Heading: `Quick form`
- Body: `Submissions are delivered to our team securely and logged to Azure Table Storage for traceability.`
- Field labels:
  - `Name`
  - `Email`
  - `Telephone number`
  - `Company`
  - `What are you trying to improve?`
- Submit button default: `Send enquiry`
- Submit button loading: `Sending...`
- Success message fallback: `Thanks. Your enquiry was sent successfully and we will reply soon.`
- Error message fallback: `We could not send your enquiry right now. Please try again in a moment.`

### Right Card: What Happens Next

- Heading: `What happens next`
- Steps:
  - `We confirm goals and current constraints.`
  - `We suggest the most suitable entry service.`
  - `We define timeline, guardrails, and first milestone.`
- CTA: `See how we build`

### Next Step Cards

- `Browse Products`
  - `Review product options before the call.`
- `Review Services`
  - `Select the service track you want to discuss.`
- `Read Case Studies`
  - `See outcome examples relevant to your challenge.`

## Interaction Notes

- Header CTA always pushes toward booking a `20-min Build Review`
- Many internal pages end in a conversion card and then a `Next step` section
- The entire site is built around three recurring themes:
  - AI as assistance, not replacement
  - human control and governance
  - low-risk, staged delivery

## Concise Brand Interpretation

If another model needs the shortest possible framing:

`InnoWeb Ventures is presented as a dark, modern, AI-and-operations consultancy brand. The website emphasizes workflow automation, human oversight, cost guardrails, and staged delivery. Visually it combines a black/navy background, bright cyan accents, glassy bordered cards, and network-style imagery. Structurally the site is a simple brochure/funnel: landing page -> products/services/work proof -> contact conversion.`
