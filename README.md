## Velqora Media

Marketing site for Velqora Media — the ad-management/brand-partnerships agency. This
is a separate business and a separate deployment from Velqora (the CRM software),
even though the two currently share one Supabase project for simplicity.

```bash
npm install
npm run dev     # http://localhost:3000
```

### Environment variables (Railway → Variables)

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
SMTP_EMAIL=...            # Gmail address to send the contact-form auto-reply from
SMTP_APP_PASSWORD=...     # Gmail App Password (myaccount.google.com/apppasswords)
NOTIFY_TO_EMAIL=...       # where you get notified of new inquiries (optional)
```

Pull the three `SUPABASE_*` values from the `web/` (Velqora CRM) project's own env —
same Supabase project, different tables (`agency_leads` here vs. `marketing_leads`
there). `SMTP_EMAIL`/`SMTP_APP_PASSWORD` can reuse the same Gmail App Password as
`balm_home`/`balm_leads` if you already have one.

### Database

One migration: `supabase/migrations/0001_agency_leads.sql`. Already applied to the
shared production Supabase project — if you ever point this at a fresh Supabase
project instead, run it there first.

### Deploy

Railway auto-detects this as a Next.js app via `railway.toml` (`npm run build` then
`npm start`). Push to GitHub, connect the repo in Railway, add the env vars above,
deploy.
