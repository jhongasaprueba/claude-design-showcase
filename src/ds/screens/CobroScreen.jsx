import React from "react";
import { CFData } from "../data";
import { ScreenFrame } from "./ScreenFrame.jsx";
import { TotalsRow } from "./DeboScreen.jsx";
import { Card, DataTable, ContactCell, MoneyFigure, Badge, Icon, ProgressMeter, IconButton } from "../index.js";

export function CobroScreen({ lang, screenState, openCliente }) {
  const D = CFData, t = D.t[lang];
  const rows = D.cxc.map(r => Object.assign({}, r, { saldo: r.total - r.abonado }));
  // Only what is still outstanding counts toward the total, per the spec.
  const totals = D.totals(rows.filter(r => r.saldo > 0), "saldo");
  const tones = { pend: "neutral", parcial: "warning", pagado: "positive" };
  return (
    <ScreenFrame lang={lang} screenState={screenState}
      title={t.cobro_title} subtitle={t.cobro_sub} section={t.nav_cobro}
      emptyIcon={<Icon name="check" size={22} />} emptyTitle={t.empty_cobro}
      emptyBody={lang === "es" ? "Cuando el bot registre una venta a crédito, aparecerá acá." : "Credit sales recorded by the bot show up here."}>
      <TotalsRow totals={totals} role="receivable" label={t.pendiente} />
      <Card padding="md" style={{ marginTop: "var(--grid-gap)" }}>
        <DataTable rows={rows} onRowClick={r => openCliente(r.id)} columns={[
          { key: "cliente", header: t.cols.cliente, render: r => <ContactCell name={r.cliente} note={t.cols.moneda + ": " + r.cur} /> },
          { key: "total", header: t.cols.total, align: "right", render: r => <MoneyFigure value={r.total} currency={r.cur} role="neutral" size="sm" showCode /> },
          { key: "abonado", header: t.cols.abonado, align: "right", render: r => (
            <span style={{ display: "inline-flex", flexDirection: "column", alignItems: "flex-end", gap: "6px", minWidth: "104px" }}>
              <MoneyFigure value={r.abonado} currency={r.cur} role="cash" size="sm" />
              <ProgressMeter value={r.abonado} max={r.total} role="receivable" height={5} style={{ width: "100%" }} />
            </span>
          ) },
          { key: "saldo", header: t.cols.saldo, align: "right", render: r => <MoneyFigure value={r.saldo} currency={r.cur} role={r.saldo > 0 ? "receivable" : "neutral"} size="sm" showCode /> },
          { key: "estado", header: t.cols.estado, render: r => <Badge tone={tones[r.estado]} dot={r.estado === "parcial"}>{t.states[r.estado]}</Badge> },
          { key: "go", header: "", align: "right", width: "48px", render: () => <IconButton icon={<Icon name="chevron-right" size={15} />} label={t.verDetalle} variant="quiet" size="sm" /> }
        ]} />
      </Card>
    </ScreenFrame>
  );
}

