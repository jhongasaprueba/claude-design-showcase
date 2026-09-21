import React from "react";

export function ProgressMeter({ value = 0, max = 100, role = "cash", label, valueLabel, height = 8, style, ...rest }) {
  const colors = { cash: "var(--green-700)", receivable: "var(--lime-500)", payable: "var(--clay-600)", profit: "var(--green-700)", neutral: "var(--ink-400)" };
  const pct = Math.max(0, Math.min(100, (value / (max || 1)) * 100));
  return (
    <div style={Object.assign({ display: "flex", flexDirection: "column", gap: "7px" }, style)} {...rest}>
      {(label || valueLabel) ? (
        <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", fontSize: "12px" }}>
          <span style={{ color: "var(--text-muted)" }}>{label}</span>
          <span className="cf-figure" style={{ color: "var(--text-body)", fontWeight: "var(--weight-medium)" }}>{valueLabel}</span>
        </div>
      ) : null}
      <span style={{ display: "block", height: height + "px", borderRadius: "999px", background: "var(--ink-100)", overflow: "hidden" }}>
        <span style={{ display: "block", width: pct + "%", height: "100%", borderRadius: "999px", background: colors[role] || colors.cash, transition: "width var(--duration-slow) var(--ease-out)" }} />
      </span>
    </div>
  );
}
