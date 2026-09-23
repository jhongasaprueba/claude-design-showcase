// Demo read-only data from the Control Financiero design system kit
export const CFData: any = {
  lastUpdate: { es: "Datos al 7 sep, 14:32", en: "Data as of Sep 7, 2:32 PM" },
  t: {
    es: {
      brandSub: "PANEL PRIVADO", readonly: "Solo lectura · todo se registra en el bot",
      nav_saldos: "Saldos de caja", nav_debo: "Cuentas x Pagar", nav_cobro: "Cuentas x Cobrar", nav_utilidad: "Utilidad",
      saldos_title: "Saldos de caja", saldos_sub: "Lo que hay disponible en cada caja ahora mismo",
      debo_title: "Cuentas por pagar", debo_sub: "Obligaciones pendientes con proveedores y procesadores",
      cobro_title: "Lo que me deben", cobro_sub: "Cuentas por cobrar y abonos recibidos",
      utilidad_title: "Utilidad acumulada", utilidad_sub: "Ganancia de todas las operaciones registradas",
      totalPor: "Total por moneda", pendiente: "Pendiente por cobrar", debe: "Total por pagar",
      mesAMes: "Utilidad mes a mes", mesAMesSub: "Cada mes cerrado, en COP",
      porCanal: "Ingresos por canal", porCanalSub: "Reparto de los ingresos registrados",
      exportar: "Exportar", exportCsv: "Descargar CSV", exportPdf: "Descargar PDF",
      detalle: "Detalle del cliente", volver: "Volver", verDetalle: "Ver detalle",
      histCliente: "Historial de facturas y abonos", resumenCliente: "Resumen del cliente",
      facturado: "Total facturado", promedioPago: "Paga en promedio", ultimoAbono: "Último abono",
      detalleProv: "Detalle de la deuda", resumenProv: "Resumen de la deuda",
      histProv: "Historial de la deuda y pagos", deudaTotal: "Monto de la deuda",
      pagado: "Pagado", ultimoPago: "Último pago",
      cols2: { concepto: "Concepto", fecha: "Fecha", mes: "Mes", ingresos: "Ingresos", gastos: "Gastos", utilidad: "Utilidad", canal: "Canal", parte: "Parte" },
      cols: { tercero: "\u00a0 \u00a0 \u00a0 TERCERO", tipo: "Tipo de deuda", cliente: "Cliente", moneda: "Moneda", monto: "Monto", desde: "Desde", total: "Monto total", abonado: "Abonado", saldo: "Saldo pendiente", estado: "Estado" },
      states: { pend: "Pendiente", parcial: "Parcial", pagado: "Pagado" },
      types: { prov: "Proveedor USDT", transito: "Pago en tránsito" },
      empty_saldos_t: "Todavía no se ha registrado ningún movimiento",
      empty_saldos_b: "Las tres cajas quedan en cero hasta que registres el primer movimiento en el bot.",
      empty_debo: "No tienes cuentas por pagar pendientes",
      empty_cobro: "No tienes cuentas por cobrar pendientes",
      empty_utilidad_t: "Aún no hay operaciones registradas",
      empty_utilidad_b: "La utilidad se calcula sola a partir de las operaciones guardadas.",
      error_t: "No se pudo cargar la información",
      error_b: "No hay conexión con la base de datos. Los números que viste antes pueden estar desactualizados — no los tomes como actuales.",
      retry: "Reintentar", demo: "Estado de la pantalla", demoOpts: ["Con datos", "Pendiente", "Pendinte"],
      botNote: "Para registrar, corregir o confirmar un pago, escribile al bot.",
      login: { title: "Panel privado", body: "Ingresá la clave de 6 dígitos que te envía el bot por Telegram.", key: "Clave", enter: "Entrar", help: "¿No te llegó? Escribile /clave al bot.", pending: "Acceso pendiente de definir — ver readme" }
    },
    en: {
      brandSub: "PRIVATE PANEL", readonly: "Read only · everything is recorded in the bot",
      nav_saldos: "Cash balances", nav_debo: "What I owe", nav_cobro: "Owed to me", nav_utilidad: "Profit",
      saldos_title: "Cash balances", saldos_sub: "What is available in each caja right now",
      debo_title: "What I owe", debo_sub: "Open obligations to suppliers and processors",
      cobro_title: "Owed to me", cobro_sub: "Receivables and payments received",
      utilidad_title: "Accumulated profit", utilidad_sub: "Earnings across every recorded operation",
      totalPor: "Total by currency", pendiente: "Pending collection", debe: "Total payable",
      mesAMes: "Profit month by month", mesAMesSub: "Each closed month, in COP",
      porCanal: "Income by channel", porCanalSub: "Split of the recorded income",
      exportar: "Export", exportCsv: "Download CSV", exportPdf: "Download PDF",
      detalle: "Client detail", volver: "Back", verDetalle: "View detail",
      histCliente: "Invoice and payment history", resumenCliente: "Client summary",
      facturado: "Total invoiced", promedioPago: "Average payment", ultimoAbono: "Last payment",
      detalleProv: "Debt detail", resumenProv: "Debt summary",
      histProv: "Debt and payment history", deudaTotal: "Debt amount",
      pagado: "Paid", ultimoPago: "Last payment",
      cols2: { concepto: "Concept", fecha: "Date", mes: "Month", ingresos: "Income", gastos: "Expenses", utilidad: "Profit", canal: "Channel", parte: "Share" },
      cols: { tercero: "Owed to", tipo: "Debt type", cliente: "Client", moneda: "Currency", monto: "Amount", desde: "Since", total: "Total", abonado: "Paid in", saldo: "Outstanding", estado: "Status" },
      states: { pend: "Pending", parcial: "Partial", pagado: "Paid" },
      types: { prov: "USDT supplier", transito: "Payment in transit" },
      empty_saldos_t: "No movements recorded yet",
      empty_saldos_b: "All three cajas stay at zero until you record the first movement in the bot.",
      empty_debo: "You have no pending payables",
      empty_cobro: "You have no pending receivables",
      empty_utilidad_t: "No operations recorded yet",
      empty_utilidad_b: "Profit is derived automatically from the operations already stored.",
      error_t: "Could not load the data",
      error_b: "No connection to the database. Whatever you saw before may be out of date — do not treat it as current.",
      retry: "Retry", demo: "Screen state", demoOpts: ["With data", "No data", "No connection"],
      botNote: "To record, correct or confirm a payment, message the bot.",
      login: { title: "Private panel", body: "Enter the 6-digit key the bot sends you on Telegram.", key: "Key", enter: "Enter", help: "Didn't get it? Send /clave to the bot.", pending: "Access method still undecided — see readme" }
    }
  },
  cajas: [
    { cur: "COP", saldo: 18450000 },
    { cur: "USD", saldo: 4820.50 },
    { cur: "USDT", saldo: 12350.75 }
  ],
  cxp: [
    { id: 1, tercero: "Proveedor Andrés M.", tipo: "prov", cur: "USDT", monto: 5200.00, desde: "02 sep" },
    { id: 2, tercero: "Procesador PagoRed", tipo: "transito", cur: "COP", monto: 6400000, desde: "04 sep" },
    { id: 3, tercero: "Proveedor Lina T.", tipo: "prov", cur: "USDT", monto: 1850.40, desde: "05 sep" },
    { id: 4, tercero: "Procesador Kuvo", tipo: "transito", cur: "COP", monto: 2100000, desde: "06 sep" }
  ],
  cxc: [
    { id: 1, cliente: "Distribuidora López", cur: "COP", total: 9800000, abonado: 3400000, estado: "parcial" },
    { id: 2, cliente: "Mario Escobar", cur: "USDT", total: 3200.00, abonado: 0, estado: "pend" },
    { id: 3, cliente: "Tienda La Esquina", cur: "COP", total: 1450000, abonado: 1450000, estado: "pagado" },
    { id: 4, cliente: "Carla Restrepo", cur: "USD", total: 1800.00, abonado: 600.00, estado: "parcial" },
    { id: 5, cliente: "Insumos del Valle", cur: "COP", total: 5200000, abonado: 0, estado: "pend" }
  ],
  utilidad: 41680000,
  // Monthly profit, as the DB view returns it (COP). The panel only plots it.
  utilidadMensual: [
    { mes: "ene", mesEn: "jan", ingresos: 26400000, gastos: 18900000 },
    { mes: "feb", mesEn: "feb", ingresos: 22800000, gastos: 16400000 },
    { mes: "mar", mesEn: "mar", ingresos: 31200000, gastos: 21800000 },
    { mes: "abr", mesEn: "apr", ingresos: 28600000, gastos: 20100000 },
    { mes: "may", mesEn: "may", ingresos: 34500000, gastos: 23200000 },
    { mes: "jun", mesEn: "jun", ingresos: 29800000, gastos: 21600000 },
    { mes: "jul", mesEn: "jul", ingresos: 38900000, gastos: 26400000 },
    { mes: "ago", mesEn: "aug", ingresos: 41200000, gastos: 27900000 },
    { mes: "sep", mesEn: "sep", ingresos: 18600000, gastos: 12800000 }
  ],
  canales: [
    { label: "Venta de mercancía", labelEn: "Merchandise sales", value: 48 },
    { label: "Cambio de divisas", labelEn: "Currency exchange", value: 34 },
    { label: "Compra/venta USDT", labelEn: "USDT trading", value: 18 }
  ],
  // Per-client detail, keyed by the CxC row id.
  clientes: {
    1: {
      cliente: "Distribuidora López", cur: "COP", desde: "marzo 2024", desdeEn: "March 2024",
      facturado: 41200000, promedioPago: 34, ultimoAbono: "28 ago",
      movs: [
        { id: 1, concepto: "Factura 0421", conceptoEn: "Invoice 0421", fecha: "12 ago", monto: 9800000, tipo: "cargo" },
        { id: 2, concepto: "Abono factura 0421", conceptoEn: "Payment on 0421", fecha: "28 ago", monto: 3400000, tipo: "abono" },
        { id: 3, concepto: "Factura 0388", conceptoEn: "Invoice 0388", fecha: "18 jul", monto: 7600000, tipo: "cargo" },
        { id: 4, concepto: "Abono factura 0388", conceptoEn: "Payment on 0388", fecha: "02 ago", monto: 7600000, tipo: "abono" }
      ]
    },
    2: {
      cliente: "Mario Escobar", cur: "USDT", desde: "enero 2025", desdeEn: "January 2025",
      facturado: 9400.00, promedioPago: 12, ultimoAbono: "—",
      movs: [
        { id: 1, concepto: "Venta USDT 3200", conceptoEn: "USDT sale 3200", fecha: "01 sep", monto: 3200.00, tipo: "cargo" },
        { id: 2, concepto: "Venta USDT 6200", conceptoEn: "USDT sale 6200", fecha: "14 ago", monto: 6200.00, tipo: "cargo" },
        { id: 3, concepto: "Abono venta 6200", conceptoEn: "Payment on 6200", fecha: "20 ago", monto: 6200.00, tipo: "abono" }
      ]
    },
    3: {
      cliente: "Tienda La Esquina", cur: "COP", desde: "junio 2023", desdeEn: "June 2023",
      facturado: 18700000, promedioPago: 9, ultimoAbono: "03 sep",
      movs: [
        { id: 1, concepto: "Factura 0433", conceptoEn: "Invoice 0433", fecha: "26 ago", monto: 1450000, tipo: "cargo" },
        { id: 2, concepto: "Abono factura 0433", conceptoEn: "Payment on 0433", fecha: "03 sep", monto: 1450000, tipo: "abono" }
      ]
    },
    4: {
      cliente: "Carla Restrepo", cur: "USD", desde: "abril 2025", desdeEn: "April 2025",
      facturado: 4200.00, promedioPago: 21, ultimoAbono: "30 ago",
      movs: [
        { id: 1, concepto: "Cambio USD 1800", conceptoEn: "USD exchange 1800", fecha: "22 ago", monto: 1800.00, tipo: "cargo" },
        { id: 2, concepto: "Abono parcial", conceptoEn: "Partial payment", fecha: "30 ago", monto: 600.00, tipo: "abono" }
      ]
    },
    5: {
      cliente: "Insumos del Valle", cur: "COP", desde: "octubre 2024", desdeEn: "October 2024",
      facturado: 22400000, promedioPago: 41, ultimoAbono: "12 ago",
      movs: [
        { id: 1, concepto: "Factura 0444", conceptoEn: "Invoice 0444", fecha: "30 ago", monto: 5200000, tipo: "cargo" },
        { id: 2, concepto: "Factura 0402", conceptoEn: "Invoice 0402", fecha: "18 jul", monto: 4100000, tipo: "cargo" },
        { id: 3, concepto: "Abono factura 0402", conceptoEn: "Payment on 0402", fecha: "12 ago", monto: 4100000, tipo: "abono" }
      ]
    }
  },
  // Per-debt detail (CxP), keyed by the CxP row id.
  proveedores: {
    1: {
      tercero: "Proveedor Andrés M.", tipo: "prov", cur: "USDT", total: 7200.00, ultimoAbono: "04 sep",
      movs: [
        { id: "c1", concepto: "Deuda PRV-011", conceptoEn: "Debt PRV-011", fecha: "02 sep", monto: 7200.00, tipo: "cargo" },
        { id: "a1", concepto: "Abono ABP-031", conceptoEn: "Payment ABP-031", fecha: "04 sep", monto: 2000.00, tipo: "abono" }
      ]
    },
    2: {
      tercero: "Procesador PagoRed", tipo: "transito", cur: "COP", total: 6400000, ultimoAbono: "—",
      movs: [
        { id: "c2", concepto: "Deuda TRN-008", conceptoEn: "Debt TRN-008", fecha: "04 sep", monto: 6400000, tipo: "cargo" }
      ]
    },
    3: {
      tercero: "Proveedor Lina T.", tipo: "prov", cur: "USDT", total: 1850.40, ultimoAbono: "—",
      movs: [
        { id: "c3", concepto: "Deuda PRV-012", conceptoEn: "Debt PRV-012", fecha: "05 sep", monto: 1850.40, tipo: "cargo" }
      ]
    },
    4: {
      tercero: "Procesador Kuvo", tipo: "transito", cur: "COP", total: 2100000, ultimoAbono: "—",
      movs: [
        { id: "c4", concepto: "Deuda TRN-009", conceptoEn: "Debt TRN-009", fecha: "06 sep", monto: 2100000, tipo: "cargo" }
      ]
    }
  },
  // Sums are what the DB views return; the panel only displays them.
  totals(list: any, field: any) {
    const out: Record<string, number> = {};
    list.forEach((r: any) => {
      const v = typeof field === "function" ? field(r) : r[field];
      out[r.cur] = (out[r.cur] || 0) + v;
    });
    return out;
  }
};
