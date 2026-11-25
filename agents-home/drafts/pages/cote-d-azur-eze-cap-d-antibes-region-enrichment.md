---
topic_map_entry: Côte d'Azur: Èze's Medieval Village and the Cap d'Antibes Coastal Path
target_audience: B2C
edit_type: region_description
file_edited: ../src/countries.py
status: checker_approved
---

# What changed

Enriched the Côte d'Azur region description on France's existing country page
(`src/countries.py`, `france` -> `regions` -> `Côte d'Azur`). The description previously named no
specific village, trail or garden — only "beach clubs, boat days and the old towns of the
Riviera." Added one sentence naming two concrete, bookable-on-foot experiences:

- The walk up to Èze's medieval hill village, closing with the view from the Jardin d'Èze.
- An easier coastal path around Cap d'Antibes.
- An evening back among Menton's old town or a beach club, tying back to the existing copy.

# Why

Per `research/topic-map.md` entry "Côte d'Azur: Èze's Medieval Village and the Cap d'Antibes
Coastal Path" (added 2026-11-25): WebSearch across Scott Dunn, Oliver's Travels and Rough Guides
repeatedly names this same pairing — Èze (a roughly 75-minute walk up, with the Jardin d'Èze
recommended afterward) and the Cap d'Antibes coastal trail — as the Riviera's best non-beach day
out, while villa-rental listings for the Côte d'Azur (CV Villas, The Top Villas, Airbnb luxury
listings) describe bedroom count, pool and sea view only, naming neither. This closes the same
generic-description gap already closed for Provence, Dordogne and Bordeaux wine country on this
same France page.

# Notes

- No price, villa-specific content, or unverifiable claim added — only named public
  attractions/trails already covered by multiple independent travel sources.
- No villa owner's images, prices or descriptive text used.
- Matches the existing voice and sentence structure used for every other enriched region on this
  page (one added sentence naming a specific walk/trail/garden combination with an evening
  close).

# Checker approval (2026-11-25)

Independently re-ran `npm install && npm run build` — clean, no errors. Diff confirmed to touch
only the Côte d'Azur tuple inside France's `regions` list in `src/countries.py` (plus the
generated `public/` build artifacts). Checked against `context/rules.md`: no unprovable claim, no
villa-owner content, traces to the topic-map entry above, no PII/secrets, no legal/tax claim.
**Approved.**
