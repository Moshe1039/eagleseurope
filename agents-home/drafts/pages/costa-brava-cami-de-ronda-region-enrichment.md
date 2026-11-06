---
topic_map_entry: Costa Brava: A Camí de Ronda Walk Between the Medieval Villages
target_audience: B2C
edit_type: region_description
file_edited: ../src/countries.py
status: approved
---

# Costa Brava region enrichment

## What changed

Enriched the Costa Brava region description on Spain's existing `/luxury-villas/spain/` page
(`src/countries.py`, Spain's `regions` tuple). Original text:

> Rocky coves, medieval villages and Catalan cooking, an easy distance from Barcelona.

New text:

> Rocky coves, medieval villages and Catalan cooking, an easy distance from Barcelona. A group
> can walk a stretch of the Camí de Ronda coastal path between the coves one day, then spend a
> slower day on the medieval-village circuit through Pals, Peratallada and Begur, each a short
> drive from the last.

## Why this topic (from the topic-map entry, research/topic-map.md)

WebSearch found three named, independently-sourced experiences for Costa Brava, all sold only as
standalone tours with no villa-stay combination found — the Camí de Ronda coastal path (guided
day hikes, especially Palamós–Calella de Palafrugell–Cap Roig, covered independently by
Spain.info and Timeout Girona), the Pals–Peratallada–Begur medieval-village circuit (fixed-
itinerary tours from Musement and Lokalee), and the Cadaqués/Dalí triangle (Civitatis,
Hellotickets, corroborated by Visit Costa Brava's own tourism site). Villa listings (Iberimo,
Amarantelva, Oliver's Travels) describe pool, tennis court and sea-view proximity only, naming no
village or path. The original region description had no named place at all. The topic-map entry
recommended the Pals/Peratallada/Begur circuit as the primary angle since it fits the existing
"medieval villages" phrasing most literally — that's the angle used here, with the Camí de Ronda
folded in as a second, complementary day since it was the entry's title and ties directly to the
existing "rocky coves" phrasing already in the description. The Cadaqués/Dalí angle was left out
to keep the addition short and avoid stacking three separate experiences into one sentence pair
— it remains available as a future enrichment or FAQ entry if needed.

## Checks against the house style / rules

- No villa amenities pitched — this is destination/experience copy only (per
  `context/rules.md` #3, landing/area content must be about the experience and destination, not
  the villa).
- No price, no unverifiable claim ("1,000+ villas" etc.) — none added.
- No customer PII, no secrets.
- Matches the existing sentence-pair pattern used in the Mallorca enrichment immediately above
  this entry in the same file (keep the original clause, then one sentence structuring the group's
  day/days around named places).
- Grounded in the specific `research/topic-map.md` entry named above — no topic invented.

## Build check

`npm install && npm run build` run from the repo root after the edit — passed cleanly: "Built 12
pages + 404, /assets/site.375807097f.css, /assets/site.de78f8d8ae.js". No errors.

## Checker verdict (2026-11-06)

**Approved.** Independently re-ran `rm -rf node_modules && npm install && npm run build` from
the repo root — clean, same output as above. Diffed `src/countries.py`: the only change is the
Costa Brava tuple inside Spain's `regions` list (one sentence appended); nothing else in the file
touched, no new top-level key, no `server/`/`wrangler.toml`/`build.py` change. Checked against
`context/rules.md`: no unprovable claim, no villa image/price/text used (destination/experience
copy only, not villa amenities), traces to the "Costa Brava: A Camí de Ronda Walk Between the
Medieval Villages" entry in `research/topic-map.md`, organic framing only, no customer PII or
secrets, no legal/tax claim. Build-output files under `public/` also changed as a side effect of
running the build (`luxury-villas/spain/index.html`, `sitemap.xml`, `privacy.html`,
`terms.html`) — consistent with every prior publish commit on this project, not a scope
violation.
