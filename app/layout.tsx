import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from 'sonner'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Flash Narrative — Enterprise PR Intelligence',
  description: 'Real-time PR Intelligence Platform for Media Monitoring, Reputation Management, and Crisis Detection',
  themeColor: '#D4A017',
  icons: {
    icon: [
      { 
        url: '/logo.png',
        type: 'image/png',
        sizes: '192x192'
      },
      {
        url: '/apple-touch-icon.png',
        type: 'image/png',
        sizes: '180x180'
      }
    ],
    apple: '/apple-touch-icon.png',
    shortcut: '/logo.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.png" type="image/png" sizes="192x192" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="shortcut icon" href="/logo.png" type="image/png" />
      </head>
      <body className="font-sans antialiased">
        {children}
        <Toaster 
          position="top-right"
          richColors
          closeButton
          theme="dark"
          toastOptions={{
            classNames: {
              toast: 'bg-[#12121A] border border-[#1E1E2E] text-[#F8FAFC]',
              title: 'text-sm font-semibold',
              description: 'text-xs text-[#94A3B8]',
              success: 'border-l-4 border-l-[#2ECC8A]',
              error: 'border-l-4 border-l-[#E84242]',
              info: 'border-l-4 border-l-[#5B8FD4]',
            },
          }}
        />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
