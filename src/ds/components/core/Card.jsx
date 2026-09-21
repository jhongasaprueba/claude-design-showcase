import React from "react";

export function Card({ children, title, subtitle, actions, tone = "default", padding = "lg", bloom = false, interactive = false, style, ...rest }) {
  const [hover, setHover] = React.useState(false);
  const tones = {
    default: { background: "var(--surface-card)", border: "1px solid var(--border-subtle)", color: "var(--text-body)" },
    sunken: { background: "var(--surface-sunken)", border: "1px solid var(--border-subtle)", color: "var(--text-body)" },
    inverse: { background: "var(--surface-inverse)", border: "1px solid var(--green-700)", color: "var(--text-on-inverse)" },
    ink: { background: "var(--surface-ink)", border: "1px solid var(--surface-ink)", color: "var(--cream-50)" },
    accent: { background: "var(--surface-accent-soft)", border: "1px solid var(--lime-200)", color: "var(--green-900)" }
  };
  const pads = { none: "0", sm: "16px", md: "20px", lg: "var(--gutter-card-lg)" };
  const s = Object.assign({
    position: "relative", borderRadius: "var(--radius-card)", padding: pads[padding] || pads.lg,
    boxShadow: "var(--shadow-card)", containerType: "inline-size", transition: "var(--transition-control)"
  }, tones[tone] || tones.default,
    interactive ? { cursor: "pointer" } : null,
    interactive && hover ? { boxShadow: "var(--shadow-raised)", transform: "translateY(-1px)" } : null, style);
  const muted = tone === "inverse" || tone === "ink" ? "rgba(251,253,246,.62)" : "var(--text-muted)";
  return (
    <section style={s} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} {...rest}>
      {bloom ? <span style={{ position: "absolute", inset: "0 0 auto 0", height: "62%", background: "var(--bloom-lime)", borderRadius: "var(--radius-card) var(--radius-card) 0 0", pointerEvents: "none" }} /> : null}
      {(title || actions) ? (
        <header style={{ position: "relative", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "16px", marginBottom: subtitle ? "14px" : "18px" }}>
          <div>
            {title ? <div style={{ fontSize: "13px", fontWeight: "var(--weight-semibold)", color: muted, letterSpacing: "0.01em" }}>{title}</div> : null}
            {subtitle ? <div style={{ fontSize: "12px", color: muted, marginTop: "4px" }}>{subtitle}</div> : null}
          </div>
          {actions ? <div style={{ display: "flex", gap: "6px", flexShrink: 0 }}>{actions}</div> : null}
        </header>
      ) : null}
      <div style={{ position: "relative" }}>{children}</div>
    </section>
  );
}
