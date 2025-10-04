import React, { useEffect, useState } from "react";
import ProfileView from "../components/profile/ProfileView";
import ProfileEdit from "../components/profile/ProfileEdit";
import SettingsView from "../components/profile/SettingsView";
import { loadProfile, saveProfile, uploadProfileImageIfNeeded } from "../lib/data";
import useAuth from "../hooks/useAuth";

export default function Profile() {
  const { user } = useAuth();
  const [mode, setMode] = useState("view"); // "view" | "edit" | "settings"
  const [profile, setProfile] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const p = await loadProfile(user.uid);
      setProfile(
        p || {
          uid: user.uid,
          name: user.displayName || "",
          email: user.email || "",
          major: "",
          gradYear: "",
          bio: "",
          instagram: "",
          discord: "",
          linkedin: "",
          interests: [],
          profileImage: "", // https URL once uploaded
        }
      );
    })();
  }, [user]);

  const onEdit = () => setMode("edit");
  const onSettings = () => setMode("settings");
  const onBackFromSettings = () => setMode("view");

  const onCancelEdit = () => setMode("view");

  const onSaveEdit = async (formData) => {
    if (!user) return;
    setSaving(true);
    try {
      // if user picked a dataURL image, upload to Storage and swap in a https URL
      const withImg = await uploadProfileImageIfNeeded(user.uid, profile?.profileImage, formData);
      await saveProfile(user.uid, withImg);
      setProfile(withImg);
      setMode("view");
    } finally {
      setSaving(false);
    }
  };

  const onLogout = async () => {
    // you likely already have a signOut() helper in useAuth(); call it there.
    window.location.href = "/"; // or trigger your existing sign-out flow
  };

  const onDeleteAccount = async () => {
    alert("Stub: implement delete account (Firestore doc + auth user).");
  };

  if (!profile) return null;

  if (mode === "settings") {
    return (
      <SettingsView
        onBack={onBackFromSettings}
        onPreferences={() => console.log("open notification prefs")}
        onLogout={onLogout}
        onDeleteAccount={onDeleteAccount}
      />
    );
  }

  if (mode === "edit") {
    return (
      <div className="opacity-100">
        <ProfileEdit
          profile={profile}
          onSave={onSaveEdit}
          onCancel={onCancelEdit}
        />
        {saving && <div className="text-center text-sm text-gray-400 mt-2">saving…</div>}
      </div>
    );
  }

  return (
    <ProfileView
      profile={profile}
      onEdit={onEdit}
      onSettings={onSettings}
    />
  );
}
