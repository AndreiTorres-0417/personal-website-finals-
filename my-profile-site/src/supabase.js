import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://eifcmrdauutokwrgrrdf.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVpZmNtcmRhdXV0b2t3cmdycmRmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA4MzM2MzksImV4cCI6MjA1NjQwOTYzOX0.peMKLD0LK8jYJtatqnZcozUTokfWus4ez03W254LzZ8'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
