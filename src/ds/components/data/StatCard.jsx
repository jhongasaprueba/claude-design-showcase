import React from "react";
import { Card } from "../core/Card.jsx";
import { Badge } from "../core/Badge.jsx";
import { MoneyFigure } from "./MoneyFigure.jsx";

export function StatCard({
  label, value, currency = "$", role = "neutral", delta, deltaTone, caption,
  icon, chart, tone = "default", size = "md", actions, style, ...rest
}) {
  const inverse = tone === "inverse" || tone === "ink";
  const figureRole = inverse ? "inverse" : role;
  const muted = inverse ? "rgba(251,253,246,.66)" : "var(--text-muted)";
  return (
    <Card tone={tone} bloom={!inverse && size === "lg"} style={Object.assign({ display: "flex", flexDirection: "column", gap: "14px" }, style)} {...rest}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "13px", fontWeight: "var(--weight-medium)", color: muted }}>
          {icon ? <span style={{ display: "inline-flex", color: inverse ? "var(--lime-400)" : "var(--ink-400)" }}>{icon}</span> : null}
          {label}
        </span>
        {actions}
      </div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: "10px", flexWrap: "wrap" }}>
        <MoneyFigure value={value} currency={currency} role={figureRole} size={size === "lg" ? "xl" : size === "sm" ? "md" : "lg"} />
        {delta != null ? <Badge tone={deltaTone || (String(delta).trim().startsWith("-") ? "negative" : "positive")}>{delta}</Badge> : null}
      </div>
      {chart ? <div style={{ marginTop: "2px" }}>{chart}</div> : null}
      {caption ? <div style={{ fontSize: "12px", color: muted }}>{caption}</div> : null}
    </Card>
  );
}
