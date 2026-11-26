---
topic_map_entry: Ibiza: The Moscarter Lighthouse Loop and Benirràs Sunset
target_audience: B2C
edit_type: region_description
file_edited: ../src/countries.py
status: checker_approved
---

# What changed

Enriched the Ibiza region description on Spain's existing country page
(`src/countries.py`, `spain` -> `regions` -> `Ibiza`). The description previously named no
specific walk, lighthouse or beach — only "exclusive private resorts in the north, sunset
terraces and beach lunches." Added one sentence naming two concrete, bookable-on-foot/no-car
experiences on the same north coast:

- The circular walk past the Punta Moscarter lighthouse, linking Portinatx and Sant Joan.
- Benirràs beach's well-known Sunday sunset drumming gathering.

# Why

Per `research/topic-map.md` entry "Ibiza: The Moscarter Lighthouse Loop and Benirràs Sunset"
(added 2026-11-25): WebSearch on Ibiza's north coast (Komoot, Kimkim, Lonely Planet) repeatedly
names this same circular walk past Punta Moscarter — described as the island's tallest
lighthouse — as the island's most popular hike away from the clubs, paired with Benirràs beach's
Sunday sunset-drumming gathering, both on the same quiet north coast. Villa-rental listings for
Ibiza's north describe bedroom count, pool and proximity to the airport only, naming neither.
This closes the same generic-description gap already closed for Mallorca, Andalusia and the
Costa Brava on this same Spain page.

# Notes

- No price, villa-specific content, or unverifiable claim added — only named public
  attractions/activities already covered by multiple independent travel sources.
- No villa owner's images, prices or descriptive text used.
- Matches the existing voice and sentence structure used for every other enriched region on this
  page (one added sentence naming a specific walk/landmark/beach combination).

# Checker approval (2026-11-26)

Independently re-ran `npm install && npm run build` — clean, no errors. Diff confirmed to touch
only the Ibiza tuple inside Spain's `regions` list in `src/countries.py` (plus the generated
`public/` build artifacts — regenerated HTML and a `lastmod` bump in `sitemap.xml`, the same
artifact pattern as every prior published entry). Checked against `context/rules.md`: no
unprovable claim, no villa-owner content or images, traces to the "Ibiza: The Moscarter
Lighthouse Loop and Benirràs Sunset" topic-map entry, no PII/secrets, no legal/tax claim, no
paid-acquisition framing, stays focused on destination/experience rather than villa amenities.
**Approved.**
