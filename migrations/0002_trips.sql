-- Booked trips, the couples in each trip, and each guest's details.
-- (The Worker also creates these tables automatically on first use – see server/lib/schema.js.)
CREATE TABLE IF NOT EXISTS trips (
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
);
CREATE TABLE IF NOT EXISTS couples (
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
);
CREATE INDEX IF NOT EXISTS idx_couples_trip ON couples (trip_id);
-- date_of_birth_enc and passport_number_enc are AES-GCM encrypted with the DATA_KEY secret.
CREATE TABLE IF NOT EXISTS travellers (
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
);
