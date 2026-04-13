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
        url: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180"><style>@media (prefers-color-scheme: light) { .bg { fill: %23D4A017; } .fg { fill: %230A0A0F; } } @media (prefers-color-scheme: dark) { .bg { fill: %23D4A017; } .fg { fill: %230A0A0F; } }</style><rect class="bg" width="180" height="180" rx="90"/><g clip-path="url(%23clip0)"><g style="transform: translate(45px, 45px) scale(0.75); transform-origin: center"><path class="fg" d="M101.141 53H136.632C151.023 53 162.689 64.6662 162.689 79.0573V112.904H148.112V79.0573C148.112 78.7105 148.098 78.3662 148.072 78.0251L112.581 112.898C112.701 112.902 112.821 112.904 112.941 112.904H78.4501C64.0591 112.904 52.393 101.238 52.393 86.8469V52.974H66.9699V86.8469C66.9699 87.1937 66.9839 87.538 67.0099 87.8791L102.501 53Z"/><path class="fg" d="M65.2926 124.136L14 66.7372H34.6355L64.7495 100.436V66.7372H80.1365V118.47C80.1365 126.278 70.4953 129.958 65.2926 124.136Z" /></g></g><defs><clipPath id="clip0"><rect width="180" height="180" rx="90" fill="white" /></clipPath></defs></svg>',
        type: 'image/svg+xml',
        sizes: 'any'
      },
      {
        url: '/favicon.png',
        type: 'image/png',
        sizes: '32x32'
      }
    ],
    apple: {
      url: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180"><style>@media (prefers-color-scheme: light) { .bg { fill: %23D4A017; } .fg { fill: %230A0A0F; } } @media (prefers-color-scheme: dark) { .bg { fill: %23D4A017; } .fg { fill: %230A0A0F; } }</style><rect class="bg" width="180" height="180" rx="90"/><g clip-path="url(%23clip0)"><g style="transform: translate(45px, 45px) scale(0.75); transform-origin: center"><path class="fg" d="M101.141 53H136.632C151.023 53 162.689 64.6662 162.689 79.0573V112.904H148.112V79.0573C148.112 78.7105 148.098 78.3662 148.072 78.0251L112.581 112.898C112.701 112.902 112.821 112.904 112.941 112.904H78.4501C64.0591 112.904 52.393 101.238 52.393 86.8469V52.974H66.9699V86.8469C66.9699 87.1937 66.9839 87.538 67.0099 87.8791L102.501 53Z"/><path class="fg" d="M65.2926 124.136L14 66.7372H34.6355L64.7495 100.436V66.7372H80.1365V118.47C80.1365 126.278 70.4953 129.958 65.2926 124.136Z" /></g></g><defs><clipPath id="clip0"><rect width="180" height="180" rx="90" fill="white" /></clipPath></defs></svg>',
      type: 'image/svg+xml',
    },
    shortcut: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180"><style>@media (prefers-color-scheme: light) { .bg { fill: %23D4A017; } .fg { fill: %230A0A0F; } } @media (prefers-color-scheme: dark) { .bg { fill: %23D4A017; } .fg { fill: %230A0A0F; } }</style><rect class="bg" width="180" height="180" rx="90"/><g clip-path="url(%23clip0)"><g style="transform: translate(45px, 45px) scale(0.75); transform-origin: center"><path class="fg" d="M101.141 53H136.632C151.023 53 162.689 64.6662 162.689 79.0573V112.904H148.112V79.0573C148.112 78.7105 148.098 78.3662 148.072 78.0251L112.581 112.898C112.701 112.902 112.821 112.904 112.941 112.904H78.4501C64.0591 112.904 52.393 101.238 52.393 86.8469V52.974H66.9699V86.8469C66.9699 87.1937 66.9839 87.538 67.0099 87.8791L102.501 53Z"/><path class="fg" d="M65.2926 124.136L14 66.7372H34.6355L64.7495 100.436V66.7372H80.1365V118.47C80.1365 126.278 70.4953 129.958 65.2926 124.136Z" /></g></g><defs><clipPath id="clip0"><rect width="180" height="180" rx="90" fill="white" /></clipPath></defs></svg>',
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
        <link 
          rel="icon" 
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 180 180'><style>@media (prefers-color-scheme: light) { .bg { fill: %23D4A017; } .fg { fill: %230A0A0F; } } @media (prefers-color-scheme: dark) { .bg { fill: %23D4A017; } .fg { fill: %230A0A0F; } }</style><rect class='bg' width='180' height='180' rx='90'/><g clip-path='url(%23clip0)'><g style='transform: translate(45px, 45px) scale(0.75); transform-origin: center'><path class='fg' d='M101.141 53H136.632C151.023 53 162.689 64.6662 162.689 79.0573V112.904H148.112V79.0573C148.112 78.7105 148.098 78.3662 148.072 78.0251L112.581 112.898C112.701 112.902 112.821 112.904 112.941 112.904H78.4501C64.0591 112.904 52.393 101.238 52.393 86.8469V52.974H66.9699V86.8469C66.9699 87.1937 66.9839 87.538 67.0099 87.8791L102.501 53Z'/><path class='fg' d='M65.2926 124.136L14 66.7372H34.6355L64.7495 100.436V66.7372H80.1365V118.47C80.1365 126.278 70.4953 129.958 65.2926 124.136Z' /></g></g><defs><clipPath id='clip0'><rect width='180' height='180' rx='90' fill='white' /></clipPath></defs></svg>" 
          type="image/svg+xml" 
          sizes="any" 
        />
        <link 
          rel="apple-touch-icon" 
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 180 180'><style>@media (prefers-color-scheme: light) { .bg { fill: %23D4A017; } .fg { fill: %230A0A0F; } } @media (prefers-color-scheme: dark) { .bg { fill: %23D4A017; } .fg { fill: %230A0A0F; } }</style><rect class='bg' width='180' height='180' rx='90'/><g clip-path='url(%23clip0)'><g style='transform: translate(45px, 45px) scale(0.75); transform-origin: center'><path class='fg' d='M101.141 53H136.632C151.023 53 162.689 64.6662 162.689 79.0573V112.904H148.112V79.0573C148.112 78.7105 148.098 78.3662 148.072 78.0251L112.581 112.898C112.701 112.902 112.821 112.904 112.941 112.904H78.4501C64.0591 112.904 52.393 101.238 52.393 86.8469V52.974H66.9699V86.8469C66.9699 87.1937 66.9839 87.538 67.0099 87.8791L102.501 53Z'/><path class='fg' d='M65.2926 124.136L14 66.7372H34.6355L64.7495 100.436V66.7372H80.1365V118.47C80.1365 126.278 70.4953 129.958 65.2926 124.136Z' /></g></g><defs><clipPath id='clip0'><rect width='180' height='180' rx='90' fill='white' /></clipPath></defs></svg>" 
        />
      </head>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
