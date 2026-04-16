'use client'

import { useState } from 'react'
import { Plus, Download, FileText, Clock, CheckCircle, AlertCircle, MoreVertical, Send } from 'lucide-react'
import { SendReportModal } from '@/components/dashboard/modals'

export default function ReportsPage() {
  const [showReportModal, setShowReportModal] = useState(false)
  const [showGenerateModal, setShowGenerateModal] = useState(false)

  const reports = [
    {
      id: 1,
      campaign: 'Zenith Bank Q2 Reputation',
      type: 'Draft',
      createdDate: '21 Jan 2026',
      dueDate: '31 Jan 2026',
      status: 'PENDING REVIEW',
      statusColor: 'bg-[#94A3B8]',
      actions: ['view', 'edit', 'delete']
    },
    {
      id: 2,
      campaign: 'GTBank Product Launch',
      type: 'Final',
      createdDate: '18 Jan 2026',
      dueDate: '25 Jan 2026',
      status: 'URGENT REVISION',
      statusColor: 'bg-[#E8832A]',
      actions: ['download', 'share', 'delete']
    },
    {
      id: 3,
      campaign: 'Dangote Brand Monitor',
      type: 'Sample',
      createdDate: '15 Jan 2026',
      dueDate: '02/02/2026',
      status: '6 REVISIONS',
      statusColor: 'bg-[#E8832A]',
      actions: ['download', 'share']
    },
    {
      id: 4,
      campaign: 'MTN Crisis Response',
      type: 'MTN',
      createdDate: '12 Jan 2026',
      dueDate: '20 Jan 2026',
      status: '2 EDITS',
      statusColor: 'bg-[#5B8FD4]',
      actions: ['download', 'share']
    }
  ]

  return (
    <div className="bg-[#0A0A0F] min-h-screen">
      {/* Header */}
      <div className="border-b border-[#1E1E2E] px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#F8FAFC]">Reports Command Center</h1>
            <p className="text-[#94A3B8] mt-2 text-sm sm:text-base">Build, export and send client presentations.</p>
          </div>
          <button 
            onClick={() => setShowGenerateModal(true)}
            className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-[#D4A017] hover:bg-[#E6B420] text-[#0A0A0F] rounded-lg font-semibold transition-colors text-sm flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            + New Report
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 sm:p-6 lg:p-8">
        {/* Reports Table Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-[#F8FAFC]">REPORTS</h2>
              <p className="text-[#94A3B8] text-xs mt-1">8 total reports this month</p>
            </div>
            <button className="px-3 py-1 text-[#D4A017] hover:text-[#E6B420] text-xs font-semibold transition-colors">
              VIEW ALL
            </button>
          </div>

          {/* Table */}
          <div className="bg-[#12121A] rounded-lg border border-[#1E1E2E] overflow-hidden">
            {/* Table Header */}
            <div className="hidden md:grid md:grid-cols-7 gap-4 p-6 border-b border-[#1E1E2E] bg-[#0A0A0F]">
              <div className="text-[#94A3B8] text-xs font-semibold uppercase">Campaign</div>
              <div className="text-[#94A3B8] text-xs font-semibold uppercase">Type</div>
              <div className="text-[#94A3B8] text-xs font-semibold uppercase">Created</div>
              <div className="text-[#94A3B8] text-xs font-semibold uppercase">Due Date</div>
              <div className="text-[#94A3B8] text-xs font-semibold uppercase">Status</div>
              <div className="text-[#94A3B8] text-xs font-semibold uppercase">Actions</div>
              <div></div>
            </div>

            {/* Table Body */}
            {reports.map((report, idx) => (
              <div 
                key={report.id}
                className="p-6 border-b border-[#1E1E2E] last:border-0 hover:bg-[#1E1E2E]/50 transition-colors"
              >
                {/* Mobile View */}
                <div className="md:hidden mb-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-[#F8FAFC] text-sm font-semibold">{report.campaign}</h3>
                      <p className="text-[#94A3B8] text-xs mt-1">{report.type}</p>
                    </div>
                    <button className="text-[#94A3B8] hover:text-[#F8FAFC]">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <p className="text-[#94A3B8] text-xs uppercase mb-1">Created</p>
                      <p className="text-[#F8FAFC] text-xs">{report.createdDate}</p>
                    </div>
                    <div>
                      <p className="text-[#94A3B8] text-xs uppercase mb-1">Due</p>
                      <p className="text-[#F8FAFC] text-xs">{report.dueDate}</p>
                    </div>
                    <div>
                      <p className="text-[#94A3B8] text-xs uppercase mb-1">Status</p>
                      <span className={`${report.statusColor} text-white text-xs px-2 py-1 rounded inline-block`}>
                        {report.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Desktop View */}
                <div className="hidden md:grid md:grid-cols-7 gap-4 items-center">
                  <div>
                    <input type="checkbox" className="w-4 h-4 rounded cursor-pointer bg-[#1E1E2E] border border-[#252535]" />
                  </div>
                  <div>
                    <p className="text-[#F8FAFC] text-sm font-semibold">{report.campaign}</p>
                    <p className="text-[#94A3B8] text-xs mt-1">{report.type}</p>
                  </div>
                  <div className="text-[#F8FAFC] text-sm">{report.createdDate}</div>
                  <div className="text-[#F8FAFC] text-sm">{report.dueDate}</div>
                  <div>
                    <span className={`${report.statusColor} text-white text-xs px-3 py-1 rounded font-semibold`}>
                      {report.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setShowReportModal(true)}
                      className="p-1 hover:bg-[#1E1E2E] rounded transition-colors text-[#94A3B8] hover:text-[#F8FAFC]"
                      title="Send"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                    <button className="p-1 hover:bg-[#1E1E2E] rounded transition-colors text-[#94A3B8] hover:text-[#F8FAFC]" title="More options">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Empty State */}
        <div className="text-center py-12">
          <div className="w-12 h-12 rounded-lg bg-[#1E1E2E] flex items-center justify-center mx-auto mb-4">
            <FileText className="w-6 h-6 text-[#94A3B8]" />
          </div>
          <h3 className="text-[#F8FAFC] font-semibold text-lg mb-2">No reports generated yet.</h3>
          <p className="text-[#94A3B8] text-sm mb-6 max-w-md mx-auto">
            Start by selecting a campaign and clicking "Build" to generate your first intelligence report.
          </p>
          <button 
            onClick={() => setShowGenerateModal(true)}
            className="px-6 py-2 bg-[#D4A017] hover:bg-[#E6B420] text-[#0A0A0F] rounded-lg font-semibold transition-colors text-sm flex items-center justify-center gap-2 mx-auto"
          >
            <Plus className="w-4 h-4" />
            + New Report
          </button>
        </div>

        {/* Footer Text */}
        <div className="text-center text-[#5B8FD4] text-xs mt-12 pt-8 border-t border-[#1E1E2E]">
          © 2026 Flash Narrative Inc. All rights reserved.
        </div>
      </div>

      {/* Modals */}
      <SendReportModal 
        isOpen={showReportModal} 
        onClose={() => setShowReportModal(false)} 
      />

      {/* Generate Report Modal */}
      <GenerateReportModal 
        isOpen={showGenerateModal}
        onClose={() => setShowGenerateModal(false)}
      />
    </div>
  )
}

// Generate Report Modal Component
interface GenerateReportModalProps {
  isOpen: boolean
  onClose: () => void
}

function GenerateReportModal({ isOpen, onClose }: GenerateReportModalProps) {
  const [selectedCampaign, setSelectedCampaign] = useState('')
  const [templateId, setTemplateId] = useState('')

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#12121A] rounded-lg border border-[#1E1E2E] w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#1E1E2E]">
          <div>
            <h2 className="text-lg font-bold text-[#F8FAFC]">Generate Report</h2>
            <p className="text-[#94A3B8] text-xs mt-1">Select campaign and template to build report</p>
          </div>
          <button onClick={onClose} className="text-[#94A3B8] hover:text-[#F8FAFC]">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Campaign Selection */}
          <div>
            <label className="text-[#F8FAFC] font-semibold text-xs mb-3 block uppercase">Select Campaign</label>
            <div className="relative">
              <select 
                value={selectedCampaign}
                onChange={(e) => setSelectedCampaign(e.target.value)}
                className="w-full bg-[#1E1E2E] border border-[#252535] rounded-lg px-4 py-3 text-[#F8FAFC] appearance-none focus:outline-none focus:border-[#D4A017] transition-colors text-sm"
              >
                <option value="">Choose Campaign...</option>
                <option value="zenith">Zenith Bank Q2 Reputation</option>
                <option value="gtbank">GTBank Product Launch</option>
                <option value="dangote">Dangote Brand Monitor</option>
                <option value="mtn">MTN Crisis Response</option>
              </select>
              <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8] pointer-events-none" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

          {/* Template Selection */}
          <div>
            <label className="text-[#F8FAFC] font-semibold text-xs mb-3 block uppercase">Select Template</label>
            <div className="space-y-3">
              {[
                { id: 'exec', name: 'Executive Summary', desc: 'Key findings only' },
                { id: 'full', name: 'Full Intelligence Report', desc: 'Complete analysis with charts' },
                { id: 'brief', name: 'Brief Update', desc: 'Weekly status brief' }
              ].map((template) => (
                <label key={template.id} className="flex items-center gap-3 p-3 border border-[#252535] rounded-lg cursor-pointer hover:bg-[#1E1E2E] transition-colors">
                  <input 
                    type="radio" 
                    name="template"
                    value={template.id}
                    checked={templateId === template.id}
                    onChange={(e) => setTemplateId(e.target.value)}
                    className="w-4 h-4 cursor-pointer"
                  />
                  <div>
                    <p className="text-[#F8FAFC] text-sm font-semibold">{template.name}</p>
                    <p className="text-[#94A3B8] text-xs">{template.desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between gap-3 p-6 border-t border-[#1E1E2E] bg-[#0A0A0F]">
          <button 
            onClick={onClose}
            className="px-4 py-2 border border-[#1E1E2E] text-[#F8FAFC] rounded-lg font-semibold hover:bg-[#1E1E2E] transition-colors text-xs"
          >
            CANCEL
          </button>
          <button className="px-6 py-2 bg-[#D4A017] hover:bg-[#E6B420] text-[#0A0A0F] rounded-lg font-semibold transition-colors text-xs">
            BUILD REPORT
          </button>
        </div>
      </div>
    </div>
  )
}
