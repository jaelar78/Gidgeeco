import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Product = {
  id: string
  name: string
  slug: string
  description: string | null
  short_description: string | null
  price: number
  sale_price: number | null
  sku: string | null
  status: 'draft' | 'active' | 'coming_soon' | 'sold_out' | 'archived'
  featured: boolean
  tags: string[] | null
  inventory_count: number
  category_id: string | null
  created_at: string
  updated_at: string
  category?: {
    name: string
    slug: string
  }
  images?: ProductImage[]
}

export type ProductImage = {
  id: string
  product_id: string
  image_url: string
  alt_text: string | null
  sort_order: number
  is_primary: boolean
}

export type Category = {
  id: string
  name: string
  slug: string
  description: string | null
  image_url: string | null
  sort_order: number
}

export type ContactSubmission = {
  id?: string
  name: string
  email: string
  phone?: string
  subject?: string
  message: string
  status?: 'new' | 'read' | 'replied' | 'archived'
  created_at?: string
}

export type NewsletterSubscriber = {
  id?: string
  email: string
  first_name?: string
  subscribed?: boolean
  source?: string
  created_at?: string
}

export type ProductInterest = {
  id?: string
  product_id: string
  email: string
  name?: string
  message?: string
  notified?: boolean
  created_at?: string
}
