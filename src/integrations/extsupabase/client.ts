// Cliente de solo lectura hacia el Supabase EXTERNO del usuario
// (el proyecto donde n8n escribe la data). Es independiente de la base
// incluida de Lovable Cloud, que se mantiene intacta.
import { createClient } from "@supabase/supabase-js";

const EXT_URL = import.meta.env["VITE_EXT_SUPABASE_URL"] as string | undefined;
const EXT_ANON_KEY = import.meta.env["VITE_EXT_SUPABASE_ANON_KEY"] as
  | string
  | undefined;

export const extSupabaseConfigured = Boolean(EXT_URL && EXT_ANON_KEY);

export const extSupabase = extSupabaseConfigured
  ? createClient(EXT_URL!, EXT_ANON_KEY!, {
      auth: { persistSession: false, autoRefreshToken: false },
    })
  : null;
