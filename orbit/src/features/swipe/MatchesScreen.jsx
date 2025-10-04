import React, { useState } from "react";
import { Heart } from "lucide-react";

export default function MatchesScreen({ matches }) {
  const [activeCategory, setActiveCategory] = useState("friends");
  const categories = ["friends", "clubs", "events", "studyGroups"];

  const list = matches?.[activeCategory] || [];

  const label = (cat) =>
    cat === "studyGroups" ? "Study Groups" : cat.charAt(0).toUpperCase() + cat.slice(1);

  const count = (cat) => (matches?.[cat]?.length || 0);

  const onConnect = (item) => {
    // hook up later (open chat / copy handle / etc.)
    console.log("Connect with:", item);
  };

  return (
    <div className="matches-wrap">
      {/* category pills */}
      <div className="sw-pills">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`pill ${activeCategory === cat ? "pill--active" : ""}`}
            onClick={() => setActiveCategory(cat)}
          >
            {label(cat)} ({count(cat)})
          </button>
        ))}
      </div>

      {/* list */}
      {list.length === 0 ? (
        <div className="matches-empty">
          <Heart size={48} className="matches-empty__icon" />
          <p>No matches yet. Start swiping!</p>
        </div>
      ) : (
        <div className="matches-list">
          {list.map((item) => (
            <div key={item.id} className="match-item">
              <div className="match-emoji">{item.image || "🧑‍🎓"}</div>
              <div className="match-body">
                <div className="match-title">{item.name}</div>
                <div className="match-meta">
                  {item.major || item.category || item.course || item.date}
                </div>
                {item.description && <div className="match-desc">{item.description}</div>}
              </div>
              <button className="match-cta" onClick={() => onConnect(item)}>
                Connect
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
