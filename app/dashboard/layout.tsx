'use client'

import { useState } from 'react'
import { Sidebar } from '@/components/dashboard/sidebar'
import { Command, BarChart3, Settings, FileText, Compass, Menu, X } from 'lucide-react'

const NAV_ICONS = {
  Compass,
  BarChart3,
  FileText,
  Command,
  Settings,
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const navItems = [
    { label: 'Command Center', icon: NAV_ICONS.Compass, href: '/dashboard/command-center' },
    { label: 'Intelligence Dashboard', icon: NAV_ICONS.BarChart3, href: '/dashboard' },
    { label: 'Reports', icon: NAV_ICONS.FileText, href: '/dashboard/reports' },
    { label: 'API & Integrations', icon: NAV_ICONS.Command, href: '/dashboard/api' },
    { label: 'Settings', icon: NAV_ICONS.Settings, href: '/dashboard/settings' },
  ]

  return (
    <div className="flex h-screen bg-[#0A0A0F]">
      <div className={`hidden lg:flex fixed lg:relative inset-y-0 left-0 w-64 bg-[#12121A] z-40 transform transition-transform duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <Sidebar items={navItems} onNavigate={() => setSidebarOpen(false)} />
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          role="presentation"
          aria-hidden="true"
        />
      )}

      <div className="flex-1 flex flex-col overflow-hidden w-full">
        <div className="lg:hidden flex items-center justify-between bg-[#12121A] border-b border-[#1E1E2E] px-4 py-3 sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-[#1E1E2E] rounded-lg transition-colors"
            aria-label={sidebarOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={sidebarOpen}
          >
            {sidebarOpen ? (
              <X className="w-6 h-6 text-[#D4A017]" />
            ) : (
              <Menu className="w-6 h-6 text-[#D4A017]" />
            )}
          </button>
          <span className="text-[#F8FAFC] font-semibold">FLASH NARRATIVE</span>
          <div className="w-10" />
        </div>

        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
