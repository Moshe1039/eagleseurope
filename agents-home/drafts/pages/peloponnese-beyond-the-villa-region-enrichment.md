---
topic_map_entry: Peloponnese Beyond the Villa: Mystras, the Mani, and the Diros Caves
target_audience: B2C
edit_type: region_description
file_edited: ../src/countries.py
status: pending_checker_review
---

# Peloponnese region enrichment

Per `context/business-summary.md`'s real site structure, there is no "area/experience guide"
page type — only `/` and `/luxury-villas/<country>/` exist — so this ships as an enrichment of
the existing Peloponnese region description on Greece's `/luxury-villas/greece/` page (same
pattern already shipped for Crete, Puglia, Tuscany, Algarve, Istria, Hvar, Mosel Valley and
Mallorca).

## What changed

`src/countries.py`, Greece's `regions` list, the `"Peloponnese"` tuple. Added one sentence
naming three specific, researched attractions — Mystras, the Mani's stone tower villages, and
the Diros Caves — framed as days a group picks from, echoing the product's own "pick 2 of 6"
mechanic and the same framing already used for Crete, Mosel Valley, Hvar, etc.

Before:
> "Quiet bays, olive groves and ancient sites, with exclusive private resorts near Porto Heli
> and the Mani."

After:
> "Quiet bays, olive groves and ancient sites, with exclusive private resorts near Porto Heli
> and the Mani. A group can pick its own days: the Byzantine ruins at Mystras, the stone tower
> villages of the Mani, or a boat through the underground Diros Caves."

## Why this topic

Per the topic-map entry: villa-rental operators (Simpson Travel, Marriott Homes & Villas)
market the Peloponnese on property size and pool count, while Mystras, the Mani and the Diros
Caves are each independently well-covered as generic "day trip" mentions — no result ties a
specific villa stay to a structured day between these three named sites. Greece's existing
Peloponnese description already named "the Mani" as a location (near Porto Heli), so the
addition names the two further sites the research found missing (Mystras, Diros Caves) and
turns "the Mani" from a bare place-name into a specific thing to do there (its stone tower
villages), without duplicating what was already there.

## Build check

Writer ran `npm install && npm run build` from the repo root after the edit — exited clean:
"Built 12 pages + 404, /assets/site.375807097f.css, /assets/site.de78f8d8ae.js". The checker
independently re-runs this per `context/permissions.md`'s gate before any commit happens.

## Checks

- No price anywhere.
- No villa-specific amenity pitch — this is about the destination/experience, not the villa.
- No unverifiable claim ("1,000+ villas," years-in-business language, etc.).
- Matches existing voice: short, warm, specific, not generic travel-blog language.
- Maps to the `research/topic-map.md` entry "Peloponnese Beyond the Villa: Mystras, the Mani,
  and the Diros Caves."
- No customer PII, no secrets.
- No legal/tax claim.
