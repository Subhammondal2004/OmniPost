import { motion } from "framer-motion"
import { Zap, Calendar, Shield, Users, ArrowRight, Menu, X } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card"

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.12
    }
  }
}

const features = [
  { icon: Zap, title: "Multi-platform posting", description: "Publish to all your channels from one elegant dashboard." },
  { icon: Calendar, title: "Smart scheduling", description: "Plan posts in seconds with clear calendar visibility." },
  { icon: Shield, title: "Secure connections", description: "Connect accounts safely with trusted authentication." },
  { icon: Users, title: "Team collaboration", description: "Work together without messy workflows." },
]

function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-slate-950/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/20 flex items-center justify-center">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-semibold tracking-tight">AutoPost</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-slate-300 hover:text-white transition">Features</a>
            <Button
              variant="outline"
              size="sm"
              className="border-white/10 text-white hover:border-white"
              onClick={() => navigate('/sign-in')}
            >
              Sign In
            </Button>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden inline-flex items-center justify-center rounded-full border border-white/10 p-2 text-slate-300 hover:border-white hover:text-white"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="md:hidden border-t border-white/10 bg-slate-950/95"
          >
            <div className="space-y-3 px-4 py-4">
              <a href="#features" className="block rounded-2xl px-4 py-3 text-slate-300 hover:bg-white/5 hover:text-white transition">Features</a>
              <Button className="w-full" onClick={() => navigate('/sign-in')}>Sign In</Button>
            </div>
          </motion.div>
        )}
      </nav>

      <main className="pt-24">
        <section className="relative overflow-hidden pb-20 pt-16">
          <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />
          <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl" />

          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <motion.div initial="initial" animate="animate" variants={staggerContainer}>
                <motion.p variants={fadeInUp} className="text-sm uppercase tracking-[0.4em] text-indigo-400/90">
                  Modern social posting
                </motion.p>
                <motion.h1 variants={fadeInUp} className="mt-6 text-5xl font-semibold tracking-tight text-white lg:text-6xl">
                  Beautiful scheduling for modern teams.
                </motion.h1>
                <motion.p variants={fadeInUp} className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
                  A polished dashboard with clean layouts, subtle motion, and fast publishing tools for every social platform.
                </motion.p>

                <motion.div variants={fadeInUp} className="mt-10 flex flex-col gap-4 sm:flex-row">
                  <Button size="xl" onClick={() => navigate('/sign-in')}>
                    Sign In
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                  <Button size="xl" variant="outline" className="text-white border-white/20 hover:border-white" onClick={() => navigate('/sign-up')}>
                    Sign Up
                  </Button>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.15 }}
                className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_40px_120px_-60px_rgba(15,23,42,0.5)] backdrop-blur-xl"
              >
                <div className="mb-8 flex items-center justify-between rounded-3xl bg-slate-900/80 p-5">
                  <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Live preview</p>
                    <p className="mt-2 text-lg font-semibold text-white">Quick insight</p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/20">
                    <Zap className="h-5 w-5 text-white" />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/90 p-6">
                    <p className="text-sm text-slate-400">Total posts</p>
                    <p className="mt-4 text-3xl font-semibold text-white">1,234</p>
                  </div>
                  <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/90 p-6">
                    <p className="text-sm text-slate-400">Next scheduled</p>
                    <p className="mt-4 text-3xl font-semibold text-white">2h</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="features" className="border-t border-white/10 bg-slate-950/95 py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-sm uppercase tracking-[0.35em] text-indigo-400">Features</p>
              <h2 className="mt-4 text-4xl font-semibold text-white">Everything you need, nothing extra.</h2>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-400">
                A sleek, modern workflow for publishing across social channels with confidence and ease.
              </p>
            </div>

            <div className="mt-12 grid gap-5 sm:grid-cols-2">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                >
                  <Card className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-[0_30px_80px_-50px_rgba(15,23,42,0.45)]">
                    <CardHeader className="p-0">
                      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/20">
                        <feature.icon className="h-6 w-6" />
                      </div>
                      <CardTitle className="text-xl text-white">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 pt-4">
                      <CardDescription className="text-slate-400">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-sm uppercase tracking-[0.35em] text-indigo-400">Ready to get started?</p>
              <h2 className="mt-4 text-4xl font-semibold text-white">Fast onboarding, elegant experience.</h2>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-400">
                Sign in now to explore your dashboard, schedule posts, and scale your social media cadence with style.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button size="xl" onClick={() => navigate('/sign-in')}>
                  Sign In
                  <ArrowRight className="w-5 h-5" />
                </Button>
                <Button size="xl" variant="outline" className="text-white border-white/20 hover:border-white" onClick={() => navigate('/sign-up')}>
                  Sign Up
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-slate-950/95 py-10 text-slate-400">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 sm:px-6 lg:px-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-lg font-semibold text-white">AutoPost</p>
            <p className="mt-1 text-sm text-slate-500">A polished social media workflow for modern teams.</p>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-slate-500">
            <a href="#features" className="hover:text-white transition">Features</a>
            <a href="#" className="hover:text-white transition">Privacy</a>
            <a href="#" className="hover:text-white transition">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
