import React from "react";

export function SideNav({ items = [], value, onChange, brand, footer, style, ...rest }) {
  return (
    <nav style={Object.assign({
      width: "var(--sidenav-width)", flexShrink: 0, display: "flex", flexDirection: "column",
      gap: "24px", padding: "22px 16px", background: "var(--surface-card)",
      borderRight: "1px solid var(--border-subtle)", minHeight: "100%"
    }, style)} {...rest}>
      {brand ? <div style={{ padding: "0 8px" }}>{brand}</div> : null}
      <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
        {items.map(it => {
          const on = it.value === value;
          return (
            <button key={it.value} onClick={() => onChange && onChange(it.value)}
              style={{
                display: "flex", alignItems: "center", gap: "11px", width: "100%",
                height: "42px", padding: "0 12px", border: "none", cursor: "pointer",
                borderRadius: "var(--radius-md)", textAlign: "left",
                background: on ? "var(--surface-selected)" : "transparent",
                color: on ? "var(--text-brand)" : "var(--text-body)",
                fontSize: "14px", fontWeight: on ? "var(--weight-semibold)" : "var(--weight-regular)",
                transition: "var(--transition-control)"
              }}>
              <span style={{ display: "inline-flex", color: on ? "var(--green-700)" : "var(--ink-500)" }}>{it.icon}</span>
              <span style={{ flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{it.label}</span>
              {it.badge != null ? <span style={{ fontSize: "12px", fontWeight: "var(--weight-semibold)", color: "var(--text-muted)", fontVariantNumeric: "tabular-nums" }}>{it.badge}</span> : null}
            </button>
          );
        })}
      </div>
      <div style={{ marginTop: "auto" }}>{footer}</div>
    </nav>
  );
}
