import { Link, Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'
import { GraduationCap, Moon, Sun } from 'lucide-react'

import { useTheme } from '../hooks/useTheme'
import { Button } from '../components/ui/button'

export function AuthLayout() {
  const { mode, toggle } = useTheme()

  return (
    <div className="min-h-screen bg-background">
      <header className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-accent text-accent-foreground">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold tracking-tight">EdTech</div>
            <div className="text-xs text-muted-foreground">Learn. Build. Grow.</div>
          </div>
        </Link>

        <Button variant="ghost" size="icon" onClick={toggle} aria-label="Toggle theme">
          {mode === 'dark' ? <Sun /> : <Moon />}
        </Button>
      </header>

      <main className="container grid min-h-[calc(100vh-4rem)] items-center py-10 md:grid-cols-2 md:gap-10">
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="hidden rounded-2xl border bg-card p-8 shadow-soft md:block"
        >
          <div className="space-y-4">
            <div className="text-2xl font-semibold tracking-tight">A modern EdTech experience</div>
            <p className="text-sm text-muted-foreground">
              Clean course discovery, focused learning, community feed, and a professional dashboard — all wired with mock data and ready for real APIs.
            </p>
            <div className="grid gap-3 pt-2">
              <div className="rounded-xl border bg-background/60 p-4">
                <div className="text-sm font-medium">Course-first UX</div>
                <div className="text-sm text-muted-foreground">Search, filters, syllabus, reviews, and a learning player.</div>
              </div>
              <div className="rounded-xl border bg-background/60 p-4">
                <div className="text-sm font-medium">Community</div>
                <div className="text-sm text-muted-foreground">Post, like, and share — LinkedIn-style feed.</div>
              </div>
            </div>
          </div>
        </motion.section>

        <section className="mx-auto w-full max-w-md">
          <Outlet />
          <p className="mt-6 text-center text-xs text-muted-foreground">
            By continuing you agree to our <span className="text-foreground">Terms</span> and <span className="text-foreground">Privacy</span>.
          </p>
        </section>
      </main>
    </div>
  )
}

