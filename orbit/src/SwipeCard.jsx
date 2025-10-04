import React from 'react';
import { Instagram, Twitter, Linkedin, Calendar, Users, BookOpen } from 'lucide-react';

const SwipeCard = ({ item, category }) => {
  return (
    <div className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 shadow-xl">
      <div className="h-64 bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-8xl">
        {item.image}
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-2">{item.name}</h3>
        
        {category === 'friends' && (
          <>
            <p className="text-gray-400 mb-1">{item.major} • {item.year}</p>
            <p className="text-gray-300 mb-3">{item.bio}</p>
            {item.instagram && (
              <p className="text-blue-400">
                <Instagram className="inline mr-1" size={16} />
                {item.instagram}
              </p>
            )}
            {item.twitter && (
              <p className="text-blue-400">
                <Twitter className="inline mr-1" size={16} />
                {item.twitter}
              </p>
            )}
            {item.linkedin && (
              <p className="text-blue-400">
                <Linkedin className="inline mr-1" size={16} />
                {item.linkedin}
              </p>
            )}
          </>
        )}
        
        {category === 'clubs' && (
          <>
            <p className="text-gray-400 mb-1">
              {item.category} • {item.members} members
            </p>
            <p className="text-gray-300 mb-2">{item.description}</p>
            <p className="text-blue-400">
              <Calendar className="inline mr-1" size={16} />
              {item.meetingTime}
            </p>
          </>
        )}
        
        {category === 'events' && (
          <>
            <p className="text-gray-400 mb-1">
              {item.date} • {item.attendees} attending
            </p>
            <p className="text-gray-300 mb-2">{item.description}</p>
            <p className="text-blue-400">
              <Calendar className="inline mr-1" size={16} />
              {item.location}
            </p>
          </>
        )}
        
        {category === 'studyGroups' && (
          <>
            <p className="text-gray-400 mb-1">
              {item.course} • {item.members} members
            </p>
            <p className="text-gray-300 mb-2">{item.description}</p>
            <p className="text-blue-400">
              <BookOpen className="inline mr-1" size={16} />
              {item.meetingTime}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default SwipeCard;