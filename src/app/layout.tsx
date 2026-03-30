import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { MobileNavProvider } from '@/components/mobile-nav-context'
import { AppShell } from '@/components/app-shell'
import { CommandMenu } from '@/components/command-menu'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: 'Mohd Zaid',
  description: 'Systems engineer building AI-native tooling, distributed backends, and developer infrastructure.',
  icons: {
    icon: '/favicon.ico',
  },
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
