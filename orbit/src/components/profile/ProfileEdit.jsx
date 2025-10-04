import React, { useState } from "react";
import { X, Mail, Instagram, MessageCircle } from "lucide-react";
import PhotoUpload from "./PhotoUpload";

export default function ProfileEdit({ profile, onSave, onCancel }) {
  const [formData, setFormData] = useState({ ...profile });
  const [newInterest, setNewInterest] = useState("");

  const handleChange = (field, value) => setFormData((s) => ({ ...s, [field]: value }));
  const handleImageChange = (imageUrl) => handleChange("profileImage", imageUrl);

  const addInterest = () => {
    const val = newInterest.trim();
    if (!val) return;
    if (!formData.interests?.includes(val)) {
      handleChange("interests", [...(formData.interests || []), val]);
    }
    setNewInterest("");
  };
  const removeInterest = (interest) =>
    handleChange("interests", (formData.interests || []).filter((i) => i !== interest));

  const handleSubmit = (e) => { e.preventDefault(); onSave(formData); };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-2">Edit Profile</h2>
      <p className="text-gray-400 mb-6">Update your information</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Photo */}
        <PhotoUpload currentImage={formData.profileImage} onImageChange={handleImageChange} />

        {/* Basic Info */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Name *</label>
            <input
              value={formData.name || ""}
              onChange={(e) => handleChange("name", e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[#0f172a] border border-[color:var(--line)] placeholder-gray-500 focus:outline-none focus:border-gray-500 text-white transition"
              placeholder="Your name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Major *</label>
            <input
              value={formData.major || ""}
              onChange={(e) => handleChange("major", e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[#0f172a] border border-[color:var(--line)] placeholder-gray-500 focus:outline-none focus:border-gray-500 text-white transition"
              placeholder="Global Economics"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Year</label>
            <select
              value={formData.gradYear || ""}
              onChange={(e) => handleChange("gradYear", e.target.value ? Number(e.target.value) : "")}
              className="w-full px-4 py-3 rounded-xl bg-[#0f172a] border border-[color:var(--line)] text-white focus:outline-none focus:border-gray-500 transition"
            >
              <option value="">Select year</option>
              {[2025, 2026, 2027, 2028, 2029].map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
            <textarea
              value={formData.bio || ""}
              onChange={(e) => handleChange("bio", e.target.value)}
              rows={4}
              className="w-full px-4 py-3 rounded-xl bg-[#0f172a] border border-[color:var(--line)] placeholder-gray-500 focus:outline-none focus:border-gray-500 text-white transition resize-none"
              placeholder="Tell us about yourself…"
            />
          </div>
        </div>

        {/* Socials */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Socials</h3>
          <div className="space-y-3">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="email"
                value={formData.email || ""}
                onChange={(e) => handleChange("email", e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#0f172a] border border-[color:var(--line)] placeholder-gray-500 focus:outline-none focus:border-gray-500 text-white transition"
                placeholder="Email"
              />
            </div>
            <div className="relative">
              <Instagram className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                value={formData.instagram || ""}
                onChange={(e) => handleChange("instagram", e.target.value.replace(/^@/, ""))}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#0f172a] border border-[color:var(--line)] placeholder-gray-500 focus:outline-none focus:border-gray-500 text-white transition"
                placeholder="@username"
              />
            </div>
            <div className="relative">
              <MessageCircle className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                value={formData.discord || ""}
                onChange={(e) => handleChange("discord", e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#0f172a] border border-[color:var(--line)] placeholder-gray-500 focus:outline-none focus:border-gray-500 text-white transition"
                placeholder="Discord username"
              />
            </div>
          </div>
        </div>

        {/* Interests */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Interests</h3>
          <div className="flex gap-2 mb-4">
            <input
              value={newInterest}
              onChange={(e) => setNewInterest(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addInterest())}
              className="flex-1 px-4 py-3 rounded-xl bg-[#0f172a] border border-[color:var(--line)] placeholder-gray-500 focus:outline-none focus:border-gray-500 text-white transition"
              placeholder="Add an interest"
            />
            <button type="button" onClick={addInterest} className="px-6 py-3 rounded-xl bg-[color:var(--brand)] hover:bg-[color:var(--brand-press)] text-white font-medium transition">
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {(formData.interests || []).map((interest, idx) => (
              <span key={idx} className="px-4 py-2 bg-[#0f172a] border border-[color:var(--line)] text-gray-300 rounded-full text-sm flex items-center gap-2">
                {interest}
                <button type="button" onClick={() => removeInterest(interest)} className="hover:text-white transition" aria-label={`Remove ${interest}`}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4">
          <button type="button" onClick={onCancel} className="flex-1 px-6 py-3 rounded-xl border border-[color:var(--line)] bg-[color:var(--card)] hover:bg-[#162034] transition font-medium">
            Cancel
          </button>
          <button type="submit" className="flex-1 px-6 py-3 rounded-xl bg-[color:var(--brand)] hover:bg-[color:var(--brand-press)] text-white font-medium transition">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}