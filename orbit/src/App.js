import { useEffect, useState } from "react";
import useAuth from "./hooks/useAuth";
import Auth from "./pages/Auth";
import Onboarding from "./pages/Onboarding";
import Home from "./pages/Home";
import Matches from "./pages/Matches";
import { loadProfile } from "./lib/data";

export default function App() {
  const { user, loading } = useAuth();
  const [view, setView] = useState("auth");

  useEffect(() => {
    (async () => {
      if (loading) return;
      if (!user) { setView("auth"); return; }
      try {
        const p = await loadProfile(user.uid);
        setView(p?.name && p?.major ? "home" : "setup");
      } catch {
        setView("setup");
      }
    })();
  }, [user, loading]);

  if (loading) return null;

  if (view === "auth") return <Auth />;
  if (view === "setup") return <Onboarding onDone={() => setView("home")} />;
  if (view === "matches")
    return <Matches goHome={() => setView("home")} goSetup={() => setView("setup")} />;
  return <Home goSetup={() => setView("setup")} goMatches={() => setView("matches")} />;
}
