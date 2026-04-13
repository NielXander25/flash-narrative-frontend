'use client'

import { useState } from 'react'
import { KPICard } from '@/components/dashboard/kpi-cards'
import { SentimentChart } from '@/components/dashboard/sentiment-chart'
import { SOVChart } from '@/components/dashboard/sov-chart'
import { MentionsTable } from '@/components/dashboard/mentions-table'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { FileText, Download } from 'lucide-react'
import { MOCK_MENTIONS, SENTIMENT_DATA, SOV_DATA } from '@/lib/constants'
import { exportToPDF, exportToExcel, downloadBlob } from '@/lib/api'

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'news' | 'social'>('news')
  const [isExporting, setIsExporting] = useState(false)

  const handleExportPDF = async () => {
    setIsExporting(true)
    try {
      const blob = await exportToPDF({ mentions: MOCK_MENTIONS, sentiment: SENTIMENT_DATA })
      downloadBlob(blob, 'intelligence-report.pdf')
    } catch (error) {
      console.error('Failed to export PDF:', error)
    } finally {
      setIsExporting(false)
    }
  }

  const handleExportExcel = async () => {
    setIsExporting(true)
    try {
      const blob = await exportToExcel({ mentions: MOCK_MENTIONS, sentiment: SENTIMENT_DATA })
      downloadBlob(blob, 'intelligence-report.xlsx')
    } catch (error) {
      console.error('Failed to export Excel:', error)
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div className="flex flex-col h-full w-full">
      <div className="bg-[#12121A] border-b border-[#1E1E2E] px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 flex-1 w-full sm:w-auto">
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

          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-2 sm:gap-3 w-full sm:w-auto">
            <Button
              onClick={handleExportPDF}
              disabled={isExporting}
              className="w-full sm:w-auto bg-[#D4A017] hover:bg-[#E6B420] text-[#0A0A0F] font-semibold h-10 flex items-center justify-center gap-2 disabled:opacity-50 text-sm"
            >
              <FileText className="w-4 h-4" />
              PDF
            </Button>
            <Button
              onClick={handleExportExcel}
              disabled={isExporting}
              variant="outline"
              className="w-full sm:w-auto border-[#1E1E2E] text-[#D4A017] hover:bg-[#1E1E2E] h-10 flex items-center justify-center gap-2 disabled:opacity-50 text-sm"
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

      <div className="flex-1 overflow-auto">
        <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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
    </div>
  )
}
