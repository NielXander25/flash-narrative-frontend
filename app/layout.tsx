
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });
export const metadata: Metadata = {
  icons: {
    icon: [
      { url: '/logo.png', type: 'image/png', sizes: '192x192' },  ✅
      { url: '/favicon.ico', type: 'image/x-icon' },
    ],
    apple: '/logo.png',  ✅
    shortcut: '/logo.png',  ✅
  },
}
