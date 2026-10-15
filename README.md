# Eagle's Europe – eagleseurope.com

Private villa journeys across Europe. A single-page website plus a small lead database, hosted on **Cloudflare Pages** with **Cloudflare D1** (SQLite).

## What's inside

| Path | What it is |
|---|---|
| `public/index.html` | The built website (fonts embedded, no third-party scripts) |
| `public/_headers` | Security headers (HSTS, X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy) |
| `src/template.html`, `src/script.js` | Source of the page – edit these, then run `npm run build` |
| `scripts/build.py` | Builds `public/index.html`, embeds fonts, computes the CSP script hash |
| `functions/api/enquiry.js` | `POST /api/enquiry` – validates the form and saves the lead to D1 |
| `functions/admin/*` | `/admin` – password-protected lead list, status updates, CSV export, delete |
| `migrations/0001_create_leads.sql` | Database schema |

## One-time setup

1. **Create the database** (stored in the EU):
   ```bash
   npm install
   npx wrangler login
   npx wrangler d1 create eagleseurope-leads --location=weur --jurisdiction=eu
   ```
   Copy the printed `database_id` into `wrangler.toml`, commit and push.
2. **Create the tables:** `npm run db:migrate:remote`
3. **Connect the repo to Cloudflare Pages:** Workers & Pages → Create → Pages → *Connect to Git* → choose this repo.
   - Build command: *(leave empty)* – `public/` is already built
   - Build output directory: `public`
4. **Admin password:** Pages project → Settings → Variables and secrets → add `ADMIN_USER` and `ADMIN_PASSWORD` (12+ characters, type *Secret*). Redeploy.
5. **Custom domain:** Pages project → Custom domains → add `eagleseurope.com` and `www.eagleseurope.com`.
6. **Recommended:**
   - Security → WAF → Rate limiting rule: path `/api/enquiry`, e.g. 5 requests per minute per IP → Block.
   - Zero Trust → Access → protect `eagleseurope.com/admin*` with email one-time codes for the team.
   - SSL/TLS → Edge Certificates → *Always Use HTTPS* on.

## Editing the site

```bash
npm install          # fonts + wrangler
# edit src/template.html or src/script.js
npm run build        # regenerates public/index.html (and the CSP hash)
npm run dev          # local preview with Functions + local D1 at http://localhost:8788
```

For local admin access, copy `.dev.vars.example` to `.dev.vars` and run `npm run db:migrate:local` once.

Push to `main` and Cloudflare Pages deploys automatically.

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
