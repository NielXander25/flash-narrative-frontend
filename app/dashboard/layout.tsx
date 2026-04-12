'use client'

import { useState } from 'react'
import { Sidebar } from '@/components/dashboard/sidebar'
import { Command, BarChart3, Settings, FileText, Compass } from 'lucide-react'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [collapsed, setCollapsed] = useState(false)

  const navItems = [
    { label: 'Command Center', icon: Compass, href: '/dashboard/command-center', active: false },
    { label: 'Intelligence Dashboard', icon: BarChart3, href: '/dashboard', active: false },
    { label: 'Reports', icon: FileText, href: '/dashboard/reports', active: false },
    { label: 'API & Integrations', icon: Command, href: '/dashboard/api', active: false },
    { label: 'Settings', icon: Settings, href: '/dashboard/settings', active: false },
  ]

  return (
    <div className="flex h-screen bg-[#0A0A0F]">
      <Sidebar collapsed={collapsed} items={navItems} />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}
