import React from "react";

const base = {
  display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px",
  fontFamily: "var(--font-core)", fontWeight: "var(--weight-semibold)",
  borderRadius: "var(--radius-control)", border: "1px solid transparent",
  cursor: "pointer", whiteSpace: "nowrap", textDecoration: "none",
  transition: "var(--transition-control)"
};

const sizes = {
  sm: { height: "var(--control-height-sm)", padding: "0 14px", fontSize: "13px" },
  md: { height: "var(--control-height)", padding: "0 20px", fontSize: "14px" },
  lg: { height: "var(--control-height-lg)", padding: "0 26px", fontSize: "15px" }
};

const variants = {
  primary: {
    rest: { background: "var(--green-700)", color: "var(--text-on-inverse)" },
    hover: { background: "var(--green-800)" },
    active: { background: "var(--green-900)" }
  },
  accent: {
    rest: { background: "var(--lime-400)", color: "var(--text-on-accent)" },
    hover: { background: "var(--lime-500)" },
    active: { background: "var(--lime-600)" }
  },
  secondary: {
    rest: { background: "var(--surface-card)", color: "var(--text-heading)", borderColor: "var(--border-default)", boxShadow: "var(--shadow-card)" },
    hover: { background: "var(--surface-hover)", borderColor: "var(--border-strong)" },
    active: { background: "var(--cream-200)" }
  },
  ghost: {
    rest: { background: "transparent", color: "var(--text-brand)" },
    hover: { background: "var(--surface-selected)" },
    active: { background: "var(--green-100)" }
  }
};

export function Button({
  children, variant = "primary", size = "md", icon, iconEnd, fullWidth = false,
  disabled = false, as = "button", style, ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [down, setDown] = React.useState(false);
  const v = variants[variant] || variants.primary;
  const Tag = as;
  const s = Object.assign({}, base, sizes[size] || sizes.md, v.rest,
    hover && !disabled ? v.hover : null,
    down && !disabled ? Object.assign({ transform: "scale(.98)" }, v.active) : null,
    fullWidth ? { width: "100%" } : null,
    disabled ? { opacity: .42, cursor: "not-allowed", boxShadow: "none" } : null,
    style);
  return (
    <Tag style={s} disabled={Tag === "button" ? disabled : undefined}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => { setHover(false); setDown(false); }}
      onMouseDown={() => setDown(true)} onMouseUp={() => setDown(false)} {...rest}>
      {icon ? <span style={{ display: "inline-flex", marginLeft: "-2px" }}>{icon}</span> : null}
      {children}
      {iconEnd ? <span style={{ display: "inline-flex", marginRight: "-2px" }}>{iconEnd}</span> : null}
    </Tag>
  );
}
