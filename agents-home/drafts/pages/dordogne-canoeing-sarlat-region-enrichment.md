---
topic_map_entry: Dordogne: Canoeing to La Roque-Gageac and Sarlat's Market Day
target_audience: B2C
edit_type: region_description
file_edited: ../src/countries.py
status: approved_published
---

# Dordogne region enrichment — canoeing to La Roque-Gageac and Sarlat's market day

## What changed

Enriched the Dordogne region description inside France's `regions` list in `../src/countries.py`.
Added one sentence naming two specific experiences (a canoe trip past La Roque-Gageac toward
Domme, and Sarlat's Saturday market with a winter truffle hunt) to the existing generic
description, following the same pattern already shipped for Tuscany, Puglia, Mallorca, Istria,
Hvar, Mosel Valley, the Wachau Valley, the Peloponnese and Sardinia.

Before:
> Châteaux above the river, quiet countryside, truffles and walnuts: a slower, greener France.

After:
> Châteaux above the river, quiet countryside, truffles and walnuts: a slower, greener France. A
> group can fill its own day with a canoe down the river past La Roque-Gageac's cliffside houses
> toward Domme, or a Saturday morning at Sarlat's market, with a winter truffle hunt in the
> surrounding countryside for those visiting in season.

## Why (traces to research/topic-map.md)

Topic-map entry: "Dordogne: Canoeing to La Roque-Gageac and Sarlat's Market Day" (added
2026-11-04 by the keyword-researcher fallback pass). WebSearch found named outfitters (Canoë
Dordogne, Canoës Loisirs Dordogne, Canoë Randonnée Dordogne) selling the La Roque-Gageac/
Domme/Carsac canoe stretch, and named guided tours (Ophorus's "Sarlat Market & Gourmet Food
Tour", Magpie Travel) selling Sarlat's market plus winter truffle hunts — both independently
corroborated (CheckYeti/Manawa for canoeing, Lonely Planet/Rick Steves for Sarlat) — while villa
listings (Clickstay, A.M.A Selections, Villaforyou, SimplyOwners) describe pool/garden/games-room
amenities only, naming neither experience. No result combines a private villa stay with either
experience as one package — this enrichment closes that gap the same way it's been closed for
eight other regions already.

## Checks against house rules

- No price or payment figure mentioned.
- No unverifiable absolute claim ("1,000+ villas", years-in-business, etc.).
- Sells the experience/destination, not villa amenities — the added sentence is entirely about
  the canoe trip and the market/truffle day, not pool/bedroom features.
- No villa owner's name, image, or descriptive text used — this is destination/experience copy
  only, no specific property referenced.
- No customer PII, no API keys/secrets.
- No legal/tax claim made.
- Matches existing voice: short, warm, specific — mirrors the exact "A group can fill its own
  day with..." phrasing already live on the Mosel Valley, Wachau Valley and Sardinia
  enrichments.

## Build check

Ran `npm install && npm run build` from the repo root after making the edit — succeeded:
"Built 12 pages + 404, /assets/site.375807097f.css, /assets/site.de78f8d8ae.js", no errors.
Reverted the build's unrelated date-only `lastmod`/"Last updated" regeneration in
`public/privacy.html`, `public/terms.html` and `public/sitemap.xml` (today's date only, nothing
to do with this content edit), per the same precedent as prior enrichment passes.

## Checker verdict (2026-11-05)

**Approved.** Independently re-ran `npm install && npm run build` from repo root — clean, no
errors, same output as the writer's own run. Confirmed the diff touches only: `src/countries.py`
(one line, the Dordogne region tuple in France's `regions` list), the corresponding derived
build output `public/luxury-villas/france/index.html`, and `agents-home/` bookkeeping
(`research/topic-map.md`, this draft file) — nothing else. The build again regenerated
date-only `lastmod`/"Last updated" stamps in `public/privacy.html`, `public/terms.html` and
`public/sitemap.xml` purely from today's date; reverted those after this independent build run
too, since they're unrelated to this content edit and the gate requires the diff touch nothing
but the countries.py content path. Checked against `context/rules.md`: no unprovable claim
("1,000+ villas"-style phrasing or similar), no villa-specific content/images/price used
(destination/experience copy only — canoeing and the Sarlat market/truffle day, not villa
amenities), traces directly to the topic-map entry "Dordogne: Canoeing to La Roque-Gageac and
Sarlat's Market Day", no paid-acquisition framing, no customer PII or secrets, no legal/tax
claim made. Clear to publish.
