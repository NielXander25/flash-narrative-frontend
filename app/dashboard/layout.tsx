'use client'

import { useState } from 'react'
import { Sidebar } from '@/components/dashboard/sidebar'
import { Command, BarChart3, Settings, FileText, Compass, Menu, X } from 'lucide-react'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const navItems = [
    { label: 'Command Center', icon: Compass, href: '/dashboard/command-center', active: false },
    { label: 'Intelligence Dashboard', icon: BarChart3, href: '/dashboard', active: false },
    { label: 'Reports', icon: FileText, href: '/dashboard/reports', active: false },
    { label: 'API & Integrations', icon: Command, href: '/dashboard/api', active: false },
    { label: 'Settings', icon: Settings, href: '/dashboard/settings', active: false },
  ]

  return (
    <div className="flex h-screen bg-[#0A0A0F]">
      <div className={`fixed inset-y-0 left-0 w-64 bg-[#12121A] z-40 transform transition-transform duration-300 lg:relative lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <Sidebar items={navItems} onNavigate={() => setSidebarOpen(false)} />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-[#D4A017] text-[#0A0A0F] rounded-lg"
          aria-label="Toggle menu"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
