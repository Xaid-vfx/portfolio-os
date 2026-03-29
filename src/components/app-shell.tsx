'use client'

import { Sidebar, MobileHeader } from '@/components/sidebar'
import { useMobileNav } from '@/components/mobile-nav-context'

export function AppShell({ children }: { children: React.ReactNode }) {
  const { isOpen, setIsOpen, closeNav } = useMobileNav()

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={isOpen} onClose={closeNav} />
      <main className="flex-1 overflow-y-auto">
        <MobileHeader onMenuClick={() => setIsOpen(true)} />
        {children}
      </main>
    </div>
  )
}
