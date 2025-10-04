import React, { useRef } from "react";
import { Camera, User } from "lucide-react";

/**
 * Props:
 * - currentImage?: string (data URL or https URL)
 * - onImageChange: (dataUrl: string) => void
 */
export default function PhotoUpload({ currentImage, onImageChange }) {
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate type
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }
    // Validate size (<= 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should be less than 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => onImageChange?.(reader.result);
    reader.readAsDataURL(file);
  };

  const openPicker = () => fileInputRef.current?.click();

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <div className="w-32 h-32 rounded-full bg-[#0f172a] flex items-center justify-center overflow-hidden border-2 border-[color:var(--line)]">
          {currentImage ? (
            <img src={currentImage} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <User className="w-16 h-16 text-gray-600" />
          )}
        </div>

        <button
          type="button"
          aria-label="Upload new profile photo"
          onClick={openPicker}
          className="absolute bottom-0 right-0 bg-white p-3 rounded-full hover:bg-gray-200 transition shadow-lg"
        >
          <Camera className="w-5 h-5 text-black" />
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      <p className="text-sm text-gray-500 mt-3">Click the camera to upload a photo</p>
    </div>
  );
}
