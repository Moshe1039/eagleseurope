# Topic map

Owner: keyword-researcher agent. Refresh: monthly, or on request.

This file is the single source of truth for "is this topic worth writing about." The
content-writer only drafts pages for topics listed here, and the checker rejects any draft that
doesn't trace back to an entry below.

**Research note (2026-10-18):** eagleseurope.com was not reachable from this sandbox
(`WebFetch` returned `ENOTFOUND` — this container's network policy doesn't allow it). This pass
is grounded in `context/business-summary.md`'s product description plus WebSearch results on
real competitor pages and search behavior, not a direct look at the live site's current pages.
Re-check against the live site's actual content before the content-writer finalizes a draft, in
case a page already exists on a topic below.

Entries are ordered by priority — take the top `not started` entry next.

```
## <topic / page idea>

- Target audience: B2C | B2B
- Why this topic: <what search behavior or competitor gap justifies it>
- Suggested page type: landing page | area/experience guide
- Status: not started | drafted | published
```

---

## One Price, Six Experiences: A Multi-Couple Puglia Escape

**Correction (2026-10-18, same day):** this entry originally proposed a standalone landing page,
written before the researcher had confirmed the real site structure. Puglia already has its own
page — it's a region inside `/luxury-villas/italy/`, defined in `src/countries.py`. The
underlying research (organizer pain point, no-competitor-combines-this-angle gap) was still
real and used, just integrated correctly: as a new FAQ entry on Italy's existing page instead of
a new page. See the `[PUBLISHED TO PRODUCTION]` commit on `main` from today. The original draft
at `drafts/pages/puglia-multi-couple-escape.md` is kept for the record but superseded — don't
act on it as if it's still pending.

- Target audience: B2C
- Why this topic: Searches around "Puglia villa group" return almost exclusively per-villa
  rental listings (wanderlustchloe.com, agriturismo.net, wheretostay.com) quoting nightly rates
  and amenities, plus a thin layer of generic blog itineraries (Ostuni–Alberobello–Monopoli–
  Polignano a Mare loop). None of the ranking pages frame a single curated, all-inclusive group
  package with a fixed scope of experiences to choose from — every competitor result is selling
  a specific property or a generic sightseeing list, not a decision-simplifying package for a
  group of couples. This is the clearest whitespace of the four destinations: high query
  specificity ("group-friendly accommodations Puglia", "Puglia villa sleeps 18") shows real
  organizer intent, but the all-inclusive/pick-your-experiences angle is unaddressed.
- Suggested page type: ~~landing page~~ — corrected to: new FAQ entry on the existing Italy page
- Status: **published** — as an Italy FAQ entry, not the standalone page originally planned
  (see correction note above and `src/countries.py`'s Italy `faq` list)

## Planning a Multi-Couple Tuscany Trip Without the Group-Chat Chaos

**Correction (2026-10-19):** per `context/business-summary.md`'s real site structure, Tuscany is
a region inside Italy's existing `/luxury-villas/italy/` page, not a standalone route — so this
shipped as a new FAQ entry on Italy's page (bedroom/cost-dispute angle, distinct from the
existing Puglia FAQ right above it, which covers "chasing everyone for money" rather than
bedroom allocation), not the landing page originally suggested below. See
`drafts/pages/tuscany-group-organizing-faq.md` for the full record.

- Target audience: B2C
- Why this topic: Competing results (villasofdistinction.com's "Couples/Groups" collection
  pages) explicitly acknowledge the organizer's pain point — avoiding disputes over bedrooms,
  splitting costs — but resolve it only by listing more villas at more price points, which
  pushes the decision burden back onto the one couple organizing the trip. The repeated
  framing of "cost-splitting" and "avoiding disputes" across multiple competitor snippets is a
  recurring pain signal strong enough to anchor a page that sells the *organizing experience*
  (one fixed price per person, no line-item haggling) rather than a villa spec sheet.
- Suggested page type: ~~landing page~~ — corrected to: new FAQ entry on the existing Italy page
- Status: **published** — as an Italy FAQ entry (bedroom/cost-dispute angle), checker-approved
  2026-10-19, see `drafts/pages/tuscany-group-organizing-faq.md` and the
  `[PUBLISHED TO PRODUCTION]` commit on `main` from today.

## All-Inclusive, Without the Resort: An Algarve Villa Escape for Couples 40+

**Correction (2026-10-20):** per the real site structure in `context/business-summary.md`, the
Algarve is a region inside Portugal's existing `/luxury-villas/portugal/` page, not a standalone
route — so this shipped as a new FAQ entry on Portugal's page (same correction pattern as the
Puglia and Tuscany entries above), not the landing page originally suggested below. See
`drafts/pages/algarve-all-inclusive-not-a-resort-faq.md` for the full record.

- Target audience: B2C
- Why this topic: Search results split cleanly into two unconnected categories — adults-only
  all-inclusive *hotels* (TUI BLUE Falésia, Tivoli Alvor) and self-catering group *villas* with
  optional concierge add-ons (private chef, massage, yoga arranged on request, per
  villanovo.com and similar). One source states plainly that the Algarve historically has far
  fewer all-inclusive resorts than Spain, Turkey, or Egypt. No result combines "villa privacy
  for a group" with "all-inclusive, nothing to arrange yourself" — that gap maps directly onto
  this product's actual structure and is worth claiming before a competitor notices it.
- Suggested page type: ~~landing page~~ — corrected to: new FAQ entry on the existing Portugal
  page
- Status: **drafted** — as a Portugal FAQ entry, pending checker review. See
  `drafts/pages/algarve-all-inclusive-not-a-resort-faq.md`.

## Two Couples, One Villa: A Crete Retreat Where You Choose the Excursions

- Target audience: B2C
- Why this topic: The closest direct comp found is a Grecotel hotel package (Caramel, a
  two-bedroom suite "particularly well-suited to two couples or close friends") — a hotel
  operator explicitly targeting the two-couple segment, which confirms real demand for that
  exact group shape, but it's a hotel room, not a private villa experience with a choice of
  outings. That's a specific, high-intent gap: the audience segment is proven to exist and be
  targetable, but no villa-based competitor is addressing it with an all-inclusive, pick-your-
  excursions package.
- Suggested page type: landing page
- Status: not started

## Puglia Experience Guide: Masserie Dinners, Olive Groves, and Salento Wine Tastings

- Target audience: B2C
- Why this topic: Search results surface specific, recurring experience phrasing — "dinner
  under the stars in a masseria," "tasting of typical wines and cheeses," "a day among the
  centuries-old olive trees of Salento" — coming from travel-blog and agency sources, not from
  any single authoritative destination guide. The phrasing is specific enough to indicate real
  interest in these exact experiences (not generic "things to do in Puglia"), but it's currently
  scattered across low-authority sources rather than consolidated into one guide a group could
  use to decide what to pick.
- Suggested page type: area/experience guide
- Status: not started

## Tuscany Experience Guide: Chianti Wine, Cooking Classes, or Hilltop Towns

- Target audience: B2C
- Why this topic: This maps directly onto the product's own "pick 2 of 6 attractions"
  mechanic — competitor villa listings (Chianti-region properties like Colli, hilltop farmhouse
  stays like Casa Matteucci near Lucca) each sell a single location's amenities but never frame
  the region as a menu of experiences a group selects from. An experience-guide page structured
  around "choose two of these" directly rehearses the product's own decision flow before the
  visitor ever reaches the lead form, which no competitor page does.
- Suggested page type: area/experience guide
- Status: not started

## Algarve Beyond the Beach: Cliffs, Boat Trips, and Old Town Days for Group Villa Stays

- Target audience: B2C
- Why this topic: Competitor content here is almost entirely hotel- or beach-focused (cliff-top
  resorts, adults-only beach hotels); none of the group-villa results (groupaccommodation.com,
  Marriott Homes & Villas large-group listings) go beyond "the villa has a pool and sea views"
  into a structured guide of inland/cultural options (historic Tavira, boat trips, old-town
  days). For a 40+ group that isn't purely beach-and-pool, this is an underserved angle with
  no direct competitor guide found.
- Suggested page type: area/experience guide
- Status: not started

## Crete Experience Guide: Knossos, Elafonissi, and the Wine Villages of Archanes

- Target audience: B2C
- Why this topic: Named, specific attractions recur across multiple independent sources
  (Knossos for Minoan history, Elafonissi and Balos for beaches, Archanes-area wineries and
  olive-oil tastings) — this specificity is a stronger signal than generic "best beaches in
  Crete" phrasing, since visitors searching named sites are further along in planning. No
  result ties these specific named attractions together into one guide framed for a group
  deciding what to prioritize, despite each being individually well-covered.
- Suggested page type: area/experience guide
- Status: not started

## Private Villa Offsites in Europe for Israeli Tech Leadership Teams

- Target audience: B2B
- Why this topic: Direct search for "Israeli tech company leadership retreat Europe villa"
  returned no matching reporting at all — the closest results were Far Out (Israeli corporate
  retreats, but domestic-only: desert, wineries, private farms inside Israel) and an unrelated
  non-Israeli company's Berlin retreat. Separately, a Hebrew-language source (ias.co.il) reports
  a documented shift of Israelis preferring private villas over hotels when staying in Europe.
  Those two signals together — real preference for villas abroad, zero existing content
  connecting that preference to corporate/leadership use — mark this as genuinely open ground
  rather than a contested keyword.
- Suggested page type: landing page
- Status: not started

## Villa vs. Hotel for a Leadership Retreat: Privacy, One Price, No Shared Lobby

- Target audience: B2B
- Why this topic: A generic (non-Israeli, non-tech-specific) guide to "venues for a company
  offsite abroad" exists (groupaccommodation.com) and already argues villas/country estates
  suit retreats better than hotels — confirming the comparison angle has search demand — but it
  speaks to no specific audience and doesn't address pricing structure at all. Narrowing that
  same comparison to this product's actual terms (one all-inclusive price, no published rate
  card, full-group privacy) is a straightforward differentiation play against a format
  competitors have only covered generically.
- Suggested page type: landing page
- Status: not started
</content>
