import React from "react";
import { CFData } from "../data";
import { ScreenFrame } from "./ScreenFrame.jsx";
import { Card, MoneyFigure, Icon, BarSparkline, DonutChart, DataTable, Badge } from "../index.js";

export function UtilidadScreen({ lang, screenState }) {
  const D = CFData, t = D.t[lang];
  const empty = screenState === 1;
  const meses = D.utilidadMensual.map(m => Object.assign({}, m, {
    id: m.mes, label: lang === "es" ? m.mes : m.mesEn, utilidad: m.ingresos - m.gastos
  }));
  const mejor = meses.reduce((a, b) => b.utilidad > a.utilidad ? b : a, meses[0]);
  return (
    <ScreenFrame lang={lang} screenState={screenState === 1 ? 0 : screenState}
      title={t.utilidad_title} subtitle={t.utilidad_sub} section={t.nav_utilidad}>
      <Card tone="ink" style={{ padding: "40px" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "32px", flexWrap: "wrap" }}>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: "13px", color: "rgba(251,253,246,.66)", display: "inline-flex", alignItems: "center", gap: "8px" }}>
              <Icon name="trending-up" size={15} />{t.utilidad_title}
            </div>
            <div style={{ marginTop: "16px" }}>
              <MoneyFigure value={empty ? 0 : D.utilidad} currency="COP" size="xl" showCode
                style={{ color: "var(--lime-400)", fontSize: "min(64px, 12cqw)" }} />
            </div>
          </div>
          {!empty ? (
            <div style={{ flex: 1, minWidth: "260px", maxWidth: "460px" }}>
              <BarSparkline values={meses.map(m => m.utilidad)} role="receivable" height={76} highlightLast={false} />
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px", fontSize: "11px", color: "rgba(251,253,246,.5)" }}>
                {meses.map(m => <span key={m.id}>{m.label}</span>)}
              </div>
            </div>
          ) : null}
        </div>
        <p style={{ marginTop: "22px", fontSize: "13px", color: "rgba(251,253,246,.66)", maxWidth: "58ch" }}>
          {empty
            ? t.empty_utilidad_t + " — " + t.empty_utilidad_b
            : (lang === "es"
              ? "Calculada por la base de datos a partir de todas las operaciones registradas. Este panel no la recalcula ni la ajusta."
              : "Calculated by the database from every recorded operation. This panel neither recalculates nor adjusts it.")}
        </p>
      </Card>

      {!empty ? (
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.55fr) minmax(280px, 1fr)", gap: "var(--grid-gap)", marginTop: "var(--grid-gap)" }}>
          <Card title={t.mesAMes} subtitle={t.mesAMesSub} padding="md">
            <DataTable dense rows={meses} columns={[
              { key: "label", header: t.cols2.mes, render: r => <span style={{ fontWeight: "var(--weight-medium)", color: "var(--text-heading)", textTransform: "capitalize" }}>{r.label}</span> },
              { key: "ingresos", header: t.cols2.ingresos, align: "right", render: r => <MoneyFigure value={r.ingresos} currency="COP" role="cash" size="sm" /> },
              { key: "gastos", header: t.cols2.gastos, align: "right", render: r => <MoneyFigure value={r.gastos} currency="COP" role="payable" size="sm" /> },
              { key: "utilidad", header: t.cols2.utilidad, align: "right", render: r => (
                <span style={{ display: "inline-flex", alignItems: "center", gap: "8px", justifyContent: "flex-end" }}>
                  <MoneyFigure value={r.utilidad} currency="COP" role="profit" size="sm" />
                  {r.id === mejor.id ? <Badge tone="accent">{lang === "es" ? "mejor mes" : "best"}</Badge> : null}
                </span>
              ) }
            ]} />
          </Card>
          <Card title={t.porCanal} subtitle={t.porCanalSub}>
            <DonutChart size={158} thickness={18} centerLabel={t.cols2.ingresos}
              centerValue={"$" + Math.round(meses.reduce((s, m) => s + m.ingresos, 0)).toLocaleString("es-CO")}
              segments={D.canales.map(c => ({ label: lang === "es" ? c.label : c.labelEn, value: c.value }))} />
          </Card>
        </div>
      ) : null}
    </ScreenFrame>
  );
}

