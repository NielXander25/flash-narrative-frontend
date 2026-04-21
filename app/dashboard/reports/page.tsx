'use client'

import { useState } from 'react'
import { Plus, Download, FileText, MoreVertical, Send, Share2 } from 'lucide-react'
import { SendReportModal } from '@/components/dashboard/modals'
import { 
  handleExportReport, 
  handleDownloadReport, 
  handleShareReport, 
  handleDeleteReport,
  handleGenerateReport,
  showNotification 
} from '@/lib/button-handlers'

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
      status: 'REPORT SENT',
      statusIcon: '✓',
      statusColor: 'bg-[#2ECC8A]/20 border-[#2ECC8A] text-[#2ECC8A]',
      actions: ['view', 'edit', 'delete']
    },
    {
      id: 2,
      campaign: 'GTBank Product Launch',
      type: 'Final',
      createdDate: '18 Jan 2026',
      dueDate: '25 Jan 2026',
      status: 'REPORT PENDING',
      statusIcon: '⏱',
      statusColor: 'bg-[#E8832A]/20 border-[#E8832A] text-[#E8832A]',
      actions: ['download', 'share', 'delete']
    },
    {
      id: 3,
      campaign: 'Dangote Brand Monitor',
      type: 'Sample',
      createdDate: '15 Jan 2026',
      dueDate: '02/02/2026',
      status: 'IN PROGRESS',
      statusIcon: '●',
      statusColor: 'bg-[#5B8FD4]/20 border-[#5B8FD4] text-[#5B8FD4]',
      actions: ['download', 'share']
    },
    {
      id: 4,
      campaign: 'MTN Crisis Response',
      type: 'MTN',
      createdDate: '12 Jan 2026',
      dueDate: '20 Jan 2026',
      status: 'DRAFT',
      statusIcon: '◯',
      statusColor: 'bg-[#94A3B8]/20 border-[#94A3B8] text-[#94A3B8]',
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
             New Report
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-6xl space-y-4">
          {/* Reports List */}
          {reports.length > 0 ? (
            <div className="space-y-3">
              {reports.map((report) => (
                <div key={report.id} className="bg-[#12121A] border border-[#1E1E2E] rounded-lg p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div>
                          <h3 className="text-sm sm:text-base font-semibold text-[#F8FAFC]">{report.campaign}</h3>
                          <p className="text-xs text-[#94A3B8] mt-1">{report.type} • Created {report.createdDate}</p>
                        </div>
                        {/* Status Badge - Styled like 2nd screenshot */}
                        <div className={`px-3 py-1 rounded-full border text-xs font-semibold flex items-center gap-2 whitespace-nowrap ${report.statusColor}`}>
                          <span>{report.statusIcon}</span>
                          {report.status}
                        </div>
                      </div>
                      <p className="text-xs text-[#5B8FD4]">Due: {report.dueDate}</p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      {report.actions.includes('download') && (
                        <button
                          onClick={() => handleDownloadReport(String(report.id), report.campaign)}
                          className="p-2 hover:bg-[#1E1E2E] rounded-lg transition-colors"
                          title="Download"
                        >
                          <Download className="w-4 h-4 text-[#5B8FD4]" />
                        </button>
                      )}
                      {report.actions.includes('share') && (
                        <button
                          onClick={() => handleShareReport(String(report.id))}
                          className="p-2 hover:bg-[#1E1E2E] rounded-lg transition-colors"
                          title="Share"
                        >
                          <Share2 className="w-4 h-4 text-[#5B8FD4]" />
                        </button>
                      )}
                      {report.actions.includes('edit') && (
                        <button
                          onClick={() => showNotification('Opening editor...', 'info')}
                          className="p-2 hover:bg-[#1E1E2E] rounded-lg transition-colors"
                          title="Edit"
                        >
                          <FileText className="w-4 h-4 text-[#5B8FD4]" />
                        </button>
                      )}
                      {report.actions.includes('delete') && (
                        <button
                          onClick={() => handleDeleteReport(String(report.id))}
                          className="p-2 hover:bg-[#1E1E2E] rounded-lg transition-colors"
                          title="Delete"
                        >
                          <MoreVertical className="w-4 h-4 text-[#94A3B8]" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-[#F8FAFC] font-semibold text-lg mb-2">No reports generated yet.</h3>
              <p className="text-[#94A3B8] text-sm mb-6">Start by selecting a campaign and clicking "Build" to generate your first intelligence report.</p>
              <button 
                onClick={() => setShowGenerateModal(true)}
                className="px-6 py-2 bg-[#D4A017] hover:bg-[#E6B420] text-[#0A0A0F] rounded-lg font-semibold transition-colors text-sm flex items-center justify-center gap-2 mx-auto"
              >
                <Plus className="w-4 h-4" />
                + New Report
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <SendReportModal 
        isOpen={showReportModal} 
        onClose={() => setShowReportModal(false)} 
      />
    </div>
  )
}
