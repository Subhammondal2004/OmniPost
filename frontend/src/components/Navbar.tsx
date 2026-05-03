import { motion } from "framer-motion"
import { LogOut } from "lucide-react"
import { useAuth } from "@clerk/clerk-react"

export function Navbar() {
  const { signOut } = useAuth()

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="sticky top-4 z-20"
    >
      <div className="rounded-[32px] border border-slate-200/80 bg-white shadow-sm shadow-slate-200/50 px-5 py-4 backdrop-blur-xl transition-all duration-300">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-white shadow-sm shadow-slate-200/60">
              <img src="/omnipost-logo.svg" alt="OmniPost logo" className="h-7 w-7" />
            </div>
            <div>
              <p className="text-lg font-semibold text-slate-900">OmniPost</p>
              <p className="mt-1 text-sm text-slate-500">Dashboard for social publishing</p>
            </div>
          </div>
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => signOut?.()}
            className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-slate-900/10 transition-all duration-300 hover:bg-slate-800"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
