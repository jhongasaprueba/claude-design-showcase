import React from "react";
import { CFData } from "../data";
import { ScreenFrame } from "./ScreenFrame.jsx";
import { Card, DataTable, ContactCell, MoneyFigure, Badge, Icon } from "../index.js";

export function TotalsRow({ totals, role, label }) {
  const entries = Object.keys(totals);
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "var(--grid-gap)" }}>
      {entries.map(cur => (
        <Card key={cur} padding="lg">
          <div style={{ fontSize: "13px", fontWeight: "var(--weight-semibold)", color: "var(--text-muted)" }}>{label} · {cur}</div>
          <div style={{ marginTop: "12px" }}>
            <MoneyFigure value={totals[cur]} currency={cur} role={role} size="md" showCode />
          </div>
        </Card>
      ))}
    </div>
  );
}

export function DeboScreen({ lang, screenState }) {
  const D = CFData, t = D.t[lang];
  const rows = D.cxp;
  const totals = D.totals(rows, "monto");
  return (
    <ScreenFrame lang={lang} screenState={screenState}
      title={t.debo_title} subtitle={t.debo_sub} section={t.nav_debo}
      emptyIcon={<Icon name="check" size={22} />} emptyTitle={t.empty_debo}
      emptyBody={lang === "es" ? "Cuando el bot registre una compra a crédito o un pago en tránsito, aparecerá acá." : "Credit purchases and payments in transit recorded by the bot show up here."}>
      <TotalsRow totals={totals} role="payable" label={t.debe} />
      <Card padding="md" style={{ marginTop: "var(--grid-gap)" }}>
        <DataTable rows={rows} columns={[
          { key: "tercero", header: t.cols.tercero, render: r => <ContactCell name={r.tercero} note={r.desde} tone="neutral" /> },
          { key: "tipo", header: t.cols.tipo, render: r => <Badge tone={r.tipo === "prov" ? "neutral" : "warning"}>{t.types[r.tipo]}</Badge> },
          { key: "cur", header: t.cols.moneda, render: r => <span className="cf-overline">{r.cur}</span> },
          { key: "desde", header: t.cols.desde, render: r => <span style={{ color: "var(--text-muted)" }}>{r.desde}</span> },
          { key: "monto", header: t.cols.monto, align: "right", render: r => <MoneyFigure value={r.monto} currency={r.cur} role="payable" size="sm" showCode /> }
        ]} />
      </Card>
    </ScreenFrame>
  );
}

