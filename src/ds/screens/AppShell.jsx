import React from "react";
import { CFData } from "../data";
import { SideNav, Wordmark, Icon, IconButton, Badge, SegmentedTabs } from "../index.js";

export function AppShell({ view, setView, lang, setLang, screenState, setScreenState, children }) {
  const t = CFData.t[lang];
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--surface-page)" }}>
      <SideNav value={view === "cliente" ? "cobro" : view === "proveedor" ? "debo" : view} onChange={setView}
        brand={<Wordmark size={17} subtitle={t.brandSub} />}
        footer={
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", padding: "0 8px" }}>
            <SegmentedTabs items={[{ value: "es", label: "ES" }, { value: "en", label: "EN" }]} value={lang} onChange={setLang} size="sm" />
            <div style={{ fontSize: "11px", lineHeight: 1.4, color: "var(--text-faint)" }}>{t.readonly}</div>
          </div>
        }
        items={[
          { value: "saldos", label: t.nav_saldos, icon: <Icon name="wallet" size={17} /> },
          { value: "debo", label: t.nav_debo, icon: <Icon name="arrow-up-right" size={17} />, badge: CFData.cxp.length },
          { value: "cobro", label: t.nav_cobro, icon: <Icon name="arrow-down-left" size={17} />, badge: CFData.cxc.length },
          { value: "utilidad", label: t.nav_utilidad, icon: <Icon name="trending-up" size={17} /> }
        ]} />
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
        <header style={{
          height: "var(--topbar-height)", flexShrink: 0, display: "flex", alignItems: "center",
          justifyContent: "space-between", gap: "16px", padding: "0 var(--gutter-page-lg)",
          borderBottom: "1px solid var(--border-subtle)", background: "var(--surface-page)"
        }}>
          {/* Demo-only control: lets you see the three states section 6 of the spec asks for. */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span className="cf-overline">{t.demo}</span>
            <SegmentedTabs items={t.demoOpts} value={t.demoOpts[screenState]} size="sm"
              onChange={v => setScreenState(t.demoOpts.indexOf(v))} />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Badge tone="brand" icon={<Icon name="lock" size={12} />}>{lang === "es" ? "Sesión privada" : "Private session"}</Badge>
            <IconButton icon={<Icon name="refresh-cw" size={16} />} label={lang === "es" ? "Actualizar" : "Refresh"} />
            <IconButton icon={<Icon name="log-out" size={16} />} label={lang === "es" ? "Salir" : "Log out"} variant="quiet" />
          </div>
        </header>
        <main style={{ flex: 1, padding: "28px var(--gutter-page-lg) 48px", maxWidth: "var(--content-max)" }}>{children}</main>
      </div>
    </div>
  );
}

