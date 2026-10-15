# Eagle's Europe – eagleseurope.com

Private villa journeys across Europe. A single-page website plus a small lead database, running as a **Cloudflare Worker** (static assets) with **Cloudflare D1** (SQLite).

## What's inside

| Path | What it is |
|---|---|
| `public/index.html` | The built website (fonts embedded, no third-party scripts) |
| `public/_headers` | Security headers (HSTS, X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy) |
| `src/template.html`, `src/script.js` | Source of the page – edit these, then run `npm run build` |
| `scripts/build.py` | Builds `public/index.html`, embeds fonts, computes the CSP script hash |
| `server/worker.js` | Worker entry: routes `/api/enquiry` and `/admin`, everything else is served from `public/` |
| `server/api/enquiry.js` | `POST /api/enquiry` – validates the form and saves the lead to D1 |
| `server/admin/*` | `/admin` – password-protected lead list, status updates, CSV export, delete |
| `migrations/0001_create_leads.sql` | Database schema |

## One-time setup (Cloudflare dashboard)

1. **Workers & Pages → Create → Import a repository** → choose this repo.
   - Build command: `npm run build`
   - Deploy command: `npx wrangler deploy`
   On the first deploy Wrangler creates the `eagleseurope-leads` D1 database automatically, and the Worker creates the `leads` table on first use.
2. **Admin password:** Worker → Settings → Variables and secrets → add `ADMIN_USER` and `ADMIN_PASSWORD` (12+ characters, type *Secret*).
3. **Custom domain:** Worker → Settings → Domains & Routes → Add → Custom domain → `eagleseurope.com`, then `www.eagleseurope.com`.
4. **Recommended:**
   - Security → WAF → Rate limiting rule: path `/api/enquiry`, e.g. 5 requests per minute per IP → Block.
   - Zero Trust → Access → protect `eagleseurope.com/admin*` with email one-time codes for the team.
   - SSL/TLS → Edge Certificates → *Always Use HTTPS* on.

## Editing the site

```bash
npm install          # fonts + wrangler
# edit src/template.html or src/script.js
npm run build        # regenerates public/index.html (and the CSP hash)
npm run dev          # local preview with the Worker + local D1 at http://localhost:8787
```

For local admin access, copy `.dev.vars.example` to `.dev.vars`.

Push to `main` and Cloudflare builds and deploys automatically.

## Leads

- View: `https://eagleseurope.com/admin`
- Export: `https://eagleseurope.com/admin/leads.csv` (opens in Excel / Google Sheets)
- Statuses: new → contacted → proposal → booked → closed
- **Delete** removes a lead permanently – use it for GDPR erasure requests.
- Stored per lead: name, email, phone, preference, group size, destination, dates, note, consent time and consent wording. No IP addresses or tracking data.

## Before launch – checklist

- [ ] Download the photos and films and serve them from this site instead of Unsplash / Pexels / Mixkit (GDPR: no visitor IPs sent to third parties). Check each Mixkit clip's licence label.
- [ ] Write `/privacy`, `/terms`, `/legal-notice`, `/accessibility` pages and fill in company details in the footer.
- [ ] Replace the remaining `[placeholders]` (founders' story, phone, Instagram).
- [ ] Decide on a retention period for leads (e.g. delete after 24 months without booking) and state it in the privacy policy.

## Credits

Photography: Unsplash · Film: Pexels, Mixkit · Fonts: Cormorant Garamond, Jost (SIL Open Font License, via Fontsource)
