import React from "react";

const palette = ["var(--green-700)", "var(--lime-400)", "var(--green-500)", "var(--lime-200)", "var(--ink-200)"];

export function DonutChart({ segments = [], size = 168, thickness = 18, centerLabel, centerValue, legend = true, style, ...rest }) {
  const total = segments.reduce((a, s) => a + (s.value || 0), 0) || 1;
  let acc = 0;
  const stops = segments.map((s, i) => {
    const from = (acc / total) * 100; acc += s.value || 0;
    const to = (acc / total) * 100;
    const c = s.color || palette[i % palette.length];
    return c + " " + from + "% " + to + "%";
  }).join(", ");
  return (
    <div style={Object.assign({ display: "flex", alignItems: "center", gap: "24px", flexWrap: "wrap" }, style)} {...rest}>
      <div style={{
        width: size + "px", height: size + "px", borderRadius: "999px", flexShrink: 0,
        background: "conic-gradient(" + stops + ")",
        mask: "radial-gradient(circle, transparent " + (size / 2 - thickness) + "px, #000 " + (size / 2 - thickness + 1) + "px)",
        WebkitMask: "radial-gradient(circle, transparent " + (size / 2 - thickness) + "px, #000 " + (size / 2 - thickness + 1) + "px)",
        position: "relative"
      }} />
      {(centerValue || legend) ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", minWidth: 0 }}>
          {centerValue ? (
            <div>
              <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>{centerLabel}</div>
              <div className="cf-figure" style={{ fontSize: "26px", fontWeight: "var(--weight-semibold)", color: "var(--text-heading)" }}>{centerValue}</div>
            </div>
          ) : null}
          {legend ? segments.map((s, i) => (
            <div key={s.label + i} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "var(--text-body)" }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "999px", background: s.color || palette[i % palette.length], flexShrink: 0 }} />
              <span style={{ flex: 1, minWidth: 0 }}>{s.label}</span>
              <span className="cf-figure" style={{ color: "var(--text-muted)", fontWeight: "var(--weight-medium)" }}>{Math.round(((s.value || 0) / total) * 100)}%</span>
            </div>
          )) : null}
        </div>
      ) : null}
    </div>
  );
}
