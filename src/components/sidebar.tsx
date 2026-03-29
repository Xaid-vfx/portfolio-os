'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  Home,
  FolderKanban,
  FlaskConical,
  Briefcase,
  GitBranch,
  Search,
  MessageCircle,
  Sparkles,
  FileText,
  Terminal,
  Activity,
  Menu,
  X,
} from 'lucide-react'

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/projects', label: 'Projects', icon: FolderKanban },
  { href: '/experiments', label: 'Experiments', icon: FlaskConical },
  { href: '/experience', label: 'Experience', icon: Briefcase },
  { href: '/graph', label: 'Knowledge Graph', icon: GitBranch },
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

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={cn(
        "fixed md:static inset-y-0 left-0 z-50 w-64 border-r border-border bg-background/95 backdrop-blur-sm h-screen flex flex-col transform transition-transform duration-300 ease-in-out md:transform-none md:border-r md:bg-background/50",
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        <div className="p-4 md:p-6 flex items-center justify-between md:justify-start">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
              <Terminal className="w-4 h-4 md:w-5 md:h-5 text-primary" />
            </div>
            <div>
              <h1 className="font-semibold text-foreground text-sm md:text-base">Mohd Zaid</h1>
              <p className="text-[10px] md:text-xs text-muted-foreground hidden sm:block">Full Stack Developer</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-accent md:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-3 overflow-y-auto">
          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href || 
                (item.href !== '/' && pathname.startsWith(item.href))

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 md:py-2 rounded-lg text-sm transition-colors',
                    isActive
                      ? 'bg-primary/10 text-primary font-medium'
                      : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                  )}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{item.label}</span>
                </Link>
              )
            })}
          </div>
        </nav>

        <div className="p-4 border-t border-border">
          <div className="px-3 py-2 rounded-lg bg-accent/50">
            <p className="text-xs text-muted-foreground mb-1">Quick actions</p>
            <p className="text-xs font-mono text-foreground hidden md:block">
              <kbd className="px-1.5 py-0.5 rounded bg-background text-[10px]">⌘K</kbd>
              {' '}Command menu
            </p>
          </div>
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
    <header className="md:hidden flex items-center gap-3 p-4 border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-30">
      <button 
        onClick={onMenuClick}
        className="p-2 -ml-2 rounded-lg hover:bg-accent"
      >
        <Menu className="w-5 h-5" />
      </button>
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
          <Terminal className="w-4 h-4 text-primary" />
        </div>
        <span className="font-semibold text-sm">Portfolio OS</span>
      </div>
    </header>
  )
}
