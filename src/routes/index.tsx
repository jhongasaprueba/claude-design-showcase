import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { AppShell } from "@/ds/screens/AppShell.jsx";
import { LoginScreen } from "@/ds/screens/LoginScreen.jsx";
import { SaldosScreen } from "@/ds/screens/SaldosScreen.jsx";
import { DeboScreen } from "@/ds/screens/DeboScreen.jsx";
import { CobroScreen } from "@/ds/screens/CobroScreen.jsx";
import { ClienteScreen } from "@/ds/screens/ClienteScreen.jsx";
import { UtilidadScreen } from "@/ds/screens/UtilidadScreen.jsx";
import { CFData } from "@/ds/data";
import { loadLive } from "@/lib/cfLive";
import { subscribeCFChanges } from "@/lib/cfRealtime";


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
  const [, setTick] = useState(0);
  const openCliente = (id: number) => {
    setClienteId(id);
    setView("cliente");
  };

  useEffect(() => {
    if (!authed) return;
    let alive = true;
    let inFlight = false;
    const load = () => {
      if (inFlight) return;
      inFlight = true;
      loadLive()
        .then((live) => {
          if (!alive) return;
          Object.assign(CFData, live);
          setScreenState(live.isEmpty ? 1 : 0);
          setTick((n) => n + 1);
        })
        .catch((err) => {
          console.error("No se pudo leer la base de datos", err);
          // Si ya había datos en pantalla, no los tapamos por un fallo puntual
          // de red: solo pasamos al estado "sin conexión" si es la carga inicial.
          if (alive && !CFData.loaded) setScreenState(2);
        })
        .finally(() => {
          inFlight = false;
          if (alive) CFData.loaded = true;
        });
    };
    load();
    // Tiempo real: cualquier alta, cambio o borrado en las tablas del bot
    // actualiza el panel al instante, sin recargar la página.
    const unsubscribe = subscribeCFChanges(load);
    // Red de seguridad por si el tiempo real no está habilitado en alguna
    // tabla: relectura cada 5 minutos y al volver a la pestaña.
    const iv = window.setInterval(() => {
      if (document.visibilityState === "visible") load();
    }, 300000);
    const onVis = () => {
      if (document.visibilityState === "visible") load();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      alive = false;
      unsubscribe();
      window.clearInterval(iv);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [authed]);


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
