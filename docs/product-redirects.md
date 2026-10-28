# Product URL consolidation

The six legacy /products/{slug} addresses permanently redirect with HTTP 301 to
/forge-suite/{slug}. The exact redirect routes are declared in src/App.tsx.
scripts/build-routing.mjs copies those finite React Navigate routes into Azure's
HTTP routing configuration during the build. Unknown product slugs still return
the real 404 page; no broad wildcard redirect or SPA fallback is used.

The sitemap and llms.txt list the primary Forge Suite pages. Redirect aliases
have been removed from pageMetadata.json. Every remaining public page must have
a unique title and meta description; build and live deployment checks enforce it.
The existing Forge Suite content, design, canonical and social tags are unchanged.

The unrelated bare-domain DNS issue cannot be repaired by repository code.
It requires the domain registrar and Azure custom-domain settings. Validate the
apex domain and its certificate, configure its actual Azure DNS target, set www
as the default domain, and verify HTTP 301 with preserved paths and queries.
Never guess the Azure stableInboundIP or alter working mail/MX records.
