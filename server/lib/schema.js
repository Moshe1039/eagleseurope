// Database schema. Created automatically on first use; every statement is safe to re-run.
// Mirrors migrations/0001_create_leads.sql and migrations/0002_trips.sql.

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

  `CREATE TABLE IF NOT EXISTS trips (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    created_at  TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now')),
    name        TEXT NOT NULL,
    destination TEXT,
    villa       TEXT,
    start_date  TEXT,
    end_date    TEXT,
    lead_id     INTEGER,
    status      TEXT NOT NULL DEFAULT 'planning' CHECK (status IN ('planning', 'confirmed', 'completed', 'cancelled')),
    notes       TEXT,
    purged_at   TEXT
  )`,
  `CREATE TABLE IF NOT EXISTS couples (
    id               INTEGER PRIMARY KEY AUTOINCREMENT,
    trip_id          INTEGER NOT NULL REFERENCES trips (id) ON DELETE CASCADE,
    created_at       TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now')),
    label            TEXT NOT NULL,
    email            TEXT,
    phone            TEXT,
    token            TEXT NOT NULL UNIQUE,
    arrival_flight   TEXT,
    arrival_at       TEXT,
    departure_flight TEXT,
    departure_at     TEXT,
    celebrations     TEXT,
    kitchen_wishes   TEXT,
    notes            TEXT,
    consent_at       TEXT,
    submitted_at     TEXT,
    updated_at       TEXT
  )`,
  "CREATE INDEX IF NOT EXISTS idx_couples_trip ON couples (trip_id)",
  `CREATE TABLE IF NOT EXISTS travellers (
    id                  INTEGER PRIMARY KEY AUTOINCREMENT,
    couple_id           INTEGER NOT NULL REFERENCES couples (id) ON DELETE CASCADE,
    position            INTEGER NOT NULL,
    full_name           TEXT,
    date_of_birth_enc   TEXT,
    nationality         TEXT,
    passport_number_enc TEXT,
    passport_expiry     TEXT,
    dietary             TEXT,
    UNIQUE (couple_id, position)
  )`,
];

let ready = false;
export async function ensureSchema(env) {
  if (ready || !env.DB) return;
  await env.DB.batch(SCHEMA.map((sql) => env.DB.prepare(sql)));
  ready = true;
}
