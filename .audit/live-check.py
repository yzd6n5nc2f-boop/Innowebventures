import concurrent.futures
import datetime
import html
from html.parser import HTMLParser
import json
import re
import socket
import urllib.error
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from collections import defaultdict

ORIGIN = "https://www.innowebventures.com"
class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        return None

opener = urllib.request.build_opener(NoRedirect())
def get(url):
    request = urllib.request.Request(url, headers={"User-Agent": "InnoWeb-Public-HTML-Audit/1.0", "Cache-Control": "no-cache"})
    try:
        response = opener.open(request, timeout=25)
    except urllib.error.HTTPError as error:
        response = error
    except Exception as error:
        return {"url": url, "status": None, "error": str(error), "body": "", "content_type": ""}
    with response:
        return {"url": url, "status": response.code, "content_type": response.headers.get("Content-Type", ""),
                "location": response.headers.get("Location"), "body": response.read().decode("utf-8", "replace")}

class RawHTML(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.in_head = False
        self.in_main = False
        self.in_title = False
        self.h1_depth = 0
        self.script = None
        self.ignored = 0
        self.titles = []
        self.title_parts = []
        self.descriptions = []
        self.canonicals = []
        self.og = defaultdict(list)
        self.h1s = []
        self.h1_parts = []
        self.heading_count = 0
        self.text = []
        self.paragraph_count = 0
        self.links = []
        self.jsonld = []
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "head": self.in_head = True
        if tag == "main": self.in_main = True
        if tag == "title":
            self.in_title = True
            self.title_parts = []
        if tag == "meta":
            if attrs.get("name", "").lower() == "description": self.descriptions.append(attrs.get("content"))
            if attrs.get("property", "").startswith("og:"): self.og[attrs["property"]].append(attrs.get("content"))
        if tag == "link" and attrs.get("rel") == "canonical": self.canonicals.append(attrs.get("href"))
        if tag == "script":
            self.ignored += 1
            if attrs.get("type") == "application/ld+json": self.script = {"in_head": self.in_head, "parts": []}
        if tag == "style": self.ignored += 1
        if tag == "h1":
            self.h1_depth += 1
            self.h1_parts = []
        if self.in_main and tag in ["h1","h2","h3","h4","h5","h6"]: self.heading_count += 1
        if self.in_main and tag == "p": self.paragraph_count += 1
        if tag == "a" and attrs.get("href"): self.links.append(attrs["href"])
    def handle_endtag(self, tag):
        if tag == "head": self.in_head = False
        if tag == "main": self.in_main = False
        if tag == "title":
            self.in_title = False
            self.titles.append("".join(self.title_parts).strip())
        if tag == "h1":
            self.h1_depth = max(0, self.h1_depth - 1)
            self.h1s.append(re.sub(r"\s+", " ", "".join(self.h1_parts)).strip())
        if tag == "script":
            if self.script is not None:
                try:
                    self.jsonld.append({"in_head": self.script["in_head"], "data": json.loads("".join(self.script["parts"]))})
                except Exception as error: self.jsonld.append({"error": str(error)})
                self.script = None
            self.ignored = max(0, self.ignored - 1)
        if tag == "style": self.ignored = max(0, self.ignored - 1)
    def handle_data(self, data):
        if self.in_title: self.title_parts.append(data)
        if self.script is not None: self.script["parts"].append(data)
        if self.h1_depth and not self.ignored: self.h1_parts.append(data)
        if self.in_main and not self.ignored: self.text.append(data)

def parse_page(response):
    parser = RawHTML()
    parser.feed(response["body"])
    internal_links = [urllib.parse.urljoin(response["url"], href) for href in parser.links
                      if urllib.parse.urlparse(urllib.parse.urljoin(response["url"], href)).netloc == "www.innowebventures.com"]
    return {
        "url": response["url"], "status": response["status"], "error": response.get("error"),
        "content_type": response["content_type"], "titles": parser.titles, "descriptions": parser.descriptions,
        "canonicals": parser.canonicals, "og": dict(parser.og), "h1": parser.h1s,
        "heading_count": parser.heading_count, "paragraph_count": parser.paragraph_count,
        "main_text_characters": len(re.sub(r"\s+", " ", " ".join(parser.text)).strip()),
        "internal_links": len(internal_links), "jsonld": parser.jsonld,
    }

result = {"checked_at": datetime.datetime.now(datetime.timezone.utc).isoformat()}
sitemap = get(ORIGIN + "/sitemap.xml")
try:
    root = ET.fromstring(sitemap["body"])
    locations = [node.text for node in root.findall("{http://www.sitemaps.org/schemas/sitemap/0.9}url/{http://www.sitemaps.org/schemas/sitemap/0.9}loc")]
    lastmods = [node.text for node in root.findall("{http://www.sitemaps.org/schemas/sitemap/0.9}url/{http://www.sitemaps.org/schemas/sitemap/0.9}lastmod")]
    metadata = json.load(open("src/content/pageMetadata.json"))
    expected = {ORIGIN + route for route in metadata if route != "/404.html" and not re.search(r"/(?:admin|test|preview|thank-you)(?:/|$)", route)}
    result["sitemap"] = {k:v for k,v in sitemap.items() if k != "body"}
    result["sitemap"].update({"xml_root": root.tag, "count": len(locations), "lastmod_count": len(lastmods),
                              "missing_public_urls": sorted(expected-set(locations)), "extra_urls": sorted(set(locations)-expected),
                              "locations": locations})
except Exception as error:
    result["sitemap"] = {"status": sitemap["status"], "error": str(error)}
    locations = []
robots = get(ORIGIN + "/robots.txt")
result["robots"] = robots
missing = get(ORIGIN + "/audit-this-page-does-not-exist-20261028")
result["missing"] = {"url": missing["url"], "status": missing["status"], "content_type": missing["content_type"],
                     "headings": parse_page(missing)["h1"],
                     "has_helpful_links": all('href="' + route + '"' in missing["body"] for route in ["/services", "/blog", "/contact"])}
result["redirects"] = []
for base in ["http://innowebventures.com", "https://innowebventures.com", "http://www.innowebventures.com"]:
    for suffix in ["/", "/services?audit=path-preserved"]:
        response = get(base + suffix)
        expected = ORIGIN + suffix
        row = {k: v for k, v in response.items() if k != "body"}
        row["expected_location"] = expected
        row["pass"] = response["status"] == 301 and urllib.parse.urljoin(response["url"], response.get("location") or "") == expected
        result["redirects"].append(row)
try:
    result["apex_dns"] = sorted({item[4][0] for item in socket.getaddrinfo("innowebventures.com", 443, type=socket.SOCK_STREAM)})
except Exception as error:
    result["apex_dns"] = {"error": str(error)}
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as executor:
    pages = list(executor.map(lambda url: parse_page(get(url)), locations))
result["pages"] = pages
duplicate_titles = defaultdict(list)
duplicate_descriptions = defaultdict(list)
for page in pages:
    for title in page["titles"]: duplicate_titles[title].append(page["url"])
    for description in page["descriptions"]: duplicate_descriptions[description].append(page["url"])
result["duplicate_titles"] = [{"value": value, "urls": urls} for value, urls in duplicate_titles.items() if len(urls) > 1]
result["duplicate_descriptions"] = [{"value": value, "urls": urls} for value, urls in duplicate_descriptions.items() if len(urls) > 1]
meta_failures = [page["url"] for page in pages if page["status"] != 200 or len(page["titles"]) != 1 or len(page["descriptions"]) != 1 or not all(page["titles"]+page["descriptions"])]
canonical_failures = [page["url"] for page in pages if page["canonicals"] != [page["url"]]]
og_failures = [page["url"] for page in pages if any(len(page["og"].get(key, [])) != 1 or not page["og"].get(key, [None])[0]
                for key in ["og:title", "og:description", "og:url", "og:image"]) or page["og"].get("og:url") != [page["url"]]]
content_failures = [page["url"] for page in pages if page["status"] != 200 or len(page["h1"]) != 1 or page["heading_count"] < 1 or page["paragraph_count"] < 1 or page["main_text_characters"] < 400 or page["internal_links"] < 1]
home = next((page for page in pages if page["url"] == ORIGIN + "/"), {})
nodes = []
for block in home.get("jsonld", []):
    data = block.get("data", {})
    if isinstance(data, dict): nodes.extend(data.get("@graph", [data]))
organization = next((node for node in nodes if node.get("@id") == ORIGIN + "/#organization"), {})
website = next((node for node in nodes if node.get("@id") == ORIGIN + "/#website"), {})
llms = get(ORIGIN + "/llms.txt")
result["llms"] = {"url": llms["url"], "status": llms["status"], "content_type": llms["content_type"],
                   "line_count": len(llms["body"].split("\n")), "described_links": len(re.findall(r"^- \[.*\]\(https://.*\): .+", llms["body"], re.M)),
                   "starts_with": llms["body"][:350], "sections": re.findall(r"^## .+", llms["body"], re.M)}
result["summary"] = {
    "sitemap": sitemap["status"] == 200 and result["sitemap"].get("count", 0) > 0 and not result["sitemap"].get("missing_public_urls", ["parse failed"]) and not result["sitemap"].get("extra_urls"),
    "robots": robots["status"] == 200 and robots["content_type"].startswith("text/plain") and "Sitemap: " + ORIGIN + "/sitemap.xml" in robots["body"].splitlines(),
    "missing": missing["status"] == 404,
    "redirects": all(row["pass"] for row in result["redirects"]),
    "unique_metadata": not meta_failures and not result["duplicate_titles"] and not result["duplicate_descriptions"],
    "canonical_og": not canonical_failures and not og_failures,
    "raw_content": not content_failures,
    "home_jsonld": organization.get("@type") == "ProfessionalService" and website.get("@type") == "WebSite" and website.get("publisher", {}).get("@id") == organization.get("@id") and bool(home.get("jsonld")) and all(block.get("in_head") for block in home.get("jsonld", [])),
    "llms": llms["status"] == 200 and llms["content_type"].startswith("text/plain") and llms["body"].startswith("# InnoWeb Ventures\n") and len(llms["body"].split("\n")) < 150,
    "page_count": len(pages), "unique_title_count": len(duplicate_titles), "unique_description_count": len(duplicate_descriptions),
    "metadata_failures": meta_failures, "canonical_failures": canonical_failures, "og_failures": og_failures, "content_failures": content_failures,
}
print("LIVE_AUDIT_JSON=" + json.dumps(result, ensure_ascii=False), flush=True)
