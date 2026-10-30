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
- Status: **published** — as a Portugal FAQ entry, checker-approved 2026-10-20, see
  `drafts/pages/algarve-all-inclusive-not-a-resort-faq.md` and the `[PUBLISHED TO PRODUCTION]`
  commit on `main` (`e633f75`) from that day. **Bookkeeping correction (2026-10-21):** this
  entry was left at `drafted` after it actually published on 2026-10-20 — the `[PUBLISHED TO
  PRODUCTION]` commit and that day's report both confirm it went live same-day. Fixed here so
  the next pass doesn't mistake this for still-pending.

## Two Couples, One Villa: A Crete Retreat Where You Choose the Excursions

- Target audience: B2C
- Why this topic: The closest direct comp found is a Grecotel hotel package (Caramel, a
  two-bedroom suite "particularly well-suited to two couples or close friends") — a hotel
  operator explicitly targeting the two-couple segment, which confirms real demand for that
  exact group shape, but it's a hotel room, not a private villa experience with a choice of
  outings. That's a specific, high-intent gap: the audience segment is proven to exist and be
  targetable, but no villa-based competitor is addressing it with an all-inclusive, pick-your-
  excursions package.
- Suggested page type: ~~landing page~~ — corrected to: new FAQ entry on the existing Greece
  page (Crete is a region there, not a standalone route, per `context/business-summary.md`)
- Status: **published** — as a Greece FAQ entry, checker-approved 2026-10-21, see
  `drafts/pages/crete-two-couples-excursions-faq.md` and the `[PUBLISHED TO PRODUCTION]` commit
  on `main` from today.

## Puglia Experience Guide: Masserie Dinners, Olive Groves, and Salento Wine Tastings

**Correction (2026-10-23):** per `context/business-summary.md`'s real site structure, there is
no "area/experience guide" page type — only `/` and `/luxury-villas/<country>/` exist — so this
shipped as an enrichment of the existing Puglia region description on Italy's page (same
correction pattern as the four prior entries above), not a standalone guide page. See
`drafts/pages/puglia-experience-guide-region-enrichment.md` for the full record.

- Target audience: B2C
- Why this topic: Search results surface specific, recurring experience phrasing — "dinner
  under the stars in a masseria," "tasting of typical wines and cheeses," "a day among the
  centuries-old olive trees of Salento" — coming from travel-blog and agency sources, not from
  any single authoritative destination guide. The phrasing is specific enough to indicate real
  interest in these exact experiences (not generic "things to do in Puglia"), but it's currently
  scattered across low-authority sources rather than consolidated into one guide a group could
  use to decide what to pick.
- Suggested page type: ~~area/experience guide~~ — corrected to: enriched Puglia region
  description on the existing Italy page
- Status: **published** — checker-approved 2026-10-23, see
  `drafts/pages/puglia-experience-guide-region-enrichment.md` and the `[PUBLISHED TO
  PRODUCTION]` commit on `main` from today.

## Tuscany Experience Guide: Chianti Wine, Cooking Classes, or Hilltop Towns

**Correction (2026-10-24):** per `context/business-summary.md`'s real site structure, there is
no "area/experience guide" page type — only `/` and `/luxury-villas/<country>/` exist — so this
shipped as an enrichment of the existing Tuscany region description on Italy's page (same
correction pattern as the Puglia experience-guide entry above). See
`drafts/pages/tuscany-experience-guide-region-enrichment.md` for the full record.

- Target audience: B2C
- Why this topic: This maps directly onto the product's own "pick 2 of 6 attractions"
  mechanic — competitor villa listings (Chianti-region properties like Colli, hilltop farmhouse
  stays like Casa Matteucci near Lucca) each sell a single location's amenities but never frame
  the region as a menu of experiences a group selects from. An experience-guide page structured
  around "choose two of these" directly rehearses the product's own decision flow before the
  visitor ever reaches the lead form, which no competitor page does.
- Suggested page type: ~~area/experience guide~~ — corrected to: enriched Tuscany region
  description on the existing Italy page
- Status: **published** — checker-approved 2026-10-24, see
  `drafts/pages/tuscany-experience-guide-region-enrichment.md` and the `[PUBLISHED TO
  PRODUCTION]` commit on `main` from today.

## Algarve Beyond the Beach: Cliffs, Boat Trips, and Old Town Days for Group Villa Stays

**Correction (2026-10-25):** per `context/business-summary.md`'s real site structure, there is
no "area/experience guide" page type — only `/` and `/luxury-villas/<country>/` exist — so this
shipped as an enrichment of the existing Algarve region description on Portugal's page (same
correction pattern as the Puglia and Tuscany experience-guide entries above). See
`drafts/pages/algarve-beyond-the-beach-region-enrichment.md` for the full record.

- Target audience: B2C
- Why this topic: Competitor content here is almost entirely hotel- or beach-focused (cliff-top
  resorts, adults-only beach hotels); none of the group-villa results (groupaccommodation.com,
  Marriott Homes & Villas large-group listings) go beyond "the villa has a pool and sea views"
  into a structured guide of inland/cultural options (historic Tavira, boat trips, old-town
  days). For a 40+ group that isn't purely beach-and-pool, this is an underserved angle with
  no direct competitor guide found.
- Suggested page type: ~~area/experience guide~~ — corrected to: enriched Algarve region
  description on the existing Portugal page
- Status: **published** — checker-approved 2026-10-25, see
  `drafts/pages/algarve-beyond-the-beach-region-enrichment.md` and the `[PUBLISHED TO
  PRODUCTION]` commit on `main` from today.

## Crete Experience Guide: Knossos, Elafonissi, and the Wine Villages of Archanes

**Correction (2026-10-26):** per `context/business-summary.md`'s real site structure, there is
no "area/experience guide" page type — only `/` and `/luxury-villas/<country>/` exist — so this
shipped as an enrichment of the existing Crete region description on Greece's page (same
correction pattern as the Puglia, Tuscany, and Algarve experience-guide entries above). See
`drafts/pages/crete-experience-guide-region-enrichment.md` for the full record.

- Target audience: B2C
- Why this topic: Named, specific attractions recur across multiple independent sources
  (Knossos for Minoan history, Elafonissi and Balos for beaches, Archanes-area wineries and
  olive-oil tastings) — this specificity is a stronger signal than generic "best beaches in
  Crete" phrasing, since visitors searching named sites are further along in planning. No
  result ties these specific named attractions together into one guide framed for a group
  deciding what to prioritize, despite each being individually well-covered.
- Suggested page type: ~~area/experience guide~~ — corrected to: enriched Crete region
  description on the existing Greece page
- Status: **published** — checker-approved 2026-10-26, see
  `drafts/pages/crete-experience-guide-region-enrichment.md` and the `[PUBLISHED TO
  PRODUCTION]` commit on `main` (`60d29b6`) from that day. **Bookkeeping correction
  (2026-10-27):** this entry was left at `drafted — pending checker review` after it actually
  published on 2026-10-26 — the draft file's own `status: approved` front matter, the checker
  verdict recorded in it, and the `[PUBLISHED TO PRODUCTION]` commit all confirm it went live
  same-day. Fixed here so the next pass doesn't mistake this for still-pending (same recurring
  bookkeeping slip as the Algarve entry above on 2026-10-21).

## Private Villa Offsites in Europe for Israeli Tech Leadership Teams

**Correction (2026-10-27):** per `context/business-summary.md`'s real site structure, there is
no standalone "landing page" type — only `/` and `/luxury-villas/<country>/` exist — so this
shipped as a new FAQ entry on Switzerland's existing `/luxury-villas/switzerland/` page (same
correction pattern as every prior entry above, applied here to a B2B topic for the first time —
Switzerland was picked because its existing copy already sells the privacy/chef/host structure a
leadership-retreat buyer needs, without contradicting anything there). See
`drafts/pages/switzerland-leadership-offsite-faq.md` for the full record.

- Target audience: B2B
- Why this topic: Direct search for "Israeli tech company leadership retreat Europe villa"
  returned no matching reporting at all — the closest results were Far Out (Israeli corporate
  retreats, but domestic-only: desert, wineries, private farms inside Israel) and an unrelated
  non-Israeli company's Berlin retreat. Separately, a Hebrew-language source (ias.co.il) reports
  a documented shift of Israelis preferring private villas over hotels when staying in Europe.
  Those two signals together — real preference for villas abroad, zero existing content
  connecting that preference to corporate/leadership use — mark this as genuinely open ground
  rather than a contested keyword.
- Suggested page type: ~~landing page~~ — corrected to: new FAQ entry on the existing
  Switzerland page
- Status: **published** — checker-approved 2026-10-27, see
  `drafts/pages/switzerland-leadership-offsite-faq.md` and the `[PUBLISHED TO PRODUCTION]`
  commit on `main` from today.

## Villa vs. Hotel for a Leadership Retreat: Privacy, One Price, No Shared Lobby

**Rejected (2026-10-28):** the 2026-10-27 report flagged this entry explicitly as needing a
human call before acting, because it overlaps heavily in theme with the B2B FAQ already
published on Switzerland's page that same day ("Can a company book...for a leadership team
offsite") — the report said so should ship as its own entry on a *different* country, or be
marked superseded, and asked for a human decision rather than deciding unilaterally. Today's
pass initially missed that flag, drafted this as a second Switzerland FAQ, got it through a
build-clean checker pass — then, before committing, re-read yesterday's report, recognized the
drafted FAQ substantially restates the existing one (both lean on "no shared hotel lobby" and
"one all-inclusive price"), and reverted the `src/countries.py` edit rather than publish
genuinely redundant content. Nothing was committed or pushed. See
`drafts/pages/switzerland-villa-vs-hotel-faq.md` for the full record, including the rejected
draft text, and today's report for the open question this still leaves for the human.

- Target audience: B2B
- Why this topic: A generic (non-Israeli, non-tech-specific) guide to "venues for a company
  offsite abroad" exists (groupaccommodation.com) and already argues villas/country estates
  suit retreats better than hotels — confirming the comparison angle has search demand — but it
  speaks to no specific audience and doesn't address pricing structure at all. Narrowing that
  same comparison to this product's actual terms (one all-inclusive price, no published rate
  card, full-group privacy) is a straightforward differentiation play against a format
  competitors have only covered generically.
- Suggested page type: ~~landing page~~ — corrected to: new FAQ entry, but on which country is
  the open question (see rejection note above)
- Status: **not started** — human input needed on whether to use a different country's page, or
  mark this entry superseded by the existing Switzerland FAQ. Not re-attempted until that's
  answered. **Still unresolved as of 2026-10-29 (third day running) — see today's report.**
  Because this is the only `not started` entry and it's explicitly blocked pending a human call,
  today's pass treated the topic map as having no safe actionable entry and ran the
  keyword-researcher fallback (per the routine's step 2) to add fresh entries below rather than
  re-attempting this one a third time.

## Istria Beyond the Coast: Truffle Hunts in Motovun, Hilltop Grožnjan, and Malvazija Wine Tastings

- Target audience: B2C
- Why this topic: Istria truffle-hunting experiences (private hunts with trained dogs near
  Motovun and Buzet, e.g. Karlić Tartufi) and Malvazija wine tastings are sold everywhere as
  standalone day activities or tours, consistently paired with named hilltop towns (Motovun,
  Grožnjan) across travel-guide and tour-operator sources. Villa rental listings for the region
  separately note that "many guests plan trips around truffle hunts" as an add-on, but no result
  found bundles a private villa stay with these named experiences as one package — every
  competitor sells either the villa or the truffle/wine day, never both together. Croatia's
  existing page already covers the Dalmatian Coast, Hvar and Istria, but Istria's current region
  description (`src/countries.py`) is generic ("hill towns, truffles, olive oil and wine") with
  no named places — this is the same enrichment pattern already shipped for Puglia, Tuscany,
  Algarve and Crete, applied to Istria's un-enriched description.
- Suggested page type: enriched Istria region description on the existing Croatia page
- Status: **published** — checker-approved 2026-10-29, see
  `drafts/pages/istria-beyond-the-coast-region-enrichment.md` and the `[PUBLISHED TO PRODUCTION]`
  commit on `main` (`a487648`) from today.

## Mosel Valley: A Villa Base for Riverside Wine Villages Between Traben-Trarbach and Zell

- Target audience: B2C
- Why this topic: Search results split the same way as every prior enrichment gap — wine-tasting
  venues and guided tours (Villa Huesgen's Art Nouveau tastings, Visit Moselle's guided
  Via Mosel walks, Zell's gourmet weekend package) on one side, and general holiday-home listings
  (Villa for You, Micazu) with no tasting experience built in on the other. Nothing found
  combines a private group villa stay with a curated Mosel wine-village itinerary as one
  package. Germany's existing Mosel Valley region description (`src/countries.py`) only
  mentions "steep Riesling vineyards, half-timbered villages and river cruises" in general terms
  — the same gap the Puglia/Tuscany/Algarve/Crete enrichments closed elsewhere: named villages
  and a specific tasting experience are missing.
- Suggested page type: enriched Mosel Valley region description on the existing Germany page
- Status: **published** — checker-approved 2026-10-30, see
  `drafts/pages/mosel-valley-region-enrichment.md` and the `[PUBLISHED TO PRODUCTION]` commit
  on `main` (`bca66b4`) from today.

## Hvar: Lavender Fields in Velo Grablje and a Sailing Day to the Pakleni Islands

- Target audience: B2C
- Why this topic: Hvar's lavender season (Velo Grablje and Brusje, with a lavender festival at
  the end of June) and sailing day trips to the Pakleni Islands both recur as named, specific
  draws across independent sources, but villa-rental listings for Hvar (Marriott Homes & Villas,
  CV Villas, Holidu) describe the properties only — pools, bedroom counts, nightly rates — with
  no mention of these named experiences, and the lavender/sailing content lives on separate
  tour/guide sites. Croatia's existing Hvar region description (`src/countries.py`) currently
  says only "lavender fields, a lively harbour town and quiet bays" with no named places —
  enriching it with Velo Grablje, the lavender festival timing, and a named Pakleni Islands
  sailing day follows the same pattern already shipped for Puglia, Tuscany, Algarve and Crete.
- Suggested page type: enriched Hvar region description on the existing Croatia page
- Status: not started
</content>
