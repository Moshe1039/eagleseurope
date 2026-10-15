// Guest form: /c/<token> — each couple fills in their own details for a booked trip.
import { esc, guestPage } from "../lib/html.js";
import { hasKey, encrypt, decrypt, mask } from "../lib/crypto.js";

const now = "strftime('%Y-%m-%dT%H:%M:%SZ','now')";
const TOKEN_RE = /^[A-Za-z0-9_-]{20,64}$/;
const str = (f, k, max = 200) => String(f.get(k) ?? "").replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim().slice(0, max);
const isDate = (s) => !s || /^\d{4}-\d{2}-\d{2}$/.test(s);
const isDateTime = (s) => !s || /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(s);

async function findCouple(env, token) {
  if (!TOKEN_RE.test(token)) return null;
  return env.DB.prepare(`SELECT c.*, t.name AS trip_name, t.destination, t.start_date, t.end_date, t.purged_at
    FROM couples c JOIN trips t ON t.id = c.trip_id WHERE c.token = ?1`).bind(token).first();
}

const notFound = () => {
  const r = guestPage("Link not valid", `<h1>This link is no longer valid</h1><p>Please contact us at <a href="mailto:hello@eagleseurope.com">hello@eagleseurope.com</a> for a new link.</p>`);
  return new Response(r.body, { status: 404, headers: r.headers });
};

function form(c, people, errors = [], values = null) {
  const v = (k, fallback = "") => esc(values ? values.get(k) ?? "" : fallback);
  const person = (i) => {
    const p = people[i] || {};
    return `<fieldset><legend>Guest ${i + 1}</legend><div class="grid">
      <div><label for="n${i}">Full name, exactly as on the passport</label><input id="n${i}" name="name${i}" autocomplete="off" required value="${v("name" + i, p.full_name)}"></div>
      <div><label for="d${i}">Date of birth</label><input id="d${i}" name="dob${i}" type="date" required value="${v("dob" + i, p.dob)}"></div>
      <div><label for="na${i}">Nationality</label><input id="na${i}" name="nat${i}" required value="${v("nat" + i, p.nationality)}"></div>
      <div><label for="p${i}">Passport number</label><input id="p${i}" name="pass${i}" autocomplete="off" ${p.passport_masked ? "" : "required"} aria-describedby="ph${i}">
        <small id="ph${i}" class="muted">${p.passport_masked ? `Saved as ${esc(p.passport_masked)}. Leave empty to keep it.` : "Stored encrypted."}</small></div>
      <div><label for="x${i}">Passport expiry</label><input id="x${i}" name="exp${i}" type="date" required value="${v("exp" + i, p.passport_expiry)}"></div>
      <div><label for="di${i}">Allergies or dietary needs</label><input id="di${i}" name="diet${i}" value="${v("diet" + i, p.dietary)}" placeholder="None, vegetarian, no nuts…"></div>
    </div></fieldset>`;
  };
  const dates = c.start_date ? ` · ${esc(c.start_date)}${c.end_date ? " to " + esc(c.end_date) : ""}` : "";
  return guestPage("Your details", `
  <p class="muted" style="margin:0">${esc(c.trip_name)}${dates}</p>
  <h1>Hello ${esc(c.label)}</h1>
  <p>Please fill in your details so we can arrange transfers, register you with the villa and plan the menu with your chef. It takes about three minutes. ${c.submitted_at ? "<strong>We already have your details – you can update them below.</strong>" : ""}</p>
  ${errors.length ? `<div class="note err" role="alert"><strong>Please check:</strong><ul>${errors.map((e) => `<li>${esc(e)}</li>`).join("")}</ul></div>` : ""}
  <form method="post">
    ${person(0)}${person(1)}
    <fieldset><legend>Flights</legend><div class="grid">
      <div><label for="af">Arrival flight number</label><input id="af" name="arrival_flight" value="${v("arrival_flight", c.arrival_flight)}" placeholder="e.g. LY 541"></div>
      <div><label for="aa">Arrival date and time</label><input id="aa" name="arrival_at" type="datetime-local" value="${v("arrival_at", c.arrival_at)}"></div>
      <div><label for="df">Departure flight number</label><input id="df" name="departure_flight" value="${v("departure_flight", c.departure_flight)}"></div>
      <div><label for="da">Departure date and time</label><input id="da" name="departure_at" type="datetime-local" value="${v("departure_at", c.departure_at)}"></div>
    </div><p class="muted" style="margin-bottom:0">Not booked yet? Leave this empty and come back to the same link later.</p></fieldset>
    <fieldset><legend>The fun part</legend>
      <p><label for="ce">Celebrating anything during the trip?</label><input id="ce" name="celebrations" value="${v("celebrations", c.celebrations)}" placeholder="A birthday, an anniversary…"></p>
      <p><label for="kw">Anything you'd love waiting in the kitchen?</label><textarea id="kw" name="kitchen_wishes">${v("kitchen_wishes", c.kitchen_wishes)}</textarea></p>
      <p style="margin-bottom:0"><label for="no">Anything else we should know?</label><textarea id="no" name="notes">${v("notes", c.notes)}</textarea></p>
    </fieldset>
    <p><label style="display:flex;gap:10px;align-items:flex-start;font-weight:400"><input type="checkbox" name="consent" value="yes" required style="width:20px;min-height:20px;margin-top:3px">
      <span>We agree that Eagle's may use these details, including any allergies or dietary needs, to organise our trip and share what is needed with the villa, drivers and chef, as described in the <a href="/privacy">privacy policy</a>. Details are deleted within 30 days after the trip.</span></label></p>
    <p><button class="btn" type="submit">Send our details</button></p>
  </form>`);
}

async function loadPeople(env, coupleId) {
  const { results } = await env.DB.prepare("SELECT * FROM travellers WHERE couple_id = ?1 ORDER BY position").bind(coupleId).all();
  const people = [];
  for (const t of results || []) {
    people[t.position - 1] = { ...t, dob: await decrypt(env, t.date_of_birth_enc), passport_masked: mask(await decrypt(env, t.passport_number_enc)) };
  }
  return people;
}

export async function coupleForm({ env }, token) {
  if (!hasKey(env)) return guestPage("Coming soon", "<h1>Almost ready</h1><p>This form is being set up. Please try again later.</p>");
  const c = await findCouple(env, token);
  if (!c || c.purged_at) return notFound();
  return form(c, await loadPeople(env, c.id));
}

export async function coupleSubmit({ request, env }, token) {
  const origin = request.headers.get("Origin");
  if (origin && origin !== new URL(request.url).origin) return new Response("Forbidden", { status: 403 });
  if (!hasKey(env)) return new Response("Not configured", { status: 503 });
  const c = await findCouple(env, token);
  if (!c || c.purged_at) return notFound();
  const f = await request.formData();
  const people = await loadPeople(env, c.id);

  const errors = [];
  for (let i = 0; i < 2; i++) {
    const g = `Guest ${i + 1}`;
    if (!str(f, "name" + i)) errors.push(`${g}: full name is missing.`);
    if (!str(f, "dob" + i) || !isDate(str(f, "dob" + i))) errors.push(`${g}: date of birth is missing.`);
    if (!str(f, "nat" + i)) errors.push(`${g}: nationality is missing.`);
    if (!str(f, "pass" + i) && !people[i]?.passport_number_enc) errors.push(`${g}: passport number is missing.`);
    if (!str(f, "exp" + i) || !isDate(str(f, "exp" + i))) errors.push(`${g}: passport expiry date is missing.`);
  }
  if (!isDateTime(str(f, "arrival_at", 16)) || !isDateTime(str(f, "departure_at", 16))) errors.push("Please check the flight dates and times.");
  if (f.get("consent") !== "yes") errors.push("Please tick the consent box.");
  if (errors.length) return form(c, people, errors, f);

  const stmts = [
    env.DB.prepare(`UPDATE couples SET arrival_flight=?1, arrival_at=?2, departure_flight=?3, departure_at=?4, celebrations=?5,
      kitchen_wishes=?6, notes=?7, consent_at=${now}, submitted_at=COALESCE(submitted_at, ${now}), updated_at=${now} WHERE id=?8`)
      .bind(str(f, "arrival_flight", 20) || null, str(f, "arrival_at", 16) || null, str(f, "departure_flight", 20) || null,
            str(f, "departure_at", 16) || null, str(f, "celebrations", 300) || null, str(f, "kitchen_wishes", 1000) || null,
            str(f, "notes", 1000) || null, c.id),
  ];
  for (let i = 0; i < 2; i++) {
    const pass = str(f, "pass" + i, 30).toUpperCase().replace(/\s+/g, "");
    const passEnc = pass ? await encrypt(env, pass) : people[i]?.passport_number_enc;
    stmts.push(env.DB.prepare(`INSERT INTO travellers (couple_id, position, full_name, date_of_birth_enc, nationality, passport_number_enc, passport_expiry, dietary)
      VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8)
      ON CONFLICT (couple_id, position) DO UPDATE SET full_name=excluded.full_name, date_of_birth_enc=excluded.date_of_birth_enc,
        nationality=excluded.nationality, passport_number_enc=excluded.passport_number_enc, passport_expiry=excluded.passport_expiry, dietary=excluded.dietary`)
      .bind(c.id, i + 1, str(f, "name" + i, 120), await encrypt(env, str(f, "dob" + i, 10)), str(f, "nat" + i, 60), passEnc,
            str(f, "exp" + i, 10), str(f, "diet" + i, 300) || null));
  }
  await env.DB.batch(stmts);

  return guestPage("Thank you", `<p class="muted" style="margin:0">${esc(c.trip_name)}</p><h1>Thank you, ${esc(c.label)}!</h1>
  <p>We have everything we need for now. If anything changes, you can come back to this same link and update your details.</p>
  <p>Next, keep an eye on your door.</p>`);
}
