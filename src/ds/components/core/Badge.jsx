import React from "react";

const tones = {
  neutral: { background: "var(--state-neutral-bg)", color: "var(--ink-700)" },
  positive: { background: "var(--state-positive-bg)", color: "var(--lime-600)" },
  negative: { background: "var(--state-negative-bg)", color: "var(--clay-600)" },
  warning: { background: "var(--state-warning-bg)", color: "var(--amber-600)" },
  brand: { background: "var(--surface-selected)", color: "var(--text-brand)" },
  accent: { background: "var(--surface-accent)", color: "var(--text-on-accent)" }
};

export function Badge({ children, tone = "neutral", icon, dot = false, style, ...rest }) {
  const t = tones[tone] || tones.neutral;
  return (
    <span style={Object.assign({
      display: "inline-flex", alignItems: "center", gap: "6px", height: "24px", padding: "0 10px",
      borderRadius: "var(--radius-pill)", fontSize: "12px", fontWeight: "var(--weight-semibold)",
      letterSpacing: "-0.005em", whiteSpace: "nowrap", fontVariantNumeric: "tabular-nums"
    }, t, style)} {...rest}>
      {dot ? <span style={{ width: "6px", height: "6px", borderRadius: "999px", background: "currentColor" }} /> : null}
      {icon}
      {children}
    </span>
  );
}
