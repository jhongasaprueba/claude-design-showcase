import React from "react";

export function PageHeader({ title, count, breadcrumb, actions, meta, style, ...rest }) {
  return (
    <header style={Object.assign({ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "16px", marginBottom: "22px" }, style)} {...rest}>
      <div style={{ minWidth: 0 }}>
        {breadcrumb ? <div style={{ marginBottom: "10px" }}>{breadcrumb}</div> : null}
        <h1 style={{ display: "flex", alignItems: "baseline", gap: "10px", fontSize: "var(--text-h1-size)", lineHeight: "var(--text-h1-line)", letterSpacing: "var(--text-h1-tracking)" }}>
          {title}
          {count != null ? <span style={{ fontSize: "20px", fontWeight: "var(--weight-medium)", color: "var(--text-faint)", fontVariantNumeric: "tabular-nums" }}>({count})</span> : null}
        </h1>
        {meta ? <div style={{ marginTop: "8px", fontSize: "13px", color: "var(--text-muted)" }}>{meta}</div> : null}
      </div>
      {actions ? <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>{actions}</div> : null}
    </header>
  );
}
