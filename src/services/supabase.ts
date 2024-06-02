import { createClient } from '@supabase/supabase-js';
export const supabaseUrl = 'https://qhcoiyybtosnkbgkqcby.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFoY29peXlidG9zbmtiZ2txY2J5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTcxNjM0NTAsImV4cCI6MjAzMjczOTQ1MH0.r8JfqEjoNZ2zsLUHHyJzmA_ZpK9K_wtnN8JJLR1pgio';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
