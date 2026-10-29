---
topic_map_entry: Istria Beyond the Coast: Truffle Hunts in Motovun, Hilltop Grožnjan, and Malvazija Wine Tastings
target_audience: B2C
edit_type: region_description
file_edited: ../src/countries.py
status: pending_checker_review
---

# Istria region description enrichment

## What changed

Croatia's `regions` tuple for Istria went from:

> "Hill towns, truffles, olive oil and wine, with an easy coastline below."

to:

> "Hill towns, truffles, olive oil and wine, with an easy coastline below. A group can fill its
> own days: a private truffle hunt with trained dogs in the oak forests near Motovun, an
> afternoon among Grožnjan's hilltop lanes of galleries and stone houses, or a morning tasting
> Malvazija at a family winery before heading back down to the coast."

## Why (per `research/topic-map.md`)

Truffle hunting near Motovun, Malvazija wine tastings, and hilltop towns like Grožnjan recur
constantly across travel-guide and tour-operator search results, but always as standalone
day activities sold apart from lodging — never bundled into a private villa stay. Croatia's
existing Istria description was generic ("hill towns, truffles, olive oil and wine") with no
named places. This follows the same enrichment pattern already shipped and checker-approved
for Puglia, Tuscany, Algarve and Crete: naming the specific experiences a group can choose
between, framed as part of the stay rather than something to arrange separately.

## Checks against `context/rules.md` before handing to the checker

- No price or number anywhere.
- No claim that isn't true today — no "exclusive," "verified," or years-of-experience language.
- No villa-specific content (images, prices, descriptive text) — this is a regional description,
  not any individual property's content, so no consent question arises.
- Grounded in the topic-map entry above (new entry added this run).
- No customer PII, no secrets.
- No legal/tax claim.

## Build check

`npm install && npm run build` run from the repo root after the edit: clean —
"Built 12 pages + 404, /assets/site.375807097f.css, /assets/site.de78f8d8ae.js", no errors.

## Checker verdict (2026-10-29)

**Approved.**

- Independently re-ran `npm install && npm run build`: clean, no errors.
- Diff scope: `git diff src/countries.py` shows exactly one line changed — the Istria tuple in
  Croatia's `regions` list. No other key, no other file outside the expected build-regenerated
  `public/` output (same files/pattern as every prior `[PUBLISHED TO PRODUCTION]` commit, e.g.
  `ab0871f`, `60d29b6`) touched.
- Claims: no unverifiable or absolute-sounding claim; Motovun truffle hunting, Grožnjan, and
  Malvazija are real, named, generic regional facts, not a claim about this business.
- Villa consent: no individual villa's images/prices/text used — this is a regional
  description, not villa-specific content.
- Research grounding: traces to the "Istria Beyond the Coast" topic-map entry added this run;
  organic framing only; experience/destination-focused, not villa-amenities-focused.
- Data handling: no PII, no secrets.
- Legal/tax: none present.

status: approved
