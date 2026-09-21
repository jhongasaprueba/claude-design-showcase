import React from "react";

/* Sizes are capped at the type scale but shrink with the card that holds them
   (Card sets container-type: inline-size), so a figure never gets clipped —
   a truncated amount reads as a different amount, which is unacceptable here. */
const sizes = {
  sm: { fontSize: "min(20px, 10cqw)", weight: "var(--weight-semibold)" },
  md: { fontSize: "min(28px, 13cqw)", weight: "var(--weight-semibold)" },
  lg: { fontSize: "min(var(--text-figure-size), 15cqw)", weight: "var(--weight-semibold)" },
  xl: { fontSize: "min(var(--text-display-size), 18cqw)", weight: "var(--weight-semibold)" }
};

const roles = {
  cash: "var(--money-cash)", receivable: "var(--money-receivable)",
  payable: "var(--money-payable)", profit: "var(--money-profit)",
  neutral: "var(--text-heading)", inverse: "var(--cream-50)"
};

/* The three cajas this product tracks. COP has no cents; USD and USDT do. */
const currencies = {
  COP: { symbol: "$", decimals: 0, code: "COP" },
  USD: { symbol: "US$", decimals: 2, code: "USD" },
  USDT: { symbol: "", decimals: 2, code: "USDT" }
};

export function MoneyFigure({
  value, currency, symbol, decimals, code, showCode = false,
  role = "neutral", size = "lg", sign, style, ...rest
}) {
  const c = currencies[currency] || {};
  const sym = symbol != null ? symbol : (c.symbol != null ? c.symbol : "$");
  const dec = decimals != null ? decimals : (c.decimals != null ? c.decimals : 0);
  const codeLabel = code != null ? code : c.code;
  const s = sizes[size] || sizes.lg;
  const num = typeof value === "number"
    ? value.toLocaleString("es-CO", { minimumFractionDigits: dec, maximumFractionDigits: dec })
    : value;
  const tint = roles[role] || roles.neutral;
  return (
    <span className="cf-figure" style={Object.assign({
      display: "inline-flex", alignItems: "baseline", gap: "2px", maxWidth: "100%", whiteSpace: "nowrap",
      fontSize: s.fontSize, fontWeight: s.weight, lineHeight: 1.05,
      letterSpacing: "var(--text-figure-tracking)", color: tint
    }, style)} {...rest}>
      {sign ? <span style={{ opacity: .85 }}>{sign}</span> : null}
      {sym ? <span style={{ opacity: .5, fontSize: "0.62em", transform: "translateY(-0.1em)" }}>{sym}</span> : null}
      {num}
      {showCode && codeLabel ? (
        <span style={{ marginLeft: "0.28em", fontSize: "0.4em", fontWeight: "var(--weight-semibold)", letterSpacing: "0.08em", opacity: .62 }}>{codeLabel}</span>
      ) : null}
    </span>
  );
}
