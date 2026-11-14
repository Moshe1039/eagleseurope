---
topic_map_entry: Corfu Beyond the Pool: Paleokastritsa's Coves and an Old Town Evening
target_audience: B2C
edit_type: region_description
file_edited: ../src/countries.py
status: pending_checker_review
---

# Corfu region enrichment (Greece page)

## What changed

Enriched the `"Corfu"` region description inside Greece's `regions` list in `src/countries.py`.

**Before:**
> Green hills running down to the Ionian Sea, Venetian old town and calm swimming coves.

**After:**
> Green hills running down to the Ionian Sea, Venetian old town and calm swimming coves. A group
> can fill its own day here too: the turquoise coves beneath Paleokastritsa's cliff-top monastery
> in the morning, then an evening wander through the old town's Venetian lanes before a quiet
> dinner on one of its squares.

## Why

Per the topic-map entry: small-group and private tours out of Corfu Town (Musement, Greeking.me,
Lokalee, Clicatour) sell a named day combining Paleokastritsa's coves and monastery with an Old
Town walk, always as a tour with hotel pickup, never from a stay based in a private villa. Corfu
villa-rental listings describe bedroom count, pool and sea view only, naming neither
Paleokastritsa nor the Old Town. The existing Corfu region description on Greece's page gestured
at "Venetian old town" and "calm swimming coves" in passing but named no specific bay, monastery,
or itinerary — the same generic-mention gap already closed for Crete and the Peloponnese on this
same Greece page, and for Sicily's "Etna wines" / Andalusia's "white villages" lines elsewhere.

## Checks applied before calling this done

- **No price** anywhere in the new text.
- **No villa-specific content** — Paleokastritsa and the Old Town are public sites, not any
  villa owner's property, images, or descriptive text, so no consent question arises.
- **No unverifiable claims** — nothing like "1,000+ verified villas" or years-of-experience
  language.
- **Sells the experience, not the villa** — the addition is about a day out, consistent with the
  "pick 2 of 6 attractions" framing and the pattern already shipped for Crete, Peloponnese,
  Sintra, Istria, Hvar, and others.
- **Matches existing voice** — short, warm, specific; follows the same "a group can fill its own
  day here too: ..." construction used for Crete, Peloponnese, Douro Valley, and Sintra on
  neighboring country pages.
- **Build**: `npm install && npm run build` run from repo root — clean, 12 pages + 404 built.
