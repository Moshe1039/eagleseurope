-- Leads submitted through the enquiry form on eagleseurope.com
CREATE TABLE IF NOT EXISTS leads (
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
  status       TEXT NOT NULL DEFAULT 'new'
               CHECK (status IN ('new', 'contacted', 'proposal', 'booked', 'closed')),
  updated_at   TEXT
);

CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads (created_at);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads (status);
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads (email);
