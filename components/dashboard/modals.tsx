'use client'

import { useState } from 'react'
import { X, AlertTriangle, ChevronDown, Trash2, Plus } from 'lucide-react'
import { 
  handleNewCampaign,
  handleRevokeAPIKey,
  showNotification 
} from '@/lib/button-handlers'

interface RevokeAPIKeyModalProps {
  isOpen: boolean
  onClose: () => void
  keyName?: string
}

export function RevokeAPIKeyModal({ isOpen, onClose, keyName = 'Production' }: RevokeAPIKeyModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#12121A] rounded-lg border border-[#1E1E2E] p-6 sm:p-8 max-w-md w-full mx-auto">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 rounded-lg bg-[#E84242]/20 flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-6 h-6 text-[#E84242]" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#F8FAFC]">Revoke API Key?</h2>
            <p className="text-[#94A3B8] text-xs font-semibold mt-1">IRREVERSIBLE ACTION</p>
          </div>
          <button onClick={onClose} className="text-[#94A3B8] hover:text-[#F8FAFC] ml-auto flex-shrink-0">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="border-t border-[#1E1E2E] pt-6 mb-6">
          <p className="text-[#94A3B8] text-sm leading-relaxed">
            Revoking this {keyName} key will immediately terminate all active integrations and any subsequent requests using this credential will fail.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <button 
            onClick={onClose} 
            className="flex-1 px-4 py-3 border border-[#1E1E2E] text-[#F8FAFC] rounded-lg font-semibold hover:bg-[#1E1E2E] transition-colors text-sm order-2 sm:order-1"
          >
            Cancel
          </button>
          <button 
            onClick={() => { handleRevokeAPIKey(keyName); onClose() }} 
            className="flex-1 px-4 py-3 bg-[#E8832A] hover:bg-[#D46E1F] text-white rounded-lg font-semibold transition-colors text-sm order-1 sm:order-2"
          >
            Revoke Key
          </button>
        </div>
      </div>
    </div>
  )
}

interface InitiateCampaignModalProps {
  isOpen: boolean
  onClose: () => void
}

interface CampaignState {
  // Step 1
  campaignName: string
  targetBrand: string
  industry: string
  competitors: string[]
  competitorInput: string
  
  // Step 2
  sources: {
    news_and_web: boolean
    social_pulse: boolean
  }
  
  // Step 3
  kpis: {
    sentiment_target: number
    share_of_voice_target: number
    volume_target: number
    engagement_rate: number
  }
  crisis_alert_threshold: number
  alert_emails: string[]
  alertEmailInput: string
  
  // Step 4
  analysis_type: 'snapshot' | 'live'
  date_start: string
  date_end: string
  schedule_interval: 'minute' | 'five_min' | 'hour' | 'day'
  specific_times: string[]
  
  // Step 5 - Review (read-only)
}

const suggestedCompetitors: Record<string, string[]> = {
  finance: ['GTBank', 'Access Bank', 'First Bank', 'UBA', 'Stanbic IBTC'],
  tech: ['Microsoft', 'Google', 'Meta', 'Apple', 'Amazon'],
  energy: ['Shell', 'ExxonMobil', 'BP', 'Chevron'],
  fmcg: ['Nestle', 'Unilever', 'Procter & Gamble', 'Coca-Cola'],
  retail: ['Jumia', 'Konga', 'Shoprite', 'Walmart'],
}

export function InitiateCampaignModal({ isOpen, onClose }: InitiateCampaignModalProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [campaignData, setCampaignData] = useState<CampaignState>({
    campaignName: '',
    targetBrand: '',
    industry: '',
    competitors: [],
    competitorInput: '',
    sources: { news_and_web: true, social_pulse: true },
    kpis: { sentiment_target: 80, share_of_voice_target: 25, volume_target: 5000, engagement_rate: 0 },
    crisis_alert_threshold: 500,
    alert_emails: [],
    alertEmailInput: '',
    analysis_type: 'snapshot',
    date_start: '',
    date_end: '',
    schedule_interval: 'day',
    specific_times: ['07:00', '19:00'],
  })

  if (!isOpen) return null

  const handleLaunchCampaign = () => {
    if (!campaignData.campaignName) { showNotification('Please enter campaign name', 'error'); return }
    if (!campaignData.targetBrand) { showNotification('Please enter target brand', 'error'); return }
    if (!campaignData.industry) { showNotification('Please select industry', 'error'); return }
    if (!campaignData.sources.news_and_web && !campaignData.sources.social_pulse) { showNotification('Please select at least one data source', 'error'); return }

    const payload = {
      campaign_name: campaignData.campaignName,
      target: campaignData.targetBrand,
      industry: campaignData.industry,
      competitors: campaignData.competitors,
      sources: Object.keys(campaignData.sources).filter(key => campaignData.sources[key as keyof typeof campaignData.sources]),
      kpis: campaignData.kpis,
      alert_threshold: campaignData.crisis_alert_threshold,
      alert_emails: campaignData.alert_emails.length > 0 ? campaignData.alert_emails : ['current_user@agency.com'],
      analysis_type: campaignData.analysis_type,
      date_start: campaignData.date_start,
      date_end: campaignData.date_end,
      schedule_config: {
        interval_type: campaignData.schedule_interval,
        interval_value: campaignData.schedule_interval === 'five_min' ? 5 : 1,
        specific_times: campaignData.specific_times,
      }
    }

    handleNewCampaign(payload)
    onClose()
    resetForm()
  }

  const resetForm = () => {
    setCampaignData({
      campaignName: '',
      targetBrand: '',
      industry: '',
      competitors: [],
      competitorInput: '',
      sources: { news_and_web: true, social_pulse: true },
      kpis: { sentiment_target: 80, share_of_voice_target: 25, volume_target: 5000, engagement_rate: 0 },
      crisis_alert_threshold: 500,
      alert_emails: [],
      alertEmailInput: '',
      analysis_type: 'snapshot',
      date_start: '',
      date_end: '',
      schedule_interval: 'day',
      specific_times: ['07:00', '19:00'],
    })
    setCurrentStep(1)
  }

  const handleClose = () => {
    onClose()
    resetForm()
  }

  const addCompetitor = (competitor: string) => {
    if (competitor && !campaignData.competitors.includes(competitor)) {
      setCampaignData({
        ...campaignData,
        competitors: [...campaignData.competitors, competitor],
        competitorInput: ''
      })
    }
  }

  const addAlertEmail = (email: string) => {
    if (email && !campaignData.alert_emails.includes(email)) {
      setCampaignData({
        ...campaignData,
        alert_emails: [...campaignData.alert_emails, email],
        alertEmailInput: ''
      })
    }
  }

  const steps = ['Core Identifiers', 'Data Sources', 'KPIs & Alerts', 'Schedule', 'Review & Launch']

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#12121A] rounded-lg border border-[#1E1E2E] w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#1E1E2E] flex-shrink-0">
          <div>
            <h2 className="text-lg font-bold text-[#F8FAFC]">Create Campaign Engine</h2>
            <p className="text-[#94A3B8] text-xs mt-1">Step {currentStep} of {steps.length}: {steps[currentStep - 1]}</p>
          </div>
          <button onClick={handleClose} className="text-[#94A3B8] hover:text-[#F8FAFC] flex-shrink-0">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicators */}
        <div className="px-6 py-4 border-b border-[#1E1E2E] flex-shrink-0 bg-[#0A0A0F]/50">
          <div className="flex items-center justify-between gap-2 mb-3">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center flex-1 gap-2">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                  index + 1 <= currentStep 
                    ? 'bg-[#D4A017] text-[#0A0A0F]' 
                    : 'bg-[#1E1E2E] text-[#94A3B8]'
                }`}>
                  {index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div className={`h-0.5 flex-1 ${
                    index < currentStep - 1 ? 'bg-[#D4A017]' : 'bg-[#1E1E2E]'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
          <div className="h-1 bg-[#1E1E2E] rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#D4A017] transition-all duration-300"
              style={{ width: `${(currentStep / steps.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* STEP 1: Core Identifiers */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <label className="text-[#F8FAFC] font-semibold text-xs mb-3 block uppercase">Campaign Name (The "What")</label>
                <input 
                  type="text" 
                  value={campaignData.campaignName} 
                  onChange={(e) => setCampaignData({...campaignData, campaignName: e.target.value})} 
                  placeholder="e.g., Zenith Bank Q1 Health" 
                  className="w-full bg-[#1E1E2E] border border-[#252535] rounded-lg px-4 py-3 text-[#F8FAFC] placeholder-[#5B8FD4] focus:outline-none focus:border-[#D4A017]"
                />
              </div>

              <div>
                <label className="text-[#F8FAFC] font-semibold text-xs mb-3 block uppercase">Target Brand / Keyword *</label>
                <input 
                  type="text" 
                  value={campaignData.targetBrand} 
                  onChange={(e) => setCampaignData({...campaignData, targetBrand: e.target.value})} 
                  placeholder="e.g., Zenith Bank" 
                  className="w-full bg-[#1E1E2E] border border-[#252535] rounded-lg px-4 py-3 text-[#F8FAFC] placeholder-[#5B8FD4] focus:outline-none focus:border-[#D4A017]"
                />
              </div>

              <div>
                <label className="text-[#F8FAFC] font-semibold text-xs mb-3 block uppercase">Industry *</label>
                <div className="relative">
                  <select 
                    value={campaignData.industry} 
                    onChange={(e) => setCampaignData({...campaignData, industry: e.target.value, competitors: []})} 
                    className="w-full bg-[#1E1E2E] border border-[#252535] rounded-lg px-4 py-3 text-[#F8FAFC] focus:outline-none focus:border-[#D4A017] appearance-none"
                  >
                    <option value="">Select Industry...</option>
                    <option value="finance">Finance & Banking</option>
                    <option value="tech">Technology</option>
                    <option value="energy">Energy & Utilities</option>
                    <option value="fmcg">FMCG</option>
                    <option value="retail">Retail</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8] pointer-events-none" />
                </div>
              </div>

              {/* Suggested Competitors */}
              {campaignData.industry && suggestedCompetitors[campaignData.industry] && (
                <div>
                  <label className="text-[#F8FAFC] font-semibold text-xs mb-3 block uppercase">Suggested Competitors</label>
                  <div className="flex flex-wrap gap-2">
                    {suggestedCompetitors[campaignData.industry].map((competitor) => (
                      <button
                        key={competitor}
                        onClick={() => addCompetitor(competitor)}
                        className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                          campaignData.competitors.includes(competitor)
                            ? 'bg-[#D4A017] text-[#0A0A0F]'
                            : 'bg-[#1E1E2E] text-[#D4A017] hover:bg-[#252535] border border-[#D4A017]'
                        }`}
                      >
                        {competitor}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Custom Competitors */}
              <div>
                <label className="text-[#F8FAFC] font-semibold text-xs mb-3 block uppercase">Selected Competitors</label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {campaignData.competitors.map((competitor) => (
                    <div key={competitor} className="bg-[#D4A017] text-[#0A0A0F] px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-2">
                      {competitor}
                      <button onClick={() => setCampaignData({...campaignData, competitors: campaignData.competitors.filter(c => c !== competitor)})}>
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={campaignData.competitorInput} 
                    onChange={(e) => setCampaignData({...campaignData, competitorInput: e.target.value})}
                    onKeyPress={(e) => e.key === 'Enter' && addCompetitor(campaignData.competitorInput)}
                    placeholder="Type competitor name and press Enter" 
                    className="flex-1 bg-[#1E1E2E] border border-[#252535] rounded-lg px-4 py-3 text-[#F8FAFC] placeholder-[#5B8FD4] focus:outline-none focus:border-[#D4A017] text-xs"
                  />
                  <button onClick={() => addCompetitor(campaignData.competitorInput)} className="px-4 py-3 bg-[#D4A017] hover:bg-[#E6B420] text-[#0A0A0F] rounded-lg font-semibold text-xs">
                    Add
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Data Sources */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <label className="text-[#F8FAFC] font-semibold text-xs mb-4 block uppercase">Main Channels (Select at least one)</label>
                <div className="space-y-3">
                  <label className="flex items-start gap-3 p-4 border border-[#252535] rounded-lg cursor-pointer hover:bg-[#1E1E2E]/50 transition-colors">
                    <input 
                      type="checkbox" 
                      checked={campaignData.sources.news_and_web} 
                      onChange={(e) => setCampaignData({...campaignData, sources: {...campaignData.sources, news_and_web: e.target.checked}})}
                      className="w-4 h-4 accent-[#D4A017] mt-1" 
                    />
                    <div className="flex-1">
                      <p className="text-[#F8FAFC] text-sm font-medium">News & Web</p>
                      <p className="text-[#94A3B8] text-xs mt-1">Monitor news outlets, blogs, and web mentions</p>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-4 border border-[#252535] rounded-lg cursor-pointer hover:bg-[#1E1E2E]/50 transition-colors">
                    <input 
                      type="checkbox" 
                      checked={campaignData.sources.social_pulse} 
                      onChange={(e) => setCampaignData({...campaignData, sources: {...campaignData.sources, social_pulse: e.target.checked}})}
                      className="w-4 h-4 accent-[#D4A017] mt-1" 
                    />
                    <div className="flex-1">
                      <p className="text-[#F8FAFC] text-sm font-medium">Social Media Pulse</p>
                      <p className="text-[#94A3B8] text-xs mt-1">Disabling saves API credits and speeds up processing</p>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: KPIs & Alerts */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <label className="text-[#F8FAFC] font-semibold text-xs mb-4 block uppercase">Key Performance Indicators (KPIs)</label>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-[#F8FAFC] text-xs font-medium">Sentiment Target</span>
                      <span className="text-[#D4A017] text-xs font-bold">{campaignData.kpis.sentiment_target}%</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      value={campaignData.kpis.sentiment_target}
                      onChange={(e) => setCampaignData({...campaignData, kpis: {...campaignData.kpis, sentiment_target: parseInt(e.target.value)}})}
                      className="w-full accent-[#D4A017]"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-[#F8FAFC] text-xs font-medium">Share of Voice (SOV) Target</span>
                      <span className="text-[#D4A017] text-xs font-bold">{campaignData.kpis.share_of_voice_target}%</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      value={campaignData.kpis.share_of_voice_target}
                      onChange={(e) => setCampaignData({...campaignData, kpis: {...campaignData.kpis, share_of_voice_target: parseInt(e.target.value)}})}
                      className="w-full accent-[#D4A017]"
                    />
                  </div>

                  <div>
                    <label className="text-[#F8FAFC] text-xs font-medium mb-2 block">Total Mention Volume Target</label>
                    <input 
                      type="number" 
                      value={campaignData.kpis.volume_target}
                      onChange={(e) => setCampaignData({...campaignData, kpis: {...campaignData.kpis, volume_target: parseInt(e.target.value)}})}
                      placeholder="e.g., 5000" 
                      className="w-full bg-[#1E1E2E] border border-[#252535] rounded-lg px-4 py-3 text-[#F8FAFC] placeholder-[#5B8FD4] focus:outline-none focus:border-[#D4A017] text-xs"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-[#1E1E2E] pt-6">
                <label className="text-[#F8FAFC] font-semibold text-xs mb-3 block uppercase">Crisis Alert Threshold</label>
                <input 
                  type="number" 
                  value={campaignData.crisis_alert_threshold}
                  onChange={(e) => setCampaignData({...campaignData, crisis_alert_threshold: parseInt(e.target.value)})}
                  placeholder="Trigger alert if negative mentions exceed this" 
                  className="w-full bg-[#1E1E2E] border border-[#252535] rounded-lg px-4 py-3 text-[#F8FAFC] placeholder-[#5B8FD4] focus:outline-none focus:border-[#D4A017] text-xs"
                />
              </div>

              <div>
                <label className="text-[#F8FAFC] font-semibold text-xs mb-3 block uppercase">Alert Recipients</label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {campaignData.alert_emails.map((email) => (
                    <div key={email} className="bg-[#D4A017] text-[#0A0A0F] px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-2">
                      {email}
                      <button onClick={() => setCampaignData({...campaignData, alert_emails: campaignData.alert_emails.filter(e => e !== email)})}>
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input 
                    type="email" 
                    value={campaignData.alertEmailInput} 
                    onChange={(e) => setCampaignData({...campaignData, alertEmailInput: e.target.value})}
                    onKeyPress={(e) => e.key === 'Enter' && addAlertEmail(campaignData.alertEmailInput)}
                    placeholder="Add email address" 
                    className="flex-1 bg-[#1E1E2E] border border-[#252535] rounded-lg px-4 py-3 text-[#F8FAFC] placeholder-[#5B8FD4] focus:outline-none focus:border-[#D4A017] text-xs"
                  />
                  <button onClick={() => addAlertEmail(campaignData.alertEmailInput)} className="px-4 py-3 bg-[#D4A017] hover:bg-[#E6B420] text-[#0A0A0F] rounded-lg font-semibold text-xs">
                    Add
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Schedule & Automation */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <label className="text-[#F8FAFC] font-semibold text-xs mb-4 block uppercase">Analysis Type</label>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-4 border border-[#252535] rounded-lg cursor-pointer hover:bg-[#1E1E2E]/50">
                    <input 
                      type="radio" 
                      name="analysis_type" 
                      value="snapshot"
                      checked={campaignData.analysis_type === 'snapshot'}
                      onChange={(e) => setCampaignData({...campaignData, analysis_type: e.target.value as 'snapshot' | 'live'})}
                      className="w-4 h-4 accent-[#D4A017]"
                    />
                    <div className="flex-1">
                      <p className="text-[#F8FAFC] text-sm font-medium">Historical Snapshot</p>
                      <p className="text-[#94A3B8] text-xs mt-1">Runs once for a specific date range</p>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-4 border border-[#252535] rounded-lg cursor-pointer hover:bg-[#1E1E2E]/50">
                    <input 
                      type="radio" 
                      name="analysis_type" 
                      value="live"
                      checked={campaignData.analysis_type === 'live'}
                      onChange={(e) => setCampaignData({...campaignData, analysis_type: e.target.value as 'snapshot' | 'live'})}
                      className="w-4 h-4 accent-[#D4A017]"
                    />
                    <div className="flex-1">
                      <p className="text-[#F8FAFC] text-sm font-medium">Live Tracker (Compounding)</p>
                      <p className="text-[#94A3B8] text-xs mt-1">Continuous monitoring with scheduled runs</p>
                    </div>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[#F8FAFC] font-semibold text-xs mb-3 block uppercase">Start Date</label>
                  <input 
                    type="date" 
                    value={campaignData.date_start}
                    onChange={(e) => setCampaignData({...campaignData, date_start: e.target.value})}
                    className="w-full bg-[#1E1E2E] border border-[#252535] rounded-lg px-4 py-3 text-[#F8FAFC] focus:outline-none focus:border-[#D4A017] text-xs"
                  />
                </div>
                <div>
                  <label className="text-[#F8FAFC] font-semibold text-xs mb-3 block uppercase">End Date</label>
                  <input 
                    type="date" 
                    value={campaignData.date_end}
                    onChange={(e) => setCampaignData({...campaignData, date_end: e.target.value})}
                    className="w-full bg-[#1E1E2E] border border-[#252535] rounded-lg px-4 py-3 text-[#F8FAFC] focus:outline-none focus:border-[#D4A017] text-xs"
                  />
                </div>
              </div>

              {campaignData.analysis_type === 'live' && (
                <>
                  <div>
                    <label className="text-[#F8FAFC] font-semibold text-xs mb-3 block uppercase">Schedule Interval</label>
                    <div className="relative">
                      <select 
                        value={campaignData.schedule_interval}
                        onChange={(e) => setCampaignData({...campaignData, schedule_interval: e.target.value as any})}
                        className="w-full bg-[#1E1E2E] border border-[#252535] rounded-lg px-4 py-3 text-[#F8FAFC] focus:outline-none focus:border-[#D4A017] appearance-none text-xs"
                      >
                        <option value="minute">Every Minute</option>
                        <option value="five_min">Every 5 Minutes</option>
                        <option value="hour">Every Hour</option>
                        <option value="day">Every Day</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8] pointer-events-none" />
                    </div>
                  </div>

                  {campaignData.schedule_interval === 'day' && (
                    <div>
                      <label className="text-[#F8FAFC] font-semibold text-xs mb-3 block uppercase">Specific Times (Daily)</label>
                      <div className="space-y-2">
                        {campaignData.specific_times.map((time, index) => (
                          <div key={index} className="flex gap-2">
                            <input 
                              type="time" 
                              value={time}
                              onChange={(e) => {
                                const newTimes = [...campaignData.specific_times]
                                newTimes[index] = e.target.value
                                setCampaignData({...campaignData, specific_times: newTimes})
                              }}
                              className="flex-1 bg-[#1E1E2E] border border-[#252535] rounded-lg px-4 py-3 text-[#F8FAFC] focus:outline-none focus:border-[#D4A017] text-xs"
                            />
                            <button 
                              onClick={() => setCampaignData({...campaignData, specific_times: campaignData.specific_times.filter((_, i) => i !== index)})}
                              className="px-3 py-3 text-[#E84242] hover:bg-[#1E1E2E] rounded-lg"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                        <button 
                          onClick={() => setCampaignData({...campaignData, specific_times: [...campaignData.specific_times, '12:00']})}
                          className="w-full px-4 py-3 border border-[#252535] text-[#D4A017] rounded-lg hover:bg-[#1E1E2E] transition-colors flex items-center justify-center gap-2 text-xs font-medium"
                        >
                          <Plus className="w-4 h-4" />
                          Add Time
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {/* STEP 5: Review & Launch */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div className="bg-[#1E1E2E] rounded-lg p-4 border border-[#252535]">
                <p className="text-[#F8FAFC] font-semibold text-xs uppercase mb-4">Campaign Summary</p>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[#94A3B8] text-xs mb-1">Campaign Name</p>
                      <p className="text-[#D4A017] font-semibold text-sm">{campaignData.campaignName}</p>
                    </div>
                    <div>
                      <p className="text-[#94A3B8] text-xs mb-1">Target Brand</p>
                      <p className="text-[#D4A017] font-semibold text-sm">{campaignData.targetBrand}</p>
                    </div>
                    <div>
                      <p className="text-[#94A3B8] text-xs mb-1">Industry</p>
                      <p className="text-[#D4A017] font-semibold text-sm capitalize">{campaignData.industry}</p>
                    </div>
                    <div>
                      <p className="text-[#94A3B8] text-xs mb-1">Competitors</p>
                      <p className="text-[#D4A017] font-semibold text-sm">{campaignData.competitors.length} selected</p>
                    </div>
                  </div>

                  <div className="border-t border-[#252535] pt-4">
                    <p className="text-[#94A3B8] text-xs mb-2">Data Sources</p>
                    <div className="flex gap-2 flex-wrap">
                      {campaignData.sources.news_and_web && <span className="px-3 py-1 bg-[#D4A017]/20 text-[#D4A017] rounded text-xs font-medium">📰 News & Web</span>}
                      {campaignData.sources.social_pulse && <span className="px-3 py-1 bg-[#D4A017]/20 text-[#D4A017] rounded text-xs font-medium">📱 Social Pulse</span>}
                    </div>
                  </div>

                  <div className="border-t border-[#252535] pt-4">
                    <p className="text-[#94A3B8] text-xs mb-3">KPI Targets</p>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="bg-[#0A0A0F]/50 p-2 rounded">
                        <p className="text-[#94A3B8]">Sentiment</p>
                        <p className="text-[#2ECC8A] font-bold">{campaignData.kpis.sentiment_target}%</p>
                      </div>
                      <div className="bg-[#0A0A0F]/50 p-2 rounded">
                        <p className="text-[#94A3B8]">SOV Target</p>
                        <p className="text-[#2ECC8A] font-bold">{campaignData.kpis.share_of_voice_target}%</p>
                      </div>
                      <div className="bg-[#0A0A0F]/50 p-2 rounded">
                        <p className="text-[#94A3B8]">Volume</p>
                        <p className="text-[#2ECC8A] font-bold">{campaignData.kpis.volume_target}</p>
                      </div>
                      <div className="bg-[#0A0A0F]/50 p-2 rounded">
                        <p className="text-[#94A3B8]">Crisis Threshold</p>
                        <p className="text-[#E84242] font-bold">{campaignData.crisis_alert_threshold}</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-[#252535] pt-4">
                    <p className="text-[#94A3B8] text-xs mb-2">Analysis Type</p>
                    <p className="text-[#D4A017] font-semibold text-sm capitalize">{campaignData.analysis_type === 'snapshot' ? 'Historical Snapshot' : 'Live Tracker'}</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#0A0A0F]/50 border border-[#D4A017]/30 rounded-lg p-4">
                <p className="text-[#D4A017] text-xs"><strong>Ready to launch?</strong> Click the button below to deploy this campaign and begin data collection.</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-3 p-6 border-t border-[#1E1E2E] bg-[#12121A] flex-shrink-0">
          <button 
            onClick={handleClose} 
            className="px-4 py-2 border border-[#1E1E2E] text-[#F8FAFC] rounded-lg font-semibold hover:bg-[#1E1E2E] text-xs"
          >
            Cancel
          </button>
          <div className="flex gap-3">
            {currentStep > 1 && (
              <button 
                onClick={() => setCurrentStep(currentStep - 1)}
                className="px-4 py-2 border border-[#1E1E2E] text-[#F8FAFC] rounded-lg font-semibold hover:bg-[#1E1E2E] text-xs"
              >
                Back
              </button>
            )}
            <button 
              onClick={() => {
                if (currentStep === steps.length) {
                  handleLaunchCampaign()
                } else {
                  setCurrentStep(currentStep + 1)
                }
              }}
              className="px-6 py-2 bg-[#D4A017] hover:bg-[#E6B420] text-[#0A0A0F] rounded-lg font-semibold text-xs"
            >
              {currentStep === steps.length ? '🚀 Launch Campaign' : 'Next Step'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
