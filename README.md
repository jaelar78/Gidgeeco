# Gidgee & Co - Premium Australian Hats

A modern, self-hosted e-commerce website for Gidgee & Co, built with React + Vite + Tailwind CSS + Supabase.

## Features

- **Homepage** with hero banner, "Our Passion" story, featured products, contact form, and newsletter signup
- **Shop** page with category filtering and product grid
- **Product Detail** pages with "Notify Me" for coming soon products
- **Admin Dashboard** for managing products (add, edit, delete)
- **Contact Form** submissions stored in Supabase
- **Newsletter** signup with email capture
- **Fully responsive** design matching the earthy Australian aesthetic

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS with custom Gidgee color palette
- **Backend**: Supabase (Postgres, Auth, Storage)
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Payment**: Stripe-ready (integrate when you get stock)

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/jaelar78/Gidgeeco.git
cd Gidgeeco
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy `.env.example` to `.env` and fill in your Supabase credentials:

```bash
cp .env.example .env
```

Edit `.env`:
```
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

**Current credentials** (already set in `.env`):
- Supabase URL: `https://mkuunqsvorxcnlwawgth.supabase.co`
- Project: Gidgee & Co (Sydney region)

### 4. Run locally

```bash
npm run dev
```

Open http://localhost:7100

### 5. Build for production

```bash
npm run build
```

The `dist/` folder will contain the production build.

---

## Self-Hosted Deployment

### Option 1: Docker (Recommended)

Build and run with Docker:

```bash
docker build -t gidgeeco .
docker run -p 80:80 gidgeeco
```

Or use Docker Compose:

```bash
docker-compose up -d
```

### Option 2: Nginx on your own server

1. Build the app: `npm run build`
2. Copy `dist/` to your web server
3. Use the provided `nginx.conf` as a reference

### Option 3: PM2 + Node.js

```bash
npm install -g serve
serve -s dist -l 3000
```

---

## Stripe Integration (When Ready)

When you get stock and want to enable payments:

1. Add Stripe keys to `.env`:
   ```
   VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
   ```

2. Create a Supabase Edge Function for Stripe checkout (see `supabase/functions/stripe-checkout/`)

3. Uncomment the Stripe code in `src/pages/ProductDetail.tsx`

4. Update product status from `coming_soon` to `active` in the admin dashboard

---

## Supabase Database Schema

Tables created:
- `categories` - Product categories (Hats, Art Prints, Storage Boxes, Accessories)
- `products` - Product catalog with status tracking
- `product_images` - Product image URLs
- `contacts` - Contact form submissions
- `newsletter_subscribers` - Email subscribers
- `product_interests` - "Notify me" requests for coming soon products

---

## Admin Access

Navigate to `/admin` to manage products. 

**Note**: Admin features require Supabase authentication. Set up an auth user in your Supabase dashboard, then log in.

---

## Project Structure

```
src/
  components/
    Navbar.tsx          # Site navigation
    Footer.tsx          # Site footer
    ContactForm.tsx     # Contact form with Supabase submit
    Newsletter.tsx      # Newsletter signup
  pages/
    Home.tsx            # Homepage with all sections
    Shop.tsx            # Product listing with filters
    ProductDetail.tsx   # Product page with Notify Me
    Admin.tsx           # Product management dashboard
  lib/
    supabase.ts         # Supabase client + types
  App.tsx              # Router setup
  main.tsx             # Entry point
  index.css            # Tailwind + custom styles
```

---

## Customization

### Colors
The Gidgee color palette is defined in `tailwind.config.js`:
- `gidgee-brown` - Primary brand color
- `gidgee-gold` - Accent color
- `gidgee-sand` - Background tones
- `gidgee-cream` - Page background
- `gidgee-dark` - Text color

### Images
Replace placeholder images in the components with your own product photography.

### Content
Update the homepage copy, "Our Passion" story, and business hours in `src/pages/Home.tsx`.

---

## License

Copyright © 2023 Gidgee & Co - All Rights Reserved.
