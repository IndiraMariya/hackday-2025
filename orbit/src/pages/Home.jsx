import { useEffect, useMemo, useState } from 'react';
import useAuth from '../hooks/useAuth';
import { getCandidates, likeUser, loadProfile } from '../lib/data';
import { score } from '../utils/scoring';
import SwipeCard from '../components/SwipeCard';
import { LogOut, Users, Heart, UserCircle, Calendar, BookOpen, Plus } from 'lucide-react';

export default function Home({ goSetup, goMatches }) {
  const { user, signOut } = useAuth();
  const [me, setMe] = useState(null);
  const [browseCategory, setBrowseCategory] = useState('friends'); // future use
  const [cards, setCards] = useState([]);

  useEffect(() => {
    (async () => {
      if (!user) return;
      const meProf = await loadProfile(user.uid);
      setMe(meProf);
      const cands = await getCandidates(user.uid);
      // simple sort by score
      const sorted = [...cands].sort((a, b) => score(meProf, b) - score(meProf, a));
      setCards(sorted);
    })();
  }, [user]);

  async function onSwipe(direction, card) {
    if (direction === 'right') {
      await likeUser(user.uid, card.uid);
    }
    setCards(prev => prev.filter(c => c.uid !== card.uid));
  }

  if (!me) return null;

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <h1 className="text-2xl font-bold">Orbit 🌍</h1>
        <button onClick={signOut} className="p-2 hover:bg-gray-900 rounded-full"><LogOut size={20} /></button>
      </div>

      {/* Category tabs kept for later */}
      <div className="flex overflow-x-auto border-b border-gray-800">
        {[
          { key: 'friends', icon: Users, label: 'Friends' },
          { key: 'events', icon: Calendar, label: 'Events' },
          { key: 'studyGroups', icon: BookOpen, label: 'Study Groups' },
        ].map(({ key, icon: Icon, label }) => (
          <button key={key} onClick={() => setBrowseCategory(key)}
            className={`flex-1 flex items-center justify-center gap-2 py-4 px-4 border-b-2 ${browseCategory===key?'border-blue-500 text-blue-500':'border-transparent text-gray-400'}`}>
            <Icon size={18}/><span className="text-sm">{label}</span>
          </button>
        ))}
      </div>

      <div className="flex-1 flex items-center justify-center p-4">
        {cards.length ? (
          <SwipeCard card={cards[0]} onSwipe={onSwipe} category={browseCategory} />
        ) : (
          <div className="text-center text-gray-400">No more cards!</div>
        )}
      </div>

      {/* Bottom nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 flex items-center justify-around py-4">
        <button className="p-3 text-blue-500"><Users size={24}/></button>
        <button className="p-3 text-gray-400" onClick={goMatches}><Heart size={24}/></button>
        <button className="p-3 text-gray-400" onClick={goSetup}><UserCircle size={24}/></button>
      </div>

      <button className="fixed bottom-24 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700">
        <Plus size={24}/>
      </button>
    </div>
  );
}
