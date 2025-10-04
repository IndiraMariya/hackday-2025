import React, { useState } from "react";
import ProfileView from "../Profile/ProfileView";
import ProfileEdit from "../Profile/ProfileEdit";
import SettingsView from "../Profile/SettingsView";

// quick mock until Firebase is wired
const initialProfile = {
  name: "Anjora Dubey",
  email: "anjora@ucsc.edu",
  major: "Global Economics",
  gradYear: 2027,
  profileImage: "",
  bio: "I love dance, fintech, and building campus communities.",
  instagram: "@anjora",
  linkedin: "linkedin.com/in/anjora-d",
  discord: "anjora#1234",
  interests: ["Dance", "Tech Clubs", "Finance"],
};

export default function ProfileDev() {
  const [mode, setMode] = useState("view"); // "view" | "edit" | "settings"
  const [profile, setProfile] = useState(initialProfile);
  const [toast, setToast] = useState("");

  // handlers
  const goView = () => setMode("view");
  const goEdit = () => setMode("edit");
  const goSettings = () => setMode("settings");

  const handleSave = (updated) => {
    setProfile(updated);
    setToast("Profile saved ✔︎");
    setMode("view");
    setTimeout(() => setToast(""), 1200);
  };

  const handleLogout = () => setToast("Sign out (stub)");
  const handleDelete = () => {
    if (!window.confirm("Delete your account permanently?")) return;
    setToast("Deleted (stub)");
  };
  const handlePreferences = () => setToast("Open Preferences (stub)");

  return (
    <div className="min-h-screen bg-[#0f1419] text-white">
      {mode === "view" && (
        <ProfileView
          profile={profile}
          onEdit={goEdit}
          onSettings={goSettings}
        />
      )}

      {mode === "edit" && (
        <ProfileEdit
          profile={profile}
          onSave={handleSave}
          onCancel={goView}
        />
      )}

      {mode === "settings" && (
        <SettingsView
          onBack={goView}
          onPreferences={handlePreferences}
          onLogout={handleLogout}
          onDeleteAccount={handleDelete}
        />
      )}

      {toast && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-white/10 px-4 py-2 rounded-xl text-sm">
          {toast}
        </div>
      )}
    </div>
  );
}
