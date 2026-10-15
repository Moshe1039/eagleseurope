// Cloudflare Worker entry point.
// Static files in /public are served automatically by Workers Static Assets;
// this script only runs for paths with no matching file: the enquiry API and the admin.

import { onRequestPost as enquiryPost, onRequest as enquiryOther } from "./api/enquiry.js";
import { onRequest as adminAuth } from "./admin/_middleware.js";
import { onRequestGet as adminList } from "./admin/index.js";
import { onRequestPost as adminStatus } from "./admin/status.js";
import { onRequestPost as adminDelete } from "./admin/delete.js";
import { onRequestGet as adminCsv } from "./admin/leads.csv.js";

// Creates the leads table the first time the database is used (safe to run repeatedly).
const SCHEMA = [
  `CREATE TABLE IF NOT EXISTS leads (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    created_at   TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now')),
    name         TEXT NOT NULL,
    email        TEXT NOT NULL,
    phone        TEXT,
    preference   TEXT NOT NULL CHECK (preference IN ('info', 'call')),
    couples      TEXT,
    destination  TEXT,
    travel_when  TEXT,
    note         TEXT,
    consent_at   TEXT NOT NULL,
    consent_text TEXT NOT NULL,
    status       TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'proposal', 'booked', 'closed')),
    updated_at   TEXT
  )`,
  "CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads (created_at)",
  "CREATE INDEX IF NOT EXISTS idx_leads_status ON leads (status)",
  "CREATE INDEX IF NOT EXISTS idx_leads_email ON leads (email)",
];
let schemaReady = false;
async function ensureSchema(env) {
  if (schemaReady || !env.DB) return;
  await env.DB.batch(SCHEMA.map((sql) => env.DB.prepare(sql)));
  schemaReady = true;
}

const ADMIN_ROUTES = {
  "GET /admin": adminList,
  "GET /admin/": adminList,
  "POST /admin/status": adminStatus,
  "POST /admin/delete": adminDelete,
  "GET /admin/leads.csv": adminCsv,
};

export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);

    if (pathname === "/api/enquiry") {
      if (request.method !== "POST") return enquiryOther();
      try { await ensureSchema(env); } catch (e) { console.error("schema", e); }
      return enquiryPost({ request, env });
    }

    if (pathname === "/admin" || pathname.startsWith("/admin/")) {
      const handler = ADMIN_ROUTES[`${request.method} ${pathname}`];
      return adminAuth({
        request,
        env,
        next: async () => {
          if (!handler) return new Response("Not found", { status: 404 });
          if (!env.DB) return new Response("Database binding DB is missing.", { status: 503 });
          await ensureSchema(env);
          return handler({ request, env });
        },
      });
    }

    // Anything else: hand back to static assets (serves the 404 page if nothing matches).
    return env.ASSETS.fetch(request);
  },
};
