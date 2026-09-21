import React from "react";
import { CFData } from "../data";
import { Button, Icon, Card } from "../index.js";

/* Export is a read of what is already on screen — it writes nothing to the DB. */
export function ExportMenu({ lang, size = "sm" }) {
  const t = CFData.t[lang];
  const [open, setOpen] = React.useState(false);
  return (
    <span style={{ position: "relative", display: "inline-flex" }}>
      <Button variant="secondary" size={size} icon={<Icon name="download" size={15} />}
        iconEnd={<Icon name="chevron-down" size={14} />} onClick={() => setOpen(o => !o)}>{t.exportar}</Button>
      {open ? (
        <>
          <span onClick={() => setOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 8 }} />
          <Card padding="none" style={{ position: "absolute", top: "calc(100% + 8px)", right: 0, zIndex: 9, width: "212px", padding: "8px", boxShadow: "var(--shadow-overlay)" }}>
            {[{ icon: "table", label: t.exportCsv }, { icon: "file-text", label: t.exportPdf }].map(o => (
              <button key={o.label} onClick={() => setOpen(false)} style={{
                display: "flex", alignItems: "center", gap: "10px", width: "100%", height: "40px",
                padding: "0 12px", border: "none", background: "transparent", cursor: "pointer",
                borderRadius: "var(--radius-sm)", fontSize: "14px", color: "var(--text-body)", textAlign: "left"
              }}
                onMouseEnter={e => e.currentTarget.style.background = "var(--surface-hover)"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                <Icon name={o.icon} size={16} />{o.label}
              </button>
            ))}
          </Card>
        </>
      ) : null}
    </span>
  );
}

