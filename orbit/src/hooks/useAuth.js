import { useEffect, useState } from 'react';
import { listenAuth, signInGoogle, signOutUser } from '../lib/firebase';

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return listenAuth(u => { setUser(u); setLoading(false); });
  }, []);

  return {
    user, loading,
    signIn: async () => { await signInGoogle(); },
    signOut: async () => { await signOutUser(); }
  };
}
