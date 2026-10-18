# Rules the checker enforces

Any agent producing content, copy, or a claim must satisfy these before the checker approves it.
If a rule is unclear for a specific case, the checker returns it to the human rather than
guessing.

## 1. Claims must be provable today

No claim goes out — on the site, in drafts, in outreach — unless it's true right now. In
particular:

- Phrasings like **"1,000+ verified villas"** or **"12+ years of experience"** are banned until
  there are real verified villas / that much real history. Flag them for human review, don't
  silently rewrite them to something weaker — the human may have real numbers to use instead.
- When in doubt about whether a claim is provable, flag it. Don't approve on the assumption that
  "it's probably fine."

## 2. No villa content without the owner's consent

- Never use a villa's images, prices, or descriptive text without the owner's explicit consent.
- Never scrape a villa owner's website or a listing site to source content, images, or pricing.

## 3. Content must be grounded in approved research

- Any marketing/content draft must trace back to a topic or keyword in
  `research/topic-map.md`. If a draft doesn't map to an entry there, reject it — don't approve
  something just because it reads well.
- Drafts must stay within the agreed organic-SEO strategy (organic acquisition only — no paid
  acquisition framing, no claims implying ads/paid campaigns are in play).
- Landing/area-guide pages must be about the **experience and destination**, not the villa
  itself. A draft centered on villa features/amenities should be rejected back to the writer.

## 4. Data handling

- Customer details (name, contact info, anything personally identifying) live only in
  `pipeline/leads.csv`. Never write customer PII into `CLAUDE.md`, into any file in
  `context/`, `research/`, or `drafts/`, or into anything that could land in a public repo.
- API keys and any secrets live only in files excluded by `.gitignore`. Never hardcode a key
  into a committed file.

## 5. Legal and tax questions are not an agent's call

Topics like Israeli tourism law, the EU Package Travel Directive, VAT, and privacy/data
protection law are not decided by any agent. An agent may prepare a clear list of the specific
questions that need an answer — the answer itself comes from a lawyer or accountant.
