import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  'https://wepsovihexcnzicbdmst.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndlcHNvdmloZXhjbnppY2JkbXN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODg2MjM5MDUsImV4cCI6MjAwNDE5OTkwNX0.iLAnYWIPS-lYtt5lQXObuUFRw91E4BTh8iY5qJ5nANs'
)
