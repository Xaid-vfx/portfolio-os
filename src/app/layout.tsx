import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { MobileNavProvider } from '@/components/mobile-nav-context'
import { AppShell } from '@/components/app-shell'
import { CommandMenu } from '@/components/command-menu'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: 'Mohd Zaid | Portfolio OS',
  description: 'A self-evolving personal operating system for software engineering',
  icons: {
    icon: '/favicon.ico',
  },
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-background antialiased">
        <MobileNavProvider>
          <AppShell>{children}</AppShell>
        </MobileNavProvider>
        <CommandMenu />
      </body>
    </html>
  )
}
