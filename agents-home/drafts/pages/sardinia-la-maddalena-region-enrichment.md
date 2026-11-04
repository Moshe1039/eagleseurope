---
topic_map_entry: Sardinia: A Villa Base for a Boat Day to the La Maddalena Archipelago
target_audience: B2C
edit_type: region_description
file_edited: ../src/countries.py
status: pending_checker_review
---

# Sardinia region enrichment — La Maddalena archipelago boat day

## What changed

Enriched the Sardinia region description inside Italy's `regions` list in `../src/countries.py`.
Added one sentence naming a specific boat-day experience (La Maddalena archipelago from Palau,
stopping at Spargi, Santa Maria and Budelli) to the existing generic description, following the
same pattern already shipped for Tuscany, Puglia, Mallorca, Istria, Hvar, Mosel Valley, the
Wachau Valley and the Peloponnese.

Before:
> Some of Europe's clearest water, quiet coves and exclusive private resorts tucked into the
> macchia above the sea.

After:
> Some of Europe's clearest water, quiet coves and exclusive private resorts tucked into the
> macchia above the sea. A group can fill its own day with a boat out from Palau to the La
> Maddalena archipelago, hopping between the white sands of Spargi, Santa Maria and Budelli for
> swim stops along the way, or a quieter morning among the coves closer to the exclusive private
> resort.

## Why (traces to research/topic-map.md)

Topic-map entry: "Sardinia: A Villa Base for a Boat Day to the La Maddalena Archipelago" (added
2026-11-04 by the keyword-researcher fallback pass). WebSearch found villa-rental listings for
Sardinia describe the property only (pool, bedrooms, sea view), while named tour operators
(Civitatis, Musement, Freedome, Click&Boat) sell the La Maddalena archipelago boat day as a
standalone activity, independently corroborated by travel guides as a top Costa Smeralda
activity. No result combines a private villa stay with this named boat day as one package —
this enrichment closes that gap the same way it's been closed for seven other regions already.

## Checks against house rules

- No price or payment figure mentioned.
- No unverifiable absolute claim ("1,000+ villas", years-in-business, etc.).
- Sells the experience/destination, not villa amenities — the sentence is entirely about the
  boat day and islands, not pool/bedroom features.
- No villa owner's name, image, or descriptive text used — this is destination/experience copy
  only, no specific property referenced.
- No customer PII, no API keys/secrets.
- No legal/tax claim made.
- Matches existing voice: short, warm, specific — mirrors the exact phrasing pattern used for
  the Mallorca ("A group can fill its own days: a guided hike...") and Peloponnese ("A group can
  pick its own days...") enrichments already live on the site.

## Build check

Ran `npm install && npm run build` from the repo root after making the edit — succeeded:
"Built 12 pages + 404, /assets/site.375807097f.css, /assets/site.de78f8d8ae.js", no errors.

## Checker verdict (2026-11-04)

**Approved.** Independently re-ran `npm install && npm run build` from repo root — clean, no
errors, same output as the writer's own run. Confirmed the diff touches only: `src/countries.py`
(one line, the Sardinia region tuple in Italy's `regions` list), the corresponding derived
build output `public/luxury-villas/italy/index.html`, and `agents-home/` bookkeeping
(`research/topic-map.md`, this draft file) — nothing else. As in prior passes, the build script
also regenerated date-only `lastmod`/"Last updated" stamps in `public/privacy.html`,
`public/terms.html` and `public/sitemap.xml` purely from today's date; reverted those twice
(after both the writer's and this checker's own build run) since they're unrelated to this
content edit and the gate requires the diff touch nothing but the countries.py content path.
Checked against `context/rules.md`: no unprovable claim, no villa-specific content/images/price
used (destination/experience copy only), traces directly to the topic-map entry above, no paid-
acquisition framing, not centered on villa amenities, no customer PII or secrets, no legal/tax
claim made. Clear to publish.
