import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create client - will use default configuration if env vars are not set
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
