import React, { useRef, useState } from "react";
import { X, Heart, Plus } from "lucide-react";
import SwipeCard from "../../components/SwipeCard";

const categories = ["friends", "clubs", "events", "studyGroups"];

export default function SwipeScreen({ mockData, onMatch }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("friends");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const currentData = mockData[activeCategory];
  const currentCard = currentData[currentIndex];

  function handleSwipe(direction) {
    if (!currentCard) return;
    if (direction === "right") onMatch(activeCategory, currentCard);

    if (cardRef.current) {
      cardRef.current.style.transition = "transform .28s ease-out, opacity .28s ease-out";
      cardRef.current.style.transform = `translateX(${direction === "right" ? "520px" : "-520px"}) rotate(${direction === "right" ? 20 : -20}deg)`;
      cardRef.current.style.opacity = "0";
    }

    setTimeout(() => {
      setCurrentIndex((i) => (i < currentData.length - 1 ? i + 1 : 0));
      setDragOffset({ x: 0, y: 0 });
      if (cardRef.current) {
        cardRef.current.style.transition = "";
        cardRef.current.style.transform = "";
        cardRef.current.style.opacity = "1";
      }
    }, 280);
  }

  const onDown = (x, y) => { setIsDragging(true); setStartPos({ x, y }); };
  const onMove = (x, y) => { if (isDragging) setDragOffset({ x: x - startPos.x, y: y - startPos.y }); };
  const onUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    Math.abs(dragOffset.x) > 100 ? handleSwipe(dragOffset.x > 0 ? "right" : "left") : setDragOffset({ x: 0, y: 0 });
  };

  const rotation = dragOffset.x * 0.08;
  const opacity = 1 - Math.min(Math.abs(dragOffset.x) / 500, 0.6);

  return (
    <div className="sw-shell">
      {/* category pills */}
      <div className="sw-pills">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`pill ${activeCategory === cat ? "pill--active" : ""}`}
            onClick={() => { setActiveCategory(cat); setCurrentIndex(0); setDragOffset({ x: 0, y: 0 }); }}
          >
            {cat === "studyGroups" ? "Study Groups" : cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* centered card */}
      <div className="sw-stage sw-stage--stacked">
        <div
          className="sw-cardWrap"
          ref={cardRef}
          onMouseDown={(e) => onDown(e.clientX, e.clientY)}
          onMouseMove={(e) => onMove(e.clientX, e.clientY)}
          onMouseUp={onUp}
          onMouseLeave={onUp}
          onTouchStart={(e) => { const t = e.touches[0]; onDown(t.clientX, t.clientY); }}
          onTouchMove={(e) => { const t = e.touches[0]; onMove(t.clientX, t.clientY); }}
          onTouchEnd={onUp}
          style={{
            transform: `translate(${dragOffset.x}px, ${dragOffset.y}px) rotate(${rotation}deg)`,
            opacity,
            cursor: isDragging ? "grabbing" : "grab",
            transition: isDragging ? "none" : "transform .25s ease-out, opacity .25s ease-out",
            touchAction: "none",
            userSelect: "none",
          }}
        >
          {currentCard ? (
            <SwipeCard item={currentCard} category={activeCategory} />
          ) : (
            <div className="sw-empty">No more cards.</div>
          )}

          {dragOffset.x > 60 && <div className="sw-badge sw-badge--like">LIKE</div>}
          {dragOffset.x < -60 && <div className="sw-badge sw-badge--nope">NOPE</div>}
        </div>

        {/* bottom actions */}
        <div className="sw-actions">
          <button className="sw-fab sw-fab--nope" onClick={() => handleSwipe("left")} aria-label="Pass">
            <X size={28} />
          </button>
          <button className="sw-fab sw-fab--like" onClick={() => handleSwipe("right")} aria-label="Like">
            <Heart size={28} />
          </button>
        </div>

        {/* floating add button (optional) */}
        <button className="sw-addfab" title="Create">
          <Plus size={28} />
        </button>
      </div>
    </div>
  );
}