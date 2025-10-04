import React, { useState } from "react";
import SettingsView from "../Profile/SettingsView";

export default function SettingDev() {
  const [toast, setToast] = useState("");

  const onBack = () => setToast("Back pressed (stub)");
  const onPreferences = () => setToast("Open Preferences (stub)");
  const onLogout = () => setToast("Sign out clicked");
  const onDeleteAccount = () => {
    if (!window.confirm("Are you sure you want to delete your account?")) return;
    setToast("Deleted (stub)");
  };

  return (
    <div className="min-h-screen bg-[#0f1419] text-white">
      <SettingsView
        onBack={onBack}
        onPreferences={onPreferences}
        onLogout={onLogout}
        onDeleteAccount={onDeleteAccount}
      />

      {toast && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-white/10 px-4 py-2 rounded-xl text-sm">
          {toast}
        </div>
      )}
    </div>
  );
}
