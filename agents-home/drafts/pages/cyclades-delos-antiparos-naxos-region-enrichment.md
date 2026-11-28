---
topic_map_entry: The Cyclades: A Day on Delos, the Cave of Antiparos and Naxos's Portara
target_audience: B2C
edit_type: region_description
file_edited: ../src/countries.py
status: pending_checker_review
---

# What changed

Enriched the Cyclades region description on Greece's existing `/luxury-villas/greece/` page
(`src/countries.py`, Greece's `regions` list). The description previously named only the islands
themselves ("Mykonos, Paros, Naxos and Antiparos: white villages, windmills and boat days
between islands") with no specific attraction — the last region on the entire site still at that
generic stage; every other region across all 9 countries already carries a named-attraction
enrichment sentence.

Added one sentence naming three specific, independently-sourced experiences:

- A day trip from Mykonos to **Delos**, the sacred ancient island (UNESCO-listed archaeological
  site, boat-only access).
- The **Cave of Antiparos**, up Agios Ioannis Hill, known for its stalactites and stalagmites.
- Naxos's marble **Portara** (the giant doorway at the harbour entrance) and the **Old Market**
  quarter of Naxos Town.

# Why

See `research/topic-map.md`, "The Cyclades: A Day on Delos, the Cave of Antiparos and Naxos's
Portara" (added 2026-11-28). WebSearch on Cyclades island-hopping itineraries (The Thinking
Traveller, Greeka, Kimkim, Layla) consistently named these same three sites as the specific
stops within reach of a Mykonos/Paros/Antiparos/Naxos base — but no villa-rental listing names
them, and the site's own existing description didn't either. This follows the identical
enrichment pattern already shipped for every other region on the site (most recently Comporta,
Ibiza, and the Côte d'Azur).

The existing Cyclades FAQ ("does every couple need to book its own ferry?") already covers the
organizer-logistics pain point for this region; this edit is a separate fix to the region
*description* itself, which still named no actual attraction.

# Checks

- No price, discount, or payment term mentioned.
- No unverifiable absolute claim ("1,000+ villas," years of experience, etc.).
- No villa owner's images, prices, or descriptive text used — these are public, named
  destinations/attractions (an ancient archaeological site, a public cave, a public square), not
  any specific villa's content.
- No customer PII, no API keys or secrets.
- No legal/tax claim made.
- Matches existing house style (short, specific, "a group can fill its own day with..."
  structure used throughout every other region on the site).
