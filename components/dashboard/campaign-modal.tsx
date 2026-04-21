'use client'

import { useState } from 'react'
import { X, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface CampaignModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: CampaignData) => void
}

interface CampaignData {
  campaignName: string
  objective: string
  targetAudience: string
  budget: string
  duration: string
  channels: string[]
}

export function CampaignModal({ isOpen, onClose, onSubmit }: CampaignModalProps) {
  const [formData, setFormData] = useState<CampaignData>({
    campaignName: '',
    objective: '',
    targetAudience: '',
    budget: '',
    duration: '',
    channels: [],
  })

  const channels = ['Social Media', 'Email', 'Press Release', 'Influencers', 'Paid Ads']

  const handleChannelToggle = (channel: string) => {
    setFormData(prev => ({
      ...prev,
      channels: prev.channels.includes(channel)
        ? prev.channels.filter(c => c !== channel)
        : [...prev.channels, channel]
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.campaignName || !formData.objective) {
      alert('Please fill in all required fields')
      return
    }
    onSubmit(formData)
    setFormData({
      campaignName: '',
      objective: '',
      targetAudience: '',
      budget: '',
      duration: '',
      channels: [],
    })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-[#12121A] rounded-lg border border-[#1E1E2E] max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 flex items-center justify-between p-6 border-b border-[#1E1E2E] bg-[#12121A]">
          <h2 className="text-2xl font-bold text-[#F8FAFC]">Initiate New Campaign</h2>
          <button onClick={onClose} className="text-[#94A3B8] hover:text-[#F8FAFC]">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="bg-[#5B8FD4]/10 border border-[#5B8FD4]/30 rounded-lg p-4 flex gap-3">
            <AlertCircle className="w-5 h-5 text-[#5B8FD4] flex-shrink-0 mt-0.5" />
            <p className="text-[#5B8FD4] text-sm">Fill in campaign details to generate a comprehensive strategy using AI</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-[#F8FAFC] mb-2">Campaign Name*</label>
              <input
                type="text"
                value={formData.campaignName}
                onChange={(e) => setFormData(prev => ({ ...prev, campaignName: e.target.value }))}
                placeholder="e.g., Q3 Product Launch"
                className="w-full bg-[#1E1E2E] border border-[#2E2E3E] rounded-lg px-4 py-2 text-[#F8FAFC] placeholder-[#5B8FD4] focus:outline-none focus:border-[#D4A017]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#F8FAFC] mb-2">Objective*</label>
              <select
                value={formData.objective}
                onChange={(e) => setFormData(prev => ({ ...prev, objective: e.target.value }))}
                className="w-full bg-[#1E1E2E] border border-[#2E2E3E] rounded-lg px-4 py-2 text-[#F8FAFC] focus:outline-none focus:border-[#D4A017]"
              >
                <option value="">Select objective</option>
                <option value="awareness">Brand Awareness</option>
                <option value="engagement">Engagement</option>
                <option value="conversion">Conversion</option>
                <option value="retention">Customer Retention</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#F8FAFC] mb-2">Target Audience</label>
              <input
                type="text"
                value={formData.targetAudience}
                onChange={(e) => setFormData(prev => ({ ...prev, targetAudience: e.target.value }))}
                placeholder="e.g., Ages 18-45, Tech-savvy professionals"
                className="w-full bg-[#1E1E2E] border border-[#2E2E3E] rounded-lg px-4 py-2 text-[#F8FAFC] placeholder-[#5B8FD4] focus:outline-none focus:border-[#D4A017]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#F8FAFC] mb-2">Budget</label>
              <input
                type="text"
                value={formData.budget}
                onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
                placeholder="e.g., $50,000"
                className="w-full bg-[#1E1E2E] border border-[#2E2E3E] rounded-lg px-4 py-2 text-[#F8FAFC] placeholder-[#5B8FD4] focus:outline-none focus:border-[#D4A017]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#F8FAFC] mb-2">Duration</label>
              <select
                value={formData.duration}
                onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                className="w-full bg-[#1E1E2E] border border-[#2E2E3E] rounded-lg px-4 py-2 text-[#F8FAFC] focus:outline-none focus:border-[#D4A017]"
              >
                <option value="">Select duration</option>
                <option value="1-month">1 Month</option>
                <option value="3-months">3 Months</option>
                <option value="6-months">6 Months</option>
                <option value="12-months">12 Months</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#F8FAFC] mb-3">Campaign Channels</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {channels.map(channel => (
                <label key={channel} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.channels.includes(channel)}
                    onChange={() => handleChannelToggle(channel)}
                    className="w-4 h-4 rounded bg-[#1E1E2E] border-[#2E2E3E] cursor-pointer"
                  />
                  <span className="text-sm text-[#94A3B8]">{channel}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 border-[#1E1E2E] text-[#D4A017] hover:bg-[#1E1E2E]"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-[#D4A017] hover:bg-[#E6B420] text-[#0A0A0F] font-semibold"
            >
              Create Campaign
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
