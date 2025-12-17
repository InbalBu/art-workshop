import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for your tables
export type Session = {
  id: string
  date: string
  time: string
  location: string
  max_seats: number
  seats_left: number
  status: string
  created_at: string
}

export type Registration = {
  id: string
  session_id: string
  name: string
  email: string
  message?: string
  created_at: string
  status: string
}
