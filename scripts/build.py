"""Builds public/index.html from src/template.html and src/script.js.

- Embeds the site fonts (self-hosted, no calls to Google) from node_modules/@fontsource.
- Renders the destination cards.
- Computes the SHA-256 hash of the inline script for the Content-Security-Policy.

Run:  npm install && npm run build
"""
import base64
import hashlib
import html
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "src")
FONTS = os.path.join(ROOT, "node_modules", "@fontsource")
OUT = os.path.join(ROOT, "public", "index.html")

FACES = [
    ("Cormorant Garamond", "cormorant-garamond/files/cormorant-garamond-latin-400-normal.woff2", 400, "normal"),
    ("Cormorant Garamond", "cormorant-garamond/files/cormorant-garamond-latin-500-normal.woff2", 500, "normal"),
    ("Cormorant Garamond", "cormorant-garamond/files/cormorant-garamond-latin-400-italic.woff2", 400, "italic"),
    ("Jost", "jost/files/jost-latin-300-normal.woff2", 300, "normal"),
    ("Jost", "jost/files/jost-latin-400-normal.woff2", 400, "normal"),
    ("Jost", "jost/files/jost-latin-500-normal.woff2", 500, "normal"),
]

# Country, Unsplash photo id, image description, regions
DESTINATIONS = [
    ("Italy", "1596142332133-327e2a0ff006", "Vineyard rows on a Tuscan hillside", ["Tuscany", "Amalfi Coast", "Puglia", "Sicily", "Lake Como", "Sardinia"]),
    ("France", "1600759487717-62bbb608106e", "Rows of lavender in Valensole, Provence", ["Provence", "Côte d'Azur", "Dordogne", "Bordeaux wine country"]),
    ("Spain", "1672264430465-781cd9154896", "A beach with clear blue water beside a cliff", ["Mallorca", "Ibiza", "Andalusia", "Costa Brava"]),
    ("Portugal", "1652092521226-3e03a716ae86", "A sandy beach beneath golden cliffs in the Algarve", ["Algarve", "Comporta", "Douro Valley", "Sintra"]),
    ("Greece", "1602008194020-13ac6665ebdb", "White houses beside the blue Aegean", ["Crete", "The Cyclades", "Peloponnese", "Corfu"]),
    ("Croatia", "1414862625453-d87604a607e4", "Red-roofed houses beside the Adriatic", ["Dalmatian Coast", "Hvar", "Istria"]),
    ("Switzerland", "1520631023082-a5fe1cf21c5f", "A house by an alpine lake below the mountains", ["Engadin & St. Moritz", "Zermatt", "Lavaux & Lake Geneva"]),
    ("Austria", "1597086831879-756db15e81d3", "Hallstatt on its lake beneath the mountains", ["Tyrol", "Salzkammergut", "Wachau Valley"]),
    ("Germany", "1770565844662-561acf15c7ae", "A vineyard village with a church steeple among green hills", ["Bavarian Alps", "Mosel Valley", "Lake Constance"]),
]


def font_css():
    rules = []
    for family, path, weight, style in FACES:
        data = base64.b64encode(open(os.path.join(FONTS, path), "rb").read()).decode()
        rules.append(
            f"@font-face{{font-family:'{family}';font-style:{style};font-weight:{weight};"
            f"font-display:swap;src:url(data:font/woff2;base64,{data}) format('woff2')}}"
        )
    return "\n".join(rules)


def destination_cards():
    img = lambda pid: f"https://images.unsplash.com/photo-{pid}?auto=format&fit=crop&w=1200&q=80"
    out = []
    for country, pid, alt, regions in DESTINATIONS:
        items = "".join(f"<li>{html.escape(r)}</li>" for r in regions)
        out.append(f'''      <li class="reveal"><article class="dest">
        <div class="ph"><img src="{img(pid)}" alt="{html.escape(alt)}" loading="lazy" width="1200" height="900"></div>
        <div class="body"><h3>{country}</h3><ul class="regions" aria-label="Regions in {country}">{items}</ul>
        <a class="more" href="#contact" data-dest="{country}">Plan a journey to {country}<span class="sr-only"> – go to the enquiry form</span></a></div>
      </article></li>''')
    return "\n".join(out)


def main():
    js = open(os.path.join(SRC, "script.js")).read()
    js = js.replace(
        "  // ---------- Form ----------",
        "  // ---------- Form ----------\n"
        "  document.querySelectorAll('[data-dest]').forEach(function(a){ a.addEventListener('click', function(){ "
        "document.getElementById('f-where').value = a.getAttribute('data-dest'); }); });",
    )
    page = open(os.path.join(SRC, "template.html")).read()
    page = page.replace("/*__FONTS__*/", font_css()).replace("__DESTINATIONS__", destination_cards())
    digest = base64.b64encode(hashlib.sha256(js.encode()).digest()).decode()
    page = page.replace("__SCRIPT_HASH__", "sha256-" + digest).replace("__SCRIPT__", js)
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    open(OUT, "w").write(page)
    print(f"Built {OUT} ({len(page) // 1024} KB)")


if __name__ == "__main__":
    main()
