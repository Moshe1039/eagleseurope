---
topic_map_entry: Lavaux: A Day Between St-Saphorin and Lutry
target_audience: B2C
edit_type: region_description
file_edited: ../src/countries.py
status: approved_published
---

# Lavaux & Lake Geneva region enrichment

## What changed

Enriched the `"Lavaux & Lake Geneva"` region description on Switzerland's existing
`/luxury-villas/switzerland/` page (`src/countries.py`, Switzerland's `regions` tuple) from a
generic line — "Vineyard terraces that fall to the lake, a UNESCO landscape between Lausanne and
Montreux." — to add a structured day among the terraces (the marked St-Saphorin–Chexbres and
Épesses–Lutry walking segments, closing with a village winery tasting), following the same
enrichment pattern already shipped for Puglia, Tuscany, Algarve, Crete, Istria, Hvar, Mosel
Valley, Wachau Valley and Salzkammergut.

## Why (from `research/topic-map.md`)

WebSearch (recorded in the topic-map entry) found the same recurring split as every prior
enrichment gap: independent guided experiences (Winerist's half-day Lavaux tasting tour,
Daytrip.com's Montreux-to-Lavaux day trip, and walking segments catalogued by
tour-switzerland.ch and newlyswissed.com) sell a named day through the UNESCO terraces — a
winery tasting paired with a walk along marked segments such as St-Saphorin to Chexbres or
Épesses to Lutry, or a ride on the Lavaux Express tourist train. Villa-rental listings for the
same shoreline describe room count, pool and panoramic view only, naming neither a winery nor
either terrace walk. Switzerland's existing description had no named village, winery, or walking
segment. The differentiated angle — a group based among the vines itself, not joining a tour bus
from Montreux — is what no competitor result addresses, and is what the new sentence leads with.

## Checks against `context/rules.md`

1. **Claims** — no absolute/unverifiable numbers ("1,000+", "X+ years"). Nothing stated that
   isn't true today (the terrace walks and village winery tasting are real, existing activities
   in Lavaux, not a claim about Eagle's Europe's own history or scale).
2. **Villa consent** — no villa images, prices, or descriptive text used; this is destination/
   experience copy only, not villa-specific.
3. **Research grounding** — traces directly to the "Lavaux: A Day Between St-Saphorin and Lutry"
   entry in `research/topic-map.md`. Sells the experience/destination (a day walking the
   terraces to a tasting), not villa amenities. No paid-acquisition framing.
4. **Data handling** — no customer PII, no secrets/keys.
5. **Legal/tax** — no legal or tax claim made.

## No price stated

Payment structure isn't mentioned at all in this edit (it's a region description, not a FAQ
about payment) — nothing to check there.

## Build check (writer)

`npm install && npm run build` from repo root succeeded after the edit: "Built 12 pages + 404,
/assets/site.375807097f.css, /assets/site.de78f8d8ae.js" — no errors.
