import { useState } from "react"
import { motion } from "framer-motion"
import { SignIn, SignUp } from "@clerk/clerk-react"
import { ArrowRight, ShieldCheck, Sparkles, Users } from "lucide-react"

export function LandingPage() {
  const [mode, setMode] = useState<"signIn" | "signUp">("signIn");

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50 py-14">
      <div className="absolute left-1/2 top-8 h-60 w-60 -translate-x-1/2 rounded-full bg-sky-300/20 blur-3xl" />
      <div className="absolute right-10 top-1/4 h-72 w-72 rounded-full bg-slate-900/10 blur-3xl" />
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 rounded-[32px] border border-slate-200 bg-white/95 p-5 shadow-sm shadow-slate-200/60 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-white shadow-sm shadow-slate-200/60">
              <img src="/omnipost-logo.svg" alt="OmniPost logo" className="h-8 w-8" />
            </div>
            <div>
              <p className="text-xl font-semibold text-slate-900">OmniPost</p>
              <p className="text-sm text-slate-500">Publish, schedule, and measure social content</p>
            </div>
          </div>
        </div>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="grid gap-10 rounded-[40px] border border-slate-200 bg-white/95 p-10 shadow-sm shadow-slate-200/60 lg:grid-cols-[1.15fr_0.85fr]"
        >
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
              <Sparkles className="h-4 w-4 text-sky-500" />
              Premium social automation
            </div>
            <div className="space-y-4">
              <h1 className="max-w-xl text-5xl font-semibold tracking-tight text-slate-900 sm:text-6xl">
                Social posting built for teams
              </h1>
              <p className="max-w-lg text-lg leading-8 text-slate-600">
                Schedule posts, manage accounts, and publish from one beautiful dashboard.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={() => setMode("signIn")}
                className={`inline-flex items-center justify-center gap-2 rounded-3xl px-6 py-3 text-sm font-semibold transition duration-300 ${
                  mode === "signIn"
                    ? "bg-slate-900 text-white shadow-lg shadow-slate-900/10"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                Sign in
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setMode("signUp")}
                className={`inline-flex items-center justify-center gap-2 rounded-3xl px-6 py-3 text-sm font-semibold transition duration-300 ${
                  mode === "signUp"
                    ? "bg-slate-900 text-white shadow-lg shadow-slate-900/10"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                Create account
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
                <p className="text-sm uppercase tracking-[0.18em] text-slate-500">Instant setup</p>
                <p className="mt-3 text-base font-semibold text-slate-900">Ready to launch in minutes.</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
                <p className="text-sm uppercase tracking-[0.18em] text-slate-500">Secure login</p>
                <p className="mt-3 text-base font-semibold text-slate-900">Clerk handles authentication.</p>
              </div>
            </div>
          </div>

          <div className="rounded-[32px] border border-slate-200 bg-slate-50 p-8 shadow-sm shadow-slate-200/40">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Sign in panel</p>
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">Fast access</h2>
              </div>
              <div className="flex items-center gap-3 rounded-3xl bg-white px-4 py-3 text-sm text-slate-600 shadow-sm shadow-slate-200/60">
                <Users className="h-5 w-5 text-sky-500" />
                <span>{mode === "signIn" ? "Sign in" : "Sign up"}</span>
              </div>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              {mode === "signIn" ? (
                <SignIn routing="virtual" afterSignInUrl="/dashboard" />
              ) : (
                <SignUp routing="virtual" afterSignUpUrl="/dashboard" />
              )}
            </div>

            <div className="mt-6 rounded-3xl bg-slate-100 p-5 text-sm text-slate-600 shadow-sm shadow-slate-200/60">
              <div className="flex items-center gap-2 font-semibold text-slate-900">
                <ShieldCheck className="h-4 w-4 text-sky-500" />
                <span>Secure by default</span>
              </div>
              <p className="mt-3">Clerk keeps your account secure so you can focus on publishing.</p>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  )
}
