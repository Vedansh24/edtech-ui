import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

import { AppNavbar } from '../components/navbar/AppNavbar'
import { AppSidebar } from '../components/sidebar/AppSidebar'
import { cn } from '../utils/cn'
import { Button } from '../components/ui/button'

export function AppLayout() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <AppNavbar onOpenMobileNav={() => setMobileNavOpen(true)} />

      <div className="mx-auto grid max-w-[1400px] grid-cols-1 md:grid-cols-[260px_1fr]">
        <div className="sticky top-16 hidden h-[calc(100vh-4rem)] border-r md:block">
          <AppSidebar />
        </div>

        <main className="min-h-[calc(100vh-4rem)]">
          <AnimatePresence mode="wait">
            <Outlet />
          </AnimatePresence>
        </main>
      </div>

      {/* Mobile drawer */}
      {mobileNavOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <button className="absolute inset-0 bg-black/40" onClick={() => setMobileNavOpen(false)} aria-label="Close navigation overlay" />
          <div className={cn('absolute left-0 top-0 h-full w-[86%] max-w-xs border-r bg-background shadow-soft')}>
            <div className="flex items-center justify-between border-b px-3 py-3">
              <div className="text-sm font-semibold">Navigation</div>
              <Button variant="ghost" size="icon" onClick={() => setMobileNavOpen(false)} aria-label="Close navigation">
                <X />
              </Button>
            </div>
            <AppSidebar onNavigate={() => setMobileNavOpen(false)} />
          </div>
        </div>
      )}
    </div>
  )
}

