// Suscripción en tiempo real a las tablas del Supabase externo.
// Cada INSERT / UPDATE / DELETE dispara un recálculo del panel (con un
// pequeño retardo para agrupar cambios que llegan juntos).
import type { RealtimeChannel } from "@supabase/supabase-js";
import { extSupabase } from "@/integrations/extsupabase/client";

export const CF_TABLES = [
  "movimientos",
  "operaciones",
  "cxc_maestro",
  "cxp",
  "abonos",
  "abonos_proveedor",
] as const;

export type CFRealtimeStatus = "off" | "connecting" | "live" | "error";

export function subscribeCFChanges(
  onChange: () => void,
  onStatus?: (s: CFRealtimeStatus) => void,
): () => void {
  if (!extSupabase) {
    onStatus?.("off");
    return () => {};
  }

  let timer: ReturnType<typeof setTimeout> | null = null;
  const schedule = () => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      onChange();
    }, 400);
  };

  onStatus?.("connecting");

  let channel: RealtimeChannel = extSupabase.channel("cf-panel-changes");
  for (const table of CF_TABLES) {
    channel = channel.on(
      "postgres_changes",
      { event: "*", schema: "public", table },
      schedule,
    );
  }

  channel.subscribe((status) => {
    if (status === "SUBSCRIBED") onStatus?.("live");
    else if (status === "CHANNEL_ERROR" || status === "TIMED_OUT") onStatus?.("error");
  });

  return () => {
    if (timer) clearTimeout(timer);
    extSupabase.removeChannel(channel);
  };
}
