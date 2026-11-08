---
topic_map_entry: "Bordeaux: A Right Bank Day Between Saint-Émilion's Grand Cru Châteaux"
target_audience: B2C
edit_type: region_description
file_edited: ../src/countries.py
status: approved_published
---

# Bordeaux region enrichment — a Right Bank day between Saint-Émilion's Grand Cru châteaux

## What changed

Enriched the Bordeaux wine country region description inside France's `regions` list in
`../src/countries.py`. Added one sentence naming two specific, verifiable things — a walk
through Saint-Émilion's medieval village and its underground monolithic church (a real, named
public landmark, not a specific commercial operator), followed by tastings at neighboring Grand
Cru Classé châteaux on the Right Bank — to the existing generic description. Same pattern already
shipped for Dordogne, Mosel Valley, Wachau Valley and others.

Before:
> Vineyard estates around Saint-Émilion and the Médoc, with private tastings arranged at the
> châteaux.

After:
> Vineyard estates around Saint-Émilion and the Médoc, with private tastings arranged at the
> châteaux. A group can fill its own day with a walk through Saint-Émilion's medieval village and
> its underground monolithic church, followed by tastings arranged at neighboring Grand Cru
> Classé châteaux on the Right Bank.

## Why (traces to research/topic-map.md)

Topic-map entry: "Bordeaux: A Right Bank Day Between Saint-Émilion's Grand Cru Châteaux" (added
2026-11-07 by the keyword-researcher fallback pass). WebSearch found half- and full-day
small-group tours from Bordeaux city (Klook, The Tour Guy, Europe Express, Lokalee) selling a
Saint-Émilion village walk plus a Grand Cru Classé château tasting, always departing by van from
the city rather than from a stay in the vineyards. Villa listings for the same area (Villanovo's
"Villa dans les vignes" and "Villa Nalou," CV Villas) describe pool, bedroom count and vineyard
views only, naming no château, village landmark or itinerary. The existing Bordeaux description
already promised "private tastings arranged at the châteaux" but named no specific village
landmark or structured day — this closes that same generic-mention gap already closed for
Sicily's "Etna wines" line and for Mosel/Wachau on other country pages.

I did not name a specific château by name (no villa-owner/business consent on file for any
named château, and none is needed — the public landmark named is the Saint-Émilion monolithic
church, a well-documented UNESCO-listed public site, not a private business).

## Checks against house rules

- No price or payment figure mentioned.
- No unverifiable absolute claim ("1,000+ villas", years-in-business, etc.).
- Sells the experience/destination, not villa amenities — the added sentence is entirely about
  the village walk and château tastings, not pool/bedroom features.
- No villa owner's name, image, or descriptive text used, and no specific commercial château
  named — only a public, independently-documented landmark (the Saint-Émilion monolithic church)
  and the general "Grand Cru Classé" classification tier, not a specific property.
- No customer PII, no API keys/secrets.
- No legal/tax claim made.
- Matches existing voice: short, warm, specific — mirrors the exact "A group can fill its own
  day with..." phrasing already live on the Dordogne, Mosel Valley and Wachau Valley
  enrichments on sibling pages.

## Build check

Ran `npm install && npm run build` from the repo root after making the edit — succeeded:
"Built 12 pages + 404, /assets/site.375807097f.css, /assets/site.de78f8d8ae.js", no errors.
Reverted the build's unrelated date-only `lastmod`/"Last updated" regeneration in
`public/privacy.html`, `public/terms.html` and `public/sitemap.xml` (today's date only, nothing
to do with this content edit), per the same precedent as every prior enrichment pass.

## Checker verdict (2026-11-08)

**Approved.** Independently re-ran `npm install && npm run build` from repo root — clean, no
errors, same output as the writer's own run. Confirmed the diff touches only: `src/countries.py`
(one line, the Bordeaux wine country region tuple in France's `regions` list), the corresponding
derived build output `public/luxury-villas/france/index.html`, and `agents-home/` bookkeeping
(`research/topic-map.md`, this draft file) — nothing else. The build again regenerated
date-only `lastmod`/"Last updated" stamps in `public/privacy.html`, `public/terms.html` and
`public/sitemap.xml` purely from today's date; reverted those after this independent build run
too, since they're unrelated to this content edit and the gate requires the diff touch nothing
but the countries.py content path. Checked against `context/rules.md`: no unprovable claim
("1,000+ villas"-style phrasing or similar), no villa-specific content/images/price used
(destination/experience copy only — a public landmark and the general "Grand Cru Classé"
classification tier, not any specific named château or villa), traces directly to the
topic-map entry "Bordeaux: A Right Bank Day Between Saint-Émilion's Grand Cru Châteaux", no
paid-acquisition framing, no customer PII or secrets, no legal/tax claim made. Clear to
publish.
