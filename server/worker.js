// Cloudflare Worker entry point.
// Static files in /public are served automatically by Workers Static Assets;
// this script only runs for paths with no matching file:
//   /api/enquiry   – website enquiry form
//   /c/<token>     – a couple's personal details form for a booked trip
//   /admin/...     – password-protected admin (leads and trips)

import { onRequestPost as enquiryPost, onRequest as enquiryOther } from "./api/enquiry.js";
import { onRequest as adminAuth } from "./admin/_middleware.js";
import { onRequestGet as adminList } from "./admin/index.js";
import { onRequestPost as adminStatus } from "./admin/status.js";
import { onRequestPost as adminDelete } from "./admin/delete.js";
import { onRequestGet as adminCsv } from "./admin/leads.csv.js";
import * as trips from "./trips/admin.js";
import { coupleForm, coupleSubmit } from "./trips/couple.js";
import { ensureSchema } from "./lib/schema.js";

// [method, pattern, handler] – numeric ids are passed to the handler as extra arguments.
const ADMIN_ROUTES = [
  ["GET", /^\/admin\/?$/, adminList],
  ["POST", /^\/admin\/status$/, adminStatus],
  ["POST", /^\/admin\/delete$/, adminDelete],
  ["GET", /^\/admin\/leads\.csv$/, adminCsv],
  ["GET", /^\/admin\/trips\/?$/, trips.listTrips],
  ["POST", /^\/admin\/trips\/?$/, trips.createTrip],
  ["GET", /^\/admin\/trips\/(\d+)$/, trips.tripDetail],
  ["POST", /^\/admin\/trips\/(\d+)$/, trips.updateTrip],
  ["POST", /^\/admin\/trips\/(\d+)\/couples$/, trips.addCouple],
  ["POST", /^\/admin\/trips\/(\d+)\/couples\/(\d+)\/delete$/, trips.deleteCouple],
  ["POST", /^\/admin\/trips\/(\d+)\/purge$/, trips.purgeTrip],
  ["POST", /^\/admin\/trips\/(\d+)\/delete$/, trips.deleteTrip],
  ["GET", /^\/admin\/trips\/(\d+)\/manifest\.csv$/, trips.manifestCsv],
];

function matchAdmin(method, pathname) {
  for (const [m, re, handler] of ADMIN_ROUTES) {
    const hit = method === m && pathname.match(re);
    if (hit) return { handler, args: hit.slice(1).map(Number) };
  }
  return null;
}

export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);

    if (pathname === "/api/enquiry") {
      if (request.method !== "POST") return enquiryOther();
      try { await ensureSchema(env); } catch (e) { console.error("schema", e); }
      return enquiryPost({ request, env });
    }

    const guest = pathname.match(/^\/c\/([A-Za-z0-9_-]+)\/?$/);
    if (guest) {
      if (!env.DB) return new Response("Not configured", { status: 503 });
      await ensureSchema(env);
      if (request.method === "GET") return coupleForm({ request, env }, guest[1]);
      if (request.method === "POST") return coupleSubmit({ request, env }, guest[1]);
      return new Response("Method not allowed", { status: 405 });
    }

    if (pathname === "/admin" || pathname.startsWith("/admin/")) {
      const route = matchAdmin(request.method, pathname);
      return adminAuth({
        request,
        env,
        next: async () => {
          if (!route) return new Response("Not found", { status: 404 });
          if (!env.DB) return new Response("Database binding DB is missing.", { status: 503 });
          await ensureSchema(env);
          return route.handler({ request, env }, ...route.args);
        },
      });
    }

    // Anything else: static assets (serves 404.html if nothing matches).
    return env.ASSETS.fetch(request);
  },
};
