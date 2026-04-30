import { motion } from "framer-motion";
import type { Platform } from "./PostComposer";

interface PlatformCardProps {
  platform: Platform;
  isSelected: boolean;
  onToggle: () => void;
}

const platformConfig: Record<Platform, { name: string; icon: string; color: string }> = {
  twitter: { name: "Twitter/X", icon: "𝕏", color: "#000000" },
  facebook: { name: "Facebook", icon: "f", color: "#1877F2" },
  instagram: { name: "Instagram", icon: "📷", color: "#E4405F" },
  linkedin: { name: "LinkedIn", icon: "in", color: "#0A66C2" },
  tiktok: { name: "TikTok", icon: "🎵", color: "#000000" },
};

export default function PlatformCard({ platform, isSelected, onToggle }: PlatformCardProps) {
  const config = platformConfig[platform];

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onToggle}
      className={`platform-card ${isSelected ? "selected" : ""}`}
      style={{
        "--platform-color": config.color,
      } as React.CSSProperties}
    >
      <div className="platform-icon">{config.icon}</div>
      <span className="platform-name">{config.name}</span>
      <div className="platform-check">
        {isSelected && <span className="check-mark">✓</span>}
      </div>
    </motion.button>
  );
}