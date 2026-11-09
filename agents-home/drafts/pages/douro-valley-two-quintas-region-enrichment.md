---
topic_map_entry: Douro Valley: A Private Boat Crossing Between Two Quintas
target_audience: B2C
edit_type: region_description
file_edited: ../src/countries.py
status: pending_checker_review
---

# Douro Valley region enrichment (Portugal page)

## What changed

Enriched the `"Douro Valley"` region description in `src/countries.py`'s Portugal entry (the
`regions` list) from the generic:

> "Terraced vineyards along the river, port and wine quintas, and boat trips through the valley."

to a version adding a concrete day-shape — a two-quinta visit linked by a private river boat
crossing — matching the pattern already shipped for Mosel Valley, Wachau Valley, Bordeaux and
others on sibling country pages:

> "Terraced vineyards along the river, port and wine quintas, and boat trips through the valley.
> A group can fill its own day here too: a private tasting at one quinta on the valley slopes, a
> short river crossing by boat to a second quinta on the opposite bank for a terrace lunch, and
> the rest of the afternoon free before the boat brings everyone back."

## Why

Per `research/topic-map.md`'s "Douro Valley" entry (added 2026-11-07 by the keyword-researcher
fallback pass): WebSearch found small-group and private day tours from Porto (Winedering,
Musement, My Little Adventure) selling a two-quinta wine tasting plus a one-hour river boat ride
and a regional lunch, but always as a bus/van day trip departing the city, never from a stay
based in the valley itself. Quinta-rental listings for the valley (CV Villas, Tripwix, Marriott
Homes & Villas) describe pool, bedroom count and terraced views only, naming no second quinta or
boat crossing. The existing region description only mentioned "boat trips through the valley" in
general terms with no structured day — this closes that gap without naming any specific quinta,
since the research didn't surface two verifiably-partnered quintas to name (unlike Mosel's named
villages or Bordeaux's named village), only the day-shape itself. Kept the add generic on the
"which quinta" question for that reason, consistent with the "claims must be provable today"
rule — nothing here asserts a relationship with a named estate that hasn't been arranged.

## Checks against the house rules

- No price or payment figure mentioned.
- No unverifiable absolute claims ("1,000+ villas," years-of-experience language).
- No specific quinta named, since the research didn't confirm one is actually bookable through
  Eagle's today — avoids a claim that isn't provable.
- Sells the experience (tasting, river crossing, terrace lunch), not villa amenities.
- Only an existing region's description string was touched — no new FAQ, no new region, no new
  route, no other file.
- The boat-crossing/two-quinta framing is drawn from the topic-map entry's own research, not
  invented here.

## Build check

Ran `npm install && npm run build` from the repo root after the edit: succeeded with no errors.
Spot-checked that the Douro Valley region's new text appears in the built Portugal page output.

Status after this: `src/countries.py` edit is in place, build is clean, topic-map entry updated
to `drafted`. Awaiting independent checker re-verification before any commit/push.

## Checker verdict (2026-11-09)

**Approved.** Independently re-ran `rm -rf node_modules && npm install && npm run build` —
clean, same output (12 pages + 404, CSS/JS bundles). `git diff -- src/countries.py` confirmed the
change touches only the `"Douro Valley"` tuple inside Portugal's `regions` list — no new key, no
file outside `src/countries.py` (the `public/` diffs are the build script's own regenerated
output, not a manual edit). Checked against `context/rules.md`: no unprovable claims (no specific
quinta named, deliberately, since no bookable partner was confirmed), no villa-specific content
requiring consent, maps directly to the "Douro Valley" topic-map entry and stays
organic/experience-framed (tasting, boat crossing, lunch — not villa amenities), no PII or
secrets, no legal/tax claim. Clear to commit as `[PUBLISHED TO PRODUCTION]` and push to `main`.
