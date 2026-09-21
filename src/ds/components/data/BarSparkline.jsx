import React from "react";

export function BarSparkline({ values = [], role = "cash", height = 48, gap = 3, highlightLast = true, style, ...rest }) {
  const colors = { cash: "var(--green-700)", receivable: "var(--lime-500)", payable: "var(--clay-600)", profit: "var(--green-700)", neutral: "var(--ink-300)" };
  const tints = { cash: "var(--green-100)", receivable: "var(--lime-200)", payable: "var(--clay-300)", profit: "var(--green-100)", neutral: "var(--ink-200)" };
  const max = Math.max.apply(null, values.concat([1]));
  return (
    <div style={Object.assign({ display: "flex", alignItems: "flex-end", gap: gap + "px", height: height + "px" }, style)} {...rest}>
      {values.map((v, i) => {
        const coloured = !highlightLast || i === values.length - 1;
        return <span key={i} style={{
          flex: 1, minWidth: "2px", height: Math.max(3, (v / max) * height) + "px",
          borderRadius: "3px",
          background: coloured ? (colors[role] || colors.cash) : (tints[role] || tints.neutral)
        }} />;
      })}
    </div>
  );
}
