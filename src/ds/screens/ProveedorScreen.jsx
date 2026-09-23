import React from "react";
import { CFData } from "../data";
import { ScreenFrame } from "./ScreenFrame.jsx";
import { ExportMenu } from "./ExportMenu.jsx";
import { Card, MoneyFigure, Badge, Icon, DataTable, Avatar, Button, ProgressMeter } from "../index.js";

export function ProveedorScreen({ lang, screenState, cxpId, back }) {
  const D = CFData, t = D.t[lang];
  const p = (D.proveedores || {})[cxpId] || {};
  const row = D.cxp.find(r => String(r.id) === String(cxpId)) || null;
  const total = p.total != null ? p.total : (row ? row.monto : 0);
  const saldo = row ? row.monto : 0;
  const abonado = Math.min(Math.max(total - saldo, 0), total);
  const estado = abonado <= 0 ? "pend" : abonado >= total ? "pagado" : "parcial";
  const tones = { pend: "neutral", parcial: "warning", pagado: "positive" };
  const pct = total > 0 ? Math.round((abonado / total) * 100) : 0;
  const nombre = p.tercero || (row ? row.tercero : "—");
  return (
    <ScreenFrame lang={lang} screenState={screenState}
      title={nombre} subtitle={t.detalleProv} section={t.debo_title}
      actions={<>
        <Button variant="secondary" size="sm" onClick={back} icon={<Icon name="arrow-left" size={15} />}>{t.volver}</Button>
        <ExportMenu lang={lang} />
      </>}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "var(--grid-gap)", alignItems: "start" }}>
        <Card bloom title={t.resumenProv}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Avatar name={nombre} size="lg" />
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: "var(--text-h3-size)", fontWeight: "var(--weight-semibold)", color: "var(--text-heading)" }}>{nombre}</div>
              <div style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "3px" }}>
                {(p.tipo && t.types[p.tipo]) || p.tipoTxt || "—"} · {p.cur || (row ? row.cur : "")}
              </div>
            </div>
          </div>
          <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "18px" }}>
            <div>
              <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>{t.cols.saldo}</div>
              <MoneyFigure value={saldo} currency={p.cur || "COP"} role={saldo > 0 ? "payable" : "neutral"} size="lg" showCode style={{ marginTop: "4px" }} />
            </div>
            <ProgressMeter label={t.pagado} valueLabel={pct + "%"} value={abonado} max={total || 1} role="payable" />
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              <Badge tone={tones[estado]} dot={estado === "parcial"}>{t.states[estado]}</Badge>
            </div>
            <div style={{ height: "1px", background: "var(--border-subtle)" }} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
              <div>
                <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>{t.deudaTotal}</div>
                <MoneyFigure value={total} currency={p.cur || "COP"} role="payable" size="sm" showCode style={{ marginTop: "4px" }} />
              </div>
              <div>
                <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>{t.ultimoPago}</div>
                <div style={{ fontSize: "16px", fontWeight: "var(--weight-semibold)", color: "var(--text-heading)", marginTop: "6px" }}>{p.ultimoAbono || "—"}</div>
              </div>
            </div>
          </div>
        </Card>

        <Card title={t.histProv} padding="md" style={{ gridColumn: "span 2", minWidth: 0 }}>
          <DataTable rows={p.movs || []} columns={[
            { key: "concepto", header: t.cols2.concepto, render: r => (
              <span style={{ display: "inline-flex", alignItems: "center", gap: "9px" }}>
                <Icon name={r.tipo === "abono" ? "arrow-up-right" : "receipt"} size={15} />
                <span style={{ fontWeight: "var(--weight-medium)", color: "var(--text-heading)" }}>{lang === "es" ? r.concepto : r.conceptoEn}</span>
              </span>
            ) },
            { key: "fecha", header: t.cols2.fecha, render: r => <span style={{ color: "var(--text-muted)" }}>{r.fecha}</span> },
            { key: "tipo", header: t.cols.estado, render: r => <Badge tone={r.tipo === "abono" ? "positive" : "neutral"}>{r.tipo === "abono" ? t.pagado : (lang === "es" ? "Cargo" : "Charge")}</Badge> },
            { key: "monto", header: t.cols.monto, align: "right", render: r => <MoneyFigure value={r.monto} currency={p.cur || "COP"} role={r.tipo === "abono" ? "cash" : "payable"} size="sm" sign={r.tipo === "abono" ? "-" : null} showCode /> }
          ]} />
        </Card>
      </div>
    </ScreenFrame>
  );
}
