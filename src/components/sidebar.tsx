'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { cn } from '@/lib/utils'
import {
  Home,
  FolderOpen,
  FlaskConical,
  Briefcase,
  GitBranch,
  Search,
  MessageCircle,
  Sparkles,
  FileText,
  Activity,
  Menu,
  X,
  BookOpen,
  Sun,
  Moon,
} from 'lucide-react'

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/projects', label: 'Projects', icon: FolderOpen },
  { href: '/blog', label: 'Blog', icon: BookOpen },
  { href: '/experiments', label: 'Experiments', icon: FlaskConical },
  { href: '/experience', label: 'Experience', icon: Briefcase },
  { href: '/graph', label: 'Graph', icon: GitBranch },
  { href: '/search', label: 'Search', icon: Search },
  { href: '/ask', label: 'Ask AI', icon: MessageCircle },
  { href: '/suggest', label: 'Suggestions', icon: Sparkles },
  { href: '/now', label: 'Now', icon: Activity },
  { href: '/resume', label: 'Resume', icon: FileText },
]

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname()
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          'fixed md:static inset-y-0 left-0 z-50 w-56 border-r border-border bg-background h-screen flex flex-col transform transition-transform duration-200 ease-in-out md:transform-none',
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        )}
      >
        {/* Header */}
        <div className="h-12 px-4 flex items-center justify-between border-b border-border">
          <div className="flex items-center gap-2.5">
            <div className="w-5 h-5 rounded bg-foreground flex items-center justify-center">
              <span className="text-background text-[10px] font-bold leading-none">Z</span>
            </div>
            <span className="text-sm font-medium">Mohd Zaid</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-accent md:hidden text-muted-foreground"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-2 px-2 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive =
              pathname === item.href ||
              (item.href !== '/' && pathname.startsWith(item.href))

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  'flex items-center gap-2.5 px-2 py-1.5 rounded text-sm transition-colors mb-0.5',
                  isActive
                    ? 'bg-accent text-foreground font-medium'
                    : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                )}
              >
                <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="h-10 px-4 flex items-center justify-between border-t border-border">
          <p className="text-xs text-muted-foreground">
            <kbd className="font-mono">⌘K</kbd>
            <span className="ml-1.5">to search</span>
          </p>
          <button
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
            className="p-1.5 rounded hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Toggle theme"
          >
            {resolvedTheme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          </button>
        </div>
      </aside>
    </>
  )
}

interface MobileHeaderProps {
  onMenuClick: () => void
}

export function MobileHeader({ onMenuClick }: MobileHeaderProps) {
  return (
    <header className="md:hidden h-12 flex items-center gap-3 px-4 border-b border-border bg-background sticky top-0 z-30">
      <button
        onClick={onMenuClick}
        className="p-1.5 -ml-1.5 rounded hover:bg-accent text-muted-foreground"
      >
        <Menu className="w-4 h-4" />
      </button>
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 rounded bg-foreground flex items-center justify-center">
          <span className="text-background text-[10px] font-bold leading-none">Z</span>
        </div>
        <span className="text-sm font-medium">Mohd Zaid</span>
      </div>
    </header>
  )
}
