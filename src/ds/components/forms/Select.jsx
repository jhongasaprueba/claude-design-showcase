import React from "react";

export function Select({ label, hint, options = [], id, style, wrapperStyle, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  const uid = id || React.useId();
  return (
    <label htmlFor={uid} style={Object.assign({ display: "block" }, wrapperStyle)}>
      {label ? <span style={{ display: "block", fontSize: "13px", fontWeight: "var(--weight-medium)", color: "var(--text-body)", marginBottom: "6px" }}>{label}</span> : null}
      <span style={{ position: "relative", display: "block" }}>
        <select id={uid} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
          style={Object.assign({
            appearance: "none", width: "100%", height: "var(--control-height-lg)", padding: "0 40px 0 16px",
            background: "var(--surface-card)", border: "1px solid " + (focus ? "var(--border-brand)" : "var(--border-default)"),
            boxShadow: focus ? "var(--focus-ring)" : "none",
            borderRadius: "var(--radius-field)", font: "inherit", fontSize: "15px",
            color: "var(--text-heading)", outline: "none", cursor: "pointer", transition: "var(--transition-control)"
          }, style)} {...rest}>
          {options.map(o => {
            const v = typeof o === "string" ? o : o.value;
            const l = typeof o === "string" ? o : o.label;
            return <option key={v} value={v}>{l}</option>;
          })}
        </select>
        <span aria-hidden="true" style={{
          position: "absolute", right: "16px", top: "50%", width: "8px", height: "8px", marginTop: "-6px",
          borderRight: "1.6px solid var(--ink-500)", borderBottom: "1.6px solid var(--ink-500)", transform: "rotate(45deg)"
        }} />
      </span>
      {hint ? <span style={{ display: "block", fontSize: "12px", color: "var(--text-muted)", marginTop: "6px" }}>{hint}</span> : null}
    </label>
  );
}
