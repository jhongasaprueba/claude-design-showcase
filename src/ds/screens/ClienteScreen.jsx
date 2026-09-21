import React from "react";
import { CFData } from "../data";
import { ScreenFrame } from "./ScreenFrame.jsx";
import { ExportMenu } from "./ExportMenu.jsx";
import { Card, MoneyFigure, Badge, Icon, DataTable, Avatar, Button, ProgressMeter } from "../index.js";

export function ClienteScreen({ lang, screenState, clienteId, back }) {
  const D = CFData, t = D.t[lang];
  const c = D.clientes[clienteId] || D.clientes[1];
  const cxc = D.cxc.find(r => r.id === clienteId) || D.cxc[0];
  const saldo = cxc.total - cxc.abonado;
  const tones = { pend: "neutral", parcial: "warning", pagado: "positive" };
  return (
    <ScreenFrame lang={lang} screenState={screenState}
      title={c.cliente} subtitle={t.detalle} section={t.nav_cobro}
      actions={<>
        <Button variant="secondary" size="sm" onClick={back} icon={<Icon name="arrow-left" size={15} />}>{t.volver}</Button>
        <ExportMenu lang={lang} />
      </>}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "var(--grid-gap)", alignItems: "start" }}>
        <Card bloom title={t.resumenCliente}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Avatar name={c.cliente} size="lg" />
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: "var(--text-h3-size)", fontWeight: "var(--weight-semibold)", color: "var(--text-heading)" }}>{c.cliente}</div>
              <div style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "3px" }}>
                {(lang === "es" ? "Cliente desde " : "Client since ") + (lang === "es" ? c.desde : c.desdeEn)} · {c.cur}
              </div>
            </div>
          </div>
          <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "18px" }}>
            <div>
              <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>{t.cols.saldo}</div>
              <MoneyFigure value={saldo} currency={c.cur} role={saldo > 0 ? "receivable" : "neutral"} size="lg" showCode style={{ marginTop: "4px" }} />
            </div>
            <ProgressMeter label={t.cols.abonado} valueLabel={Math.round((cxc.abonado / cxc.total) * 100) + "%"} value={cxc.abonado} max={cxc.total} role="receivable" />
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              <Badge tone={tones[cxc.estado]} dot={cxc.estado === "parcial"}>{t.states[cxc.estado]}</Badge>
              <Badge tone="neutral">{t.promedioPago}: {c.promedioPago} {lang === "es" ? "días" : "days"}</Badge>
            </div>
            <div style={{ height: "1px", background: "var(--border-subtle)" }} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
              <div>
                <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>{t.facturado}</div>
                <MoneyFigure value={c.facturado} currency={c.cur} role="cash" size="sm" showCode style={{ marginTop: "4px" }} />
              </div>
              <div>
                <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>{t.ultimoAbono}</div>
                <div style={{ fontSize: "16px", fontWeight: "var(--weight-semibold)", color: "var(--text-heading)", marginTop: "6px" }}>{c.ultimoAbono}</div>
              </div>
            </div>
          </div>
        </Card>

        <Card title={t.histCliente} padding="md" style={{ gridColumn: "span 2", minWidth: 0 }}>
          <DataTable rows={c.movs} columns={[
            { key: "concepto", header: t.cols2.concepto, render: r => (
              <span style={{ display: "inline-flex", alignItems: "center", gap: "9px" }}>
                <Icon name={r.tipo === "abono" ? "arrow-down-left" : "receipt"} size={15} />
                <span style={{ fontWeight: "var(--weight-medium)", color: "var(--text-heading)" }}>{lang === "es" ? r.concepto : r.conceptoEn}</span>
              </span>
            ) },
            { key: "fecha", header: t.cols2.fecha, render: r => <span style={{ color: "var(--text-muted)" }}>{r.fecha}</span> },
            { key: "tipo", header: t.cols.estado, render: r => <Badge tone={r.tipo === "abono" ? "positive" : "neutral"}>{r.tipo === "abono" ? t.cols.abonado : (lang === "es" ? "Cargo" : "Charge")}</Badge> },
            { key: "monto", header: t.cols.monto, align: "right", render: r => <MoneyFigure value={r.monto} currency={c.cur} role={r.tipo === "abono" ? "cash" : "receivable"} size="sm" sign={r.tipo === "abono" ? "+" : null} showCode /> }
          ]} />
        </Card>
      </div>
    </ScreenFrame>
  );
}

