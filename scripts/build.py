"""Builds the static site into public/.

Pages
  /                              home (src/home.html)
  /luxury-villas/<country>/      one landing page per country (src/countries.py)
  /404.html
Assets
  /assets/site.<hash>.css        shared styles with the fonts embedded (no Google Fonts calls)
  /assets/site.<hash>.js         shared script
SEO
  sitemap.xml, robots.txt, canonical URLs, Open Graph, JSON-LD (TravelAgency, WebSite, FAQPage, BreadcrumbList)

Run:  npm install && npm run build
"""
import base64
import datetime
import hashlib
import html
import json
import os
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "src")
PUBLIC = os.path.join(ROOT, "public")
FONTS = os.path.join(ROOT, "node_modules", "@fontsource")
SITE = "https://eagleseurope.com"
BRAND = "Eagle's Europe"
EMAIL = "hello@eagleseurope.com"
OG_IMAGE = "https://images.unsplash.com/photo-1543489822-c49534f3271f?auto=format&fit=crop&w=1200&h=630&q=80"

sys.path.insert(0, SRC)
from countries import COUNTRIES  # noqa: E402

FACES = [
    ("Cormorant Garamond", "cormorant-garamond/files/cormorant-garamond-latin-400-normal.woff2", 400, "normal"),
    ("Cormorant Garamond", "cormorant-garamond/files/cormorant-garamond-latin-500-normal.woff2", 500, "normal"),
    ("Cormorant Garamond", "cormorant-garamond/files/cormorant-garamond-latin-400-italic.woff2", 400, "italic"),
    ("Jost", "jost/files/jost-latin-300-normal.woff2", 300, "normal"),
    ("Jost", "jost/files/jost-latin-400-normal.woff2", 400, "normal"),
    ("Jost", "jost/files/jost-latin-500-normal.woff2", 500, "normal"),
]

CSP = ("default-src 'none'; script-src 'self'; style-src 'self' 'unsafe-inline'; "
       "img-src 'self' data: https://images.unsplash.com; "
       "media-src 'self' https://assets.mixkit.co https://videos.pexels.com; "
       "font-src data:; connect-src 'self'; form-action 'self'; base-uri 'none'; upgrade-insecure-requests")

e = html.escape
img = lambda pid, w=1200: f"https://images.unsplash.com/photo-{pid}?auto=format&fit=crop&w={w}&q=80"


def read(name):
    return open(os.path.join(SRC, name), encoding="utf-8").read()


def write(rel, content, mode="w"):
    path = os.path.join(PUBLIC, rel)
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, mode, **({} if "b" in mode else {"encoding": "utf-8"})) as f:
        f.write(content)


def hashed(name, ext, content):
    h = hashlib.sha256(content.encode()).hexdigest()[:10]
    return f"/assets/{name}.{h}.{ext}"


def font_css():
    out = []
    for family, path, weight, style in FACES:
        data = base64.b64encode(open(os.path.join(FONTS, path), "rb").read()).decode()
        out.append(f"@font-face{{font-family:'{family}';font-style:{style};font-weight:{weight};"
                   f"font-display:swap;src:url(data:font/woff2;base64,{data}) format('woff2')}}")
    return "\n".join(out)


def jsonld(obj):
    # Escape "<" so the JSON can never close the script element.
    return '<script type="application/ld+json">' + json.dumps(obj, ensure_ascii=False).replace("<", "\\u003c") + "</script>"


def faq_schema(pairs):
    return {"@context": "https://schema.org", "@type": "FAQPage",
            "mainEntity": [{"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}} for q, a in pairs]}


ORG = {
    "@context": "https://schema.org", "@type": "TravelAgency", "@id": SITE + "/#org",
    "name": BRAND, "alternateName": "Eagle's", "url": SITE + "/", "email": EMAIL, "telephone": "+972-50-924-3338", "image": OG_IMAGE,
    "description": "All-inclusive luxury villa holidays in Europe with a private chef, host and transfers, for couples and groups of friends.",
    "slogan": "Europe, for the people you love most.",
    "areaServed": [{"@type": "Country", "name": c["name"]} for c in COUNTRIES],
    "knowsAbout": ["villa with private chef", "catered villas", "staffed villas", "all-inclusive villa holidays",
                   "luxury villa rentals for groups", "catered chalets"],
}


def layout(*, title, desc, path, main, css, js, extra_head="", schemas=()):
    url = SITE + path
    dest_links = "".join(f'<li><a href="/luxury-villas/{c["slug"]}/">Villas in {c["name"]}</a></li>' for c in COUNTRIES)
    ld = "\n".join(jsonld(s) for s in schemas)
    return f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="Content-Security-Policy" content="{CSP}">
<meta name="referrer" content="strict-origin-when-cross-origin">
<title>{e(title)}</title>
<meta name="description" content="{e(desc)}">
<link rel="canonical" href="{url}">
<meta name="robots" content="index, follow, max-image-preview:large">
<meta property="og:site_name" content="{e(BRAND)}">
<meta property="og:type" content="website">
<meta property="og:title" content="{e(title)}">
<meta property="og:description" content="{e(desc)}">
<meta property="og:url" content="{url}">
<meta property="og:image" content="{e(OG_IMAGE)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#11181B">
<link rel="stylesheet" href="{css}">
<script src="{js}" defer></script>
{extra_head}{ld}
</head>
<body>
<a class="skip" href="#main">Skip to main content</a>

<header class="nav" id="nav">
  <div class="wrap nav-inner">
    <a class="brand" href="/"><b>Eagle's</b> <span>Europe</span><span class="sr-only">, home</span></a>
    <nav aria-label="Main">
      <ul class="nav-links" id="nav-links">
        <li><a href="/#experience">The experience</a></li>
        <li><a href="/#journey">Your journey</a></li>
        <li><a href="/#day">A day with us</a></li>
        <li><a href="/#destinations">Destinations</a></li>
        <li><a href="/#faq">FAQ</a></li>
      </ul>
    </nav>
    <div class="nav-right">
      <a class="btn btn-gold" href="/#contact">Request information</a>
      <button class="menu-btn" id="menu-btn" type="button" aria-expanded="false" aria-controls="nav-links"><span class="sr-only">Menu</span><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M2 5h16M2 10h16M2 15h16" stroke="currentColor" stroke-width="1.5" fill="none"/></svg></button>
    </div>
  </div>
</header>

<main id="main" tabindex="-1">
{main}
</main>

<footer>
  <div class="wrap">
    <div class="top">
      <b>Eagle's</b>
      <nav aria-label="Legal and social">
        <ul>
          <li><a href="/legal-notice">Legal notice</a></li>
          <li><a href="/privacy">Privacy policy</a></li>
          <li><a href="/terms">Booking terms</a></li>
          <li><a href="/accessibility">Accessibility statement</a></li>
        </ul>
      </nav>
    </div>
    <nav aria-label="Destinations"><ul class="dest-links">{dest_links}</ul></nav>
    <p class="legal">© {BRAND} · All-inclusive luxury villa holidays with a private chef · [Company name, registered address, registration and VAT number] · This site uses no cookies or tracking. · Photography: Unsplash · Film: Pexels, Mixkit</p>
  </div>
</footer>
<aside aria-label="Quick contact"><a class="wa-float" aria-label="Chat on WhatsApp with Eagle's" href="https://wa.me/972509243338?text=Hi%20Eagle%27s%2C%20I%27d%20like%20to%20hear%20about%20a%20villa%20holiday%20for%20our%20group." rel="noopener noreferrer"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.4a.5.5 0 0 0 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c1.7.7 2.4.8 3.2.7a2.8 2.8 0 0 0 1.8-1.3 2.3 2.3 0 0 0 .2-1.3c-.1-.1-.2-.2-.4-.3z"/></svg><span>Chat on WhatsApp</span></a></aside>
</body>
</html>
"""


def destination_cards():
    out = []
    for c in COUNTRIES:
        regions = "".join(f"<li>{e(r[0])}</li>" for r in c["regions"])
        out.append(f'''      <li class="reveal"><article class="dest">
        <div class="ph"><img src="{img(c["img"])}" alt="{e(c["alt"])}" loading="lazy" width="1200" height="900"></div>
        <div class="body"><h3>{c["name"]}</h3><ul class="regions" aria-label="Regions in {c["name"]}">{regions}</ul>
        <a class="more" href="/luxury-villas/{c["slug"]}/">Villas in {c["name"]} with a private chef</a></div>
      </article></li>''')
    return "\n".join(out)


def country_page(c):
    regions = "\n".join(
        f'      <li class="region reveal"><h2>{e(name)} villas with a private chef</h2><p>{e(text)}</p></li>'
        for name, text in c["regions"])
    intro = "\n".join(f'      <p class="body">{e(p)}</p>' for p in c["intro"])
    faqs = "\n".join(f'      <details class="qa reveal"><summary><h3>{e(q)}</h3></summary><p>{e(a)}</p></details>' for q, a in c["faq"])
    others = "".join(f'<li><a href="/luxury-villas/{o["slug"]}/">Villas in {o["name"]}</a></li>' for o in COUNTRIES if o is not c)
    return f'''<section class="page-hero" style="background-image:url('{img(c["img"], 2400)}')" aria-labelledby="page-title">
  <div class="wrap">
    <nav aria-label="Breadcrumb"><ol class="crumbs"><li><a href="/">Home</a></li><li><a href="/#destinations">Destinations</a></li><li aria-current="page">{c["name"]}</li></ol></nav>
    <h1 id="page-title">{e(c["h1"])}</h1>
    <p class="lead">{e(c["lead"])}</p>
    <div class="hero-ctas"><a class="btn btn-gold" href="/?dest={c["name"]}#contact">Plan a villa holiday in {c["name"]}</a></div>
  </div>
  <span class="sr-only">Photo: {e(c["alt"])}</span>
</section>

<section class="intro-band" aria-labelledby="intro-title">
  <div class="wrap two-col">
    <div class="reveal">
      <p class="eyebrow">All-inclusive &amp; fully staffed</p>
      <h2 id="intro-title">A catered villa in {c["name"]},<br><em>everything arranged.</em></h2>
    </div>
    <div class="reveal">
{intro}
      <p class="body" style="margin:0"><a href="/#experience">See everything that is included</a>.</p>
    </div>
  </div>
</section>

<section class="regions-sec" aria-labelledby="regions-title">
  <div class="wrap">
    <p class="eyebrow">Regions</p>
    <h2 id="regions-title" class="sr-only">Regions in {c["name"]}</h2>
    <ul class="region-list">
{regions}
    </ul>
  </div>
</section>

<section class="season on-dark" aria-labelledby="season-title">
  <div class="wrap">
    <p class="eyebrow">Plan your trip</p>
    <h2 id="season-title">When to go, and what's on the table</h2>
    <ul class="facts-grid">
      <li><h3>Best time to go</h3><p>{e(c["season"])}</p></li>
      <li><h3>At the table</h3><p>{e(c["table"])}</p></li>
      <li><h3>Included</h3><p>The villa, a private chef for breakfast and dinner, daily housekeeping, private transfers, a host on call and experiences in the region.</p></li>
    </ul>
  </div>
</section>

<section class="faq" aria-labelledby="faq-title">
  <div class="wrap two-col">
    <div class="reveal"><p class="eyebrow">Questions</p><h2 id="faq-title">Villas in {c["name"]},<br><em>answered.</em></h2></div>
    <div class="qa-list">
{faqs}
    </div>
  </div>
</section>

<section class="cta-band on-dark" aria-labelledby="cta-title">
  <div class="wrap">
    <h2 id="cta-title">Tell us about your group</h2>
    <p>Share your dates and how many couples you are, and we will come back with a villa in {c["name"]} and a plan around it.</p>
    <a class="btn btn-gold" href="/?dest={c["name"]}#contact">Request information</a>
  </div>
</section>

<nav class="other-dest" aria-label="Other destinations"><div class="wrap"><p class="eyebrow" style="margin:0">More villas in Europe</p><ul>{others}</ul></div></nav>'''


def main():
    today = datetime.date.today().isoformat()

    css = font_css() + "\n" + read("styles.css")
    js = read("site.js")
    css_path, js_path = hashed("site", "css", css), hashed("site", "js", js)

    # Clean old hashed assets, then write the new ones.
    assets_dir = os.path.join(PUBLIC, "assets")
    if os.path.isdir(assets_dir):
        for f in os.listdir(assets_dir):
            if f.startswith("site."):
                os.remove(os.path.join(assets_dir, f))
    write(css_path.lstrip("/"), css)
    write(js_path.lstrip("/"), js)

    common = dict(css=css_path, js=js_path)

    # Home
    home_faq = json.load(open(os.path.join(SRC, "faq.json"), encoding="utf-8"))
    home = read("home.html").replace("__DESTINATIONS__", destination_cards())
    website = {"@context": "https://schema.org", "@type": "WebSite", "name": BRAND, "url": SITE + "/", "publisher": {"@id": SITE + "/#org"}}
    write("index.html", layout(
        title="Luxury Villa Holidays with a Private Chef | Eagle's Europe",
        desc="All-inclusive villa holidays for couples & friends: a handpicked villa, private chef, host and transfers in Italy, Greece, France, Spain and beyond.",
        path="/", main=home, schemas=(ORG, website, faq_schema(home_faq)), **common))

    # Countries
    urls = [(SITE + "/", "1.0")]
    for c in COUNTRIES:
        path = f"/luxury-villas/{c['slug']}/"
        crumbs = {"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "Home", "item": SITE + "/"},
            {"@type": "ListItem", "position": 2, "name": "Destinations", "item": SITE + "/#destinations"},
            {"@type": "ListItem", "position": 3, "name": f"Villas in {c['name']}", "item": SITE + path}]}
        write(f"luxury-villas/{c['slug']}/index.html", layout(
            title=c["title"], desc=c["desc"], path=path, main=country_page(c),
            schemas=(crumbs, faq_schema(c["faq"])), **common))
        urls.append((SITE + path, "0.8"))

    # Legal pages
    privacy = read("pages/privacy.html").replace("__UPDATED__", datetime.date.today().strftime("%-d %B %Y"))
    write("privacy.html", layout(
        title="Privacy Policy | Eagle's Europe",
        desc="How Eagle's Europe collects, uses and protects personal data for enquiries and villa holidays, and your rights under the GDPR.",
        path="/privacy", main=privacy, **common))
    urls.append((SITE + "/privacy", "0.3"))

    terms = read("pages/terms.html").replace("__UPDATED__", datetime.date.today().strftime("%-d %B %Y"))
    write("terms.html", layout(
        title="Booking Terms: Payment & Cancellation | Eagle's Europe",
        desc="How payment works for an Eagle's villa holiday: deposit, balance, ways to pay as a group, and our cancellation terms.",
        path="/terms", main=terms, **common))
    urls.append((SITE + "/terms", "0.3"))

    # 404
    write("404.html", layout(
        title="Page not found | Eagle's Europe", desc="This page does not exist.", path="/404",
        extra_head='<meta name="robots" content="noindex">\n',
        main='''<section class="cta-band on-dark" style="padding-block:200px 120px"><div class="wrap"><h1 style="font-size:clamp(40px,5vw,72px)">This page is on holiday.</h1><p>It may have moved, or never existed.</p><a class="btn btn-gold" href="/">Back to the home page</a></div></section>''',
        **common).replace('<meta name="robots" content="index, follow, max-image-preview:large">\n', ""))

    # sitemap + robots
    sm = "\n".join(f"  <url><loc>{u}</loc><lastmod>{today}</lastmod><priority>{p}</priority></url>" for u, p in urls)
    write("sitemap.xml", f'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n{sm}\n</urlset>\n')
    write("robots.txt", f"User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /api/\n\nSitemap: {SITE}/sitemap.xml\n")

    print(f"Built {len(urls)} pages + 404, {css_path}, {js_path}")


if __name__ == "__main__":
    main()
