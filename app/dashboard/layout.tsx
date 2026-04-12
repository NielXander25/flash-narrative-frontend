'use client'

import { useState } from 'react'
import { Sidebar } from '@/components/dashboard/sidebar'
import { Command, BarChart3, Settings, FileText } from 'lucide-react'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [collapsed, setCollapsed] = useState(false)

  const navItems = [
    { label: 'Dashboard', icon: BarChart3, href: '/dashboard', active: true },
    { label: 'Reports', icon: FileText, href: '/dashboard/reports', active: false },
    { label: 'API Management', icon: Command, href: '/dashboard/api', active: false },
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
