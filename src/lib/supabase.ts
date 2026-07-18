import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Product = {
  id: string
  name: string
  description: string
  price: number
  image_url: string
  category: string
  stock: number
  coming_soon: boolean
  created_at: string
}

export type Contact = {
  id: string
  name: string
  email: string
  phone: string
  notes: string
  created_at: string
}

export type Newsletter = {
  id: string
  email: string
  created_at: string
}
