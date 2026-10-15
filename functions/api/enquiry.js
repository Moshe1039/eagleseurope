// POST /api/enquiry — saves a lead from the website form into the D1 database (binding: DB).

const CONSENT_TEXT =
  "I agree that Eagle's may use these details to reply to my enquiry, as described in the privacy policy.";

const COUPLES = ["2–3 couples", "4–6 couples", "7 or more", "Not sure yet"];
const DESTINATIONS = [
  "Surprise us", "Italy", "France", "Spain", "Portugal", "Greece",
  "Croatia", "Switzerland", "Austria", "Germany", "Somewhere else",
];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" },
  });
}

function text(value, max) {
  if (typeof value !== "string") return "";
  return value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim().slice(0, max);
}

export async function onRequestPost({ request, env }) {
  // Only accept requests sent from our own pages.
  const origin = request.headers.get("Origin");
  if (origin && origin !== new URL(request.url).origin) {
    return json({ ok: false, error: "forbidden" }, 403);
  }
  if (!(request.headers.get("Content-Type") || "").includes("application/json")) {
    return json({ ok: false, error: "unsupported" }, 415);
  }
  if (Number(request.headers.get("Content-Length") || 0) > 10_000) {
    return json({ ok: false, error: "too_large" }, 413);
  }

  let data;
  try {
    data = await request.json();
  } catch {
    return json({ ok: false, error: "invalid_json" }, 400);
  }

  // Spam trap: real visitors never fill the hidden "website" field.
  if (text(data.website, 200)) return json({ ok: true });

  const lead = {
    name: text(data.name, 120),
    email: text(data.email, 200).toLowerCase(),
    phone: text(data.phone, 40),
    preference: data.pref === "call" ? "call" : "info",
    couples: COUPLES.includes(data.couples) ? data.couples : null,
    destination: DESTINATIONS.includes(data.destination) ? data.destination : null,
    when: text(data.when, 120),
    note: text(data.note, 2000),
  };

  if (!lead.name) return json({ ok: false, error: "name_required" }, 422);
  if (!EMAIL_RE.test(lead.email)) return json({ ok: false, error: "email_invalid" }, 422);
  if (data.consent !== true) return json({ ok: false, error: "consent_required" }, 422);

  if (!env.DB) return json({ ok: false, error: "not_configured" }, 503);

  try {
    await env.DB.prepare(
      `INSERT INTO leads (name, email, phone, preference, couples, destination, travel_when, note, consent_at, consent_text)
       VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, strftime('%Y-%m-%dT%H:%M:%SZ','now'), ?9)`
    )
      .bind(lead.name, lead.email, lead.phone || null, lead.preference, lead.couples,
            lead.destination, lead.when || null, lead.note || null, CONSENT_TEXT)
      .run();
  } catch (err) {
    console.error("D1 insert failed", err);
    return json({ ok: false, error: "server_error" }, 500);
  }

  return json({ ok: true }, 201);
}

export async function onRequest() {
  return json({ ok: false, error: "method_not_allowed" }, 405);
}
