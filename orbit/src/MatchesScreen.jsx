import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import MatchItem from './MatchItem';

const MatchesScreen = ({ matches }) => {
  const [activeCategory, setActiveCategory] = useState('friends');

  const handleConnect = (item) => {
    console.log('Connecting with:', item);
    // Add your connect logic here (e.g., open chat, send message, etc.)
  };

  return (
    <div className="p-4">
      {/* Match Category Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {['friends', 'clubs', 'events', 'studyGroups'].map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full font-semibold whitespace-nowrap transition ${
              activeCategory === cat
                ? 'bg-blue-600 text-white'
                : 'bg-gray-900 text-gray-400 hover:bg-gray-800'
            }`}
          >
            {cat === 'studyGroups' ? 'Study Groups' : cat.charAt(0).toUpperCase() + cat.slice(1)} 
            ({matches[cat]?.length || 0})
          </button>
        ))}
      </div>

      {/* Matches List */}
      <div className="max-w-2xl mx-auto space-y-3">
        {!matches[activeCategory] || matches[activeCategory].length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <Heart size={48} className="mx-auto mb-4 opacity-50" />
            <p>No matches yet. Start swiping!</p>
          </div>
        ) : (
          matches[activeCategory].map(item => (
            <MatchItem 
              key={item.id} 
              item={item} 
              onConnect={handleConnect}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default MatchesScreen;