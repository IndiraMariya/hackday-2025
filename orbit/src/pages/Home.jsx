import React, { useEffect, useState } from "react";
import { LogOut, Home as HomeIcon, MessageSquare } from "lucide-react";
import useAuth from "../hooks/useAuth";
import SwipeScreen from "../features/swipe/SwipeScreen";
import MatchesScreen from "../features/swipe/MatchesScreen";
import { mockData } from "../features/swipe/mockData";

export default function Home() {
  const { signOut } = useAuth();
  const [activeTab, setActiveTab] = useState("swipe");
  const [seenCards, setSeenCards] = useState([]);
  const [matches, setMatches] = useState({
    friends: [],
    clubs: [],
    events: [],
    studyGroups: [],
  });

  // ✅ Load saved data on mount
  useEffect(() => {
    const savedMatches = JSON.parse(localStorage.getItem("matches"));
    const savedSeen = JSON.parse(localStorage.getItem("seenCards"));

    if (savedMatches) setMatches(savedMatches);
    if (savedSeen) setSeenCards(savedSeen);
  }, []);

  // ✅ Persist matches and seen cards automatically
  useEffect(() => {
    localStorage.setItem("matches", JSON.stringify(matches));
  }, [matches]);

  useEffect(() => {
    localStorage.setItem("seenCards", JSON.stringify(seenCards));
  }, [seenCards]);

  return (
    <div className="screen">
      {/* Top bar */}
      <header className="topbar">
        <div className="brand">
          <div className="brand__logo">🌀</div>
          <div className="brand__name">Orbit</div>
        </div>
        <button className="iconbtn" onClick={signOut} title="Sign out" aria-label="Sign out">
          <LogOut size={20} />
        </button>
      </header>

      {/* Segmented control */}
      <nav className="seg">
        <button
          className={`seg__btn ${activeTab === "swipe" ? "is-active" : ""}`}
          onClick={() => setActiveTab("swipe")}
        >
          <HomeIcon size={18} />
          <span>Home</span>
        </button>
        <button
          className={`seg__btn ${activeTab === "matches" ? "is-active" : ""}`}
          onClick={() => setActiveTab("matches")}
        >
          <MessageSquare size={18} />
          <span>Matches</span>
        </button>
        <div className={`seg__bar ${activeTab === "matches" ? "seg__bar--right" : ""}`} />
      </nav>

      {/* Content */}
      <main className="screen--center">
        {activeTab === "swipe" ? (
          <SwipeScreen
            mockData={mockData}
            onMatch={(category, item) =>
              setMatches((prev) => ({
                ...prev,
                [category]: [...(prev[category] || []), item],
              }))
            }
            seenCards={seenCards}
            setSeenCards={setSeenCards}
          />
        ) : (
          <MatchesScreen matches={matches} />
        )}
      </main>
    </div>
  );
}
