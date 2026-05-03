import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import {
  Globe,
  Camera,
  Briefcase,
  CalendarDays,
  MessageSquare,
  Users,
  Sparkles,
} from "lucide-react"
import { Navbar } from "../components/Navbar"
import { PlatformCard } from "../components/PlatformCard"
import { UploadBox } from "../components/UploadBox"
import { ScheduleForm } from "../components/ScheduleForm"
import { StatCard } from "../components/StatCard"
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";

const platformItems = [
  {
    id: "facebook",
    name: "Facebook",
    description: "Share quick posts to your brand page",
    icon: Globe,
    accent: "from-blue-500 to-sky-500",
  },
  {
    id: "instagram",
    name: "Instagram",
    description: "Publish visual stories and carousel content",
    icon: Camera,
    accent: "from-fuchsia-500 to-pink-500",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    description: "Post professional updates to your network",
    icon: Briefcase,
    accent: "from-indigo-500 to-violet-500",
  },
]

const stats = [
  {
    label: "Scheduled Posts",
    value: "18",
    icon: CalendarDays,
    accent: "from-sky-500 to-indigo-500",
  },
  {
    label: "Published Today",
    value: "24",
    icon: MessageSquare,
    accent: "from-cyan-500 to-teal-500",
  },
  {
    label: "Connected Accounts",
    value: "6",
    icon: Users,
    accent: "from-violet-500 to-fuchsia-500",
  },
]

export function DashboardPage() {
  const { getToken } = useAuth();
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["facebook", "instagram"])
  const [files, setFiles] = useState<File[]>([])
  const [caption, setCaption] = useState("")
  const [publishNow, setPublishNow] = useState(true)
  const [scheduleDate, setScheduleDate] = useState(() => new Date().toISOString().slice(0, 10))
  const [scheduleTime, setScheduleTime] = useState("09:00")
  const [user, setUser] = useState<{ username?: string; email?: string; } | null>(null)

  const selectedPlatformCount = selectedPlatforms.length
  const captionLength = caption.length

  const handlePlatformToggle = (id: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(id) ? prev.filter((platform) => platform !== id) : [...prev, id],
    )
  }

  const handleFileAdd = (newFiles: File[]) => {
    setFiles((prev) => [...prev, ...newFiles])
  }

  const handleFileRemove = (index: number) => {
    setFiles((prev) => prev.filter((_, fileIndex) => fileIndex !== index))
  }

  const fetchUser = async () => {
    try {
      const token = await getToken();
        const res = await axios.get("http://localhost:8000/api/v1/users",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      if(res.status === 200){
        setUser(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(()=>{
    fetchUser();
  },[])

  const contentStrength = useMemo(() => {
    if (captionLength > 220) return "Strong"
    if (captionLength > 120) return "Good"
    return "Ready"
  }, [captionLength])

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Navbar />

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="mt-6 rounded-[32px] border border-slate-200 bg-gradient-to-r from-indigo-50 to-sky-50 p-8 shadow-sm shadow-slate-200/50"
        >
          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Welcome back</p>
            <h1 className="text-2xl font-bold text-slate-900">
              {user?.username ? `Hi, ${user.username}!` : "Welcome to OmniPost!"}
            </h1>
            <p className="mt-2 text-lg text-slate-600">
              Ready to schedule and publish amazing content today?
            </p>
          </div>
        </motion.section>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="mt-6 grid gap-6 xl:grid-cols-[1.45fr_0.9fr]"
        >
          <div className="space-y-6">
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/50"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-base font-semibold uppercase tracking-[0.18em] text-slate-500">Post Configuration</p>
                  <h2 className="mt-3 text-2xl font-semibold text-slate-900">Build your campaign</h2>
                </div>
                <div className="rounded-3xl bg-slate-50 px-4 py-2 text-sm text-slate-600 shadow-sm shadow-slate-200/50">
                  {selectedPlatformCount} selected
                </div>
              </div>

              <div className="mt-6 grid gap-4 lg:grid-cols-3">
                {platformItems.map((platform) => (
                  <PlatformCard
                    key={platform.id}
                    name={platform.name}
                    icon={platform.icon}
                    accent={platform.accent}
                    description={platform.description}
                    selected={selectedPlatforms.includes(platform.id)}
                    onClick={() => handlePlatformToggle(platform.id)}
                  />
                ))}
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.1 }}
            >
              <UploadBox files={files} onFileAdd={handleFileAdd} onFileRemove={handleFileRemove} />
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.2 }}
              className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/50"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-base font-semibold text-slate-900">Caption</p>
                  <p className="text-sm text-slate-500">Write a compelling message for your post.</p>
                </div>
                <div className="rounded-3xl bg-slate-50 px-4 py-2 text-sm font-medium text-slate-600 shadow-sm shadow-slate-200/50">
                  {contentStrength}
                </div>
              </div>

              <textarea
                value={caption}
                onChange={(event) => setCaption(event.target.value)}
                placeholder="Write your caption here…"
                className="mt-6 min-h-[200px] w-full resize-none rounded-[32px] border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-900 outline-none transition-all duration-300 focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100"
              />
              <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
                <p>Use tags, mentions, and short, punchy copy.</p>
                <span>{captionLength}/280</span>
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.3 }}
            >
              <ScheduleForm
                date={scheduleDate}
                time={scheduleTime}
                publishNow={publishNow}
                onDateChange={setScheduleDate}
                onTimeChange={setScheduleTime}
                onTogglePublishNow={() => setPublishNow((value) => !value)}
                onSubmit={() => {
                  setPublishNow(true)
                }}
              />
            </motion.section>
          </div>

          <aside className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.15 }}
              className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/50"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-base font-semibold text-slate-900">Analytics Preview</p>
                  <p className="mt-1 text-sm text-slate-500">Track your campaign health at a glance.</p>
                </div>
                <div className="rounded-full bg-sky-100 px-3 py-1 text-sm font-semibold text-sky-700">Live</div>
              </div>

              <div className="mt-6 grid gap-4">
                {stats.map((stat) => (
                  <StatCard key={stat.label} label={stat.label} value={stat.value} icon={stat.icon} accent={stat.accent} />
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.25 }}
              className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/50"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-gradient-to-br from-indigo-500 to-sky-500 text-white shadow-lg shadow-indigo-500/15">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-base font-semibold text-slate-900">Premium workflow</p>
                  <p className="mt-1 text-sm text-slate-500">Your scheduled posts are ready to publish across selected platforms.</p>
                </div>
              </div>
              <div className="mt-6 grid gap-4 rounded-[28px] bg-slate-50 p-4 text-sm text-slate-700">
                <div className="flex items-center justify-between">
                  <span>Platforms chosen</span>
                  <span className="font-semibold text-slate-900">{selectedPlatformCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Upload files</span>
                  <span className="font-semibold text-slate-900">{files.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Publish mode</span>
                  <span className="font-semibold text-slate-900">{publishNow ? "Now" : "Later"}</span>
                </div>
              </div>
            </motion.div>
          </aside>
        </motion.div>
      </div>
    </div>
  )
}