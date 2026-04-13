'use client'

import { AlertCircle, TrendingUp, Eye, Clock } from 'lucide-react'
import { useState } from 'react'

export default function CommandCenterPage() {
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null)

  const brands = [
    {
      id: 'zoom-bank',
      name: 'Zoom Bank Asset',
      client: 'Zoom',
      mentions: 12,
      trend: '+8%',
      alerts: 3,
      sentiment: 'positive',
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop'
    },
    {
      id: 'otbank',
      name: 'OTBank',
      client: 'OTBank',
      mentions: 48,
      trend: '+12%',
      alerts: 2,
      sentiment: 'positive',
      thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&h=200&fit=crop'
    },
    {
      id: 'desgee',
      name: 'Desgee Group',
      client: 'Desgee',
      mentions: 9,
      trend: '-2%',
      alerts: 1,
      sentiment: 'neutral',
      thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=300&h=200&fit=crop'
    },
    {
      id: 'wtm',
      name: 'WTM Nigeria',
      client: 'WTM',
      mentions: 15,
      trend: '+5%',
      alerts: 4,
      sentiment: 'warning',
      thumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=300&h=200&fit=crop'
    }
  ]

  const recentAlerts = [
    {
      brand: 'Zoom Bank',
      title: 'Crisis Probability Volatility Speculation',
      severity: 'high',
      time: '2 hours ago'
    },
    {
      brand: 'OTBank',
      title: 'Risk Institutional Investors Concerns',
      severity: 'medium',
      time: '5 hours ago'
    },
    {
      brand: 'WTM Nigeria',
      title: 'Regulatory Enquiry Updates Available',
      severity: 'high',
      time: '1 day ago'
    }
  ]

  return (
    <div className="bg-[#0A0A0F] min-h-screen">
      <div className="border-b border-[#1E1E2E] px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#F8FAFC]">GLOBAL COMMAND CENTER</h1>
            <p className="text-[#94A3B8] mt-2 text-sm sm:text-base">Real-time monitoring and instant response.</p>
          </div>
          <button className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-[#D4A017] hover:bg-[#E6B420] text-[#0A0A0F] rounded-lg font-semibold transition-colors text-sm sm:text-base">
            + Add Organization
          </button>
        </div>
      </div>

      <div className="p-4 sm:p-6 lg:p-8 flex flex-col lg:flex-row gap-6 lg:gap-8">
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-8">
            <div className="bg-[#12121A] rounded-lg p-4 border border-[#1E1E2E]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#94A3B8] text-sm mb-1">Active Campaigns</p>
                  <p className="text-3xl font-bold text-[#F8FAFC]">12</p>
                </div>
                <TrendingUp className="w-8 h-8 text-[#D4A017]" />
              </div>
            </div>
            <div className="bg-[#12121A] rounded-lg p-4 border border-[#1E1E2E]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#94A3B8] text-sm mb-1">Total Mentions</p>
                  <p className="text-3xl font-bold text-[#F8FAFC]">48,291</p>
                </div>
                <Eye className="w-8 h-8 text-[#5B8FD4]" />
              </div>
            </div>
            <div className="bg-[#12121A] rounded-lg p-4 border border-[#1E1E2E]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#94A3B8] text-sm mb-1">Critical Alerts</p>
                  <p className="text-3xl font-bold text-[#E84242]">8</p>
                </div>
                <AlertCircle className="w-8 h-8 text-[#E84242]" />
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-lg sm:text-xl font-bold text-[#F8FAFC] mb-4">AGENCY PORTFOLIO</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6">
              {brands.map((brand) => (
                <div 
                  key={brand.id}
                  onClick={() => setSelectedBrand(brand.id)}
                  className={`relative rounded-lg overflow-hidden cursor-pointer transition-all border-2 ${
                    selectedBrand === brand.id 
                      ? 'border-[#D4A017] shadow-lg shadow-[#D4A017]/30' 
                      : 'border-[#1E1E2E] hover:border-[#D4A017]'
                  }`}
                >
                  {/* Thumbnail Background */}
                  <img 
                    src={brand.thumbnail} 
                    alt={brand.name}
                    className="w-full h-40 object-cover opacity-40"
                  />
                  
                  {/* Overlay Content */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#12121A] to-transparent flex flex-col justify-between p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-bold text-[#F8FAFC]">{brand.name}</h3>
                        <p className="text-[#94A3B8] text-sm">{brand.client}</p>
                      </div>
                      <div className={`px-2 py-1 rounded text-xs font-semibold ${
                        brand.alerts > 0 ? 'bg-[#E84242] text-white' : 'bg-[#2ECC8A] text-white'
                      }`}>
                        {brand.alerts} Alert{brand.alerts !== 1 ? 's' : ''}
                      </div>
                    </div>

                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-[#94A3B8] text-xs mb-1">Mentions</p>
                        <p className="text-2xl font-bold text-[#F8FAFC]">{brand.mentions}</p>
                      </div>
                      <div className={`text-sm font-semibold ${
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

        <div className="lg:w-80">
          <div className="bg-[#12121A] rounded-lg border border-[#1E1E2E] p-4 sm:p-6 lg:sticky lg:top-8">
            <div className="flex items-center gap-2 mb-6">
              <AlertCircle className="w-5 h-5 text-[#D4A017]" />
              <h3 className="text-base sm:text-lg font-bold text-[#F8FAFC]">RECENT ALERTS</h3>
            </div>

            <div className="space-y-4">
              {recentAlerts.map((alert, idx) => (
                <div key={idx} className="bg-[#1E1E2E] rounded-lg p-3 sm:p-4 border-l-2 border-l-[#D4A017] hover:bg-[#252535] transition-colors cursor-pointer">
                  <div className="flex items-start justify-between mb-2">
                    <p className="text-[#D4A017] text-xs sm:text-sm font-semibold">{alert.brand}</p>
                    <div className={`w-2 h-2 rounded-full ${
                      alert.severity === 'high' ? 'bg-[#E84242]' : 'bg-[#E8832A]'
                    }`} />
                  </div>
                  <p className="text-[#F8FAFC] text-xs sm:text-sm font-medium mb-2">{alert.title}</p>
                  <div className="flex items-center gap-1 text-[#94A3B8] text-xs">
                    <Clock className="w-3 h-3" />
                    {alert.time}
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-6 px-4 py-2 sm:py-3 bg-[#D4A017] hover:bg-[#E6B420] text-[#0A0A0F] rounded-lg font-semibold transition-colors text-xs sm:text-sm">
              View All Alerts
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
