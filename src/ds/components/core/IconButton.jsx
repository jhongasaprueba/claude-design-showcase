import React from "react";

const sizes = { sm: 32, md: 40, lg: 44 };

export function IconButton({ icon, label, variant = "surface", size = "md", active = false, disabled = false, style, ...rest }) {
  const [hover, setHover] = React.useState(false);
  const d = sizes[size] || sizes.md;
  const looks = {
    surface: { background: "var(--surface-card)", color: "var(--text-heading)", border: "1px solid var(--border-default)", boxShadow: "var(--shadow-card)" },
    quiet: { background: "transparent", color: "var(--text-muted)", border: "1px solid transparent" },
    inverse: { background: "var(--green-700)", color: "var(--text-on-inverse)", border: "1px solid var(--green-700)" }
  };
  const s = Object.assign({
    width: d + "px", height: d + "px", display: "inline-flex", alignItems: "center", justifyContent: "center",
    borderRadius: "var(--radius-pill)", cursor: "pointer", padding: 0, transition: "var(--transition-control)"
  }, looks[variant] || looks.surface,
    active ? { background: "var(--surface-ink)", color: "var(--cream-50)", borderColor: "var(--surface-ink)" } : null,
    hover && !disabled && !active ? { background: "var(--surface-hover)", color: "var(--text-heading)" } : null,
    disabled ? { opacity: .4, cursor: "not-allowed" } : null, style);
  return <button type="button" aria-label={label} title={label} disabled={disabled} style={s}
    onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} {...rest}>{icon}</button>;
}
