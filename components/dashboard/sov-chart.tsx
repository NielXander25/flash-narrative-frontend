'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface SOVChartProps {
  data: Array<{
    name: string
    value: number
  }>
}

export function SOVChart({ data }: SOVChartProps) {
  return (
    <div className="bg-[#12121A] border border-[#1E1E2E] rounded-lg p-6">
      <h3 className="text-[#F8FAFC] font-semibold text-lg mb-6">Share of Voice</h3>
      
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1E1E2E" />
          <XAxis
            dataKey="name"
            stroke="#94A3B8"
            style={{ fontSize: '12px' }}
          />
          <YAxis
            stroke="#94A3B8"
            style={{ fontSize: '12px' }}
            label={{ value: '%', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#12121A',
              border: '1px solid #1E1E2E',
              color: '#F8FAFC',
              borderRadius: '6px'
            }}
            formatter={(value: number) => `${value}%`}
          />
          <Bar
            dataKey="value"
            fill="#D4A017"
            radius={[8, 8, 0, 0]}
            name="Share of Voice"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
