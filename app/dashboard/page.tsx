'use client'

import { useState } from 'react'
import { KPICard } from '@/components/dashboard/kpi-cards'
import { SentimentChart } from '@/components/dashboard/sentiment-chart'
import { SOVChart } from '@/components/dashboard/sov-chart'
import { MentionsTable } from '@/components/dashboard/mentions-table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { MOCK_MENTIONS, SENTIMENT_DATA, SOV_DATA } from '@/lib/constants'

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'news' | 'social'>('news')

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <KPICard
            label="Media Impact Score"
            value={847}
            change={12}
            sentiment="positive"
          />
          <KPICard
            label="Message Penetration Index"
            value={63.4}
            change={-3}
            unit="%"
            sentiment="negative"
          />
          <KPICard
            label="Share of Voice"
            value={34.2}
            change={5}
            unit="%"
            sentiment="positive"
          />
          <KPICard
            label="Total Reach"
            value="1.2M"
            change={18}
            sentiment="positive"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <div className="overflow-x-auto">
            <SentimentChart data={SENTIMENT_DATA} />
          </div>
          <div className="overflow-x-auto">
            <SOVChart data={SOV_DATA} />
          </div>
        </div>

        <div className="overflow-x-auto">
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'news' | 'social')}>
            <TabsList className="bg-[#12121A] border border-[#1E1E2E] p-1 h-auto rounded-lg flex w-full sm:w-auto">
              <TabsTrigger
                value="news"
                className="data-[state=active]:bg-[#D4A017] data-[state=active]:text-[#0A0A0F] text-[#94A3B8] px-3 sm:px-4 py-2 rounded text-xs sm:text-sm font-medium flex-1 sm:flex-none"
              >
                News & Web Coverage
              </TabsTrigger>
              <TabsTrigger
                value="social"
                className="data-[state=active]:bg-[#D4A017] data-[state=active]:text-[#0A0A0F] text-[#94A3B8] px-3 sm:px-4 py-2 rounded text-xs sm:text-sm font-medium flex-1 sm:flex-none"
              >
                Social Media Pulse
              </TabsTrigger>
            </TabsList>

            <TabsContent value="news" className="mt-6">
              <MentionsTable data={MOCK_MENTIONS} activeTab="news" />
            </TabsContent>

            <TabsContent value="social" className="mt-6">
              <MentionsTable data={MOCK_MENTIONS} activeTab="social" />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
