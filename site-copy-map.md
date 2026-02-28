# Site Copy Map (Exact Text)

This document lists the exact user-facing text in the live routed pages defined in `/Users/mauriciojardim/Innowebventures/src/App.tsx`.

## Live Route Flow

- `/` -> `/products`, `/services`, `/work`, `/contact`
- `/products` -> `/products/:slug`, `/services`, `/work`, `/contact`
- `/products/:slug` -> `/services`, `/work`, `/contact`, `/contact?intent=demo`, `/contact?intent=build-review`
- `/services` -> `/services/:slug`, `/products`, `/work`, `/contact`
- `/services/:slug` -> `/products`, `/work`, `/contact`, `/contact?intent=build-review`
- `/work` -> `/work/:slug`, `/products`, `/services`, `/contact`
- `/work/:slug` -> `/products`, `/services`, `/contact`, `/contact?intent=similar-build`
- `/how-we-build` -> `/services`, `/work`, `/contact`
- `/about` -> `/products`, `/services`, `/contact`
- `/contact` -> `/products`, `/services`, `/work`
- `/capabilities` -> redirect to `/how-we-build`
- `*` -> `/`

## Global Shell Copy (All Routed Pages)

### Header

- Brand text: `InnoWeb Ventures Ltd`
- Logo alt text: `InnoWeb Ventures logo`
- Nav labels:
- `Services`
- `How We Build`
- `About`
- `Contact`
- Header CTA: `Book a 20-min Build Review`
- Mobile menu button aria-label: `Open navigation`
- Mobile menu CTA: `Book a 20-min Build Review`

### Footer

- `InnoWeb Ventures Limited`
- `Workflow-first delivery. Human-controlled automation.`

### Shared NextSteps Component

- Default section title: `Next step`
- Card CTA text on every NextSteps card: `Continue`

## Route: `/` (Landing)

### Hero

- Kicker: `AI-first, logic-led`
- H1: `We build workflow systems where AI assists, and people stay in control.`
- Subtitle: `Analog thinking. Digital execution. Human-in-the-loop by design.`
- CTA: `Book a 20-min Build Review` -> `/contact`
- CTA: `See what we do` -> `/services`

### Trust Chips

- `Human-in-the-loop governance`
- `Clear cost and scope ceilings`
- `Built for real-world operations`

### What We Do

- Heading: `What we do`
- Body: `InnoWeb Ventures collaborates with partners across a broad range of professional services, including engineering, construction, civil delivery, commercial operations, and go-to-market functions, to build logic-based applications that automate workflow handoffs with AI assistance. We focus on practical systems that monitor, coordinate, and reduce manual workload while keeping critical decisions with humans.`

### Path Cards

- Title: `Services`
- Description: `Start with a low-risk review, then prototype and build in controlled milestones.`
- CTA: `See services` -> `/services`
- Title: `Work`
- Description: `Browse delivery snapshots that show workflow challenge, build approach, and outcomes.`
- CTA: `See case studies` -> `/work`
- Title: `How We Build`
- Description: `Understand our human-in-control method and cost guardrails.`
- CTA: `See method` -> `/how-we-build`

### Next Step Cards

- `Book a Build Review` -> `Bring one workflow challenge. Leave with a practical next step.` -> `/contact`
- `Compare Services` -> `Choose a low-risk entry point from review to build.` -> `/services`
- `Review Case Studies` -> `See how similar workflows were delivered.` -> `/work`

## Route: `/products`

### Intro

- Kicker: `Capabilities`
- H1: `Logic-based applications for workflow automation.`
- Body: `We build and integrate tailored systems that connect people, processes, and data, using AI where it helps and human oversight where it matters.`

### Product Card Labels

- `Who it is for:`
- `What it does:`
- `Inputs/Outputs:`
- Card CTA: `View product`

### Product Cards (Exact Dynamic Text)

#### Concordia (`/products/concordia`)

- Name: `Concordia`
- Who it is for: `Infrastructure and delivery leaders handling high-volume contracts`
- What it does: `Concordia extracts obligations, milestones, and risk signals from contract packs so teams can decide faster.`
- Inputs/Outputs: `Inputs: contract PDFs, annexes, procurement notes. Outputs: obligation register, risk summary, action checklist.`

#### Catalog Cruncher (`/products/catalog-cruncher`)

- Name: `Catalog Cruncher`
- Who it is for: `Operations teams managing supplier catalogues and internal part lists`
- What it does: `Catalog Cruncher standardises inconsistent catalogue records and recommends clean mappings for downstream systems.`
- Inputs/Outputs: `Inputs: CSV/Excel catalogues, ERP extracts. Outputs: normalised catalogue, match confidence report, exception queue.`

#### TAD (`/products/tad`)

- Name: `TAD`
- Who it is for: `Trading and decision teams needing signal clarity`
- What it does: `TAD reduces noise in high-frequency information streams and highlights decision-ready signals with context.`
- Inputs/Outputs: `Inputs: market/event feeds, analyst notes. Outputs: prioritised signal board, trigger alerts, audit trail.`

#### Luxpulse-AI (`/products/luxpulse-ai`)

- Name: `Luxpulse-AI`
- Who it is for: `Product and customer teams improving digital experience`
- What it does: `Luxpulse-AI identifies drop-off patterns and suggests workflow-level improvements for faster user outcomes.`
- Inputs/Outputs: `Inputs: product events, funnel metrics, support signals. Outputs: friction map, prioritised improvements, impact tracker.`

### Next Step Cards

- `Pick a Service` -> `Match your chosen product to the right delivery option.` -> `/services`
- `See Work Proof` -> `Review recent builds and delivery outcomes.` -> `/work`
- `Book Build Review` -> `Discuss your use case in a 20-minute call.` -> `/contact`

## Route Template: `/products/:slug`

### If Product Exists

- Breadcrumb root label: `Products`
- Kicker: `Product detail`
- H2: `Key outcomes`
- H2: `How it works`
- H2: `Inputs and outputs`
- CTA: `Book a demo` -> `/contact?intent=demo`
- CTA: `Book a 20-min Build Review` -> `/contact?intent=build-review`
- Section heading: `Related products`

### Product Detail Dynamic Text by Slug

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
- Related products: `TAD`, `Catalog Cruncher`

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
- Related products: `Concordia`, `Luxpulse-AI`

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
- Related products: `Concordia`, `Luxpulse-AI`

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
- Related products: `Catalog Cruncher`, `TAD`

### If Product Not Found

- H1: `Product not found`
- Body: `The requested product does not exist in this catalogue.`
- CTA: `Back to products`

### Next Step Cards

- `Choose Delivery Service` -> `Select the engagement model for this product.` -> `/services`
- `Review Similar Work` -> `See how similar builds performed in practice.` -> `/work`
- `Book Build Review` -> `Get a scoped recommendation in 20 minutes.` -> `/contact`

## Route: `/services`

### Intro

- Kicker: `Services`
- H1: `Low-risk delivery options from audit to optimisation.`
- Body: `Pick a service path based on certainty, speed, and integration scope.`

### Service Card Labels

- `Timeline:`
- Card CTA: `View service`

### Service Cards (Exact Dynamic Text)

#### Automation Audit (`/services/automation-audit`)

- Name: `Automation Audit`
- Timeline label value: `1 week`
- Summary: `A rapid diagnostic to identify automation opportunities, risk points, and the fastest path to measurable wins.`

#### Prototype Sprint (`/services/prototype-sprint`)

- Name: `Prototype Sprint`
- Timeline label value: `10 days`
- Summary: `A focused sprint to prove a workflow with a working prototype and a clear go/no-go decision.`

#### Build & Integrate (`/services/build-integrate`)

- Name: `Build & Integrate`
- Timeline label value: `4-8 weeks`
- Summary: `Production delivery for validated workflows with integration into your existing tools, controls, and reporting.`

#### Support & Optimisation (`/services/support-optimisation`)

- Name: `Support & Optimisation`
- Timeline label value: `Retainer`
- Summary: `Ongoing support to improve performance, cost efficiency, and operational reliability as your workflows evolve.`

### Next Step Cards

- `Match with Products` -> `See which products fit your selected service path.` -> `/products`
- `See Delivery Proof` -> `Review case studies before starting the engagement.` -> `/work`
- `Book Build Review` -> `Validate scope and timeline in a short call.` -> `/contact`

## Route Template: `/services/:slug`

### If Service Exists

- Breadcrumb root label: `Services`
- Kicker: `Service detail`
- H2: `What you get`
- H2: `Typical timeline`
- Label: `Duration:`
- H2: `What we need from you`
- H2: `Cost guardrails and checkpoints`
- Summary section H2: `Ready to scope this service?`
- Summary body: `We will align the workflow, timeline, and control checkpoints in a short working session.`
- CTA: `Book a 20-min Build Review` -> `/contact?intent=build-review`

### Service Detail Dynamic Text by Slug

#### Automation Audit

- Summary: `A rapid diagnostic to identify automation opportunities, risk points, and the fastest path to measurable wins.`
- What you get:
- `Current-state workflow map`
- `Opportunity and risk register`
- `Prioritized 30-day action plan`
- Typical timeline: `5 working days from kickoff to readout.`
- Duration: `1 week`
- What we need from you: `Access to key process owners, sample workflow data, and one decision-maker for readouts.`
- Cost guardrails and checkpoints:
- `Cost ceiling agreed before analysis starts.`
- `Human sign-off gates on all recommended automations.`
- `No production changes during audit week.`

#### Prototype Sprint

- Summary: `A focused sprint to prove a workflow with a working prototype and a clear go/no-go decision.`
- What you get:
- `Working prototype for one priority workflow`
- `Validation session with stakeholders`
- `Delivery plan for production build`
- Typical timeline: `10 working days, including demo and decision checkpoint.`
- Duration: `10 days`
- What we need from you: `Single workflow owner, access to representative data, and 2-3 feedback touchpoints across the sprint.`
- Cost guardrails and checkpoints:
- `Scope locked to one workflow to keep risk low.`
- `Human-in-control review before demo release.`
- `Explicit budget cap for prototype phase.`

#### Build & Integrate

- Summary: `Production delivery for validated workflows with integration into your existing tools, controls, and reporting.`
- What you get:
- `Production-grade workflow system`
- `Integration with existing stack`
- `Operational handover and enablement`
- Typical timeline: `Typically 4-8 weeks based on integration complexity.`
- Duration: `4-8 weeks`
- What we need from you: `Access to target systems, technical counterpart, and weekly steering decisions.`
- Cost guardrails and checkpoints:
- `Milestone-based releases with rollback paths.`
- `Usage and cost telemetry from day one.`
- `Approval checkpoints for governance and security.`

#### Support & Optimisation

- Summary: `Ongoing support to improve performance, cost efficiency, and operational reliability as your workflows evolve.`
- What you get:
- `Monthly optimisation backlog`
- `Performance and cost review cadence`
- `Issue response and incremental enhancements`
- Typical timeline: `Rolling monthly cycles with agreed service windows.`
- Duration: `Retainer`
- What we need from you: `Named owner for priorities, shared KPI targets, and a monthly review session.`
- Cost guardrails and checkpoints:
- `Cost thresholds monitored continuously.`
- `Operational changes reviewed with human checkpointing.`
- `Security and governance controls revalidated each cycle.`

### If Service Not Found

- H1: `Service not found`
- Body: `The requested service page is not available.`
- CTA: `Back to services`

### Next Step Cards

- `Browse Products` -> `Pair this service with the right product capability.` -> `/products`
- `See Case Studies` -> `Review delivery examples before you commit.` -> `/work`
- `Contact Team` -> `Start with a clear scope and next action plan.` -> `/contact`

## Route: `/work`

### Intro

- Kicker: `Case studies`
- H1: `Proof-focused delivery snapshots.`
- Body: `Scan each build by problem, implementation approach, and outcome.`

### Case Study Card Labels

- `Problem:`
- `Build:`
- `Result:`
- Card CTA: `Read case study`

### Case Study Cards (Exact Dynamic Text)

#### Concordia for Infrastructure Delivery (`/work/concordia-infrastructure`)

- Problem: `Contract obligations were scattered across large document packs.`
- Build: `Obligation extraction and risk flagging workflow with review checkpoints.`
- Result: `Faster readiness reviews with a single action register.`

#### TAD Signal Operations (`/work/tad-signal-ops`)

- Problem: `Decision teams were overwhelmed by high-noise event streams.`
- Build: `Signal ranking pipeline with confidence and risk thresholds.`
- Result: `Cleaner triage and more consistent actioning.`

#### Luxpulse-AI Experience Loop (`/work/luxpulse-experience-loop`)

- Problem: `Product teams lacked a shared view of friction across key journeys.`
- Build: `Friction mapping and recommendation flow linked to outcome tracking.`
- Result: `Prioritized improvements tied to measurable shifts.`

### Next Step Cards

- `Explore Products` -> `See the apps behind these delivery outcomes.` -> `/products`
- `Review Services` -> `Choose a delivery model that matches your starting point.` -> `/services`
- `Discuss Your Build` -> `Bring your use case and leave with clear next actions.` -> `/contact`

## Route Template: `/work/:slug`

### If Case Study Exists

- Breadcrumb root label: `Work`
- Kicker: `Case study`
- H2: `What was built`
- H2: `Measurable value`
- H2: `Screenshots`
- Summary section H2: `Need a similar outcome?`
- Summary body: `We can scope a comparable build and define a low-risk start plan in one short session.`
- CTA: `Discuss a similar build` -> `/contact?intent=similar-build`

### Case Study Detail Dynamic Text by Slug

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

### If Case Study Not Found

- H1: `Case study not found`
- Body: `The requested case study does not exist.`
- CTA: `Back to work`

### Next Step Cards

- `See Products` -> `Review the product capabilities used in these projects.` -> `/products`
- `Compare Services` -> `Choose the most suitable engagement route.` -> `/services`
- `Book Build Review` -> `Align scope, timeline, and budget guardrails.` -> `/contact`

## Route: `/how-we-build`

### Intro

- Kicker: `How we build`
- H1: `A short, controlled delivery model designed for clarity.`
- Body: `We optimize for workflow value, governance, and predictable cost boundaries.`

### Pillars

- `Workflow-first` -> `We map decisions and handoffs first, then choose tooling.`
- `Human-in-control loop` -> `Critical actions always include review and override controls.`
- `Cost ceilings built-in` -> `Budgets are treated as product constraints, not afterthoughts.`
- `Security & governance` -> `Controls and traceability are part of the architecture from day one.`

### Delivery Phases

- Heading: `Delivery phases`
- Chips:
- `Discover`
- `Prototype`
- `Build`
- `Support`

### Next Step Cards

- `Start with Services` -> `Pick a delivery option that matches your readiness.` -> `/services`
- `See Work Examples` -> `Review how the method performs in real builds.` -> `/work`
- `Book Build Review` -> `Get a practical recommendation for your workflow.` -> `/contact`

## Route: `/about`

### Intro

- Kicker: `About`
- H1: `InnoWeb Ventures Limited`
- Body: `We are a UK-led delivery collective working with partners across a broad range of professional services, from engineering and construction to commercial and go-to-market teams, to build practical AI-assisted automation systems for real operational workflows.`

### Our Story

- Heading: `Our story`
- Body: `We started InnoWeb Ventures to close the gap between ambitious digital strategy and day-to-day execution. Our model combines focused product capability with delivery services that keep risk low and momentum high.`

### Principles

- Heading: `Principles`
- `Ship useful systems quickly, then improve in controlled cycles.`
- `Design for operators, not just dashboards.`
- `Treat cost, security, and governance as first-class constraints.`

### Next Step Cards

- `See Products` -> `Understand what we have already built and deployed.` -> `/products`
- `Review Services` -> `Choose your preferred delivery entry point.` -> `/services`
- `Contact InnoWeb` -> `Start a direct conversation about your workflow goals.` -> `/contact`

## Route: `/contact`

### Intro

- Kicker: `Contact`
- H1: `Book a 20-min Build Review`
- Body: `Bring one workflow challenge. We will map a practical low-risk next step.`

### Booking Card

- Heading: `Booking`
- Body: `Use the quick form below to schedule the review directly with our team.`
- CTA: `Start quick form`

### Form Card

- Heading: `Quick form`
- Field label: `Name`
- Field label: `Email`
- Field label: `Company`
- Field label: `What are you trying to improve?`
- Submit button default: `Send enquiry`
- Submit button loading: `Sending...`
- Success message: `Thanks. Your enquiry was sent successfully and we will reply soon.`
- Error message fallback: `We could not send your enquiry right now. Please try again in a moment.`
- Error message with provider response prefix: `We could not send your enquiry right now: `

### What Happens Next Card

- Heading: `What happens next`
- `We confirm goals and current constraints.`
- `We suggest the most suitable entry service.`
- `We define timeline, guardrails, and first milestone.`
- CTA: `See how we build` -> `/how-we-build`

### Next Step Cards

- `Browse Products` -> `Review product options before the call.` -> `/products`
- `Review Services` -> `Select the service track you want to discuss.` -> `/services`
- `Read Case Studies` -> `See outcome examples relevant to your challenge.` -> `/work`

## Redirect and Fallback Routes

### `/capabilities`

- Redirect target: `/how-we-build`

### `*` (Unknown Route)

- Renders the same page and text as `/` (Landing).

## Notes on Non-Routed Page Files

These files contain copy but are not currently mounted by routes in `/Users/mauriciojardim/Innowebventures/src/App.tsx`:

- `/Users/mauriciojardim/Innowebventures/src/pages/Home.tsx`
- `/Users/mauriciojardim/Innowebventures/src/pages/Login.tsx`
- `/Users/mauriciojardim/Innowebventures/src/pages/Capabilities.tsx` (standalone component; app uses inline redirect route)
