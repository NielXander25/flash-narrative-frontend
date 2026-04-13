'use client'

import { useState } from 'react'
import { X, AlertTriangle, Mail, ChevronDown } from 'lucide-react'

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
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-lg bg-[#E84242]/20 flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-6 h-6 text-[#E84242]" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#F8FAFC]">Revoke API Key?</h2>
            <p className="text-[#94A3B8] text-sm">IRREVERSIBLE ACTION</p>
          </div>
        </div>

        <p className="text-[#94A3B8] text-sm mb-8 leading-relaxed">
          Revoking this {keyName} key will immediately terminate all active integrations and block requests using this key.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            onClick={onClose}
            className="flex-1 px-4 py-3 border border-[#1E1E2E] text-[#F8FAFC] rounded-lg font-semibold hover:bg-[#1E1E2E] transition-colors order-2 sm:order-1"
          >
            Cancel
          </button>
          <button className="flex-1 px-4 py-3 bg-[#E8832A] hover:bg-[#D46E1F] text-white rounded-lg font-semibold transition-colors order-1 sm:order-2">
            Revoke Key
          </button>
        </div>
      </div>
    </div>
  )
}

interface SendReportModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SendReportModal({ isOpen, onClose }: SendReportModalProps) {
  const [deliveryOptions, setDeliveryOptions] = useState({
    subscription: true,
    selfService: false
  })

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#12121A] rounded-lg border border-[#1E1E2E] w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-6 sm:p-8 border-b border-[#1E1E2E] bg-[#12121A]">
          <h2 className="text-xl sm:text-2xl font-bold text-[#F8FAFC]">Send Report to Client</h2>
          <button onClick={onClose} className="text-[#94A3B8] hover:text-[#F8FAFC] flex-shrink-0">
            <X className="w-5 sm:w-6 h-5 sm:h-6" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-6 sm:space-y-8">
          {/* Recipient Info */}
          <div>
            <label className="text-[#F8FAFC] font-semibold text-sm mb-3 block">RECIPIENT'S</label>
            <input 
              type="email" 
              placeholder="example@client-acronym.io"
              className="w-full bg-[#1E1E2E] border border-[#252535] rounded-lg px-4 py-3 text-[#F8FAFC] placeholder-[#5B8FD4] focus:outline-none focus:border-[#D4A017] transition-colors text-sm"
            />
          </div>

          {/* Subject & Message */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="text-[#F8FAFC] font-semibold text-sm mb-3 block">SUBJECT</label>
              <input 
                type="text" 
                placeholder="URGENT Q1 Intelligence Briefing"
                className="w-full bg-[#1E1E2E] border border-[#252535] rounded-lg px-4 py-3 text-[#F8FAFC] placeholder-[#5B8FD4] text-sm focus:outline-none focus:border-[#D4A017] transition-colors"
              />
            </div>
            <div>
              <label className="text-[#F8FAFC] font-semibold text-sm mb-3 block">MESSAGE</label>
              <input 
                type="text" 
                placeholder="Please find attached your monthly brief"
                className="w-full bg-[#1E1E2E] border border-[#252535] rounded-lg px-4 py-3 text-[#F8FAFC] placeholder-[#5B8FD4] text-sm focus:outline-none focus:border-[#D4A017] transition-colors"
              />
            </div>
          </div>

          {/* Delivery Options */}
          <div>
            <label className="text-[#F8FAFC] font-semibold text-sm mb-4 block">DELIVERY PREFS</label>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={deliveryOptions.subscription}
                  onChange={(e) => setDeliveryOptions({...deliveryOptions, subscription: e.target.checked})}
                  className="w-4 h-4 bg-[#1E1E2E] border border-[#252535] rounded cursor-pointer"
                />
                <span className="text-[#F8FAFC] text-sm font-medium">SUBSCRIPTION API ON</span>
                <span className="ml-auto w-3 h-3 rounded-full bg-[#2ECC8A]" />
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={deliveryOptions.selfService}
                  onChange={(e) => setDeliveryOptions({...deliveryOptions, selfService: e.target.checked})}
                  className="w-4 h-4 bg-[#1E1E2E] border border-[#252535] rounded cursor-pointer"
                />
                <span className="text-[#F8FAFC] text-sm font-medium">SELF-REPORT CHAT</span>
              </label>
            </div>
          </div>

          {/* Attachments Section */}
          <div>
            <label className="text-[#F8FAFC] font-semibold text-sm mb-3 block">CUSTOM ATTACHMENTS</label>
            <div className="border-2 border-dashed border-[#1E1E2E] rounded-lg p-6 text-center hover:border-[#D4A017] transition-colors">
              <p className="text-[#94A3B8] text-sm">Drag and drop files or click to select</p>
              <p className="text-[#5B8FD4] text-xs mt-1">PDF, Excel, or doc files supported</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 sm:p-8 border-t border-[#1E1E2E] bg-[#12121A]">
          <button 
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-3 border border-[#1E1E2E] text-[#F8FAFC] rounded-lg font-semibold hover:bg-[#1E1E2E] transition-colors"
          >
            Drafts
          </button>
          <button className="w-full sm:w-auto px-8 py-3 bg-[#D4A017] hover:bg-[#E6B420] text-[#0A0A0F] rounded-lg font-semibold transition-colors">
            🔒 SECURE TRANSMIT
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

export function InitiateCampaignModal({ isOpen, onClose }: InitiateCampaignModalProps) {
  const [selectedAgency, setSelectedAgency] = useState('')
  const [selectedIndustry, setSelectedIndustry] = useState('')
  const [currentStep, setCurrentStep] = useState(1)

  if (!isOpen) return null

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    } else {
      onClose()
      setCurrentStep(1)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-[#12121A] rounded-lg border border-[#1E1E2E] w-full max-w-md my-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#1E1E2E]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#D4A017] flex items-center justify-center flex-shrink-0">
              <span className="text-[#0A0A0F] font-bold">⚡</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-[#F8FAFC]">New Campaign</h2>
          </div>
          <button onClick={onClose} className="text-[#94A3B8] hover:text-[#F8FAFC] flex-shrink-0">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Indicator */}
        <div className="px-6 pt-6 pb-4">
          <div className="flex items-center gap-1">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex-1 flex items-center">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-center flex-shrink-0 ${
                  step <= currentStep 
                    ? 'bg-[#D4A017] text-[#0A0A0F]' 
                    : 'bg-[#1E1E2E] text-[#94A3B8]'
                }`}>
                  {step}
                </div>
                {step < 3 && (
                  <div className={`flex-1 h-1 mx-1 ${
                    step < currentStep ? 'bg-[#D4A017]' : 'bg-[#1E1E2E]'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
          <p className="text-[#94A3B8] text-xs mt-3">
            {currentStep === 1 && 'Step 1 of 3: Select Your Agency'}
            {currentStep === 2 && 'Step 2 of 3: Choose Industry'}
            {currentStep === 3 && 'Step 3 of 3: Configure Data Stream'}
          </p>
        </div>

        {/* Content - Scrollable */}
        <div className="px-6 py-6 space-y-6 max-h-[50vh] sm:max-h-[60vh] overflow-y-auto">
          {/* Step 1: Agency Select */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <label className="text-[#F8FAFC] font-semibold text-sm mb-3 block">SELECT YOUR AGENCY</label>
                <div className="relative">
                  <select 
                    value={selectedAgency}
                    onChange={(e) => setSelectedAgency(e.target.value)}
                    className="w-full bg-[#1E1E2E] border border-[#252535] rounded-lg px-4 py-3 text-[#F8FAFC] appearance-none focus:outline-none focus:border-[#D4A017] transition-colors text-sm"
                  >
                    <option value="">Choose Agency</option>
                    <option value="flash">Flash Narrative Agency</option>
                    <option value="another">Another Agency</option>
                    <option value="third">Third Agency</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8] pointer-events-none" />
                </div>
              </div>
              <p className="text-[#94A3B8] text-xs bg-[#1E1E2E] rounded-lg p-3 border border-[#252535]">
                💡 Your agency determines access permissions and billing configuration.
              </p>
            </div>
          )}

          {/* Step 2: Industry Select */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <label className="text-[#F8FAFC] font-semibold text-sm mb-3 block">SELECT INDUSTRY</label>
                <div className="relative">
                  <select 
                    value={selectedIndustry}
                    onChange={(e) => setSelectedIndustry(e.target.value)}
                    className="w-full bg-[#1E1E2E] border border-[#252535] rounded-lg px-4 py-3 text-[#F8FAFC] appearance-none focus:outline-none focus:border-[#D4A017] transition-colors text-sm"
                  >
                    <option value="">Choose Industry</option>
                    <option value="finance">Finance & Banking</option>
                    <option value="tech">Technology</option>
                    <option value="energy">Energy</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="retail">Retail</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8] pointer-events-none" />
                </div>
              </div>
              <p className="text-[#94A3B8] text-xs bg-[#1E1E2E] rounded-lg p-3 border border-[#252535]">
                💡 Industry selection enables sector-specific keyword targeting.
              </p>
            </div>
          )}

          {/* Step 3: Extra Options */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="space-y-3 bg-[#1E1E2E] rounded-lg p-4 border border-[#252535]">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded cursor-pointer" defaultChecked />
                  <span className="text-[#F8FAFC] text-sm font-medium">Use A-Board Benchmark Credentials</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded cursor-pointer" />
                  <span className="text-[#F8FAFC] text-sm font-medium">Skip A-Board & Real Competitors</span>
                </label>
              </div>
              <div className="bg-[#1E1E2E]/50 rounded-lg p-4 border border-[#252535]">
                <p className="text-[#94A3B8] text-xs leading-relaxed">
                  ✅ Your campaign will start monitoring real-time mentions across 500+ news sources and social platforms within the next 24 hours.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 p-6 border-t border-[#1E1E2E] bg-[#12121A]">
          <button 
            onClick={onClose}
            className="flex-1 px-4 py-3 border border-[#1E1E2E] text-[#F8FAFC] rounded-lg font-semibold hover:bg-[#1E1E2E] transition-colors order-2 sm:order-1"
          >
            CANCEL
          </button>
          <button 
            onClick={handleNext}
            className="flex-1 px-4 py-3 bg-[#D4A017] hover:bg-[#E6B420] text-[#0A0A0F] rounded-lg font-semibold transition-colors order-1 sm:order-2"
          >
            {currentStep === 3 ? 'LAUNCH CAMPAIGN' : 'NEXT STEP'}
          </button>
        </div>
      </div>
    </div>
  )
}
