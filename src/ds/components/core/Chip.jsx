import React from "react";

export function Chip({ children, selected = false, icon, count, onClick, style, ...rest }) {
  const [hover, setHover] = React.useState(false);
  const s = Object.assign({
    display: "inline-flex", alignItems: "center", gap: "8px", height: "34px", padding: "0 14px",
    borderRadius: "var(--radius-chip)", fontSize: "13px", fontWeight: "var(--weight-medium)",
    background: "var(--surface-card)", color: "var(--text-body)", border: "1px solid var(--border-default)",
    cursor: onClick ? "pointer" : "default", transition: "var(--transition-control)"
  }, hover && !selected ? { background: "var(--surface-hover)", borderColor: "var(--border-strong)" } : null,
    selected ? { background: "var(--surface-ink)", color: "var(--cream-50)", borderColor: "var(--surface-ink)" } : null, style);
  return (
    <button type="button" aria-pressed={selected} onClick={onClick} style={s}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} {...rest}>
      {icon}{children}
      {count != null ? <span style={{ fontVariantNumeric: "tabular-nums", opacity: .6 }}>{count}</span> : null}
    </button>
  );
}
