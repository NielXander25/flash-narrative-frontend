'use client'

import { useState } from 'react'
import { KPICard } from '@/components/dashboard/kpi-cards'
import { SentimentChart } from '@/components/dashboard/sentiment-chart'
import { SOVChart } from '@/components/dashboard/sov-chart'
import { MentionsTable } from '@/components/dashboard/mentions-table'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { FileText, Download } from 'lucide-react'

// Mock data - will be replaced with API calls
const mockMentions = [
  {
    id: 'https://nairametrics.com/example',
    title: 'Zenith Bank launches new premium service',
    snippet: 'The new service aims to provide better customer experience and financial inclusion...',
    platform_category: 'News',
    sentiment_label: 'Positive',
    published_date: '2026-03-02T10:00:00Z',
    source: 'Nairae Metrics',
  },
  {
    id: 'https://nairaland.com/forum/123',
    title: 'Wahala for this new app',
    snippet: 'This new app feature is pure wahala oo. Why is everything so complicated?',
    platform_category: 'Social',
    sentiment_label: 'Anger',
    published_date: '2026-03-02T11:30:00Z',
    source: 'Nairaland',
  },
  {
    id: 'https://businessday.ng/tech',
    title: 'Nigeria fintech sector records growth',
    snippet: 'Industry experts predict continued growth in digital payment solutions...',
    platform_category: 'News',
    sentiment_label: 'Positive',
    published_date: '2026-03-01T14:20:00Z',
    source: 'Business Day',
  },
  {
    id: 'https://twitter.com/example',
    title: 'Just switched to new banking app',
    snippet: 'Really impressed with the new features. Much better than expected!',
    platform_category: 'Social',
    sentiment_label: 'Positive',
    published_date: '2026-03-01T09:15:00Z',
    source: 'Twitter',
  },
]

const sentimentData = [
  { name: 'Positive', value: 45, color: '#2ECC8A' },
  { name: 'Neutral', value: 30, color: '#5B8FD4' },
  { name: 'Negative', value: 18, color: '#E8832A' },
  { name: 'Anger', value: 7, color: '#E84242' },
]

const sovData = [
  { name: 'Flash Narrative', value: 60 },
  { name: 'Competitor A', value: 25 },
  { name: 'Competitor B', value: 15 },
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'news' | 'social'>('news')

  const handleExportPDF = () => {
    console.log('Exporting PDF...')
    // In production: POST /api/v1/export/pdf
  }

  const handleExportExcel = () => {
    console.log('Exporting Excel...')
    // In production: POST /api/v1/export/excel
  }

  return (
    <div className="flex flex-col h-full">
      {/* Command Zone - Top Navigation */}
      <div className="bg-[#12121A] border-b border-[#1E1E2E] px-8 py-6">
        <div className="flex items-center justify-between gap-6 mb-6">
          {/* Left: Brand & Input Fields */}
          <div className="flex items-center gap-4 flex-1">
            <div>
              <label className="text-[#94A3B8] text-xs font-semibold uppercase mb-2 block">
                Brand Name
              </label>
              <input
                type="text"
                placeholder="e.g. Zenith Bank"
                className="bg-[#0A0A0F] border border-[#1E1E2E] rounded-lg px-4 py-2.5 text-[#F8FAFC] placeholder-[#5B8FD4] text-sm focus:outline-none focus:border-[#D4A017] focus:ring-1 focus:ring-[#D4A017]"
              />
            </div>
            <div>
              <label className="text-[#94A3B8] text-xs font-semibold uppercase mb-2 block">
                Competitors
              </label>
              <input
                type="text"
                placeholder="e.g. GTBank, Access"
                className="bg-[#0A0A0F] border border-[#1E1E2E] rounded-lg px-4 py-2.5 text-[#F8FAFC] placeholder-[#5B8FD4] text-sm focus:outline-none focus:border-[#D4A017] focus:ring-1 focus:ring-[#D4A017]"
              />
            </div>
            <div>
              <label className="text-[#94A3B8] text-xs font-semibold uppercase mb-2 block">
                Date Range
              </label>
              <input
                type="date"
                className="bg-[#0A0A0F] border border-[#1E1E2E] rounded-lg px-4 py-2.5 text-[#F8FAFC] text-sm focus:outline-none focus:border-[#D4A017] focus:ring-1 focus:ring-[#D4A017]"
              />
            </div>
          </div>

          {/* Right: Action Buttons & Avatar */}
          <div className="flex items-end gap-3">
            <Button
              onClick={handleExportPDF}
              className="bg-[#D4A017] hover:bg-[#E6B420] text-[#0A0A0F] font-semibold h-10 flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              PDF
            </Button>
            <Button
              onClick={handleExportExcel}
              variant="outline"
              className="border-[#1E1E2E] text-[#D4A017] hover:bg-[#1E1E2E] h-10 flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Excel
            </Button>
            <div className="w-10 h-10 rounded-full bg-[#D4A017] flex items-center justify-center flex-shrink-0">
              <span className="text-[#0A0A0F] font-bold text-sm">U</span>
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Zone - KPIs and Charts */}
      <div className="flex-1 overflow-auto">
        <div className="p-8 space-y-8">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SentimentChart data={sentimentData} />
            <SOVChart data={sovData} />
          </div>

          {/* Data Zone - Tabs & Table */}
          <div>
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'news' | 'social')}>
              <TabsList className="bg-[#12121A] border border-[#1E1E2E] p-1 h-auto rounded-lg">
                <TabsTrigger
                  value="news"
                  className="data-[state=active]:bg-[#D4A017] data-[state=active]:text-[#0A0A0F] text-[#94A3B8] px-4 py-2 rounded text-sm font-medium"
                >
                  News & Web Coverage
                </TabsTrigger>
                <TabsTrigger
                  value="social"
                  className="data-[state=active]:bg-[#D4A017] data-[state=active]:text-[#0A0A0F] text-[#94A3B8] px-4 py-2 rounded text-sm font-medium"
                >
                  Social Media Pulse
                </TabsTrigger>
              </TabsList>

              <TabsContent value="news" className="mt-6">
                <MentionsTable data={mockMentions} activeTab="news" />
              </TabsContent>

              <TabsContent value="social" className="mt-6">
                <MentionsTable data={mockMentions} activeTab="social" />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
