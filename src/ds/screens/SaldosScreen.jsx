import React from "react";
import { CFData } from "../data";
import { ScreenFrame } from "./ScreenFrame.jsx";
import { Card, MoneyFigure, Icon, EmptyState } from "../index.js";

export function CajaCard({ cur, saldo, hero }) {
  return (
    <Card tone={hero ? "inverse" : "default"} bloom={!hero}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "13px", fontWeight: "var(--weight-semibold)", color: hero ? "rgba(251,253,246,.66)" : "var(--text-muted)" }}>
          <Icon name="wallet" size={15} />Caja {cur}
        </span>
      </div>
      <div style={{ marginTop: "18px" }}>
        <MoneyFigure value={saldo} currency={cur} role={hero ? "inverse" : "cash"} size="lg" showCode />
      </div>
    </Card>
  );
}

export function SaldosScreen({ lang, screenState }) {
  const D = CFData, t = D.t[lang];
  const cajas = screenState === 1 ? D.cajas.map(c => ({ cur: c.cur, saldo: 0 })) : D.cajas;
  return (
    <ScreenFrame lang={lang} screenState={screenState === 1 ? 0 : screenState}
      title={t.saldos_title} subtitle={t.saldos_sub} section={t.nav_saldos}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "var(--grid-gap)" }}>
        {cajas.map((c, i) => <CajaCard key={c.cur} cur={c.cur} saldo={c.saldo} hero={i === 0} />)}
      </div>
      {screenState === 1 ? (
        <div style={{ marginTop: "var(--grid-gap)" }}>
          <EmptyState icon={<Icon name="inbox" size={22} />} title={t.empty_saldos_t} body={t.empty_saldos_b} />
        </div>
      ) : null}
    </ScreenFrame>
  );
}

