import React from "react";
import { Edit2, Settings, Instagram, Linkedin, Mail } from "lucide-react";

export default function ProfileView({ profile, onEdit, onSettings }) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Header Actions */}
      <div className="flex justify-end gap-2 mb-6">
        <button
          onClick={onSettings}
          aria-label="Open settings"
          className="p-2 rounded-lg border border-[color:var(--line)] bg-[color:var(--card)] hover:bg-[#162034] transition"
        >
          <Settings className="w-5 h-5 text-gray-400" />
        </button>
        <button
          onClick={onEdit}
          className="px-4 py-2 rounded-full bg-[color:var(--brand)] hover:bg-[color:var(--brand-press)] text-white font-medium transition flex items-center gap-2"
        >
          <Edit2 className="w-4 h-4" /> Edit Profile
        </button>
      </div>

      {/* Profile Header */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-32 h-32 rounded-full bg-[#0f172a] flex items-center justify-center overflow-hidden border-2 border-[color:var(--line)] mb-4">
          {profile.profileImage ? (
            <img src={profile.profileImage} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <div className="text-6xl text-gray-500">{profile.name?.charAt(0) || "?"}</div>
          )}
        </div>
        <h2 className="text-2xl font-bold mb-1">{profile.name}</h2>
        <p className="text-gray-400 mb-2">{profile.email}</p>
        {(profile.major || profile.gradYear) && (
          <p className="text-sm text-gray-500">
            {profile.major}{profile.major && profile.gradYear ? " • " : ""}{profile.gradYear && `Class of ${profile.gradYear}`}
          </p>
        )}
      </div>

      {/* Bio */}
      <div className="bg-[color:var(--card)] rounded-2xl p-6 mb-4 border border-[color:var(--line)]">
        <h3 className="text-lg font-semibold mb-3">About</h3>
        <p className="text-gray-300">{profile.bio || "No bio yet"}</p>
      </div>

      {/* Social Links */}
      {(profile.instagram || profile.linkedin || profile.email) && (
        <div className="bg-[color:var(--card)] rounded-2xl p-6 mb-4 border border-[color:var(--line)]">
          <h3 className="text-lg font-semibold mb-4">Social Links</h3>
          <div className="space-y-3 text-gray-300">
            {profile.email && (
              <a href={`mailto:${profile.email}`} className="flex items-center gap-3 hover:text-white transition">
                <Mail className="w-5 h-5 text-gray-500" /> <span>{profile.email}</span>
              </a>
            )}
            {profile.instagram && (
              <a href={`https://instagram.com/${profile.instagram.replace("@", "")}`} target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-white transition">
                <Instagram className="w-5 h-5 text-gray-500" /> <span>{profile.instagram}</span>
              </a>
            )}
            {profile.linkedin && (
              <a href={`https://${profile.linkedin}`} target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-white transition">
                <Linkedin className="w-5 h-5 text-gray-500" /> <span>{profile.linkedin}</span>
              </a>
            )}
          </div>
        </div>
      )}

      {/* Interests */}
      {Array.isArray(profile.interests) && profile.interests.length > 0 && (
        <div className="bg-[color:var(--card)] rounded-2xl p-6 border border-[color:var(--line)]">
          <h3 className="text-lg font-semibold mb-4">Interests</h3>
          <div className="flex flex-wrap gap-2">
            {profile.interests.map((interest, idx) => (
              <span key={idx} className="px-4 py-2 bg-[#0f172a] border border-[color:var(--line)] text-gray-300 rounded-full text-sm">
                {interest}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}