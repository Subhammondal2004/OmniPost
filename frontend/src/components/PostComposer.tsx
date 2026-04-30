import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Image, Video, X, Upload, Loader2 } from "lucide-react";
import PlatformCard from "./PlatformCard";

export type Platform = "twitter" | "facebook" | "instagram" | "linkedin" | "tiktok";

interface MediaFile {
  id: string;
  file: File;
  preview: string;
  type: "image" | "video";
}

export default function PostComposer() {
  const [content, setContent] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>([]);
  const [media, setMedia] = useState<MediaFile[]>([]);
  const [isPosting, setIsPosting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const platforms: Platform[] = ["twitter", "facebook", "instagram", "linkedin", "tiktok"];

  const togglePlatform = (platform: Platform) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform)
        ? prev.filter((p) => p !== platform)
        : [...prev, platform]
    );
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newMedia: MediaFile[] = files.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      preview: URL.createObjectURL(file),
      type: file.type.startsWith("video") ? "video" : "image",
    }));
    setMedia((prev) => [...prev, ...newMedia]);
  };

  const removeMedia = (id: string) => {
    setMedia((prev) => {
      const item = prev.find((m) => m.id === id);
      if (item) URL.revokeObjectURL(item.preview);
      return prev.filter((m) => m.id !== id);
    });
  };

  const handlePost = async () => {
    if (!content.trim() || selectedPlatforms.length === 0) return;

    setIsPosting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsPosting(false);
    setShowSuccess(true);
    setContent("");
    setMedia([]);
    setSelectedPlatforms([]);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const charCount = content.length;
  const maxChars = 280;

  return (
    <div className="composer-container">
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="success-toast"
          >
            ✨ Posts scheduled successfully!
          </motion.div>
        )}
      </AnimatePresence>

      <div className="composer-header">
        <h2>Create Post</h2>
        <p>Share your content across multiple platforms at once</p>
      </div>

      <div className="composer-content">
        <textarea
          className="post-textarea"
          placeholder="What's on your mind? Share something amazing..."
          value={content}
          onChange={(e) => setContent(e.target.value.slice(0, maxChars))}
          rows={5}
        />
        <div className="char-counter">
          <span className={charCount > maxChars ? "over-limit" : ""}>
            {charCount}
          </span>
          /{maxChars}
        </div>
      </div>

      {media.length > 0 && (
        <div className="media-preview-grid">
          {media.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="media-preview-item"
            >
              {item.type === "image" ? (
                <img src={item.preview} alt="Preview" />
              ) : (
                <video src={item.preview} />
              )}
              <button
                className="remove-media-btn"
                onClick={() => removeMedia(item.id)}
              >
                <X size={16} />
              </button>
            </motion.div>
          ))}
        </div>
      )}

      <div className="media-upload-section">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,video/*"
          multiple
          onChange={handleFileSelect}
          hidden
        />
        <button
          className="upload-btn"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload size={20} />
          Add Media
        </button>
        <div className="media-types">
          <span><Image size={16} /> Images</span>
          <span><Video size={16} /> Videos</span>
        </div>
      </div>

      <div className="platform-section">
        <h3>Select Platforms</h3>
        <div className="platform-grid">
          {platforms.map((platform) => (
            <PlatformCard
              key={platform}
              platform={platform}
              isSelected={selectedPlatforms.includes(platform)}
              onToggle={() => togglePlatform(platform)}
            />
          ))}
        </div>
      </div>

      <motion.button
        className="post-button"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        disabled={!content.trim() || selectedPlatforms.length === 0 || isPosting}
        onClick={handlePost}
      >
        {isPosting ? (
          <>
            <Loader2 className="spinner" size={20} />
            Posting...
          </>
        ) : (
          <>
            <Upload size={20} />
            Post to {selectedPlatforms.length} platform{selectedPlatforms.length !== 1 ? "s" : ""}
          </>
        )}
      </motion.button>
    </div>
  );
}