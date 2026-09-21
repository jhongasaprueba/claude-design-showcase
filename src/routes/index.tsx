import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { AppShell } from "@/ds/screens/AppShell.jsx";
import { LoginScreen } from "@/ds/screens/LoginScreen.jsx";
import { SaldosScreen } from "@/ds/screens/SaldosScreen.jsx";
import { DeboScreen } from "@/ds/screens/DeboScreen.jsx";
import { CobroScreen } from "@/ds/screens/CobroScreen.jsx";
import { ClienteScreen } from "@/ds/screens/ClienteScreen.jsx";
import { UtilidadScreen } from "@/ds/screens/UtilidadScreen.jsx";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Control Financiero — Panel privado" },
      {
        name: "description",
        content:
          "Panel de solo lectura: saldos de caja en COP, USD y USDT, lo que debo, lo que me deben y utilidad acumulada.",
      },
      { property: "og:title", content: "Control Financiero — Panel privado" },
      {
        property: "og:description",
        content:
          "Saldos de caja, cuentas por pagar, cuentas por cobrar y utilidad acumulada en un solo panel.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PanelPage,
});

function PanelPage() {
  const [authed, setAuthed] = useState(false);
  const [view, setView] = useState("saldos");
  const [lang, setLang] = useState("es");
  const [screenState, setScreenState] = useState(0);
  const [clienteId, setClienteId] = useState(1);
  const openCliente = (id: number) => {
    setClienteId(id);
    setView("cliente");
  };

  if (!authed) {
    return <LoginScreen lang={lang} setLang={setLang} onEnter={() => setAuthed(true)} />;
  }

  return (
    <AppShell
      view={view}
      setView={setView}
      lang={lang}
      setLang={setLang}
      screenState={screenState}
      setScreenState={setScreenState}
    >
      {view === "saldos" ? <SaldosScreen lang={lang} screenState={screenState} /> : null}
      {view === "debo" ? <DeboScreen lang={lang} screenState={screenState} /> : null}
      {view === "cobro" ? (
        <CobroScreen lang={lang} screenState={screenState} openCliente={openCliente} />
      ) : null}
      {view === "cliente" ? (
        <ClienteScreen
          lang={lang}
          screenState={screenState}
          clienteId={clienteId}
          back={() => setView("cobro")}
        />
      ) : null}
      {view === "utilidad" ? <UtilidadScreen lang={lang} screenState={screenState} /> : null}
    </AppShell>
  );
}
