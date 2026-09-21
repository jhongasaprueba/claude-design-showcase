import React from "react";

/* No logo file was supplied with the brand material, so the mark IS the name,
   set in Urbanist Semibold with tight tracking. Do not substitute a drawn symbol. */
export function Wordmark({ size = 18, tone = "ink", subtitle, style, ...rest }) {
  const colors = { ink: "var(--ink-900)", brand: "var(--green-700)", cream: "var(--cream-50)" };
  return (
    <span style={Object.assign({ display: "inline-flex", flexDirection: "column", gap: "1px" }, style)} {...rest}>
      <span style={{
        fontFamily: "var(--font-core)", fontSize: size + "px", lineHeight: 1.05,
        fontWeight: "var(--weight-semibold)", letterSpacing: "-0.035em", color: colors[tone] || colors.ink
      }}>
        Control<span style={{ color: "var(--green-700)", opacity: tone === "cream" ? 0 : 1 }}>·</span>Financiero
      </span>
      {subtitle ? <span className="cf-overline" style={{ fontSize: "9px", letterSpacing: "0.14em", color: tone === "cream" ? "rgba(251,253,246,.6)" : "var(--text-faint)" }}>{subtitle}</span> : null}
    </span>
  );
}
