# Editorial evidence and publishing checklist

Applies to future articles, revisions and case studies. Company attribution is InnoWeb Ventures. Do not publish the owner's personal name.

## Before drafting each post

Obtain three to five bullets from the user covering:

- What was actually built or tested, its scope and development/deployment status.
- Any measured figures, including the baseline, sample, period, method and limitations. Leave figures out when unavailable.
- What went wrong or remained unresolved, and what changed in response.
- The user's opinion or lesson, clearly distinguished from an observed result.
- Relevant tools or operating constraints, only when confirmed and appropriate to publish.

These are prompts, not completed experience notes. Do not invent first-hand experience to fill the list. Do not turn company aspirations, generic guidance or a hypothetical scenario into a client story. New first-hand claims wait for confirmed user notes.

## Claims and sources

- Select two to four primary sources relevant to that particular article. Prefer official UK guidance, regulators, research papers and official vendor documentation.
- Open the exact URL to be cited and read the passage that supports the claim. A search snippet or a working HTTP status alone is insufficient.
- Record the URL, checked date, supported topic and limitations. Recheck changing guidance at the next substantive revision.
- Remove unsupported statistics, quotes, purported events and client examples. A source's outcome is not an InnoWeb outcome.
- Distinguish predictions, ethical arguments and company recommendations from established facts. Do not promise savings, model quality, privacy or employment outcomes without relevant evidence.
- Cite the actual provider's documentation for token accounting; do not invent prices, parameter counts or benchmark results.

## Case studies and privacy

- Use confirmed project facts only. Separate development work from completed deployments and measured results.
- Require written permission before publishing a client name, quotation or screenshot. Inspect approved screenshots for personal data, commercial information, credentials and identifying context.
- If approved screenshots are unavailable, do not publish substitute images as screenshots. Branding and decorative artwork must not imply project evidence.
- Each case study links to a relevant service and the corresponding application/product overview. The overview links back. A public application URL must be supplied and checked; do not invent one.
- Maintain `src/content/caseStudyEvidence.json`. Approved identities, quotes, screenshots and outcomes need explicit evidence.

## Before release

- Confirm the company byline, true updated date and FAQ are visible in the rendered article, with matching Article/FAQ structured data.
- Keep original publication dates, scheduled visibility and established URLs unless the user asks to change them. An editorial review date records the real review, not fabricated recency.
- Check every external reference and contextual internal link. Confirm app overview fragments resolve.
- Run `npm run build` and `npm run test:editorial`, then inspect the live page after deployment.

## Review on 22 November 2026

- One published case study: anonymous coffee-equipment management, in development. No client name, client quote, client screenshots or verified outcome figures are approved for publication.
- The case links to Platform Discovery and an anchored application overview on Applications. No public demo URL is claimed.
- Thirty existing articles have source records, visible company attribution, the actual review date and FAQs. Unsupported percentage wording, invented scenarios and unconfirmed personal-experience wording were revised.
- `src/content/articleEvidence.json` records the opened primary sources, limitations and article-specific reference selection. The ICO page marks its guidance as under review; the chatbot study does not establish a general wellbeing benefit.
- User-confirmed first-hand preparation notes have not been supplied for these articles. The published text is company perspective and guidance; no new first-hand results have been invented.
