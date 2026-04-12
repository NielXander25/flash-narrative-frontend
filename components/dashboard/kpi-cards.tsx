'use client'

import { TrendingUp, TrendingDown } from 'lucide-react'

interface KPICardProps {
  label: string
  value: string | number
  change: number
  unit?: string
  sentiment?: 'positive' | 'negative' | 'neutral'
}

export function KPICard({ label, value, change, unit, sentiment = 'positive' }: KPICardProps) {
  const isPositive = change >= 0

  return (
    <div className="bg-[#12121A] border-l-2 border-l-[#D4A017] border border-[#1E1E2E] rounded-lg p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-[#94A3B8] text-sm font-medium mb-2">{label}</p>
          <h3 className="text-4xl font-bold text-[#F8FAFC]">
            {value}
            {unit && <span className="text-xl ml-2">{unit}</span>}
          </h3>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {isPositive ? (
          <TrendingUp className="w-4 h-4 text-[#2ECC8A]" />
        ) : (
          <TrendingDown className="w-4 h-4 text-[#E84242]" />
        )}
        <span
          className={`text-sm font-semibold ${
            isPositive ? 'text-[#2ECC8A]' : 'text-[#E84242]'
          }`}
        >
          {isPositive ? '+' : ''}{change}% this week
        </span>
      </div>
    </div>
  )
}
