// src/lib/firebase.js
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";

// Read values from .env.local (at project root)
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  // measurementId is optional; include env + property only if you set it
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// Init
const app = initializeApp(firebaseConfig);

// Core instances
export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();

// ---- Convenience helpers (what your other files import) ----
export const signInGoogle = () => signInWithPopup(auth, provider);
export const signOutUser = () => signOut(auth);
export const listenAuth = (cb) => onAuthStateChanged(auth, cb);

// Re-export commonly used Firestore fns so you can import from "./firebase"
export {
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
  updateDoc,
  arrayUnion,
};
