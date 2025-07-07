import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
export const supabase =
    createClient(
        'https://zzwvempvarmirffbxoqa.supabase.co',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp6d3ZlbXB2YXJtaXJmZmJ4b3FhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE4NDQ0MTYsImV4cCI6MjA2NzQyMDQxNn0.UCCltA_yfJApLoXynDBmyHfNuJ-sWEazRN3Vasn3Rwo')