import React from "react";

export function SegmentedTabs({ items = [], value, onChange, size = "md", tone = "sunken", style, ...rest }) {
  const heights = { sm: 30, md: 36, lg: 42 };
  const h = heights[size] || heights.md;
  const shells = {
    sunken: { background: "var(--surface-sunken)", border: "1px solid var(--border-subtle)" },
    ink: { background: "var(--surface-ink)", border: "1px solid var(--surface-ink)" },
    plain: { background: "var(--surface-card)", border: "1px solid var(--border-default)" }
  };
  return (
    <div role="tablist" style={Object.assign({
      display: "inline-flex", alignItems: "center", gap: "2px", padding: "3px",
      borderRadius: "var(--radius-pill)"
    }, shells[tone] || shells.sunken, style)} {...rest}>
      {items.map(it => {
        const v = typeof it === "string" ? it : it.value;
        const l = typeof it === "string" ? it : it.label;
        const on = v === value;
        const inkShell = tone === "ink";
        return (
          <button key={v} role="tab" aria-selected={on} onClick={() => onChange && onChange(v)}
            style={{
              height: h + "px", padding: "0 " + (size === "sm" ? 12 : 16) + "px", border: "none",
              borderRadius: "var(--radius-pill)", cursor: "pointer",
              fontSize: size === "sm" ? "12px" : "13px", fontWeight: "var(--weight-semibold)",
              background: on ? (inkShell ? "var(--cream-50)" : "var(--surface-card)") : "transparent",
              color: on ? (inkShell ? "var(--ink-900)" : "var(--text-heading)") : (inkShell ? "rgba(251,253,246,.66)" : "var(--text-muted)"),
              boxShadow: on && !inkShell ? "var(--shadow-card)" : "none",
              transition: "var(--transition-control)"
            }}>{l}</button>
        );
      })}
    </div>
  );
}
