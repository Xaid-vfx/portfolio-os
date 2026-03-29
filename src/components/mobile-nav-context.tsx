'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface MobileNavContextType {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  closeNav: () => void
  toggleNav: () => void
}

const MobileNavContext = createContext<MobileNavContextType>({
  isOpen: false,
  setIsOpen: () => {},
  closeNav: () => {},
  toggleNav: () => {},
})

export function MobileNavProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const closeNav = () => setIsOpen(false)
  const toggleNav = () => setIsOpen(!isOpen)

  return (
    <MobileNavContext.Provider value={{ isOpen, setIsOpen, closeNav, toggleNav }}>
      {children}
    </MobileNavContext.Provider>
  )
}

export function useMobileNav() {
  return useContext(MobileNavContext)
}
