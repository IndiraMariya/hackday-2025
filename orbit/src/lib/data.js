import { db, doc, setDoc, getDoc, getDocs, collection, query, where, updateDoc, arrayUnion } from './firebase';

// Create/Update your profile
export async function saveProfile(uid, profile) {
  const ref = doc(db, 'users', uid);
  await setDoc(ref, { ...profile, uid }, { merge: true });
}

// Load my profile (to know filters/overlap later)
export async function loadProfile(uid) {
  const ref = doc(db, 'users', uid);
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data() : null;
}

// Get candidates for the feed (very simple: anyone except me)
export async function getCandidates(meUid) {
  const q = query(collection(db, 'users'), where('uid', '!=', meUid)); // note: client-side filter still needed
  const snap = await getDocs(q);
  return snap.docs
    .map(d => d.data())
    .filter(u => u.uid !== meUid); // ensure excluded
}

// Like someone -> check for mutual like -> create simple match lists on both docs
export async function likeUser(meUid, targetUid) {
  const meRef = doc(db, 'users', meUid);
  const targetRef = doc(db, 'users', targetUid);

  const [meSnap, targetSnap] = await Promise.all([getDoc(meRef), getDoc(targetRef)]);
  const me = meSnap.data() || {};
  const target = targetSnap.data() || {};

  // add to my liked[]
  await updateDoc(meRef, { liked: arrayUnion(targetUid) });

  const theyLikedMe = (target.liked || []).includes(meUid);
  if (theyLikedMe) {
    await Promise.all([
      updateDoc(meRef,     { matches: arrayUnion(targetUid) }),
      updateDoc(targetRef, { matches: arrayUnion(meUid) })
    ]);
  }

  return { matched: theyLikedMe, matchWith: theyLikedMe ? { uid: targetUid, displayName: target.displayName || target.name } : null };
}

export async function getMatches(meUid) {
  const me = await loadProfile(meUid);
  const ids = me?.matches || [];
  if (!ids.length) return [];

  const snaps = await Promise.all(ids.map(id => getDoc(doc(db, 'users', id))));
  return snaps.filter(s => s.exists()).map(s => s.data());
}
