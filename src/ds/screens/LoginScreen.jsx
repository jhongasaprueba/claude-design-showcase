import React from "react";
import { CFData } from "../data";
import { Card, Input, Button, Icon, Wordmark, SegmentedTabs, Badge } from "../index.js";

/* The spec leaves the access mechanism as an OPEN QUESTION. This screen is one
   proposal — the 6-digit key the bot already knows how to send — and it is
   labelled as pending so nobody mistakes it for a decision. */
export function LoginScreen({ onEnter, lang, setLang }) {
  const t = CFData.t[lang].login;
  const [key, setKey] = React.useState("");
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px", background: "var(--surface-page)", position: "relative" }}>
      <span style={{ position: "absolute", inset: "0 0 auto 0", height: "46%", background: "var(--bloom-lime)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: "24px", right: "28px" }}>
        <SegmentedTabs items={[{ value: "es", label: "ES" }, { value: "en", label: "EN" }]} value={lang} onChange={setLang} size="sm" />
      </div>
      <Card style={{ position: "relative", width: "418px", padding: "34px" }}>
        <Wordmark size={26} />
        <div style={{ marginTop: "18px" }}><Badge tone="warning" dot>{t.pending}</Badge></div>
        <h2 style={{ marginTop: "18px", fontSize: "var(--text-title-size)" }}>{t.title}</h2>
        <p style={{ marginTop: "8px", fontSize: "14px", color: "var(--text-muted)" }}>{t.body}</p>
        <form onSubmit={e => { e.preventDefault(); onEnter(); }} style={{ marginTop: "22px", display: "flex", flexDirection: "column", gap: "16px" }}>
          <Input label={t.key} type="password" inputMode="numeric" placeholder="••••••"
            value={key} onChange={e => setKey(e.target.value)} icon={<Icon name="lock" size={16} />} />
          <Button variant="primary" size="lg" fullWidth type="submit" iconEnd={<Icon name="arrow-right" size={17} />}>{t.enter}</Button>
        </form>
        <p style={{ marginTop: "18px", fontSize: "12px", color: "var(--text-faint)", display: "flex", alignItems: "center", gap: "6px" }}>
          <Icon name="send" size={13} />{t.help}
        </p>
      </Card>
    </div>
  );
}

