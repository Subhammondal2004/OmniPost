import { useState, type ChangeEvent } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  LayoutDashboard,
  PenSquare,
  Calendar,
  BarChart3,
  Link2,
  Settings,
  LogOut,
  Zap,
  Menu,
  X,
  Search,
  Bell,
  ChevronDown,
  Image,
  FileText,
  Check,
  Clock,
  ArrowUpRight,
  Plus,
  Eye,
} from "lucide-react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Textarea } from "../components/ui/textarea"
import { Input } from "../components/ui/input"

type Platform = "instagram" | "facebook" | "linkedin" | "twitter"

interface PlatformInfo {
  id: Platform
  name: string
  icon: typeof Image
  color: string
  bgColor: string
  connected: boolean
  username?: string
}

interface Post {
  id: number
  content: string
  platforms: Platform[]
  date: string
  status: "published" | "scheduled"
}

interface Stat {
  label: string
  value: string
  change: string
  icon: typeof FileText
  color: string
}

const platforms: PlatformInfo[] = [
  { id: "instagram", name: "Instagram", icon: Image, color: "text-pink-500", bgColor: "bg-pink-500", connected: true, username: "@autopost_official" },
  { id: "facebook", name: "Facebook", icon: Image, color: "text-blue-600", bgColor: "bg-blue-600", connected: true, username: "AutoPost Official" },
  { id: "linkedin", name: "LinkedIn", icon: Image, color: "text-blue-700", bgColor: "bg-blue-700", connected: false, username: "" },
  { id: "twitter", name: "X / Twitter", icon: Image, color: "text-slate-900 dark:text-white", bgColor: "bg-slate-900", connected: true, username: "@autopost" },
]

const recentPosts: Post[] = [
  { id: 1, content: "Excited to announce our new product launch! 🚀 #innovation #tech", platforms: ["instagram", "twitter"], date: "2 hours ago", status: "published" },
  { id: 2, content: "We're hiring! Join our amazing team. Check the link in bio.", platforms: ["facebook", "linkedin"], date: "1 day ago", status: "published" },
  { id: 3, content: "New blog post: 10 Tips for Social Media Success", platforms: ["twitter"], date: "3 days ago", status: "scheduled" },
]

const stats: Stat[] = [
  { label: "Total Posts", value: "1,234", change: "+12%", icon: FileText, color: "from-indigo-500 to-purple-600" },
  { label: "Total Reach", value: "45.2K", change: "+8%", icon: BarChart3, color: "from-green-500 to-emerald-600" },
  { label: "Followers", value: "8,921", change: "+156", icon: Check, color: "from-orange-500 to-amber-600" },
  { label: "Scheduled", value: "23", change: "Next: 2h", icon: Clock, color: "from-blue-500 to-cyan-600" },
]

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeTab, setActiveTab] = useState("dashboard")
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>(["instagram", "twitter"])
  const [contentMode, setContentMode] = useState<"same" | "custom">("same")
  const [postContent, setPostContent] = useState("")
  const [isPosting, setIsPosting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [uploadedImages, setUploadedImages] = useState<string[]>([])

  const togglePlatform = (platform: Platform) => {
    setSelectedPlatforms(prev => 
      prev.includes(platform) 
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    )
  }

  const handlePost = async () => {
    if (!postContent.trim() || selectedPlatforms.length === 0) return
    setIsPosting(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsPosting(false)
    setShowSuccess(true)
    setPostContent("")
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const newImages = files.map(file => URL.createObjectURL(file))
    setUploadedImages(prev => [...prev, ...newImages])
  }

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index))
  }

  const renderContent = () => {
    switch (activeTab) {
      case "create-post":
        return <CreatePostPage 
          platforms={platforms}
          selectedPlatforms={selectedPlatforms}
          contentMode={contentMode}
          postContent={postContent}
          uploadedImages={uploadedImages}
          isPosting={isPosting}
          showSuccess={showSuccess}
          onTogglePlatform={togglePlatform}
          onContentModeChange={setContentMode}
          onContentChange={setPostContent}
          onPost={handlePost}
          onImageUpload={handleImageUpload}
          onRemoveImage={removeImage}
        />
      case "scheduled":
        return <ScheduledPage posts={recentPosts.filter(p => p.status === "scheduled")} />
      case "accounts":
        return <AccountsPage platforms={platforms} />
      case "settings":
        return <SettingsPage />
      default:
        return <DashboardHome stats={stats} recentPosts={recentPosts} onCreatePost={() => setActiveTab("create-post")} />
    }
  }

  const navItems = [
    { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { id: "create-post", icon: PenSquare, label: "Create Post" },
    { id: "scheduled", icon: Calendar, label: "Scheduled" },
    { id: "accounts", icon: Link2, label: "Accounts" },
    { id: "settings", icon: Settings, label: "Settings" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white flex">
      {/* SIDEBAR */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarOpen ? 260 : 80 }}
        className="fixed left-0 top-0 h-screen bg-slate-950/50 border-r border-white/5 backdrop-blur-xl z-40 flex flex-col"
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-white/5">
          <motion.div className="flex items-center gap-3 flex-1">
            <motion.div 
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-indigo-500/30"
              whileHover={{ scale: 1.05 }}
            >
              <Zap className="w-5 h-5 text-white" />
            </motion.div>
            {sidebarOpen && (
              <motion.span 
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="text-lg font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent whitespace-nowrap"
              >
                AutoPost
              </motion.span>
            )}
          </motion.div>
          <motion.button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </motion.button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                activeTab === item.id
                  ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30"
                  : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
              }`}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
            >
              <item.icon size={20} className="flex-shrink-0" />
              {sidebarOpen && <span className="font-medium text-sm">{item.label}</span>}
            </motion.button>
          ))}
        </nav>

        {/* Sign Out */}
        <div className="p-3 border-t border-white/5">
          <motion.button 
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-950/20 transition-all duration-300"
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
          >
            <LogOut size={20} className="flex-shrink-0" />
            {sidebarOpen && <span className="font-medium text-sm">Sign Out</span>}
          </motion.button>
        </div>
      </motion.aside>

      {/* MAIN CONTENT */}
      <main 
        className="flex-1 transition-all duration-300 overflow-hidden flex flex-col"
        style={{ marginLeft: sidebarOpen ? 260 : 80 }}
      >
        {/* HEADER */}
        <header className="h-16 bg-slate-950/30 border-b border-white/5 flex items-center justify-between px-6 sticky top-0 z-30 backdrop-blur-md">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative max-w-md flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input 
                placeholder="Search posts, accounts..." 
                className="pl-10 pr-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-slate-500 focus:border-indigo-500/50 focus:bg-white/10 transition-all duration-300 text-sm"
              />
            </div>
          </div>
          <div className="flex items-center gap-5">
            <motion.button 
              className="relative p-2 text-slate-400 hover:text-slate-200 hover:bg-white/5 rounded-lg transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Bell size={18} />
              <motion.span 
                className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.button>
            <div className="flex items-center gap-3 pl-5 border-l border-white/10">
              <motion.div 
                className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-indigo-500/30"
                whileHover={{ scale: 1.05 }}
              >
                JD
              </motion.div>
              {sidebarOpen && (
                <motion.div 
                  className="flex items-center gap-2 cursor-pointer group"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="text-xs">
                    <p className="font-medium text-slate-100">John Doe</p>
                    <p className="text-slate-400">Pro Plan</p>
                  </div>
                  <ChevronDown size={16} className="text-slate-400 group-hover:text-slate-200 transition-colors" />
                </motion.div>
              )}
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 md:p-8 lg:p-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  )
}

function DashboardHome({ stats, recentPosts, onCreatePost }: { 
  stats: Stat[]
  recentPosts: Post[]
  onCreatePost: () => void
}) {
  return (
    <div className="space-y-10">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <motion.div
              className="relative group"
              whileHover={{ y: -4 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 to-purple-600/0 group-hover:from-indigo-500/10 group-hover:to-purple-600/10 rounded-2xl blur-xl transition-all duration-300" />
              <Card className="relative border border-white/10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl hover:border-indigo-500/30 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">{stat.label}</p>
                        <p className="text-3xl font-bold text-white mt-2 tracking-tight">{stat.value}</p>
                      </div>
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-xl`}>
                        <stat.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <ArrowUpRight className="w-4 h-4 text-green-400" />
                      <span className="text-sm font-semibold text-green-400">{stat.change}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions & Recent Posts */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="border border-white/10 bg-gradient-to-br from-white/10 to-white/5 h-full backdrop-blur-xl">
            <CardHeader className="pb-4">
              <CardTitle className="text-base font-semibold text-white flex items-center gap-2">
                <Zap className="w-5 h-5 text-indigo-400" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button 
                  className="w-full justify-start gap-3 h-11 bg-gradient-to-r from-indigo-500 to-purple-600 hover:shadow-lg hover:shadow-indigo-500/40 text-white font-medium transition-all duration-300"
                  onClick={onCreatePost}
                >
                  <Plus className="w-4 h-4" />
                  Create New Post
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button 
                  variant="outline" 
                  className="w-full justify-start gap-3 h-11 border-white/10 text-slate-300 hover:bg-white/10 hover:text-white transition-all duration-300"
                >
                  <Calendar className="w-4 h-4" />
                  Schedule Post
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button 
                  variant="outline" 
                  className="w-full justify-start gap-3 h-11 border-white/10 text-slate-300 hover:bg-white/10 hover:text-white transition-all duration-300"
                >
                  <Link2 className="w-4 h-4" />
                  Connect Account
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Posts */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="border border-white/10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-white/5">
              <CardTitle className="text-base font-semibold text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-indigo-400" />
                Recent Posts
              </CardTitle>
              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white text-xs">
                View All →
              </Button>
            </CardHeader>
            <CardContent className="space-y-3 pt-4">
              {recentPosts.slice(0, 3).map((post, index) => (
                <motion.div 
                  key={post.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  className="group"
                >
                  <motion.div 
                    className="p-4 rounded-xl border border-white/5 bg-white/5 hover:border-indigo-500/20 hover:bg-white/10 transition-all duration-300 cursor-pointer"
                    whileHover={{ y: -2 }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-100 line-clamp-2">{post.content}</p>
                        <div className="flex items-center gap-3 mt-3 flex-wrap">
                          <div className="flex -space-x-1">
                            {post.platforms.slice(0, 3).map((p) => {
                              const platform = platforms.find(pl => pl.id === p)
                              return platform ? (
                                <motion.div 
                                  key={p} 
                                  className={`w-6 h-6 rounded-full ${platform.bgColor} flex items-center justify-center border-2 border-slate-900 shadow-lg`}
                                  whileHover={{ scale: 1.1, zIndex: 10 }}
                                >
                                  <platform.icon className="w-3 h-3 text-white" />
                                </motion.div>
                              ) : null
                            })}
                          </div>
                          <span className="text-xs text-slate-400">{post.date}</span>
                          <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
                            post.status === "published"
                              ? "bg-green-500/20 text-green-300"
                              : "bg-amber-500/20 text-amber-300"
                          }`}>
                            {post.status === "published" ? "Published" : "Scheduled"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

function CreatePostPage({
  platforms,
  selectedPlatforms,
  contentMode,
  postContent,
  uploadedImages,
  isPosting,
  showSuccess,
  onTogglePlatform,
  onContentModeChange,
  onContentChange,
  onPost,
  onImageUpload,
  onRemoveImage
}: {
  platforms: PlatformInfo[]
  selectedPlatforms: Platform[]
  contentMode: "same" | "custom"
  postContent: string
  uploadedImages: string[]
  isPosting: boolean
  showSuccess: boolean
  onTogglePlatform: (p: Platform) => void
  onContentModeChange: (m: "same" | "custom") => void
  onContentChange: (c: string) => void
  onPost: () => void
  onImageUpload: (e: ChangeEvent<HTMLInputElement>) => void
  onRemoveImage: (i: number) => void
}) {
  return (
    <div className="space-y-8">
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-24 right-6 z-50 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl shadow-xl shadow-green-500/30 flex items-center gap-2 font-medium"
          >
            <Check className="w-5 h-5" />
            Posts published successfully!
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Select Platforms */}
          <Card className="border border-white/10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl">
            <CardHeader className="border-b border-white/5">
              <CardTitle className="text-base font-semibold text-white flex items-center gap-2">
                <Zap className="w-5 h-5 text-indigo-400" />
                Select Platforms
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {platforms.map((platform) => (
                  <motion.button
                    key={platform.id}
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onTogglePlatform(platform.id)}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                      selectedPlatforms.includes(platform.id)
                        ? "border-indigo-500 bg-indigo-500/20 shadow-lg shadow-indigo-500/30"
                        : "border-white/10 hover:border-white/20 hover:bg-white/5"
                    }`}
                  >
                    <platform.icon className={`w-8 h-8 mx-auto mb-2 ${platform.color}`} />
                    <p className="text-xs font-semibold text-white">{platform.name}</p>
                    {platform.connected ? (
                      <p className="text-xs text-green-400 mt-1.5 font-medium">Connected</p>
                    ) : (
                      <p className="text-xs text-slate-400 mt-1.5">Not connected</p>
                    )}
                  </motion.button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Content Mode */}
          <Card className="border border-white/10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl">
            <CardHeader className="border-b border-white/5">
              <CardTitle className="text-base font-semibold text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-indigo-400" />
                Content Mode
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 gap-3">
                <motion.button
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onContentModeChange("same")}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 text-center ${
                    contentMode === "same"
                      ? "border-indigo-500 bg-indigo-500/20 shadow-lg shadow-indigo-500/20"
                      : "border-white/10 hover:border-white/20 hover:bg-white/5"
                  }`}
                >
                  <FileText className={`w-6 h-6 mx-auto mb-2 ${contentMode === "same" ? "text-indigo-400" : "text-slate-400"}`} />
                  <p className="font-medium text-white text-sm">Same Content</p>
                  <p className="text-xs text-slate-400 mt-1">One post for all</p>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onContentModeChange("custom")}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 text-center ${
                    contentMode === "custom"
                      ? "border-indigo-500 bg-indigo-500/20 shadow-lg shadow-indigo-500/20"
                      : "border-white/10 hover:border-white/20 hover:bg-white/5"
                  }`}
                >
                  <PenSquare className={`w-6 h-6 mx-auto mb-2 ${contentMode === "custom" ? "text-indigo-400" : "text-slate-400"}`} />
                  <p className="font-medium text-white text-sm">Custom Content</p>
                  <p className="text-xs text-slate-400 mt-1">Per platform</p>
                </motion.button>
              </div>
            </CardContent>
          </Card>

          {/* Post Content */}
          <Card className="border border-white/10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl">
            <CardHeader className="border-b border-white/5">
              <CardTitle className="text-base font-semibold text-white flex items-center gap-2">
                <PenSquare className="w-5 h-5 text-indigo-400" />
                Write Your Post
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <Textarea
                placeholder="What's on your mind?"
                value={postContent}
                onChange={(e) => onContentChange(e.target.value)}
                className="min-h-[140px] border border-white/10 bg-white/5 text-white placeholder:text-slate-500 focus:border-indigo-500/50 focus:bg-white/10 rounded-xl transition-all duration-300 resize-none"
              />
              <div className="flex items-center justify-between text-xs text-slate-400 pt-2">
                <span className="font-medium">{postContent.length} / 280 characters</span>
                <div className="flex gap-1">
                  <button className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-lg">😊</button>
                  <button className="p-1.5 hover:bg-white/10 rounded-lg transition-colors">#</button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Media Upload */}
          <Card className="border border-white/10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl">
            <CardHeader className="border-b border-white/5">
              <CardTitle className="text-base font-semibold text-white flex items-center gap-2">
                <Image className="w-5 h-5 text-indigo-400" />
                Add Media
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              {uploadedImages.length > 0 ? (
                <div className="grid grid-cols-4 gap-3 mb-4">
                  {uploadedImages.map((img, i) => (
                    <motion.div 
                      key={i} 
                      className="relative aspect-square rounded-lg overflow-hidden group"
                      whileHover={{ scale: 1.05 }}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                      <motion.button
                        onClick={() => onRemoveImage(i)}
                        className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300"
                        whileHover={{ scale: 1.1 }}
                      >
                        <X className="w-5 h-5 text-white" />
                      </motion.button>
                    </motion.div>
                  ))}
                </div>
              ) : null}
              <label className="border-2 border-dashed border-white/20 hover:border-indigo-500/50 rounded-xl p-8 flex flex-col items-center cursor-pointer transition-all duration-300 group">
                <motion.div whileHover={{ scale: 1.1 }}>
                  <Image className="w-10 h-10 text-slate-400 group-hover:text-indigo-400 mb-3 transition-colors" />
                </motion.div>
                <p className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">Drop images or click to upload</p>
                <p className="text-xs text-slate-500 mt-1">PNG, JPG, WEBP up to 10MB</p>
                <input type="file" accept="image/*" multiple className="hidden" onChange={onImageUpload} />
              </label>
            </CardContent>
          </Card>
        </div>

        {/* Preview Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-1"
        >
          <Card className="sticky top-20 border border-white/10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl h-fit">
            <CardHeader className="border-b border-white/5">
              <CardTitle className="text-base font-semibold text-white flex items-center gap-2">
                <Eye className="w-5 h-5 text-indigo-400" />
                Preview
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              {selectedPlatforms.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Platforms</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedPlatforms.map((p) => {
                      const platform = platforms.find(pl => pl.id === p)
                      return platform ? (
                        <motion.div 
                          key={p} 
                          className={`flex items-center gap-2 px-2.5 py-1.5 rounded-full ${platform.bgColor} text-white text-xs font-medium shadow-lg`}
                          whileHover={{ scale: 1.05 }}
                        >
                          <platform.icon className="w-3 h-3" />
                          {platform.name}
                        </motion.div>
                      ) : null
                    })}
                  </div>
                </div>
              )}
              
              <div className="p-3.5 rounded-lg bg-white/5 border border-white/10">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Content</p>
                <p className="text-sm text-slate-200 whitespace-pre-wrap line-clamp-4 leading-relaxed">
                  {postContent || "Your post content will appear here..."}
                </p>
                {uploadedImages.length > 0 && (
                  <div className="grid grid-cols-2 gap-1.5 mt-2">
                    {uploadedImages.slice(0, 2).map((img, i) => (
                      <img key={i} src={img} alt="" className="rounded-md w-full aspect-square object-cover" />
                    ))}
                  </div>
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                disabled={!postContent.trim() || selectedPlatforms.length === 0 || isPosting}
                onClick={onPost}
                className="w-full h-11 bg-gradient-to-r from-indigo-500 to-purple-600 hover:shadow-xl hover:shadow-indigo-500/40 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
              >
                {isPosting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Publishing...
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4" />
                    Publish Now
                  </>
                )}
              </motion.button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

function ScheduledPage({ posts }: { posts: Post[] }) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white">Scheduled Posts</h1>
        <p className="text-slate-400 mt-2">Manage your upcoming posts</p>
      </div>

      {posts.length === 0 ? (
        <Card className="border border-white/10 bg-white/5">
          <CardContent className="py-16 text-center">
            <Calendar className="w-16 h-16 mx-auto text-slate-600 mb-4" />
            <p className="text-slate-400">No scheduled posts yet</p>
            <Button className="mt-4 bg-gradient-to-r from-indigo-500 to-purple-600">Schedule a Post</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <Card key={post.id} className="border border-white/10 bg-white/5">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-white">{post.content}</p>
                    <div className="flex items-center gap-3 mt-3">
                      <div className="flex -space-x-2">
                        {post.platforms.map((p) => {
                          const platform = platforms.find(pl => pl.id === p)
                          return platform ? (
                            <div key={p} className={`w-6 h-6 rounded-full ${platform.bgColor} flex items-center justify-center border-2 border-slate-950`}>
                              <platform.icon className="w-3 h-3 text-white" />
                            </div>
                          ) : null
                        })}
                      </div>
                      <span className="text-sm text-slate-400">{post.date}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="border-white/10 text-slate-300 hover:bg-white/5">Edit</Button>
                    <Button variant="outline" size="sm" className="border-red-500/20 text-red-400 hover:bg-red-950/30">Delete</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

function AccountsPage({ platforms }: { platforms: PlatformInfo[] }) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white">Connected Accounts</h1>
        <p className="text-slate-400 mt-2">Manage your social media connections</p>
      </div>

      <div className="space-y-4">
        {platforms.map((platform) => (
          <Card key={platform.id} className="border border-white/10 bg-white/5">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-xl ${platform.bgColor} flex items-center justify-center shadow-lg`}>
                    <platform.icon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{platform.name}</h3>
                    {platform.connected ? (
                      <p className="text-sm text-green-400 flex items-center gap-1">
                        <Check className="w-4 h-4" /> Connected as {platform.username}
                      </p>
                    ) : (
                      <p className="text-sm text-slate-400">Not connected</p>
                    )}
                  </div>
                </div>
                <div className="flex gap-3">
                  {platform.connected ? (
                    <>
                      <Button variant="outline" size="sm" className="border-white/10 text-slate-300 hover:bg-white/5">Reconnect</Button>
                      <Button variant="outline" size="sm" className="border-red-500/20 text-red-400 hover:bg-red-950/30">Disconnect</Button>
                    </>
                  ) : (
                    <Button size="sm" className="bg-gradient-to-r from-indigo-500 to-purple-600">Connect</Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function SettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white">Settings</h1>
        <p className="text-slate-400 mt-2">Manage your account preferences</p>
      </div>

      <div className="grid gap-6 max-w-2xl">
        <Card className="border border-white/10 bg-white/5">
          <CardHeader>
            <CardTitle className="text-white">Profile Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-slate-300">Full Name</label>
                <Input defaultValue="John Doe" className="mt-2 border-white/10 bg-white/5 text-white" />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-300">Email</label>
                <Input defaultValue="john@example.com" className="mt-2 border-white/10 bg-white/5 text-white" />
              </div>
            </div>
            <Button className="bg-gradient-to-r from-indigo-500 to-purple-600">Save Changes</Button>
          </CardContent>
        </Card>

        <Card className="border border-white/10 bg-white/5">
          <CardHeader>
            <CardTitle className="text-white">Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
              <div>
                <p className="font-medium text-white">Dark Mode</p>
                <p className="text-sm text-slate-400">Use dark theme throughout the app</p>
              </div>
              <button className="w-12 h-6 bg-indigo-500 rounded-full relative shadow-lg shadow-indigo-500/20">
                <span className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
              </button>
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
              <div>
                <p className="font-medium text-white">Email Notifications</p>
                <p className="text-sm text-slate-400">Receive email updates about your posts</p>
              </div>
              <button className="w-12 h-6 bg-slate-700 rounded-full relative">
                <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full" />
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard
