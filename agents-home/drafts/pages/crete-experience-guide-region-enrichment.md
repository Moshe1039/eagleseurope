---
topic_map_entry: Crete Experience Guide: Knossos, Elafonissi, and the Wine Villages of Archanes
target_audience: B2C
edit_type: region_description
file_edited: ../src/countries.py
status: approved
---

# Crete region enrichment

Per `context/business-summary.md`'s real site structure, there is no "area/experience guide"
page type — only `/` and `/luxury-villas/<country>/` exist — so this ships as an enrichment of
the existing Crete region description on Greece's `/luxury-villas/greece/` page (same correction
pattern as the Puglia, Tuscany, and Algarve experience-guide entries before it).

## What changed

`src/countries.py`, Greece's `regions` list, the `"Crete"` tuple. Added one sentence naming
three specific, researched attractions: the Minoan palace at Knossos, the beach at Elafonissi,
and the wine villages of Archanes — framed as days a group picks from, echoing the product's
own "pick 2 of 6" mechanic, consistent with how the Tuscany enrichment used the same framing.

Before:
> "Greece's largest island: mountain villages, gorges, lagoons like Balos and villas above
> Chania and Elounda."

After:
> "Greece's largest island: mountain villages, gorges, lagoons like Balos and villas above
> Chania and Elounda. A group can pick its own days: the Minoan palace at Knossos, the
> pink-tinted sands of Elafonissi, or a morning among Archanes' wine villages tasting local
> vintages and olive oil."

## Why this topic

Per the topic-map entry: named, specific attractions (Knossos for Minoan history, Elafonissi and
Balos for beaches, Archanes-area wineries and olive-oil tastings) recur across multiple
independent sources, but no result ties them together into one guide framed for a group
deciding what to prioritize. Balos was already present in the existing copy; this addition adds
the three attractions the research found missing (Knossos, Elafonissi, Archanes) without
duplicating it.

## Checker verdict

**Approved**, 2026-10-26. Checked: (1) diff via `git diff src/countries.py` touches only the
`"Crete"` tuple inside Greece's existing `regions` list — no other file, no new top-level key.
(2) Independently re-ran `npm install && npm run build` — exits clean, "Built 12 pages + 404,
...". (3) No banned/unverifiable claims. (4) No villa-specific content — this is
destination/experience copy, not a villa pitch, so owner-consent is not applicable. (5) Maps
directly to the `research/topic-map.md` "Crete Experience Guide" entry; organic framing only;
about the destination, not villa amenities. (6) No customer PII or secrets. (7) No legal/tax
claim.

## Checks

- No price anywhere.
- No villa-specific amenity pitch — this is about the destination/experience, not the villa.
- No unverifiable claim ("1,000+ villas," years-in-business language, etc.).
- Matches existing voice: short, warm, specific, not generic travel-blog language.
- Maps to the `research/topic-map.md` entry "Crete Experience Guide: Knossos, Elafonissi, and
  the Wine Villages of Archanes."
- No customer PII, no secrets.
- No legal/tax claim.
