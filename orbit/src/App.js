import { useEffect, useState } from "react";
import useAuth from "./hooks/useAuth";
import Auth from "./pages/Auth";
import Onboarding from "./pages/Onboarding";
import Home from "./pages/Home";
import { loadProfile } from "./lib/data";

export default function App() {
  const { user, loading } = useAuth();
  const [view, setView] = useState("auth");

  useEffect(() => {
    if (loading) return;
    if (!user) { setView("auth"); return; }

    (async () => {
      try {
        const p = await loadProfile(user.uid);
        // if profile exists -> home, else -> onboarding
        setView(p?.name && p?.major ? "home" : "setup");
      } catch (e) {
        console.error("loadProfile failed, sending to setup", e);
        setView("setup");
      }
    })();
  }, [user, loading]);

  if (loading) return null;
  if (view === "auth") return <Auth />;
  if (view === "setup") return <Onboarding onDone={() => setView("home")} />;
  return <Home />;
}
