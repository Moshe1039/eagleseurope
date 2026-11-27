---
topic_map_entry: Comporta: A Rice-Field Bike Ride and a Sado Estuary Dolphin Crossing
target_audience: B2C
edit_type: region_description
file_edited: ../src/countries.py
status: checker_approved
---

# What changed

Enriched the Comporta region description on Portugal's existing country page
(`src/countries.py`, `portugal` -> `regions` -> `Comporta`). The description previously named no
specific activity beyond "rice fields, dunes and endless beaches" and a "barefoot, design-led
style." Added one sentence naming two concrete, bookable experiences:

- A bike ride through Comporta's rice fields.
- A short boat crossing from nearby Tróia across the Sado estuary to see the resident bottlenose
  dolphins.

# Why

Per `research/topic-map.md` entry "Comporta: A Rice-Field Bike Ride and a Sado Estuary Dolphin
Crossing" (added 2026-11-25): WebSearch on Comporta (Rough Guides, Culture Trip, Fora Travel, Mr
& Mrs Smith) repeatedly pairs the same two activities beyond the beach itself — a bike ride
through the rice fields, and a boat crossing from Tróia across the Sado estuary to spot the
resident bottlenose dolphins. Villa-rental listings for Comporta describe bedroom count, pool and
architectural style only, naming neither activity. This closes the same generic-description gap
already closed for the Algarve, Douro Valley and Sintra on this same Portugal page.

# Notes

- No price, villa-specific content, or unverifiable claim added — only named public
  activities already covered by multiple independent travel sources.
- No villa owner's images, prices or descriptive text used.
- Matches the existing voice and sentence structure used for every other enriched region on this
  page (one added sentence naming a specific, bookable activity pair).

# Checker approval (2026-11-27)

Independently re-ran `npm install && npm run build` — clean, no errors. Diff confirmed to touch
only the Comporta tuple inside Portugal's `regions` list in `src/countries.py` (plus the
generated `public/` build artifacts — regenerated HTML and a `lastmod` bump in `sitemap.xml`, the
same artifact pattern as every prior published entry). Checked against `context/rules.md`: no
unprovable claim, no villa-owner content or images, traces to the "Comporta: A Rice-Field Bike
Ride and a Sado Estuary Dolphin Crossing" topic-map entry, no PII/secrets, no legal/tax claim, no
paid-acquisition framing, stays focused on destination/experience rather than villa amenities.
**Approved.**
