'use client'

import { PieChart, Pie, Cell, Legend, ResponsiveContainer, Tooltip } from 'recharts'

interface SentimentChartProps {
  data: Array<{
    name: string
    value: number
    color: string
  }>
}

const COLORS = ['#2ECC8A', '#5B8FD4', '#E8832A', '#E84242']

export function SentimentChart({ data }: SentimentChartProps) {
  return (
    <div className="bg-[#12121A] border border-[#1E1E2E] rounded-lg p-6">
      <h3 className="text-[#F8FAFC] font-semibold text-lg mb-6">Sentiment Breakdown</h3>
      
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={120}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: '#12121A',
              border: '1px solid #1E1E2E',
              color: '#F8FAFC',
              borderRadius: '6px'
            }}
            formatter={(value: number) => `${value}%`}
          />
        </PieChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        {data.map((item, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-[#94A3B8] text-sm">
              {item.name} {item.value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
