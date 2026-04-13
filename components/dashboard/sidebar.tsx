'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { LucideIcon } from 'lucide-react'

interface NavItem {
  label: string
  icon: LucideIcon
  href: string
}

interface SidebarProps {
  items: NavItem[]
  onNavigate?: () => void
}

export function Sidebar({ items, onNavigate }: SidebarProps) {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-[#12121A] border-r border-[#1E1E2E] flex flex-col p-6 h-screen overflow-y-auto">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-[#D4A017] to-[#B8860B]">
          <Image 
            src="/logo.png" 
            alt="Flash Narrative" 
            width={40} 
            height={40}
            className="w-10 h-10 object-contain"
            priority
          />
        </div>
        <span className="text-[#F8FAFC] font-bold text-lg">FLASH</span>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 space-y-2 mb-8">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-[#D4A017] text-[#0A0A0F] font-semibold'
                  : 'text-[#94A3B8] hover:bg-[#1E1E2E] hover:text-[#F8FAFC]'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Workspace Switcher */}
      <div className="border-t border-[#1E1E2E] pt-6">
        <button
          onClick={() => setWorkspaceMenu(!workspaceMenu)}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-[#1E1E2E] hover:bg-[#1E1E2E] text-[#94A3B8] hover:text-[#F8FAFC] transition-colors text-sm font-medium"
        >
          <div className="w-8 h-8 rounded-full bg-[#D4A017] flex items-center justify-center flex-shrink-0">
            <span className="text-[#0A0A0F] text-xs font-bold">Z</span>
          </div>
          <div className="flex-1 text-left">
            <p className="text-[#F8FAFC] font-medium">Zenith Bank</p>
            <p className="text-[#5B8FD4] text-xs">Account</p>
          </div>
        </button>
      </div>
    </div>
  )
}
