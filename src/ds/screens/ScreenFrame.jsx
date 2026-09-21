import React from "react";
import { CFData } from "../data";
import { ExportMenu } from "./ExportMenu.jsx";
import { PageHeader, Breadcrumb, Icon, EmptyState, Button } from "../index.js";

/* Shared wrapper: title block, the data-freshness line the spec insists on,
   the export action, and the two non-happy states (no data / no connection). */
export function ScreenFrame({ lang, title, subtitle, section, screenState, actions, emptyIcon, emptyTitle, emptyBody, children }) {
  const D = CFData, t = D.t[lang];
  const failed = screenState === 2;
  const empty = screenState === 1;
  return (
    <>
      <PageHeader title={title}
        breadcrumb={<Breadcrumb items={[{ label: lang === "es" ? "Negocio" : "Business", icon: <Icon name="home" size={13} /> }, section]} />}
        meta={failed
          ? <span style={{ color: "var(--clay-600)", display: "inline-flex", alignItems: "center", gap: "6px" }}><Icon name="triangle-alert" size={13} />{lang === "es" ? "Sin datos actuales" : "No current data"}</span>
          : <span>{subtitle} · {D.lastUpdate[lang]}</span>}
        actions={failed ? null : (actions !== undefined ? actions : <ExportMenu lang={lang} />)} />
      {failed ? (
        <EmptyState tone="error" icon={<Icon name="wifi-off" size={22} />} title={t.error_t} body={t.error_b}
          action={<Button variant="secondary" size="sm" icon={<Icon name="refresh-cw" size={15} />}>{t.retry}</Button>} />
      ) : empty ? (
        <EmptyState icon={emptyIcon} title={emptyTitle} body={emptyBody} />
      ) : children}
      {!failed ? (
        <p style={{ marginTop: "20px", fontSize: "12px", color: "var(--text-faint)", display: "flex", alignItems: "center", gap: "6px" }}>
          <Icon name="send" size={13} />{t.botNote}
        </p>
      ) : null}
    </>
  );
}

