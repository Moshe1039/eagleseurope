-- Lead insights for Eagle's. Run each block separately in the D1 Console
-- (Storage & Databases → eagleseurope-leads → Console). Read-only.

-- 1. Overview: how many enquiries, and where each one stands
SELECT COUNT(*) AS total_leads,
       SUM(CASE WHEN status = 'new' THEN 1 ELSE 0 END) AS new_leads,
       SUM(CASE WHEN status = 'contacted' THEN 1 ELSE 0 END) AS contacted,
       SUM(CASE WHEN status = 'proposal' THEN 1 ELSE 0 END) AS proposal,
       SUM(CASE WHEN status = 'booked' THEN 1 ELSE 0 END) AS booked,
       SUM(CASE WHEN status = 'closed' THEN 1 ELSE 0 END) AS closed
FROM leads;

-- 2. Which destinations people ask about
SELECT COALESCE(destination, '(not given)') AS destination, COUNT(*) AS leads
FROM leads
GROUP BY destination
ORDER BY leads DESC;

-- 3. Group size
SELECT COALESCE(couples, '(not given)') AS group_size, COUNT(*) AS leads
FROM leads
GROUP BY couples
ORDER BY leads DESC;

-- 4. Destination by group size (what each group type wants)
SELECT COALESCE(destination, '(not given)') AS destination,
       COALESCE(couples, '(not given)') AS group_size,
       COUNT(*) AS leads
FROM leads
GROUP BY destination, couples
ORDER BY leads DESC;

-- 5. Did they want information or a call?
SELECT preference, COUNT(*) AS leads
FROM leads
GROUP BY preference;

-- 6. Share of leads that left a phone number
SELECT COUNT(*) AS total,
       SUM(CASE WHEN phone IS NOT NULL AND phone <> '' THEN 1 ELSE 0 END) AS with_phone
FROM leads;

-- 7. Enquiries per day (when interest arrives)
SELECT substr(created_at, 1, 10) AS day, COUNT(*) AS leads
FROM leads
GROUP BY day
ORDER BY day;

-- 8. Travel timing as people wrote it (free text)
SELECT created_at, travel_when, couples, destination
FROM leads
WHERE travel_when IS NOT NULL AND travel_when <> ''
ORDER BY created_at DESC;

-- 9. What people wrote in the message box (free text)
SELECT created_at, couples, destination, note
FROM leads
WHERE note IS NOT NULL AND note <> ''
ORDER BY created_at DESC;

-- 10. Same email sent more than once (returning interest)
SELECT email, COUNT(*) AS enquiries, MAX(created_at) AS last_enquiry
FROM leads
GROUP BY email
HAVING COUNT(*) > 1
ORDER BY enquiries DESC;

-- 11. Average hours from enquiry to first status change (response speed)
SELECT ROUND(AVG((julianday(updated_at) - julianday(created_at)) * 24), 1) AS avg_hours_to_update,
       COUNT(*) AS leads_updated
FROM leads
WHERE updated_at IS NOT NULL;
