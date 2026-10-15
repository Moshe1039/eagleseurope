// GET /admin/leads.csv — export all leads as CSV (opens in Excel / Google Sheets).
const COLUMNS = ["id", "created_at", "name", "email", "phone", "preference", "couples", "destination",
  "travel_when", "note", "status", "consent_at", "updated_at"];

function cell(value) {
  let s = String(value ?? "");
  // Stop spreadsheet formula injection from user-entered text.
  if (/^[=+\-@\t\r]/.test(s)) s = "'" + s;
  return `"${s.replace(/"/g, '""')}"`;
}

export async function onRequestGet({ env }) {
  const { results } = await env.DB.prepare(`SELECT ${COLUMNS.join(", ")} FROM leads ORDER BY created_at DESC`).all();
  const lines = [COLUMNS.join(",")].concat((results || []).map((r) => COLUMNS.map((c) => cell(r[c])).join(",")));
  const date = new Date().toISOString().slice(0, 10);
  return new Response("﻿" + lines.join("\r\n"), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="eagles-leads-${date}.csv"`,
    },
  });
}
