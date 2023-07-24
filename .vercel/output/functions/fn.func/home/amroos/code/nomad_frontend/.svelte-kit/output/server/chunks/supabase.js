import { createClient } from "@supabase/auth-helpers-sveltekit";
const PUBLIC_SUPABASE_URL = "https://gorvncpoixgqvejiqogi.supabase.co";
const PUBLIC_SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdvcnZuY3BvaXhncXZlamlxb2dpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQ2OTk1MDAsImV4cCI6MTk5MDI3NTUwMH0.k_sGP-6-EqFlEuNj-R-KGEkJUDWwbNkz4UKK_jSrZS0";
createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);
