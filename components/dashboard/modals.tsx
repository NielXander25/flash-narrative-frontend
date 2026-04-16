'use client'

import { useState } from 'react'
import { X, AlertTriangle, ChevronDown } from 'lucide-react'
import { 
  handleSecureTransmit, 
  handleSaveAsDraft,
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
          Revoking this {keyName} key will immediately terminate all active integrations.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <button onClick={onClose} className="flex-1 px-4 py-3 border border-[#1E1E2E] text-[#F8FAFC] rounded-lg font-semibold hover:bg-[#1E1E2E] transition-colors order-2 sm:order-1">Cancel</button>
          <button onClick={() => { handleRevokeAPIKey(keyName); onClose() }} className="flex-1 px-4 py-3 bg-[#E8832A] hover:bg-[#D46E1F] text-white rounded-lg font-semibold transition-colors order-1 sm:order-2">Revoke Key</button>
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
  const [recipientEmail, setRecipientEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [deliveryOptions, setDeliveryOptions] = useState({ subscription: true, selfService: false })

  if (!isOpen) return null

  const handleTransmit = () => {
    if (!recipientEmail) { showNotification('Please enter recipient email', 'error'); return }
    if (!subject) { showNotification('Please enter subject', 'error'); return }
    handleSecureTransmit({ recipient: recipientEmail, subject, message, deliveryOptions, timestamp: new Date().toISOString() })
    onClose()
    setRecipientEmail('')
    setSubject('')
    setMessage('')
  }

  const handleDraft = () => {
    handleSaveAsDraft({ recipient: recipientEmail, subject, message, deliveryOptions, timestamp: new Date().toISOString() })
    onClose()
    setRecipientEmail('')
    setSubject('')
    setMessage('')
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#12121A] rounded-lg border border-[#1E1E2E] w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 flex items-center justify-between p-6 sm:p-8 border-b border-[#1E1E2E] bg-[#12121A]">
          <h2 className="text-xl sm:text-2xl font-bold text-[#F8FAFC]">Send Report to Client</h2>
          <button onClick={onClose} className="text-[#94A3B8] hover:text-[#F8FAFC] flex-shrink-0"><X className="w-5 sm:w-6 h-5 sm:h-6" /></button>
        </div>

        <div className="p-6 sm:p-8 space-y-6 sm:space-y-8">
          <div>
            <label className="text-[#F8FAFC] font-semibold text-sm mb-3 block">RECIPIENT'S EMAIL</label>
            <input type="email" value={recipientEmail} onChange={(e) => setRecipientEmail(e.target.value)} placeholder="client@example.com" className="w-full bg-[#1E1E2E] border border-[#252535] rounded-lg px-4 py-3 text-[#F8FAFC] placeholder-[#5B8FD4] focus:outline-none focus:border-[#D4A017] transition-colors text-sm" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="text-[#F8FAFC] font-semibold text-sm mb-3 block">SUBJECT</label>
              <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Report Subject" className="w-full bg-[#1E1E2E] border border-[#252535] rounded-lg px-4 py-3 text-[#F8FAFC] placeholder-[#5B8FD4] text-sm focus:outline-none focus:border-[#D4A017] transition-colors" />
            </div>
            <div>
              <label className="text-[#F8FAFC] font-semibold text-sm mb-3 block">MESSAGE</label>
              <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Additional message" className="w-full bg-[#1E1E2E] border border-[#252535] rounded-lg px-4 py-3 text-[#F8FAFC] placeholder-[#5B8FD4] text-sm focus:outline-none focus:border-[#D4A017] transition-colors" />
            </div>
          </div>

          <div>
            <label className="text-[#F8FAFC] font-semibold text-sm mb-4 block">DELIVERY OPTIONS</label>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={deliveryOptions.subscription} onChange={(e) => setDeliveryOptions({...deliveryOptions, subscription: e.target.checked})} className="w-4 h-4 bg-[#1E1E2E] border border-[#252535] rounded cursor-pointer" />
                <span className="text-[#F8FAFC] text-sm font-medium">SUBSCRIPTION API</span>
                <span className="ml-auto w-3 h-3 rounded-full bg-[#2ECC8A]" />
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={deliveryOptions.selfService} onChange={(e) => setDeliveryOptions({...deliveryOptions, selfService: e.target.checked})} className="w-4 h-4 bg-[#1E1E2E] border border-[#252535] rounded cursor-pointer" />
                <span className="text-[#F8FAFC] text-sm font-medium">SELF-SERVICE</span>
              </label>
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 sm:p-8 border-t border-[#1E1E2E] bg-[#12121A]">
          <button onClick={handleDraft} className="w-full sm:w-auto px-6 py-3 border border-[#1E1E2E] text-[#F8FAFC] rounded-lg font-semibold hover:bg-[#1E1E2E] transition-colors">Save Draft</button>
          <button onClick={handleTransmit} className="w-full sm:w-auto px-8 py-3 bg-[#D4A017] hover:bg-[#E6B420] text-[#0A0A0F] rounded-lg font-semibold transition-colors">🔒 SECURE TRANSMIT</button>
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
  const [selectedIndustry, setSelectedIndustry] = useState('')
  const [brandName, setBrandName] = useState('')
  const [campaignName, setCampaignName] = useState('')
  const [currentStep, setCurrentStep] = useState(1)

  if (!isOpen) return null

  const handleLaunchCampaign = () => {
    if (!brandName) { showNotification('Please enter brand name', 'error'); return }
    if (!campaignName) { showNotification('Please enter campaign name', 'error'); return }
    if (!selectedIndustry) { showNotification('Please select industry', 'error'); return }
    
    handleNewCampaign({ brandName, campaignName, industry: selectedIndustry, timestamp: new Date().toISOString() })
    onClose()
    setCurrentStep(1)
    setBrandName('')
    setCampaignName('')
    setSelectedIndustry('')
  }

  const handleClose = () => {
    onClose()
    setCurrentStep(1)
    setBrandName('')
    setCampaignName('')
    setSelectedIndustry('')
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#12121A] rounded-lg border border-[#1E1E2E] w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-[#1E1E2E]">
          <div>
            <h2 className="text-lg font-bold text-[#F8FAFC]">New Campaign</h2>
            <p className="text-[#94A3B8] text-xs mt-1">Step {currentStep} of 3</p>
          </div>
          <button onClick={handleClose} className="text-[#94A3B8] hover:text-[#F8FAFC]"><X className="w-5 h-5" /></button>
        </div>

        <div className="px-6 pt-6 pb-4 border-b border-[#1E1E2E]">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center flex-1">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step <= currentStep ? 'bg-[#D4A017] text-[#0A0A0F]' : 'bg-[#1E1E2E] text-[#94A3B8]'}`}>{step < currentStep ? '✓' : step}</div>
                {step < 3 && <div className={`flex-1 h-0.5 mx-2 ${step < currentStep ? 'bg-[#D4A017]' : 'bg-[#1E1E2E]'}`}></div>}
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 space-y-6 max-h-[55vh] overflow-y-auto">
          {currentStep === 1 && (
            <div className="space-y-5">
              <div>
                <label className="text-[#F8FAFC] font-semibold text-xs mb-3 block">BRAND NAME</label>
                <input type="text" value={brandName} onChange={(e) => setBrandName(e.target.value)} placeholder="e.g., Zenith Bank" className="w-full bg-[#1E1E2E] border border-[#252535] rounded-lg px-4 py-3 text-[#F8FAFC] placeholder-[#5B8FD4] text-sm focus:outline-none focus:border-[#D4A017] transition-colors" />
              </div>
              <div>
                <label className="text-[#F8FAFC] font-semibold text-xs mb-3 block">CAMPAIGN NAME</label>
                <input type="text" value={campaignName} onChange={(e) => setCampaignName(e.target.value)} placeholder="e.g., Q2 2026" className="w-full bg-[#1E1E2E] border border-[#252535] rounded-lg px-4 py-3 text-[#F8FAFC] placeholder-[#5B8FD4] text-sm focus:outline-none focus:border-[#D4A017] transition-colors" />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-5">
              <div>
                <label className="text-[#F8FAFC] font-semibold text-xs mb-3 block">INDUSTRY</label>
                <div className="relative">
                  <select value={selectedIndustry} onChange={(e) => setSelectedIndustry(e.target.value)} className="w-full bg-[#1E1E2E] border border-[#252535] rounded-lg px-4 py-3 text-[#F8FAFC] appearance-none focus:outline-none focus:border-[#D4A017] transition-colors text-sm">
                    <option value="">Select Industry...</option>
                    <option value="finance">Finance & Banking</option>
                    <option value="tech">Technology</option>
                    <option value="energy">Energy</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="retail">Retail</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8] pointer-events-none" />
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-5">
              <div className="bg-[#1E1E2E] rounded-lg p-4 border border-[#252535] space-y-3">
                <p className="text-[#F8FAFC] font-semibold text-xs">Campaign Summary</p>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between"><span className="text-[#94A3B8]">Brand:</span><span className="text-[#F8FAFC]">{brandName || 'Not set'}</span></div>
                  <div className="flex justify-between"><span className="text-[#94A3B8]">Campaign:</span><span className="text-[#F8FAFC]">{campaignName || 'Not set'}</span></div>
                  <div className="flex justify-between"><span className="text-[#94A3B8]">Industry:</span><span className="text-[#F8FAFC]">{selectedIndustry || 'Not selected'}</span></div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between gap-3 p-6 border-t border-[#1E1E2E] bg-[#12121A]">
          <button onClick={handleClose} className="px-4 py-2 border border-[#1E1E2E] text-[#F8FAFC] rounded-lg font-semibold hover:bg-[#1E1E2E] transition-colors text-xs">CANCEL</button>
          <button onClick={() => { if (currentStep === 3) { handleLaunchCampaign() } else { setCurrentStep(currentStep + 1) } }} className="px-6 py-2 bg-[#D4A017] hover:bg-[#E6B420] text-[#0A0A0F] rounded-lg font-semibold transition-colors text-xs">{currentStep === 3 ? 'LAUNCH' : 'NEXT'}</button>
        </div>
      </div>
    </div>
  )
}
