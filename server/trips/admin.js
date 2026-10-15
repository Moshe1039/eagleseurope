// Admin: trips (booked groups), the couples in each trip and their submitted details.
import { esc, adminPage } from "../lib/html.js";
import { randomToken, hasKey, newDataKey, decrypt, mask } from "../lib/crypto.js";

const TRIP_STATUSES = ["planning", "confirmed", "completed", "cancelled"];
const now = "strftime('%Y-%m-%dT%H:%M:%SZ','now')";
const back = (request, path) => Response.redirect(new URL(path, request.url).toString(), 303);
const str = (form, k, max = 200) => String(form.get(k) ?? "").trim().slice(0, max);
const isDate = (s) => !s || /^\d{4}-\d{2}-\d{2}$/.test(s);

function keyBanner(env) {
  if (hasKey(env)) return "";
  return `<div class="note" role="alert"><strong>One-time setup needed before guests can send passport details.</strong>
  Add a secret called <code>DATA_KEY</code> in Cloudflare (Worker → Settings → Variables and secrets, type <em>Secret</em>) with this value, then redeploy:
  <p><input readonly value="${newDataKey()}" aria-label="New encryption key" style="font-family:monospace"></p>
  Keep a copy somewhere safe (for example a password manager). If this key is lost, encrypted passport numbers cannot be recovered. This value changes every time you reload this page; use one and keep it.</div>`;
}

// GET /admin/trips
export async function listTrips({ request, env }) {
  const url = new URL(request.url);
  let prefill = { name: "", destination: "", lead_id: "" };
  const fromLead = Number(url.searchParams.get("from_lead"));
  if (Number.isInteger(fromLead) && fromLead > 0) {
    const lead = await env.DB.prepare("SELECT id, name, destination FROM leads WHERE id = ?1").bind(fromLead).first();
    if (lead) prefill = { name: `${lead.name} group`, destination: lead.destination && lead.destination !== "Surprise us" ? lead.destination : "", lead_id: lead.id };
  }
  const { results } = await env.DB.prepare(`
    SELECT t.*, COUNT(c.id) AS couples, SUM(CASE WHEN c.submitted_at IS NOT NULL THEN 1 ELSE 0 END) AS submitted
    FROM trips t LEFT JOIN couples c ON c.trip_id = t.id
    GROUP BY t.id ORDER BY COALESCE(t.start_date, '9999') ASC, t.id DESC`).all();

  const rows = (results || []).map((t) => `<tr>
    <td><a href="/admin/trips/${t.id}">${esc(t.name)}</a></td>
    <td>${esc(t.destination)}</td><td>${esc(t.villa)}</td>
    <td>${esc(t.start_date)}${t.end_date ? " → " + esc(t.end_date) : ""}</td>
    <td>${t.submitted || 0} / ${t.couples} couples</td>
    <td>${esc(t.status)}${t.purged_at ? " · personal data deleted" : ""}</td></tr>`).join("");

  return adminPage("Trips", `${keyBanner(env)}
  <h1>Trips</h1>
  <div class="card"><h2>New trip</h2>
  <form method="post" action="/admin/trips">
    <input type="hidden" name="lead_id" value="${esc(prefill.lead_id)}">
    <div class="grid">
      <div><label for="t-name">Trip name</label><input id="t-name" name="name" required value="${esc(prefill.name)}" placeholder="e.g. Cohen group – Tuscany May 2027"></div>
      <div><label for="t-dest">Destination</label><input id="t-dest" name="destination" value="${esc(prefill.destination)}"></div>
      <div><label for="t-villa">Villa</label><input id="t-villa" name="villa"></div>
      <div><label for="t-start">Arrival date</label><input id="t-start" name="start_date" type="date"></div>
      <div><label for="t-end">Departure date</label><input id="t-end" name="end_date" type="date"></div>
    </div>
    <p><button class="btn" type="submit">Create trip</button></p>
  </form></div>
  <div class="wrap-table" tabindex="0" role="region" aria-label="Table, scroll sideways on small screens"><table>
    <caption class="sr-only">All trips</caption>
    <thead><tr><th scope="col">Trip</th><th scope="col">Destination</th><th scope="col">Villa</th><th scope="col">Dates</th><th scope="col">Details received</th><th scope="col">Status</th></tr></thead>
    <tbody>${rows || '<tr><td colspan="6">No trips yet. Create one when a group books.</td></tr>'}</tbody>
  </table></div>`, "trips");
}

// POST /admin/trips
export async function createTrip({ request, env }) {
  const f = await request.formData();
  const name = str(f, "name", 160);
  const start = str(f, "start_date", 10), end = str(f, "end_date", 10);
  if (!name || !isDate(start) || !isDate(end)) return new Response("Please give the trip a name and valid dates.", { status: 400 });
  const leadId = Number(f.get("lead_id")) || null;
  const r = await env.DB.prepare(
    "INSERT INTO trips (name, destination, villa, start_date, end_date, lead_id) VALUES (?1, ?2, ?3, ?4, ?5, ?6) RETURNING id")
    .bind(name, str(f, "destination", 120) || null, str(f, "villa", 160) || null, start || null, end || null, leadId).first();
  if (leadId) await env.DB.prepare(`UPDATE leads SET status = 'booked', updated_at = ${now} WHERE id = ?1`).bind(leadId).run();
  return back(request, `/admin/trips/${r.id}`);
}

async function loadTrip(env, id) {
  return env.DB.prepare("SELECT * FROM trips WHERE id = ?1").bind(id).first();
}

// GET /admin/trips/:id
export async function tripDetail({ request, env }, id) {
  const trip = await loadTrip(env, id);
  if (!trip) return new Response("Trip not found", { status: 404 });
  const { results: couples } = await env.DB.prepare("SELECT * FROM couples WHERE trip_id = ?1 ORDER BY id").bind(id).all();
  const { results: travellers } = await env.DB.prepare(
    "SELECT tr.* FROM travellers tr JOIN couples c ON c.id = tr.couple_id WHERE c.trip_id = ?1 ORDER BY tr.couple_id, tr.position").bind(id).all();
  const origin = new URL(request.url).origin;

  const coupleCards = [];
  for (const c of couples || []) {
    const link = `${origin}/c/${c.token}`;
    const msg = `Hi ${c.label}! To prepare everything for ${trip.name}, please fill in your details here (takes 3 minutes): ${link}`;
    const people = (travellers || []).filter((t) => t.couple_id === c.id);
    const peopleRows = [];
    for (const p of people) {
      peopleRows.push(`<tr><td>${esc(p.full_name)}</td><td>${esc(await decrypt(env, p.date_of_birth_enc))}</td><td>${esc(p.nationality)}</td>
        <td>${esc(mask(await decrypt(env, p.passport_number_enc)))}</td><td>${esc(p.passport_expiry)}</td><td>${esc(p.dietary)}</td></tr>`);
    }
    coupleCards.push(`<div class="card">
      <div style="display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;align-items:baseline">
        <h2>${esc(c.label)}</h2>
        <span>${c.submitted_at ? `✓ Details received ${esc(c.submitted_at.slice(0, 10))}` : '<span class="err">Waiting for details</span>'}</span>
      </div>
      <p class="muted">${esc(c.email)} ${c.phone ? "· " + esc(c.phone) : ""}</p>
      ${trip.purged_at ? "" : `<label for="l${c.id}">Personal link for this couple</label>
      <input id="l${c.id}" readonly value="${esc(link)}">
      <p style="display:flex;gap:8px;flex-wrap:wrap">
        <a class="btn ghost" href="https://wa.me/${esc((c.phone || "").replace(/[^\d]/g, ""))}?text=${encodeURIComponent(msg)}" rel="noopener noreferrer">Send on WhatsApp</a>
        ${c.email ? `<a class="btn ghost" href="mailto:${esc(c.email)}?subject=${encodeURIComponent("Your details for " + trip.name)}&body=${encodeURIComponent(msg)}">Send by email</a>` : ""}
      </p>`}
      ${c.submitted_at ? `<div class="wrap-table" tabindex="0" role="region" aria-label="Table, scroll sideways on small screens"><table><caption class="sr-only">Travellers</caption>
        <thead><tr><th scope="col">Name (as on passport)</th><th scope="col">Date of birth</th><th scope="col">Nationality</th><th scope="col">Passport</th><th scope="col">Expiry</th><th scope="col">Diet / allergies</th></tr></thead>
        <tbody>${peopleRows.join("")}</tbody></table></div>
        <div class="grid" style="margin-top:12px">
          <p><strong>Arrival</strong><br>${esc(c.arrival_flight)} ${esc((c.arrival_at || "").replace("T", " "))}</p>
          <p><strong>Departure</strong><br>${esc(c.departure_flight)} ${esc((c.departure_at || "").replace("T", " "))}</p>
          <p><strong>Celebrating</strong><br>${esc(c.celebrations) || "–"}</p>
          <p><strong>Kitchen wishes</strong><br>${esc(c.kitchen_wishes) || "–"}</p>
          <p><strong>Notes</strong><br>${esc(c.notes) || "–"}</p>
        </div>` : ""}
      <form method="post" action="/admin/trips/${trip.id}/couples/${c.id}/delete"><button class="btn danger" type="submit">Remove couple</button></form>
    </div>`);
  }

  return adminPage(trip.name, `${keyBanner(env)}
  <p><a href="/admin/trips">← All trips</a></p>
  <h1>${esc(trip.name)}</h1>
  ${trip.purged_at ? `<div class="note">Guests' personal details for this trip were deleted on ${esc(trip.purged_at.slice(0, 10))}.</div>` : ""}
  <div class="card"><form method="post" action="/admin/trips/${trip.id}">
    <div class="grid">
      <div><label for="e-name">Trip name</label><input id="e-name" name="name" value="${esc(trip.name)}" required></div>
      <div><label for="e-dest">Destination</label><input id="e-dest" name="destination" value="${esc(trip.destination)}"></div>
      <div><label for="e-villa">Villa</label><input id="e-villa" name="villa" value="${esc(trip.villa)}"></div>
      <div><label for="e-start">Arrival date</label><input id="e-start" name="start_date" type="date" value="${esc(trip.start_date)}"></div>
      <div><label for="e-end">Departure date</label><input id="e-end" name="end_date" type="date" value="${esc(trip.end_date)}"></div>
      <div><label for="e-status">Status</label><select id="e-status" name="status">${TRIP_STATUSES.map((s) => `<option ${s === trip.status ? "selected" : ""}>${s}</option>`).join("")}</select></div>
    </div>
    <p><label for="e-notes">Internal notes</label><textarea id="e-notes" name="notes">${esc(trip.notes)}</textarea></p>
    <p><button class="btn" type="submit">Save trip</button></p>
  </form></div>

  ${trip.purged_at ? "" : `<div class="card"><h2>Add a couple</h2>
  <form method="post" action="/admin/trips/${trip.id}/couples"><div class="grid">
    <div><label for="c-label">Names</label><input id="c-label" name="label" required placeholder="e.g. Dana & Avi"></div>
    <div><label for="c-email">Email</label><input id="c-email" name="email" type="email"></div>
    <div><label for="c-phone">WhatsApp number</label><input id="c-phone" name="phone" type="tel" placeholder="+972…"></div>
  </div><p><button class="btn" type="submit">Add couple and create their link</button></p></form></div>`}

  ${coupleCards.join("")}

  <div class="card"><h2>Exports and privacy</h2>
    <p><a class="btn ghost" href="/admin/trips/${trip.id}/manifest.csv">Download guest list (CSV)</a>
    <span class="muted">Full passport details for villa / police registration, flights and diets for the chef and drivers.</span></p>
    <form method="post" action="/admin/trips/${trip.id}/purge"><p><button class="btn danger" type="submit">Delete guests' personal details</button>
    <span class="muted">Do this after the trip. Names of couples and the trip itself are kept.</span></p></form>
    <form method="post" action="/admin/trips/${trip.id}/delete"><p><button class="btn danger" type="submit">Delete this trip completely</button></p></form>
  </div>`, "trips");
}

// POST /admin/trips/:id
export async function updateTrip({ request, env }, id) {
  const f = await request.formData();
  const status = str(f, "status", 20);
  const start = str(f, "start_date", 10), end = str(f, "end_date", 10);
  if (!str(f, "name") || !TRIP_STATUSES.includes(status) || !isDate(start) || !isDate(end)) return new Response("Invalid request", { status: 400 });
  await env.DB.prepare("UPDATE trips SET name=?1, destination=?2, villa=?3, start_date=?4, end_date=?5, status=?6, notes=?7 WHERE id=?8")
    .bind(str(f, "name", 160), str(f, "destination", 120) || null, str(f, "villa", 160) || null, start || null, end || null, status, str(f, "notes", 4000) || null, id).run();
  return back(request, `/admin/trips/${id}`);
}

// POST /admin/trips/:id/couples
export async function addCouple({ request, env }, id) {
  const f = await request.formData();
  const label = str(f, "label", 120);
  if (!label || !(await loadTrip(env, id))) return new Response("Invalid request", { status: 400 });
  await env.DB.prepare("INSERT INTO couples (trip_id, label, email, phone, token) VALUES (?1, ?2, ?3, ?4, ?5)")
    .bind(id, label, str(f, "email", 200).toLowerCase() || null, str(f, "phone", 40) || null, randomToken()).run();
  return back(request, `/admin/trips/${id}`);
}

// POST /admin/trips/:id/couples/:cid/delete
export async function deleteCouple({ request, env }, id, cid) {
  await env.DB.batch([
    env.DB.prepare("DELETE FROM travellers WHERE couple_id = ?1").bind(cid),
    env.DB.prepare("DELETE FROM couples WHERE id = ?1 AND trip_id = ?2").bind(cid, id),
  ]);
  return back(request, `/admin/trips/${id}`);
}

// POST /admin/trips/:id/purge – remove personal data after the trip
export async function purgeTrip({ request, env }, id) {
  await env.DB.batch([
    env.DB.prepare("DELETE FROM travellers WHERE couple_id IN (SELECT id FROM couples WHERE trip_id = ?1)").bind(id),
    env.DB.prepare(`UPDATE couples SET email=NULL, phone=NULL, arrival_flight=NULL, arrival_at=NULL, departure_flight=NULL, departure_at=NULL,
      celebrations=NULL, kitchen_wishes=NULL, notes=NULL, token='purged-' || id, updated_at=${now} WHERE trip_id = ?1`).bind(id),
    env.DB.prepare(`UPDATE trips SET purged_at = ${now} WHERE id = ?1`).bind(id),
  ]);
  return back(request, `/admin/trips/${id}`);
}

// POST /admin/trips/:id/delete
export async function deleteTrip({ request, env }, id) {
  await env.DB.batch([
    env.DB.prepare("DELETE FROM travellers WHERE couple_id IN (SELECT id FROM couples WHERE trip_id = ?1)").bind(id),
    env.DB.prepare("DELETE FROM couples WHERE trip_id = ?1").bind(id),
    env.DB.prepare("DELETE FROM trips WHERE id = ?1").bind(id),
  ]);
  return back(request, "/admin/trips");
}

// GET /admin/trips/:id/manifest.csv
export async function manifestCsv({ env }, id) {
  const trip = await loadTrip(env, id);
  if (!trip) return new Response("Trip not found", { status: 404 });
  const { results } = await env.DB.prepare(`
    SELECT c.label, c.email, c.phone, c.arrival_flight, c.arrival_at, c.departure_flight, c.departure_at, c.celebrations, c.kitchen_wishes,
           t.position, t.full_name, t.date_of_birth_enc, t.nationality, t.passport_number_enc, t.passport_expiry, t.dietary
    FROM couples c LEFT JOIN travellers t ON t.couple_id = c.id WHERE c.trip_id = ?1 ORDER BY c.id, t.position`).bind(id).all();
  const cell = (v) => { let s = String(v ?? ""); if (/^[=+\-@\t\r]/.test(s)) s = "'" + s; return `"${s.replace(/"/g, '""')}"`; };
  const head = ["Couple", "Email", "Phone", "Guest", "Full name", "Date of birth", "Nationality", "Passport number", "Passport expiry",
    "Diet / allergies", "Arrival flight", "Arrival", "Departure flight", "Departure", "Celebrating", "Kitchen wishes"];
  const lines = [head.join(",")];
  for (const r of results || []) {
    lines.push([r.label, r.email, r.phone, r.position, r.full_name, await decrypt(env, r.date_of_birth_enc), r.nationality,
      await decrypt(env, r.passport_number_enc), r.passport_expiry, r.dietary, r.arrival_flight, (r.arrival_at || "").replace("T", " "),
      r.departure_flight, (r.departure_at || "").replace("T", " "), r.celebrations, r.kitchen_wishes].map(cell).join(","));
  }
  const slug = trip.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || `trip-${id}`;
  return new Response("﻿" + lines.join("\r\n"), {
    headers: { "Content-Type": "text/csv; charset=utf-8", "Content-Disposition": `attachment; filename="${slug}-guests.csv"` },
  });
}
