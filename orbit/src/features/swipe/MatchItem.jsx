import React from 'react';

const MatchItem = ({ item, onConnect }) => {
  return (
    <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 hover:border-gray-700 transition">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-3xl flex-shrink-0">
          {item.image}
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-lg">{item.name}</h4>
          <p className="text-gray-400 text-sm">
            {item.major || item.category || item.course || item.date}
          </p>
        </div>
        <button 
          onClick={() => onConnect(item)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition"
        >
          Connect
        </button>
      </div>
    </div>
  );
};

export default MatchItem;