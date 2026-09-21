import React from "react";

export function Breadcrumb({ items = [], style, ...rest }) {
  return (
    <nav style={Object.assign({ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "var(--text-muted)" }, style)} {...rest}>
      {items.map((it, i) => {
        const label = typeof it === "string" ? it : it.label;
        const icon = typeof it === "string" ? null : it.icon;
        const last = i === items.length - 1;
        return (
          <React.Fragment key={label + i}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", color: last ? "var(--text-body)" : "var(--text-muted)", fontWeight: last ? "var(--weight-medium)" : "var(--weight-regular)" }}>
              {icon}{label}
            </span>
            {last ? null : <span aria-hidden="true" style={{ color: "var(--text-faint)" }}>/</span>}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
