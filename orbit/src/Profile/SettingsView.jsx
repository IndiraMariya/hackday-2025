import React from "react";
import { ChevronRight, Bell, Shield, Eye, Trash2, LogOut } from "lucide-react";

/**
 * Props:
 * - onBack: () => void
 * - onPreferences: () => void
 * - onLogout: () => void
 * - onDeleteAccount: () => void
 */
export default function SettingsView({ onBack, onPreferences, onLogout, onDeleteAccount }) {
  const settingsSections = [
    {
      title: "Preferences",
      items: [
        {
          icon: Bell,
          label: "Notifications",
          description: "Manage notification settings",
          onClick: onPreferences,
        },
        {
          icon: Eye,
          label: "Privacy",
          description: "Control who can see your profile",
          onClick: () => console.log("Privacy settings"),
        },
      ],
    },
    {
      title: "Account",
      items: [
        {
          icon: Shield,
          label: "Security",
          description: "Password and security settings",
          onClick: () => console.log("Security settings"),
        },
        {
          icon: LogOut,
          label: "Sign Out",
          description: "Sign out of your account",
          onClick: onLogout,
        },
        {
          icon: Trash2,
          label: "Delete Account",
          description: "Permanently delete your account",
          onClick: onDeleteAccount,
          danger: true,
        },
      ],
    },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button onClick={onBack} className="text-white hover:text-gray-300 transition">
          ← Back
        </button>
        <h2 className="text-2xl font-bold ml-4 text-white">Settings</h2>
      </div>

      {/* Settings sections */}
      <div className="space-y-4">
        {settingsSections.map((section, idx) => (
          <div key={idx} className="bg-[#1a2332] rounded-2xl overflow-hidden border border-gray-800">
            <h3 className="text-sm font-semibold text-gray-400 px-6 py-4">{section.title}</h3>
            <div className="divide-y divide-gray-800">
              {section.items.map((item, itemIdx) => (
                <button
                  key={itemIdx}
                  onClick={item.onClick}
                  className={`w-full px-6 py-4 flex items-center gap-4 hover:bg-[#232d3f] transition ${
                    item.danger ? "text-red-400" : "text-white"
                  }`}
                >
                  <item.icon className="w-5 h-5 text-gray-500" />
                  <div className="flex-1 text-left">
                    <div className="font-medium">{item.label}</div>
                    <div className="text-sm text-gray-500">{item.description}</div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
