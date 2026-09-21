import React from "react";

export function DataTable({ columns = [], rows = [], onRowClick, dense = false, emptyState, style, ...rest }) {
  const [hover, setHover] = React.useState(-1);
  const h = dense ? "var(--row-height-dense)" : "var(--row-height)";
  if (!rows.length && emptyState) return <div style={style}>{emptyState}</div>;
  return (
    <div style={Object.assign({ width: "100%", overflowX: "auto" }, style)} {...rest}>
      <table style={{ width: "100%", minWidth: columns.length * 120 + "px" }}>
        <thead>
          <tr>
            {columns.map(c => (
              <th key={c.key} style={{
                textAlign: c.align || "left", padding: "0 16px 10px", whiteSpace: "nowrap",
                fontSize: "11px", fontWeight: "var(--weight-semibold)", letterSpacing: "0.08em",
                textTransform: "uppercase", color: "var(--text-faint)",
                borderBottom: "1px solid var(--border-subtle)", width: c.width
              }}>{c.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={r.id != null ? r.id : i}
              onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(-1)}
              onClick={onRowClick ? () => onRowClick(r, i) : undefined}
              style={{
                height: h, cursor: onRowClick ? "pointer" : "default",
                background: hover === i ? "var(--surface-hover)" : "transparent",
                transition: "background-color var(--duration-fast) var(--ease-in-out)"
              }}>
              {columns.map(c => (
                <td key={c.key} style={{
                  padding: "0 16px", textAlign: c.align || "left",
                  fontSize: dense ? "13px" : "14px", color: "var(--text-body)",
                  borderBottom: "1px solid var(--border-subtle)",
                  fontVariantNumeric: c.align === "right" ? "tabular-nums" : "normal"
                }}>{c.render ? c.render(r, i) : r[c.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
