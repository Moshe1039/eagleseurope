---
topic_map_entry: Engadin & St. Moritz: A Lake Walk to Lej da Staz and Heidi's Flower Trail
target_audience: B2C
edit_type: region_description
file_edited: ../src/countries.py
status: approved
---

## Checker verdict (2026-11-23)

**Approved.** Independently re-ran `npm install && npm run build` clean from a fresh
`node_modules`. Diff confirmed to touch only the Engadin & St. Moritz region string in
`src/countries.py`, plus the usual build-regenerated `public/` artifacts (sitemap, per-page
HTML). No claims-rule violation, no villa-specific content, grounded in the exact topic-map
entry above, no PII/secrets, no legal/tax content.

# Engadin & St. Moritz region enrichment

## What changed

Appended a second sentence to the existing Engadin & St. Moritz region description on
Switzerland's page (`src/countries.py`), naming three specific, easy, bookable summer walks
already sold independently by the official St. Moritz tourism site, Komoot and Engadin.ch:

- A short lake walk out to Lej da Staz, just outside St. Moritz.
- The flat loop path around Lake St. Moritz itself.
- Heidi's Flower Trail from Chantarella, in bloom June to October.

## Why (per research/topic-map.md)

Chalet and villa-rental listings for the same area (Villa Volt, Engadin Chalet Private Retreat,
Chesarina Chalet, Chesa el Toula, Boutique Chalet Moritz) describe bedroom count, pool and spa
amenities only, naming none of these named lakes or trails. The existing region copy said only
"High alpine lakes, larch forests and one of the world's original winter resorts" — no named
lake, trail or village — the same generic-description gap already closed for Zermatt and Lavaux
on this same Switzerland page.

## Notes

- No price, no villa-specific claims, no unverifiable numbers.
- Matches the existing house style and sentence pattern used for the neighboring Zermatt and
  Lavaux & Lake Geneva region entries on the same page ("A group staying/based... can...").
- Touches only this one region-description string in `src/countries.py`.
