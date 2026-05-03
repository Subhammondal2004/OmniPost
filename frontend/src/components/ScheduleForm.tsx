import { motion } from "framer-motion"
import { CalendarDays, Send } from "lucide-react"

interface ScheduleFormProps {
  date: string
  time: string
  publishNow: boolean
  onDateChange: (value: string) => void
  onTimeChange: (value: string) => void
  onTogglePublishNow: () => void
  onSubmit: () => void
}

export function ScheduleForm({
  date,
  time,
  publishNow,
  onDateChange,
  onTimeChange,
  onTogglePublishNow,
  onSubmit,
}: ScheduleFormProps) {
  return (
    <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/40 transition-all duration-300">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-lg font-semibold text-slate-900">Schedule & Publish</p>
          <p className="mt-1 text-sm text-slate-500">Pick a time or publish immediately.</p>
        </div>
        <div className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-3 py-2">
          <span className="text-sm font-medium text-slate-600">Publish Now</span>
          <button
            type="button"
            onClick={onTogglePublishNow}
            className={`relative inline-flex h-7 w-14 items-center rounded-full transition-all duration-300 ${
              publishNow ? "bg-sky-500" : "bg-slate-300"
            }`}
          >
            <span
              className={`inline-block h-6 w-6 transform rounded-full bg-white shadow transition-all duration-300 ${
                publishNow ? "translate-x-7" : "translate-x-1"
              }`}
            />
          </button>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="block rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3">
          <span className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">Date</span>
          <div className="mt-2">
            <input
              type="date"
              value={date}
              onChange={(event) => onDateChange(event.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 outline-none transition-all duration-300 focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
            />
          </div>
        </label>
        <label className="block rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3">
          <span className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">Time</span>
          <div className="mt-2">
            <input
              type="time"
              value={time}
              onChange={(event) => onTimeChange(event.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 outline-none transition-all duration-300 focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
            />
          </div>
        </label>
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3 rounded-3xl bg-slate-50 p-4">
          <CalendarDays className="h-5 w-5 text-sky-500" />
          <div>
            <p className="text-sm font-semibold text-slate-900">Ready to schedule</p>
            <p className="text-sm text-slate-500">Set your post distribution in one step.</p>
          </div>
        </div>
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={onSubmit}
          className="inline-flex items-center justify-center gap-2 rounded-3xl bg-gradient-to-r from-sky-500 to-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition-all duration-300 hover:shadow-sky-500/30 sm:w-auto w-full"
        >
          <Send className="h-4 w-4" />
          Schedule Post
        </motion.button>
      </div>
    </div>
  )
}
