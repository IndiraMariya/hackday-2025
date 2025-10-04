import React, { useState, useRef } from 'react';
import { X, Heart } from 'lucide-react';
import SwipeCard from './SwipeCard';

const SwipeScreen = ({ mockData, onMatch }) => {
  const [activeCategory, setActiveCategory] = useState('friends');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const currentData = mockData[activeCategory];
  const currentCard = currentData[currentIndex];

  const handleSwipe = (direction) => {
    if (direction === 'right') {
      onMatch(activeCategory, currentCard);
    }

    // Animate card out
    if (cardRef.current) {
      cardRef.current.style.transition = 'transform 0.3s ease-out, opacity 0.3s ease-out';
      cardRef.current.style.transform = `translateX(${direction === 'right' ? '500px' : '-500px'}) rotate(${direction === 'right' ? '20deg' : '-20deg'})`;
      cardRef.current.style.opacity = '0';
    }

    // Move to next card after animation
    setTimeout(() => {
      if (currentIndex < currentData.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex(0);
      }
      setDragOffset({ x: 0, y: 0 });
      if (cardRef.current) {
        cardRef.current.style.transition = '';
        cardRef.current.style.transform = '';
        cardRef.current.style.opacity = '1';
      }
    }, 300);
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartPos({ x: e.clientX, y: e.clientY });
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartPos({ x: e.touches[0].clientX, y: e.touches[0].clientY });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startPos.x;
    const deltaY = e.clientY - startPos.y;
    setDragOffset({ x: deltaX, y: deltaY });
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const deltaX = e.touches[0].clientX - startPos.x;
    const deltaY = e.touches[0].clientY - startPos.y;
    setDragOffset({ x: deltaX, y: deltaY });
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);

    // Check if swipe threshold is met
    if (Math.abs(dragOffset.x) > 100) {
      handleSwipe(dragOffset.x > 0 ? 'right' : 'left');
    } else {
      // Snap back
      setDragOffset({ x: 0, y: 0 });
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    // Check if swipe threshold is met
    if (Math.abs(dragOffset.x) > 100) {
      handleSwipe(dragOffset.x > 0 ? 'right' : 'left');
    } else {
      // Snap back
      setDragOffset({ x: 0, y: 0 });
    }
  };

  const rotation = dragOffset.x * 0.1;
  const opacity = 1 - Math.abs(dragOffset.x) / 500;

  return (
    <div className="p-4">
      {/* Category Pills */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {['friends', 'clubs', 'events', 'studyGroups'].map(cat => (
          <button
            key={cat}
            onClick={() => {
              setActiveCategory(cat);
              setCurrentIndex(0);
              setDragOffset({ x: 0, y: 0 });
            }}
            className={`px-4 py-2 rounded-full font-semibold whitespace-nowrap transition ${
              activeCategory === cat
                ? 'bg-blue-600 text-white'
                : 'bg-gray-900 text-gray-400 hover:bg-gray-800'
            }`}
          >
            {cat === 'studyGroups' ? 'Study Groups' : cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Swipe Card Container */}
      <div className="max-w-md mx-auto">
        <div className="relative h-[500px] flex items-start justify-center">
          <div
            ref={cardRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{
              transform: `translateX(${dragOffset.x}px) translateY(${dragOffset.y}px) rotate(${rotation}deg)`,
              opacity: opacity,
              cursor: isDragging ? 'grabbing' : 'grab',
              transition: isDragging ? 'none' : 'transform 0.3s ease-out, opacity 0.3s ease-out',
              touchAction: 'none',
              userSelect: 'none'
            }}
            className="w-full"
          >
            <SwipeCard item={currentCard} category={activeCategory} />
          </div>

          {/* Swipe Indicators */}
          {dragOffset.x > 50 && (
            <div className="absolute top-8 right-8 bg-green-500 text-white px-6 py-3 rounded-lg font-bold text-xl transform rotate-12 pointer-events-none">
              LIKE
            </div>
          )}
          {dragOffset.x < -50 && (
            <div className="absolute top-8 left-8 bg-red-500 text-white px-6 py-3 rounded-lg font-bold text-xl transform -rotate-12 pointer-events-none">
              NOPE
            </div>
          )}
        </div>

        {/* Swipe Buttons */}
        <div className="flex justify-center gap-6 mt-8">
          <button
            onClick={() => handleSwipe('left')}
            className="w-16 h-16 bg-gray-900 hover:bg-red-900 rounded-full flex items-center justify-center border-2 border-gray-800 hover:border-red-500 transition"
          >
            <X size={32} className="text-red-500" />
          </button>
          <button
            onClick={() => handleSwipe('right')}
            className="w-16 h-16 bg-gray-900 hover:bg-green-900 rounded-full flex items-center justify-center border-2 border-gray-800 hover:border-green-500 transition"
          >
            <Heart size={32} className="text-green-500" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SwipeScreen;