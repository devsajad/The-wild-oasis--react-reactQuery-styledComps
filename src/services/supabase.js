import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://lvxbofzfpvxbqmccnrss.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx2eGJvZnpmcHZ4YnFtY2NucnNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY3MTI5NzEsImV4cCI6MjA2MjI4ODk3MX0.Rp_UOo5AbHcNqkNxlFCtvC0gy_20IEU6i_lL2ULgFhA";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
