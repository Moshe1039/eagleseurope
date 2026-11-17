---
topic_map_entry: Provence: A Day Between L'Isle-sur-la-Sorgue and Roussillon
target_audience: B2C
edit_type: region_description
file_edited: ../src/countries.py
status: approved_published
---

# Provence region enrichment

## What changed

Enriched the `"Provence"` region description on France's existing `/luxury-villas/france/` page
(`src/countries.py`, France's `regions` tuple) from a line that already name-dropped
L'Isle-sur-la-Sorgue in passing — "Lavender fields in early summer, hilltop villages in the
Luberon and market mornings in towns like L'Isle-sur-la-Sorgue." — to add a structured day
between four named, specific places: L'Isle-sur-la-Sorgue's Sunday market, the spring-fed
Fontaine-de-Vaucluse, the clifftop village of Gordes, and the ochre cliffs of Roussillon, with
Lourmarin or Ménerbes left for a slower afternoon. Follows the same enrichment pattern already
shipped for Sicily's "Etna wines" line and Bordeaux's "private tastings" line — naming the
specific places and itinerary a generic mention only gestured at.

## Why (from `research/topic-map.md`)

WebSearch confirmed multiple independent guided day tours (ToursByLocals, mylittleadventure.com,
itineraryfrance.vercel.app) sell exactly this combination — the Sunday market in
L'Isle-sur-la-Sorgue, Fontaine-de-Vaucluse, Gordes and Roussillon — always as a van tour departing
Avignon or Arles, never from a stay based in the Luberon itself. Villa-rental listings for the
same villages (Villanovo's "Villa Luberia," Villas of Distinction's "Bastide Vallat" and "Bastide
des Chenes") describe bedroom count, pool and park views only, naming none of these four places.
France's existing description already mentioned L'Isle-sur-la-Sorgue but named no market day,
spring, or ochre village — the gap this enrichment closes.

## Checks against `context/rules.md`

1. **Claims** — no absolute/unverifiable numbers ("1,000+", "X+ years"). Everything stated is a
   real, existing public place or activity (the market, the spring, the two villages), not a
   claim about Eagle's Europe's own history or scale.
2. **Villa consent** — no villa images, prices, or descriptive text used; this is destination/
   experience copy only, not villa-specific.
3. **Research grounding** — traces directly to the "Provence: A Day Between L'Isle-sur-la-Sorgue
   and Roussillon" entry in `research/topic-map.md`. Sells the experience/destination (a day
   between named public sites), not villa amenities. No paid-acquisition framing.
4. **Data handling** — no customer PII, no secrets/keys.
5. **Legal/tax** — no legal or tax claim made.

## No price stated

Payment structure isn't mentioned at all in this edit (it's a region description, not a FAQ about
payment) — nothing to check there.

## Build note

`npm install` was needed first — `node_modules/` wasn't present in this session's checkout, so
`npm run build` initially failed on a missing `@fontsource` font file, unrelated to this content
edit. After `npm install`, the build ran clean. The build also re-stamped today's date onto
`public/sitemap.xml`, `public/privacy.html` and `public/terms.html` (via `scripts/build.py`'s
`datetime.date.today()` call) even though none of their content changed — reverted those three
files to their pre-build state before committing, following the exact convention set by commit
`988cbb8` ("Revert date-only build regeneration..."). Only `src/countries.py` and the generated
`public/luxury-villas/france/index.html` are part of this commit.
