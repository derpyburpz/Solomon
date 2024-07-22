import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl) {
    throw new Error('supabaseUrl is required.');
  }
  
  if (!supabaseAnonKey) {
    throw new Error('supabaseAnonKey is required.');
  }
  
export const supabase = createClient(supabaseUrl, supabaseAnonKey);