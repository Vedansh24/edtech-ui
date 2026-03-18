import { NavLink } from 'react-router-dom'
import { BookOpen, LayoutDashboard, MessagesSquare, Settings, User } from 'lucide-react'

import { cn } from '../../utils/cn'

const nav = [
  { to: '/app/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/app/courses', label: 'Courses', icon: BookOpen },
  { to: '/app/community', label: 'Community', icon: MessagesSquare },
  { to: '/app/profile', label: 'Profile', icon: User },
  { to: '/app/settings', label: 'Settings', icon: Settings },
]

export function AppSidebar({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <aside className="flex h-full flex-col gap-2 px-2 py-4">
      <div className="px-3 pb-2">
        <div className="text-sm font-semibold tracking-tight">EdTech</div>
        <div className="text-xs text-muted-foreground">Learn. Build. Grow.</div>
      </div>

      <nav className="space-y-1">
        {nav.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onNavigate}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-accent hover:text-accent-foreground',
                  isActive && 'bg-accent text-accent-foreground',
                )
              }
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </NavLink>
          )
        })}
      </nav>

      <div className="mt-auto px-3 pt-2 text-xs text-muted-foreground">
        <div className="rounded-lg border bg-background/60 p-3">
          <div className="font-medium text-foreground">Tip</div>
          <div className="mt-1 leading-relaxed">
            Use search to quickly jump to courses and lessons.
          </div>
        </div>
      </div>
    </aside>
  )
}

