import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Bell, LogOut, Moon, Search, Sun, User2 } from 'lucide-react'
import { toast } from 'sonner'

import { useAuth } from '../../hooks/useAuth'
import { useDebouncedValue } from '../../hooks/useDebouncedValue'
import { useTheme } from '../../hooks/useTheme'
import { cn } from '../../utils/cn'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Input } from '../ui/input'

export function AppNavbar({ onOpenMobileNav }: { onOpenMobileNav?: () => void }) {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const { mode, toggle } = useTheme()
  const [q, setQ] = useState('')
  const dq = useDebouncedValue(q, 250)

  const placeholder = useMemo(() => 'Search courses, instructors, topics…', [])

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur">
      <div className="container flex h-16 items-center gap-3">
        <button
          className={cn('inline-flex h-10 w-10 items-center justify-center rounded-md border bg-background md:hidden')}
          onClick={onOpenMobileNav}
          aria-label="Open navigation"
        >
          <span className="h-4 w-4 rounded-sm border bg-muted" />
        </button>

        <Link to="/app/dashboard" className="hidden items-center gap-2 md:flex">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-accent text-accent-foreground">
            <span className="text-sm font-semibold">E</span>
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold tracking-tight">EdTech</div>
            <div className="text-xs text-muted-foreground">Learning platform</div>
          </div>
        </Link>

        <div className="relative ml-0 flex-1 md:ml-4 md:max-w-xl">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={placeholder}
            className="pl-9"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && dq.trim()) navigate(`/app/courses?q=${encodeURIComponent(dq.trim())}`)
            }}
          />
        </div>

        <div className="ml-auto flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => toast('Notifications are mocked in this UI.')}
            aria-label="Notifications"
          >
            <Bell />
          </Button>

          <Button variant="ghost" size="icon" onClick={toggle} aria-label="Toggle theme">
            {mode === 'dark' ? <Sun /> : <Moon />}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 rounded-full border bg-background p-1 pl-1.5 pr-2 transition hover:bg-accent">
                <Avatar className="h-7 w-7">
                  <AvatarImage src={user?.avatarUrl} alt={user?.name ?? 'User'} />
                  <AvatarFallback>{(user?.name ?? 'U').slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <span className="hidden text-sm font-medium md:inline">{user?.name?.split(' ')[0] ?? 'User'}</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="text-xs">
                Signed in as
                <div className="mt-1 truncate text-sm font-medium text-foreground">{user?.email}</div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/app/profile')}>
                <User2 className="h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/app/settings')}>
                <span className="h-4 w-4 rounded-sm border bg-muted" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  logout()
                  navigate('/login', { replace: true })
                }}
              >
                <LogOut className="h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

