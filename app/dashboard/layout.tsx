'use client'

import { useState, useCallback } from 'react'
import { Sidebar } from '@/components/dashboard/sidebar'
import { Command, BarChart3, Settings, FileText, Compass, Menu, X, LucideIcon } from 'lucide-react'

interface NavItem {
  label: string
  icon: LucideIcon
  href: string
}

const navItems: NavItem[] = [
  { label: 'Command Center', icon: Compass, href: '/dashboard/command-center' },
  { label: 'Intelligence Dashboard', icon: BarChart3, href: '/dashboard' },
  { label: 'Reports', icon: FileText, href: '/dashboard/reports' },
  { label: 'API & Integrations', icon: Command, href: '/dashboard/api' },
  { label: 'Settings', icon: Settings, href: '/dashboard/settings' },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)

  const handleToggleSidebar = useCallback(() => {
    setSidebarOpen(prev => !prev)
  }, [])

  const handleCloseSidebar = useCallback(() => {
    setSidebarOpen(false)
  }, [])

  return (
    <div className="flex h-screen bg-[#0A0A0F]">
      {/* Desktop Sidebar - Hidden on mobile, visible on lg+ */}
      <div className="hidden lg:flex lg:w-64 flex-shrink-0 fixed inset-y-0 left-0 z-40 bg-[#12121A] border-r border-[#1E1E2E]">
        <Sidebar items={navItems} onNavigate={handleCloseSidebar} />
      </div>

      {/* Mobile Sidebar Overlay - Slides in from left on mobile */}
      {sidebarOpen && (
        <>
          {/* Overlay backdrop */}
          <div
            className="fixed inset-0 bg-black/60 z-40 lg:hidden"
            onClick={handleCloseSidebar}
            role="presentation"
            aria-hidden="true"
          />
          {/* Mobile sidebar panel */}
          <div className="fixed inset-y-0 left-0 w-64 bg-[#12121A] border-r border-[#1E1E2E] z-50 lg:hidden">
            <Sidebar items={navItems} onNavigate={handleCloseSidebar} />
          </div>
        </>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden w-full lg:ml-64">
        {/* Mobile Header with Hamburger Button */}
        <div className="lg:hidden flex items-center justify-between bg-[#12121A] border-b border-[#1E1E2E] px-4 py-3 sticky top-0 z-20">
          <button
            onClick={handleToggleSidebar}
            className="p-2 hover:bg-[#1E1E2E] rounded-lg transition-colors active:scale-95"
            aria-label={sidebarOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={sidebarOpen}
            aria-controls="mobile-sidebar"
          >
            {sidebarOpen ? (
              <X className="w-6 h-6 text-[#D4A017]" />
            ) : (
              <Menu className="w-6 h-6 text-[#D4A017]" />
            )}
          </button>
          <span className="text-[#F8FAFC] font-semibold">FLASH NARRATIVE</span>
          <div className="w-10" /> {/* Spacer for centering */}
        </div>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
