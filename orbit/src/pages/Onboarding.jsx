import React, { useEffect, useState } from "react";
import { auth } from "../lib/firebase";
import { saveProfile, loadProfile } from "../lib/data";

export default function Onboarding({ onDone }) {
  const user = auth.currentUser;
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: "",
    major: "",
    year: "",
    bio: "",
    email: user?.email || "",
    instagram: ""
  });

  // If user already has a profile, skip
  useEffect(() => {
    (async () => {
      if (!user) return;
      const existing = await loadProfile(user.uid);
      if (existing?.name && existing?.major) onDone?.();
    })();
  }, [user, onDone]);

  function setField(key, val) {
    setForm((f) => ({ ...f, [key]: val }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!user) return;
    if (!form.name || !form.major) return;

    try {
      setSubmitting(true);
      await saveProfile(user.uid, {
        uid: user.uid,
        displayName: user.displayName || form.name,
        photoURL: user.photoURL || "",
        name: form.name,
        major: form.major,
        year: form.year,
        bio: form.bio,
        email: form.email,
        instagram: form.instagram,
        interests: [],
        courses: [],
        availability: [],
        liked: [],
        matches: []
      });
      onDone?.();
    } catch (err) {
      console.error(err);
      alert("Could not save profile. Check console.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="screen">
      <div className="card">
        <h2 className="title--md">Welcome to Orbit</h2>
        <p className="subtitle">Set up your profile to get started</p>

        <form className="form" onSubmit={handleSubmit}>
          <label className="label">Name *</label>
          <input
            className="input"
            placeholder="Your name"
            value={form.name}
            onChange={(e) => setField("name", e.target.value)}
          />

          <label className="label">Major *</label>
          <input
            className="input"
            placeholder="Computer Science"
            value={form.major}
            onChange={(e) => setField("major", e.target.value)}
          />

          <label className="label">Year</label>
          <select
            className="input"
            value={form.year}
            onChange={(e) => setField("year", e.target.value)}
          >
            <option value="">Select year</option>
            <option>Freshman</option>
            <option>Sophomore</option>
            <option>Junior</option>
            <option>Senior</option>
            <option>Graduate</option>
          </select>

          <label className="label">Bio</label>
          <textarea
            className="input input--textarea"
            placeholder="Tell us about yourself..."
            value={form.bio}
            onChange={(e) => setField("bio", e.target.value)}
          />

          <div className="divider" />

          <h3 className="section-title">Socials</h3>

          <label className="label">Email</label>
          <input
            type="email"
            className="input"
            placeholder="name@school.edu"
            value={form.email}
            onChange={(e) => setField("email", e.target.value)}
          />

          <label className="label">Instagram</label>
          <input
            className="input"
            placeholder="@username"
            value={form.instagram}
            onChange={(e) => setField("instagram", e.target.value)}
          />

          <button
            className="btn btn--primary"
            type="submit"
            disabled={!form.name || !form.major || submitting}
          >
            {submitting ? "Saving..." : "Continue to Orbit"}
          </button>
        </form>
      </div>
    </div>
  );
}
