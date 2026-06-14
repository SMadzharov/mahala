import { createClient } from "@supabase/supabase-js";

// Публични данни за връзка към твоя Supabase проект (безопасни за сайта).
const SUPABASE_URL = "https://iiewjrqusbdkekmrgwqt.supabase.co";
const SUPABASE_KEY = "sb_publishable_3pvOLB1B5MV3sRXIvI7zTA_PssLwA27";

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
