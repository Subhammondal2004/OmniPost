import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  color: string;
}

export default function StatsCard({ title, value, change, icon: Icon, color }: StatsCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="stats-card"
      style={{ "--accent-color": color } as React.CSSProperties}
    >
      <div className="stats-icon">
        <Icon size={24} />
      </div>
      <div className="stats-content">
        <span className="stats-title">{title}</span>
        <span className="stats-value">{value}</span>
        <span className="stats-change">{change}</span>
      </div>
    </motion.div>
  );
}