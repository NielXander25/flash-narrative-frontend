import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
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
        url: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192"><defs><linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%23D4A017;stop-opacity:1" /><stop offset="100%" style="stop-color:%23B8860B;stop-opacity:1" /></linearGradient></defs><rect fill="url(%23grad1)" width="192" height="192" rx="48"/><circle cx="96" cy="96" r="60" fill="%230A0A0F"/><text x="96" y="120" font-size="90" font-weight="bold" text-anchor="middle" fill="%23D4A017" font-family="Arial, sans-serif" letter-spacing="2">F</text></svg>',
        type: 'image/svg+xml',
        sizes: 'any'
      },
    ],
    apple: [
      { 
        url: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192"><defs><linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%23D4A017;stop-opacity:1" /><stop offset="100%" style="stop-color:%23B8860B;stop-opacity:1" /></linearGradient></defs><rect fill="url(%23grad1)" width="192" height="192" rx="48"/><circle cx="96" cy="96" r="60" fill="%230A0A0F"/><text x="96" y="120" font-size="90" font-weight="bold" text-anchor="middle" fill="%23D4A017" font-family="Arial, sans-serif" letter-spacing="2">F</text></svg>',
        type: 'image/svg+xml',
        sizes: '192x192'
      }
    ],
    shortcut: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192"><defs><linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%23D4A017;stop-opacity:1" /><stop offset="100%" style="stop-color:%23B8860B;stop-opacity:1" /></linearGradient></defs><rect fill="url(%23grad1)" width="192" height="192" rx="48"/><circle cx="96" cy="96" r="60" fill="%230A0A0F"/><text x="96" y="120" font-size="90" font-weight="bold" text-anchor="middle" fill="%23D4A017" font-family="Arial, sans-serif" letter-spacing="2">F</text></svg>',
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
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 192 192'><defs><linearGradient id='grad1' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' style='stop-color:%23D4A017;stop-opacity:1' /><stop offset='100%' style='stop-color:%23B8860B;stop-opacity:1' /></linearGradient></defs><rect fill='url(%23grad1)' width='192' height='192' rx='48'/><circle cx='96' cy='96' r='60' fill='%230A0A0F'/><text x='96' y='120' font-size='90' font-weight='bold' text-anchor='middle' fill='%23D4A017' font-family='Arial, sans-serif' letter-spacing='2'>F</text></svg>" type="image/svg+xml" sizes="192x192" />
        <link rel="apple-touch-icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 192 192'><defs><linearGradient id='grad1' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' style='stop-color:%23D4A017;stop-opacity:1' /><stop offset='100%' style='stop-color:%23B8860B;stop-opacity:1' /></linearGradient></defs><rect fill='url(%23grad1)' width='192' height='192' rx='48'/><circle cx='96' cy='96' r='60' fill='%230A0A0F'/><text x='96' y='120' font-size='90' font-weight='bold' text-anchor='middle' fill='%23D4A017' font-family='Arial, sans-serif' letter-spacing='2'>F</text></svg>" />
      </head>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
