// Lectura de solo lectura desde el Supabase externo (donde escribe n8n).
// Convierte las tablas reales al formato que ya consumen las pantallas.
import { extSupabase } from "@/integrations/extsupabase/client";

const MESES = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

function fmtDay(iso: string | null): string {
  if (!iso) return "—";
  const d = new Date(iso + (iso.length <= 10 ? "T00:00:00" : ""));
  if (Number.isNaN(d.getTime())) return String(iso);
  return String(d.getUTCDate()).padStart(2, "0") + " " + MESES[d.getUTCMonth()];
}

function curOf(moneda: string | null): string {
  const m = (moneda || "").toUpperCase();
  if (m.includes("USDT")) return "USDT";
  if (m.includes("USD")) return "USD";
  if (m.includes("COP")) return "COP";
  return m || "COP";
}

export type CFLive = {
  cajas: { cur: string; saldo: number }[];
  cxp: any[];
  cxc: any[];
  clientes: Record<string, any>;
  proveedores: Record<string, any>;
  utilidad: number;
  utilidadMensual: any[];
  canales: any[];
  isEmpty: boolean;
  lastUpdate: { es: string; en: string };
  clientesCount: number;
};

async function grab(table: string, select = "*") {
  const { data, error } = await extSupabase!.from(table).select(select);
  if (error) throw new Error(table + ": " + error.message);
  return (data || []) as any[];
}

export async function loadLive(): Promise<CFLive> {
  if (!extSupabase) throw new Error("Supabase externo no configurado");

  const [movimientos, cxcMaestro, abonos, cxp, abonosProv, terceros, operaciones] =
    await Promise.all([
      grab("movimientos"),
      grab("cxc_maestro"),
      grab("abonos"),
      grab("cxp"),
      grab("abonos_proveedor"),
      grab("terceros"),
      grab("operaciones"),
    ]);

  const nombre = new Map<number, string>();
  terceros.forEach((t) => nombre.set(t.id, t.nombre));
  const clientesTercero = terceros.filter(
    (t) => String(t.tipo || "").toLowerCase() === "cliente",
  );

  // ---------- Saldos de caja ----------
  const saldos: Record<string, number> = { COP: 0, USD: 0, USDT: 0 };
  movimientos.forEach((m) => {
    if (String(m.estado || "").toLowerCase() === "anulado") return;
    const cur = curOf(m.caja_afectada || m.moneda);
    const signo = String(m.tipo || "").toLowerCase().startsWith("sal") ? -1 : 1;
    saldos[cur] = (saldos[cur] || 0) + signo * Number(m.monto || 0);
  });
  const cajas = Object.keys(saldos).map((cur) => ({ cur, saldo: saldos[cur] as number }));

  // ---------- Lo que me deben ----------
  const abonosPorCxc = new Map<number, any[]>();
  abonos.forEach((a) => {
    const list = abonosPorCxc.get(a.cxc_id) || [];
    list.push(a);
    abonosPorCxc.set(a.cxc_id, list);
  });

  const cxcRows = cxcMaestro.map((c) => {
    const list = abonosPorCxc.get(c.id) || [];
    const pagado = list.reduce((s, a) => s + Number(a.monto || 0), 0);
    const total = Number(c.monto_total || 0);
    const estado = pagado <= 0 ? "pend" : pagado >= total ? "pagado" : "parcial";
    const abonado = Math.min(pagado, total);
    return {
      id: c.id,
      cliente: nombre.get(c.cliente_id) || c.codigo || "—",
      cur: curOf(c.moneda),
      total,
      abonado,
      estado,
    };
  });

  // ---------- Detalle por cliente ----------
  const clientes: Record<string, any> = {};
  cxcMaestro.forEach((c) => {
    const list = (abonosPorCxc.get(c.id) || []).slice().sort((a, b) =>
      String(a.fecha_abono).localeCompare(String(b.fecha_abono)),
    );
    const delCliente = cxcMaestro.filter((x) => x.cliente_id === c.cliente_id);
    const facturado = delCliente.reduce((s, x) => s + Number(x.monto_total || 0), 0);
    const ultimo = list[list.length - 1];
    const primera = delCliente
      .map((x) => x.fecha_operacion)
      .filter(Boolean)
      .sort()[0];
    const pd = primera ? new Date(primera + "T00:00:00") : null;
    clientes[String(c.id)] = {
      cliente: nombre.get(c.cliente_id) || "—",
      cur: curOf(c.moneda),
      desde: pd ? MESES[pd.getUTCMonth()] + " " + pd.getUTCFullYear() : "—",
      desdeEn: pd ? MONTHS[pd.getUTCMonth()] + " " + pd.getUTCFullYear() : "—",
      facturado,
      promedioPago: 0,
      ultimoAbono: ultimo ? fmtDay(ultimo.fecha_abono) : "—",
      movs: [
        {
          id: "c" + c.id,
          concepto: "Operación " + (c.codigo || c.id),
          conceptoEn: "Operation " + (c.codigo || c.id),
          fecha: fmtDay(c.fecha_operacion),
          monto: Number(c.monto_total || 0),
          tipo: "cargo",
        },
        ...list.map((a) => ({
          id: "a" + a.id,
          concepto: "Abono " + (a.codigo || ""),
          conceptoEn: "Payment " + (a.codigo || ""),
          fecha: fmtDay(a.fecha_abono),
          monto: Number(a.monto || 0),
          tipo: "abono",
        })),
      ],
    };
  });

  // ---------- Lo que debo ----------
  const abonosPorCxp = new Map<number, any[]>();
  const pagadoPorCxp = new Map<number, number>();
  abonosProv.forEach((a) => {
    const list = abonosPorCxp.get(a.cxp_id) || [];
    list.push(a);
    abonosPorCxp.set(a.cxp_id, list);
    pagadoPorCxp.set(a.cxp_id, (pagadoPorCxp.get(a.cxp_id) || 0) + Number(a.monto || 0));
  });
  const cxpRows = cxp
    .map((c) => {
      const saldo = Number(c.monto || 0) - (pagadoPorCxp.get(c.id) || 0);
      const tipoTxt = String(c.tipo_deuda || "").toLowerCase();
      return {
        id: c.id,
        tercero: nombre.get(c.tercero_id) || c.codigo || "—",
        tipo: tipoTxt.includes("proveedor") ? "prov" : "transito",
        cur: curOf(c.moneda),
        monto: saldo,
        desde: fmtDay(c.fecha_generacion),
      };
    })
    .filter((r) => r.monto > 0.0001);

  // ---------- Detalle por deuda (CxP) ----------
  const proveedores: Record<string, any> = {};
  cxp.forEach((c) => {
    const list = (abonosPorCxp.get(c.id) || []).slice().sort((a, b) =>
      String(a.fecha_pago).localeCompare(String(b.fecha_pago)),
    );
    const ultimo = list[list.length - 1];
    const tipoTxt = String(c.tipo_deuda || "").toLowerCase();
    proveedores[String(c.id)] = {
      tercero: nombre.get(c.tercero_id) || c.codigo || "—",
      tipo: tipoTxt.includes("proveedor") ? "prov" : "transito",
      tipoTxt: c.tipo_deuda || "",
      cur: curOf(c.moneda),
      total: Number(c.monto || 0),
      ultimoAbono: ultimo ? fmtDay(ultimo.fecha_pago) : "—",
      movs: [
        {
          id: "c" + c.id,
          concepto: "Deuda " + (c.codigo || c.id),
          conceptoEn: "Debt " + (c.codigo || c.id),
          fecha: fmtDay(c.fecha_generacion),
          monto: Number(c.monto || 0),
          tipo: "cargo",
        },
        ...list.map((a) => ({
          id: "a" + a.id,
          concepto: "Abono " + (a.codigo || ""),
          conceptoEn: "Payment " + (a.codigo || ""),
          fecha: fmtDay(a.fecha_pago),
          monto: Number(a.monto || 0),
          tipo: "abono",
        })),
      ],
    };
  });

  // ---------- Utilidad ----------
  const activas = operaciones.filter(
    (o) => !["rechazada", "anulada", "cancelada"].includes(String(o.estado || "").toLowerCase()),
  );
  const porMes = new Map<string, { ingresos: number; gastos: number; idx: number }>();
  let utilidad = 0;
  const porTipo: Record<string, number> = {};
  activas.forEach((o) => {
    const usd = Number(o.usd_mercancia || 0);
    const ingresos = usd * Number(o.tasa_venta_cliente || 0);
    const compra = usd * Number(o.tasa_compra_usdt || 0);
    const costo = compra * (Number(o.costo_procesador_pct || 0) / 100);
    const gastos = compra + costo;
    utilidad += ingresos - gastos;
    porTipo["t" + o.tipo] = (porTipo["t" + o.tipo] || 0) + ingresos;
    const d = o.fecha ? new Date(o.fecha + "T00:00:00") : null;
    if (d && !Number.isNaN(d.getTime())) {
      const key = d.getUTCFullYear() + "-" + String(d.getUTCMonth()).padStart(2, "0");
      const cur = porMes.get(key) || { ingresos: 0, gastos: 0, idx: d.getUTCMonth() };
      cur.ingresos += ingresos;
      cur.gastos += gastos;
      porMes.set(key, cur);
    }
  });

  const utilidadMensual = Array.from(porMes.entries())
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([, v]) => ({
      mes: MESES[v.idx],
      mesEn: MONTHS[v.idx],
      ingresos: v.ingresos,
      gastos: v.gastos,
    }));

  const totalIngresos = Object.values(porTipo).reduce((s, v) => s + v, 0) || 1;
  const canales = Object.keys(porTipo).map((k) => ({
    label: "Operaciones tipo " + k.slice(1),
    labelEn: "Type " + k.slice(1) + " operations",
    value: Math.round((porTipo[k]! / totalIngresos) * 100),
  }));

  const isEmpty =
    !movimientos.length && !cxcMaestro.length && !cxp.length && !activas.length;

  return {
    cajas,
    cxp: cxpRows,
    cxc: cxcRows,
    clientes,
    proveedores,
    utilidad,
    utilidadMensual,
    canales,
    isEmpty,
    lastUpdate: {
      es: "Datos al " + new Date().toLocaleString("es-CO", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }),
      en: "Data as of " + new Date().toLocaleString("en-US", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }),
    },
    clientesCount: clientesTercero.length,
  };
}
