import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"

interface StatCardProps {
  label: string
  value: string
  icon: LucideIcon
  accent: string
}

export function StatCard({ label, value, icon: Icon, accent }: StatCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/50 transition-all duration-300"
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">{label}</p>
          <p className="mt-3 text-3xl font-semibold text-slate-900">{value}</p>
        </div>
        <div className={`flex h-12 w-12 items-center justify-center rounded-3xl bg-gradient-to-br ${accent} text-white shadow-lg shadow-slate-200/50`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </motion.div>
  )
}
