import React from "react";

const sizes = { xs: 24, sm: 32, md: 40, lg: 56 };

export function Avatar({ name = "", src, size = "sm", tone = "brand", style, ...rest }) {
  const d = sizes[size] || sizes.sm;
  const initials = String(name).trim().split(/\s+/).slice(0, 2).map(w => w[0] || "").join("").toUpperCase();
  const tones = {
    brand: { background: "var(--green-100)", color: "var(--green-800)" },
    accent: { background: "var(--lime-200)", color: "var(--green-900)" },
    neutral: { background: "var(--ink-100)", color: "var(--ink-700)" }
  };
  const s = Object.assign({
    width: d + "px", height: d + "px", borderRadius: "var(--radius-avatar)", flexShrink: 0,
    display: "inline-flex", alignItems: "center", justifyContent: "center", overflow: "hidden",
    fontSize: Math.max(10, Math.round(d * 0.36)) + "px", fontWeight: "var(--weight-semibold)",
    letterSpacing: "0.01em", border: "1px solid var(--border-subtle)"
  }, tones[tone] || tones.brand, style);
  return (
    <span style={s} title={name || undefined} {...rest}>
      {src ? <img src={src} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : initials}
    </span>
  );
}
