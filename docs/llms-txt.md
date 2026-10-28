# llms.txt

The public file is https://www.innowebventures.com/llms.txt.
It is plain UTF-8 Markdown, served as text/plain, with fewer than 150 lines.

scripts/build-llms.mjs controls the summary, section grouping, exclusions and
priority article order. It runs automatically inside npm run build.
Page links come from the generated sitemap; one-line descriptions come from
the approved page metadata. Product names and publication dates are discovered
from content records. Live application links and descriptions come from Work.tsx.
Existing /products/* aliases are omitted in favour of /forge-suite/*.

Every new public sitemap page with metadata is picked up on the next deployment.
Articles with future publication dates are excluded until that date.
The GitHub Azure deployment workflow also runs daily at 00:17 UTC, so scheduled
articles enter this file and the static blog listing without a manual edit.
GitHub may delay scheduled runs. Scheduled workflows in inactive public
repositories can be disabled by GitHub after 60 days without repository activity.

The build fails rather than publishing a file of 150 lines or more; if the
site grows that far, review the article selection in build-llms.mjs.
npm run test:llms checks publication boundaries, new-page discovery, formatting,
known links and length. The deployment checks the live file's content type and
exact contents. No paid service or hosting plan upgrade is involved.
