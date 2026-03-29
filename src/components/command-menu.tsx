'use client'

import * as React from 'react'
import { CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from 'cmdk'
import { useRouter } from 'next/navigation'
import { Search, MessageCircle, Sparkles, Home, FolderKanban, FlaskConical, GitBranch, Activity, FileText } from 'lucide-react'

const pages = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/projects', label: 'Projects', icon: FolderKanban },
  { href: '/experiments', label: 'Experiments', icon: FlaskConical },
  { href: '/graph', label: 'Knowledge Graph', icon: GitBranch },
  { href: '/search', label: 'Search', icon: Search },
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

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]">
        <div className="relative w-full max-w-lg bg-background rounded-xl border border-border shadow-2xl overflow-hidden animate-in fade-in-0 zoom-in-95 duration-200">
          <CommandInput
            placeholder="Search pages, projects, or ask anything..."
            className="w-full px-4 py-4 text-sm outline-none bg-transparent border-b border-border"
          />
          <CommandList className="max-h-[300px] overflow-y-auto p-2">
            <CommandEmpty className="py-6 text-center text-sm text-muted-foreground">
              No results found.
            </CommandEmpty>
            <CommandGroup heading="Pages">
              {pages.map((page) => {
                const Icon = page.icon
                return (
                  <CommandItem
                    key={page.href}
                    value={page.label}
                    onSelect={() => {
                      router.push(page.href)
                      setOpen(false)
                    }}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-accent data-[selected=true]:bg-accent"
                  >
                    <Icon className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{page.label}</span>
                  </CommandItem>
                )
              })}
            </CommandGroup>
            <CommandGroup heading="Actions">
              <CommandItem
                value="Ask AI about my projects"
                onSelect={() => {
                  router.push('/ask')
                  setOpen(false)
                }}
                className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-accent data-[selected=true]:bg-accent"
              >
                <MessageCircle className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">Ask AI about my work</span>
              </CommandItem>
              <CommandItem
                value="Get project suggestions"
                onSelect={() => {
                  router.push('/suggest')
                  setOpen(false)
                }}
                className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-accent data-[selected=true]:bg-accent"
              >
                <Sparkles className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">Get project suggestions</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </div>
      </div>
    </CommandDialog>
  )
}
