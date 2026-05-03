import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"

interface PlatformCardProps {
  name: string
  icon: LucideIcon
  accent: string
  description: string
  selected: boolean
  onClick: () => void
}

export function PlatformCard({ name, icon: Icon, accent, description, selected, onClick }: PlatformCardProps) {
  return (
    <motion.button
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`group flex flex-col gap-4 rounded-3xl border px-5 py-6 text-left transition-all duration-300 ${
        selected
          ? `border-slate-900 bg-slate-50 shadow-lg shadow-slate-200/50 ${accent}`
          : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 shadow-sm">
          <Icon className="h-5 w-5" />
        </div>
        <div className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-500 shadow-sm transition-colors duration-300 group-hover:border-slate-300">
          {selected ? "Selected" : "Select"}
        </div>
      </div>
      <div>
        <p className="text-base font-semibold text-slate-900">{name}</p>
        <p className="mt-2 text-sm text-slate-500">{description}</p>
      </div>
    </motion.button>
  )
}
