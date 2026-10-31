---
topic_map_entry: Hvar: Lavender Fields in Velo Grablje and a Sailing Day to the Pakleni Islands
target_audience: B2C
edit_type: region_description
file_edited: ../src/countries.py
status: pending_checker_review
---

# Hvar region description enrichment

## What changed

Croatia's `regions` tuple for Hvar went from:

> "Lavender fields, a lively harbour town and quiet bays on the island's south side."

to:

> "Lavender fields, a lively harbour town and quiet bays on the island's south side. A group
> can fill its own days: a morning among the lavender rows of Velo Grablje, timed to the
> village's lavender festival at the end of June, or a full day sailing out to the Pakleni
> Islands for swimming stops and a quiet lunch anchorage before the harbour's evening lights
> come on."

## Why (per `research/topic-map.md`)

Hvar's lavender season (Velo Grablje and Brusje, with a lavender festival timed to the end of
June) and sailing day trips to the Pakleni Islands both recur as named, specific draws across
independent sources, but villa-rental listings for Hvar (Marriott Homes & Villas, CV Villas,
Holidu) describe only the properties — pools, bedroom counts, nightly rates — with no mention
of these named experiences, which live instead on separate tour/guide sites. Croatia's existing
Hvar description was generic ("lavender fields, a lively harbour town and quiet bays") with no
named places. This follows the same enrichment pattern already shipped and checker-approved for
Istria, Puglia, Tuscany, Algarve and Crete: naming the specific experiences a group can choose
between, framed as part of the stay rather than something to arrange separately.

## Checks against `context/rules.md` before handing to the checker

- No price or number anywhere.
- No claim that isn't true today — no "exclusive," "verified," or years-of-experience language.
- No villa-specific content (images, prices, descriptive text) — this is a regional description,
  not any individual property's content, so no consent question arises.
- Grounded in the topic-map entry above (already present, status was `not started`).
- No customer PII, no secrets.
- No legal/tax claim.

## Build check

`npm install && npm run build` run from the repo root after the edit: clean —
"Built 12 pages + 404, /assets/site.375807097f.css, /assets/site.de78f8d8ae.js", no errors.

## Checker verdict (2026-10-31)

**Approved.**

- Independently re-ran `rm -rf node_modules && npm install && npm run build`: clean, no errors.
- Diff scope: `git diff -- src/countries.py` shows exactly one line changed — the Hvar tuple
  inside Croatia's `regions` list. The other changed files (`public/luxury-villas/croatia/
  index.html`, `public/sitemap.xml`, `public/privacy.html`, `public/terms.html`) are the build
  script's own generated output and date stamps, same pattern as every prior
  `[PUBLISHED TO PRODUCTION]` commit (e.g. `a487648`, `bca66b4`) — not manual edits.
- Claims: no unverifiable or absolute-sounding claim; Velo Grablje, its lavender festival timing,
  and the Pakleni Islands are real, named, generic regional facts, not a claim about this
  business.
- Villa consent: no individual villa's images/prices/text used — this is a regional description,
  not villa-specific content.
- Research grounding: traces directly to the "Hvar: Lavender Fields in Velo Grablje and a
  Sailing Day to the Pakleni Islands" topic-map entry; organic framing only; experience/
  destination-focused, not villa-amenities-focused.
- Data handling: no PII, no secrets.
- Legal/tax: none present.

status: approved
