import React, { useState } from "react";
import { Heart, X } from "lucide-react";

export default function SwipeCard({ card, onSwipe }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [start, setStart] = useState({ x: 0, y: 0 });

  const onDown = (x, y) => {
    setDragging(true);
    setStart({ x: x - pos.x, y: y - pos.y });
  };
  const onMove = (x, y) => {
    if (!dragging) return;
    setPos({ x: x - start.x, y: y - start.y });
  };
  const onUp = () => {
    setDragging(false);
    if (Math.abs(pos.x) > 100) onSwipe(pos.x > 0 ? "right" : "left", card);
    setPos({ x: 0, y: 0 });
  };

  const rot = pos.x / 20;
  const opacity = 1 - Math.abs(pos.x) / 300;

  return (
    <div className="relative w-full max-w-sm select-none">
      <div
        className="bg-gray-900 rounded-2xl border border-gray-800 p-6 cursor-grab active:cursor-grabbing touch-none shadow-xl"
        style={{
          transform: `translate(${pos.x}px, ${pos.y}px) rotate(${rot}deg)`,
          transition: dragging ? "none" : "transform 0.25s ease-out",
          opacity,
        }}
        onMouseDown={(e) => onDown(e.clientX, e.clientY)}
        onMouseMove={(e) => onMove(e.clientX, e.clientY)}
        onMouseUp={onUp}
        onMouseLeave={onUp}
        onTouchStart={(e) => {
          const t = e.touches[0]; onDown(t.clientX, t.clientY);
        }}
        onTouchMove={(e) => {
          const t = e.touches[0]; onMove(t.clientX, t.clientY);
        }}
        onTouchEnd={onUp}
      >
        <div className="text-center mb-4">
          <div className="text-6xl mb-3">{card.image || "🧑‍🎓"}</div>
          <h2 className="text-2xl font-bold mb-1">{card.name}</h2>
          <p className="text-gray-400">
            {card.major || card.category || card.course || card.date}
          </p>
        </div>

        <div className="space-y-2 mb-6">
          <p className="text-gray-300">{card.description || card.bio}</p>
          {card.year && <p className="text-sm text-gray-400">{card.year}</p>}
          {card.members && <p className="text-sm text-gray-400">{card.members} members</p>}
          {card.attendees && <p className="text-sm text-gray-400">{card.attendees} attending</p>}
          {card.meetTime && <p className="text-sm text-gray-400">Meets: {card.meetTime}</p>}
          {card.location && <p className="text-sm text-gray-400">📍 {card.location}</p>}
        </div>

        {pos.x > 50 && (
          <div className="absolute top-8 right-8 bg-green-500 text-white px-6 py-2 rounded-full font-bold text-xl rotate-12">
            LIKE
          </div>
        )}
        {pos.x < -50 && (
          <div className="absolute top-8 left-8 bg-red-500 text-white px-6 py-2 rounded-full font-bold text-xl -rotate-12">
            PASS
          </div>
        )}
      </div>

      <div className="flex justify-center gap-6 mt-8">
        <button
          onClick={() => onSwipe("left", card)}
          className="bg-gray-900 border-2 border-red-500 text-red-500 p-4 rounded-full hover:bg-red-500 hover:text-white transition-all"
          aria-label="Pass"
        >
          <X size={32} />
        </button>
        <button
          onClick={() => onSwipe("right", card)}
          className="bg-gray-900 border-2 border-green-500 text-green-500 p-4 rounded-full hover:bg-green-500 hover:text-white transition-all"
          aria-label="Like"
        >
          <Heart size={32} />
        </button>
      </div>
    </div>
  );
}
