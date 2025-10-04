import React, { useState } from "react";
import { Heart } from "lucide-react";

export default function MatchesScreen({ matches }) {
  const [activeCategory, setActiveCategory] = useState("friends");
  const categories = ["friends", "clubs", "events", "studyGroups"];

  // get matches for selected category
  const list = matches?.[activeCategory] || [];

  const label = (cat) =>
    cat === "studyGroups" ? "Study Groups" : cat.charAt(0).toUpperCase() + cat.slice(1);

  const count = (cat) => matches?.[cat]?.length || 0;

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
            {label(cat)} <span className="pill-count">{count(cat)}</span>
          </button>
        ))}
      </div>

      {/* display matches */}
      {list.length === 0 ? (
        <div className="matches-empty">
          <Heart size={48} className="matches-empty__icon" />
          <p>No matches yet 💔</p>
          <p className="matches-empty__text">Swipe right to connect!</p>
        </div>
      ) : (
        <div className="matches-list">
          {list.map((item) => (
            <div key={item.id} className="match-card">
              <div className="match-emoji">{item.image || "🧑‍🎓"}</div>

              <div className="match-body">
                <h3 className="match-name">{item.name}</h3>
                <p className="match-meta">
                  {item.major || item.category || item.course || item.date}
                </p>
                <p className="match-desc">
                  {item.description || item.bio || ""}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
