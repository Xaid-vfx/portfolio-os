'use client'

import * as React from 'react'
import { CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from 'cmdk'
import { useRouter } from 'next/navigation'
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
} from 'lucide-react'

const pages = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/projects', label: 'Projects', icon: FolderOpen },
  { href: '/experiments', label: 'Experiments', icon: FlaskConical },
  { href: '/experience', label: 'Experience', icon: Briefcase },
  { href: '/graph', label: 'Knowledge Graph', icon: GitBranch },
  { href: '/search', label: 'Semantic Search', icon: Search },
  { href: '/ask', label: 'Ask AI', icon: MessageCircle },
  { href: '/suggest', label: 'Suggestions', icon: Sparkles },
  { href: '/now', label: 'Now', icon: Activity },
  { href: '/resume', label: 'Resume', icon: FileText },
]

export function CommandMenu() {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const navigate = (href: string) => {
    router.push(href)
    setOpen(false)
  }

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] px-4">
        <div
          className="w-full max-w-md bg-background rounded-lg border border-border shadow-xl overflow-hidden"
          style={{ animation: 'cmdIn 0.15s ease-out' }}
        >
          <CommandInput
            placeholder="Go to page..."
            className="w-full px-4 py-3 text-sm outline-none bg-transparent border-b border-border placeholder:text-muted-foreground"
          />
          <CommandList className="py-1.5 max-h-80 overflow-y-auto">
            <CommandEmpty className="py-8 text-center text-sm text-muted-foreground">
              No results.
            </CommandEmpty>
            <CommandGroup heading="Pages">
              {pages.map((page) => {
                const Icon = page.icon
                return (
                  <CommandItem
                    key={page.href}
                    value={page.label}
                    onSelect={() => navigate(page.href)}
                    className="flex items-center gap-2.5 px-3 py-1.5 mx-1.5 rounded text-sm cursor-pointer text-foreground data-[selected=true]:bg-accent"
                  >
                    <Icon className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                    <span>{page.label}</span>
                  </CommandItem>
                )
              })}
            </CommandGroup>
            <CommandGroup heading="AI">
              <CommandItem
                value="Ask AI about my work"
                onSelect={() => navigate('/ask')}
                className="flex items-center gap-2.5 px-3 py-1.5 mx-1.5 rounded text-sm cursor-pointer text-foreground data-[selected=true]:bg-accent"
              >
                <MessageCircle className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                <span>Ask AI about my work</span>
              </CommandItem>
              <CommandItem
                value="Get project suggestions"
                onSelect={() => navigate('/suggest')}
                className="flex items-center gap-2.5 px-3 py-1.5 mx-1.5 rounded text-sm cursor-pointer text-foreground data-[selected=true]:bg-accent"
              >
                <Sparkles className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                <span>Get project suggestions</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
          <div className="px-4 py-2 border-t border-border flex items-center gap-4 text-xs text-muted-foreground">
            <span><kbd className="font-mono">↑↓</kbd> navigate</span>
            <span><kbd className="font-mono">↵</kbd> select</span>
            <span><kbd className="font-mono">esc</kbd> close</span>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes cmdIn {
          from { opacity: 0; transform: scale(0.97) translateY(-4px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </CommandDialog>
  )
}
