import React from "react";

export function SearchField({ placeholder = "Buscar", icon, value, onChange, width = "100%", style, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  return (
    <span style={Object.assign({
      display: "inline-flex", alignItems: "center", gap: "10px", width,
      height: "var(--control-height)", padding: "0 16px",
      background: "var(--surface-card)", border: "1px solid " + (focus ? "var(--border-brand)" : "var(--border-default)"),
      boxShadow: focus ? "var(--focus-ring)" : "none",
      borderRadius: "var(--radius-pill)", transition: "var(--transition-control)"
    }, style)}>
      {icon}
      <input type="search" placeholder={placeholder} value={value} onChange={onChange}
        onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
        style={{ flex: 1, minWidth: 0, border: "none", outline: "none", background: "transparent", font: "inherit", fontSize: "14px", color: "var(--text-heading)" }} {...rest} />
    </span>
  );
}
