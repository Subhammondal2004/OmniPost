import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  PenSquare, 
  Calendar, 
  BarChart3, 
  Settings, 
  LogOut,
  Zap
} from "lucide-react";
import { UserButton, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navItems = [
  { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { id: "compose", icon: PenSquare, label: "Create Post" },
  { id: "schedule", icon: Calendar, label: "Scheduled" },
  { id: "analytics", icon: BarChart3, label: "Analytics" },
  { id: "settings", icon: Settings, label: "Settings" },
];

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const navigate = useNavigate();
  const { user } = useUser();

  const handleSignOut = () => {
    navigate("/sign-in");
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <Zap className="logo-icon" size={28} />
          <span className="logo-text">OmniPost</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <motion.button
            key={item.id}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
            className={`nav-item ${activeTab === item.id ? "active" : ""}`}
            onClick={() => onTabChange(item.id)}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </motion.button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="user-section">
          <UserButton 
            appearance={{
              elements: {
                avatarBox: "user-avatar"
              }
            }}
          />
          <div className="user-info">
            <span className="user-name">{user?.fullName || "User"}</span>
            <span className="user-email">{user?.primaryEmailAddress?.emailAddress}</span>
          </div>
        </div>
        <motion.button
          whileHover={{ x: 4 }}
          className="nav-item logout-btn"
          onClick={handleSignOut}
        >
          <LogOut size={20} />
          <span>Sign Out</span>
        </motion.button>
      </div>
    </aside>
  );
}