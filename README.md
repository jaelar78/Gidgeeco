# Gidgee & Co — Premium Australian Hats

Self-hosted e-commerce site for Gidgee & Co, built with React + Vite + Tailwind CSS + Supabase.

## Deployment

- Frontend: Vercel (or self-hosted with Docker)
- Backend: Supabase (self-hosted Postgres, Auth, Storage)
- Database: Supabase PostgreSQL

## Environment Variables

Copy `.env.example` to `.env` and fill in your Supabase credentials:

```bash
VITE_SUPABASE_URL=https://mkuunqsvorxcnlwawgth.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Admin Dashboard

Navigate to `/admin` to access the product management dashboard. Sign in with your Supabase admin credentials.

## Database Schema

Run the migration in `supabase/migrations/001_initial_schema.sql` to set up the database tables.
