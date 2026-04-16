'use client'

import { AlertCircle, TrendingUp, Eye, Clock, Plus, Download } from 'lucide-react'
import { useState } from 'react'
import { BRANDS, RECENT_ALERTS } from '@/lib/constants'
import { InitiateCampaignModal } from '@/components/dashboard/modals'

export default function CommandCenterPage() {
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null)
  const [showCampaignModal, setShowCampaignModal] = useState(false)

  const recentAlerts = [
    {
      brand: 'Zenith Bank',
      title: 'Liquidity Speculation',
      severity: 'high',
      time: '10 mins ago'
    },
    {
      brand: 'MTN',
      title: 'Infrastructure Vandalism',
      severity: 'high',
      time: '14 min ago'
    },
    {
      brand: 'Dangote',
      title: 'Policy Dialogue',
      severity: 'medium',
      time: '12 min ago'
    }
  ]

  return (
    <div className="bg-[#0A0A0F] min-h-screen">
      {/* Header */}
      <div className="border-b border-[#1E1E2E] px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#F8FAFC]">GLOBAL COMMAND CENTER</h1>
            <p className="text-[#94A3B8] mt-2 text-sm sm:text-base">Real-time narrative analytics & systemic risk monitoring.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <button className="px-4 sm:px-6 py-2 sm:py-3 border border-[#1E1E2E] text-[#F8FAFC] hover:bg-[#1E1E2E] rounded-lg font-semibold transition-colors text-sm flex items-center justify-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </button>
            <button 
              onClick={() => setShowCampaignModal(true)}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-[#D4A017] hover:bg-[#E6B420] text-[#0A0A0F] rounded-lg font-semibold transition-colors text-sm flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              + New Campaign
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Left Section - Alerts & Metrics */}
          <div className="lg:col-span-1 space-y-6">
            {/* Active Campaigns Card */}
            <div className="bg-[#12121A] rounded-lg border border-[#1E1E2E] p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-semibold text-[#D4A017] uppercase">ACTIVE CAMPAIGNS</h3>
                <TrendingUp className="w-4 h-4 text-[#D4A017]" />
              </div>
              <p className="text-4xl font-bold text-[#F8FAFC] mb-2">12</p>
              <p className="text-[#2ECC8A] text-xs font-semibold">↓ 4 from last month</p>
            </div>

            {/* Crisis Radar Card */}
            <div className="bg-[#12121A] rounded-lg border border-[#1E1E2E] p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-semibold text-[#E84242] uppercase">CRISIS RADAR</h3>
                <AlertCircle className="w-4 h-4 text-[#E84242]" />
              </div>
              <div className="space-y-4">
                {recentAlerts.map((alert, idx) => (
                  <div key={idx} className="pb-4 border-b border-[#1E1E2E] last:border-0 last:pb-0">
                    <p className="text-[#F8FAFC] text-xs font-semibold mb-1">{alert.brand}</p>
                    <p className="text-[#94A3B8] text-xs mb-2">{alert.title}</p>
                    <div className="flex items-center justify-between">
                      <div className={`w-2 h-2 rounded-full ${
                        alert.severity === 'high' ? 'bg-[#E84242]' : 'bg-[#E8832A]'
                      }`} />
                      <span className="text-[#5B8FD4] text-xs">{alert.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Middle Section - Main Metrics */}
          <div className="lg:col-span-1 space-y-6">
            {/* Credit Radar */}
            <div className="bg-[#12121A] rounded-lg border border-[#1E1E2E] p-6">
              <h3 className="text-xs font-semibold text-[#5B8FD4] uppercase mb-4">CREDIT RADAR</h3>
              <div className="bg-[#1E1E2E] rounded-lg p-4 h-32 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-[#5B8FD4] text-sm font-semibold">Zenith Bank Alert</p>
                  <p className="text-[#94A3B8] text-xs mt-1">Financial Institution Signals</p>
                </div>
              </div>
            </div>

            {/* Total Mentions */}
            <div className="bg-[#12121A] rounded-lg border border-[#1E1E2E] p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-semibold text-[#5B8FD4] uppercase">TOTAL MENTIONS</h3>
                <Eye className="w-4 h-4 text-[#5B8FD4]" />
              </div>
              <p className="text-4xl font-bold text-[#F8FAFC]">48,291</p>
              <p className="text-[#5B8FD4] text-xs font-semibold mt-2">GLOBAL REACH</p>
              <button className="w-full mt-4 px-4 py-2 bg-[#D4A017] hover:bg-[#E6B420] text-[#0A0A0F] rounded-lg font-semibold text-xs transition-colors">
                UPGRADE ACCESS
              </button>
            </div>
          </div>

          {/* Right Section - Intelligence Insights */}
          <div className="lg:col-span-1">
            <div className="bg-[#12121A] rounded-lg border border-[#1E1E2E] p-6">
              <h3 className="text-xs font-semibold text-[#D4A017] uppercase mb-4">INTELLIGENCE INSIGHTS</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-[#94A3B8] text-xs uppercase mb-2">Sentiment Index</p>
                  <div className="w-full bg-[#1E1E2E] rounded-full h-2">
                    <div className="bg-[#2ECC8A] h-2 rounded-full" style={{ width: '72%' }}></div>
                  </div>
                  <p className="text-[#2ECC8A] text-xs font-semibold mt-1">72/100 Positive</p>
                </div>
                <div>
                  <p className="text-[#94A3B8] text-xs uppercase mb-2">Market Position</p>
                  <div className="w-full bg-[#1E1E2E] rounded-full h-2">
                    <div className="bg-[#5B8FD4] h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                  <p className="text-[#5B8FD4] text-xs font-semibold mt-1">842,109 Indexed</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Agency Portfolio Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-[#F8FAFC]">AGENCY PORTFOLIO</h2>
              <p className="text-[#94A3B8] text-sm mt-1">All tracked brands and their performance metrics</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {BRANDS.map((brand) => (
              <div 
                key={brand.id}
                onClick={() => setSelectedBrand(brand.id)}
                className={`relative rounded-lg overflow-hidden cursor-pointer transition-all border-2 h-48 ${
                  selectedBrand === brand.id 
                    ? 'border-[#D4A017] shadow-lg shadow-[#D4A017]/30' 
                    : 'border-[#1E1E2E] hover:border-[#D4A017]'
                }`}
              >
                {/* Thumbnail Background */}
                <img 
                  src={brand.thumbnail} 
                  alt={brand.name}
                  className="w-full h-full object-cover opacity-40"
                />
                
                {/* Overlay Content */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#12121A] via-[#12121A]/30 to-transparent flex flex-col justify-between p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-sm font-bold text-[#F8FAFC]">{brand.name}</h3>
                      <p className="text-[#94A3B8] text-xs">{brand.client}</p>
                    </div>
                    <div className={`px-2 py-1 rounded text-xs font-semibold ${
                      brand.alerts > 0 ? 'bg-[#E84242]' : 'bg-[#2ECC8A]'
                    } text-white`}>
                      {brand.alerts > 0 ? `${brand.alerts} Alert` : 'Good'}
                    </div>
                  </div>

                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-[#94A3B8] text-xs mb-1">Mentions</p>
                      <p className="text-lg font-bold text-[#F8FAFC]">{brand.mentions}</p>
                    </div>
                    <div className={`text-xs font-semibold ${
                      brand.trend.startsWith('+') ? 'text-[#2ECC8A]' : 'text-[#E8832A]'
                    }`}>
                      {brand.trend}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Campaign Modal */}
      <InitiateCampaignModal 
        isOpen={showCampaignModal} 
        onClose={() => setShowCampaignModal(false)} 
      />
    </div>
  )
}
