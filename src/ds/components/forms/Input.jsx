import React from "react";

export function Input({ label, hint, error, icon, suffix, prefix, id, style, wrapperStyle, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  const uid = id || React.useId();
  const shell = Object.assign({
    display: "flex", alignItems: "center", gap: "10px",
    height: "var(--control-height-lg)", padding: "0 16px",
    background: "var(--surface-card)", border: "1px solid var(--border-default)",
    borderRadius: "var(--radius-field)", transition: "var(--transition-control)", color: "var(--text-muted)"
  }, focus ? { borderColor: "var(--border-brand)", boxShadow: "var(--focus-ring)" } : null,
    error ? { borderColor: "var(--clay-600)" } : null);
  return (
    <label htmlFor={uid} style={Object.assign({ display: "block" }, wrapperStyle)}>
      {label ? <span style={{ display: "block", fontSize: "13px", fontWeight: "var(--weight-medium)", color: "var(--text-body)", marginBottom: "6px" }}>{label}</span> : null}
      <span style={shell}>
        {icon}
        {prefix ? <span style={{ fontSize: "15px", color: "var(--text-muted)", fontVariantNumeric: "tabular-nums" }}>{prefix}</span> : null}
        <input id={uid} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
          style={Object.assign({
            flex: 1, minWidth: 0, border: "none", outline: "none", background: "transparent",
            font: "inherit", fontSize: "15px", color: "var(--text-heading)"
          }, style)} {...rest} />
        {suffix ? <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>{suffix}</span> : null}
      </span>
      {error ? <span style={{ display: "block", fontSize: "12px", color: "var(--clay-600)", marginTop: "6px" }}>{error}</span>
        : hint ? <span style={{ display: "block", fontSize: "12px", color: "var(--text-muted)", marginTop: "6px" }}>{hint}</span> : null}
    </label>
  );
}
