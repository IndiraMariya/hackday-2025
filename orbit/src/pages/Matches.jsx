import { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import { getMatches } from '../lib/data';
import { Heart, LogOut, Users, UserCircle } from 'lucide-react';

export default function Matches({ goHome, goSetup }) {
  const { user, signOut } = useAuth();
  const [items, setItems] = useState([]);

  useEffect(() => {
    (async () => {
      if (!user) return;
      const m = await getMatches(user.uid);
      setItems(m);
    })();
  }, [user]);

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <h1 className="text-2xl font-bold">Your Matches</h1>
        <button onClick={signOut} className="p-2 hover:bg-gray-900 rounded-full"><LogOut size={20}/></button>
      </div>

      <div className="p-4 space-y-3">
        {items.length ? items.map(u => (
          <div key={u.uid} className="bg-gray-900 rounded-lg p-4 border border-gray-800">
            <div className="font-semibold">{u.name || u.displayName}</div>
            <div className="text-sm text-gray-400">{u.major} {u.year ? `• ${u.year}` : ''}</div>
            {u.email && <div className="text-sm mt-2">📧 {u.email}</div>}
            {u.discord && <div className="text-sm">💬 {u.discord}</div>}
          </div>
        )) : (
          <div className="text-center text-gray-400 py-12">
            <Heart size={48} className="mx-auto mb-3 opacity-30" />
            <p>No matches yet</p>
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 flex items-center justify-around py-4">
        <button className="p-3 text-gray-400" onClick={goHome}><Users size={24}/></button>
        <button className="p-3 text-blue-500"><Heart size={24}/></button>
        <button className="p-3 text-gray-400" onClick={goSetup}><UserCircle size={24}/></button>
      </div>
    </div>
  );
}
