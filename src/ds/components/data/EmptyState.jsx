import React from "react";

export function EmptyState({ icon, title, body, action, tone = "sunken", style, ...rest }) {
  const looks = {
    sunken: { background: "var(--surface-sunken)", border: "1px dashed var(--border-default)", icon: "var(--green-500)" },
    plain: { background: "transparent", border: "1px dashed var(--border-default)", icon: "var(--green-500)" },
    error: { background: "var(--state-negative-bg)", border: "1px solid var(--clay-300)", icon: "var(--clay-600)" }
  };
  const l = looks[tone] || looks.sunken;
  return (
    <div role={tone === "error" ? "alert" : undefined} style={Object.assign({
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      gap: "10px", padding: "40px 28px", textAlign: "center",
      background: l.background, borderRadius: "var(--radius-card)", border: l.border
    }, style)} {...rest}>
      {icon ? <span style={{ display: "inline-flex", color: l.icon, marginBottom: "2px" }}>{icon}</span> : null}
      {title ? <div style={{ fontSize: "16px", fontWeight: "var(--weight-semibold)", color: tone === "error" ? "var(--clay-700)" : "var(--text-heading)" }}>{title}</div> : null}
      {body ? <p style={{ fontSize: "13px", color: tone === "error" ? "var(--clay-700)" : "var(--text-muted)", maxWidth: "44ch" }}>{body}</p> : null}
      {action ? <div style={{ marginTop: "8px" }}>{action}</div> : null}
    </div>
  );
}
