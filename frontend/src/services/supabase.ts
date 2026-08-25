import { createClient } from '@supabase/supabase-js';

// Supabase Project Configuration for University of Upper Hill
export const SUPABASE_URL = 'https://iewgakosxmtzxokkuuuk.supabase.co';
export const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlld2dha29zeG10enhva2t1dXVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc2NTUzNDYsImV4cCI6MjEwMzIzMTM0Nn0.bP18Hd0AlIrJPIWD9fIc2CJdwi1ckpd7-dx8XNQTW2M';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

// Helper for direct Postgres / Edge Function calls if needed
export const getSupabaseClient = () => supabase;
