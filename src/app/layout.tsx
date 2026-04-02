import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { MobileNavProvider } from '@/components/mobile-nav-context'
import { AppShell } from '@/components/app-shell'
import { CommandMenu } from '@/components/command-menu'
import { ThemeProvider } from '@/components/theme-provider'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: 'Zaid',
  description: 'Founder, Builder and Engineer',
  authors: [{ name: 'Zaid', url: 'https://www.okzaid.com' }],
  creator: '@okzaid',
  keywords: ['Zaid', 'Startup', 'Engineer', 'Full Stack', 'Founder', 'Clash of Clans', 'Tech', 'Developer', 'Portfolio', 'Product Builder'],
  robots: 'index, follow',
  alternates: {
    canonical: 'https://www.okzaid.com',
  },
  openGraph: {
    title: 'Zaid',
    description: 'Founder, Builder and Engineer',
    url: 'https://www.okzaid.com',
    siteName: 'Zaid Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@okzaid',
    creator: '@okzaid',
    title: 'Zaid',
    description: 'Founder, Builder and Engineer',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="min-h-screen bg-background antialiased">
        <ThemeProvider>
          <MobileNavProvider>
            <AppShell>{children}</AppShell>
          </MobileNavProvider>
          <CommandMenu />
        </ThemeProvider>
      </body>
    </html>
  )
}
