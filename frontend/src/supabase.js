import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ocyahlkdiheciktiqjdj.supabase.co";
const supabaseKey = "sb_publishable_bd1ph1sVg2ADTHpXcgNawg_BnN6kdWc";

export const db = createClient(supabaseUrl, supabaseKey);
