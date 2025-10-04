import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../lib/firebase";

export default function Auth() {
  async function handleGoogleSignIn() {
    try {
      await signInWithPopup(auth, provider);
      // App.js will detect the signed-in user and route to Onboarding if needed
    } catch (e) {
      console.error("Google sign-in failed", e);
      alert("Sign-in failed. Check console for details.");
    }
  }

  return (
    <div className="screen screen--center">
      <div className="auth-hero">
        <div className="globe" aria-hidden>🌍</div>
        <h1 className="title">Orbit</h1>
        <p className="subtitle">Connect with your campus universe</p>

        <button className="btn btn--google" onClick={handleGoogleSignIn}>
          <span className="g-logo">G</span>
          Continue with Google
        </button>
      </div>
    </div>
  );
}
