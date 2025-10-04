import React, { useState } from 'react';
import { Home, MessageSquare } from 'lucide-react';
import SwipeScreen from './SwipeScreen';
import MatchesScreen from './MatchesScreen';
import { mockData } from './mockData';

function App() {
  const [activeTab, setActiveTab] = useState('swipe');
  const [matches, setMatches] = useState({ 
    friends: [], 
    clubs: [], 
    events: [], 
    studyGroups: [] 
  });

  // Handle when user swipes right (matches)
  const handleMatch = (category, item) => {
    setMatches(prev => ({
      ...prev,
      [category]: [...prev[category], item]
    }));
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🌀</span>
          <h1 className="text-xl font-bold">Orbit</h1>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-gray-800">
        <button
          onClick={() => setActiveTab('swipe')}
          className={`flex-1 py-4 font-semibold transition ${
            activeTab === 'swipe' 
              ? 'text-white border-b-2 border-blue-500' 
              : 'text-gray-500'
          }`}
        >
          <Home className="inline mr-2" size={20} />
          Swipe
        </button>
        <button
          onClick={() => setActiveTab('matches')}
          className={`flex-1 py-4 font-semibold transition ${
            activeTab === 'matches' 
              ? 'text-white border-b-2 border-blue-500' 
              : 'text-gray-500'
          }`}
        >
          <MessageSquare className="inline mr-2" size={20} />
          Matches
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto pb-20">
        {activeTab === 'swipe' && (
          <SwipeScreen 
            mockData={mockData} 
            onMatch={handleMatch}
          />
        )}
        
        {activeTab === 'matches' && (
          <MatchesScreen matches={matches} />
        )}
      </div>
    </div>
  );
}

export default App;