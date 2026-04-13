'use client'

import { useState } from 'react'
import { Plus, Download, Eye, MoreVertical, AlertCircle } from 'lucide-react'

interface Report {
  id: string
  projectName: string
  client: string
  generatedDate: string
  kpiScore: string
  trend: string
  status: 'completed' | 'processing' | 'failed'
}

export default function ReportsPage() {
  const [showTemplateModal, setShowTemplateModal] = useState(false)
  const [reports, setReports] = useState<Report[]>([
    {
      id: '1',
      projectName: 'Zenith Bank Q2',
      client: 'Zenith',
      generatedDate: 'Jun 1, 2026',
      kpiScore: '85.2 kA',
      trend: '+5.2%',
      status: 'completed'
    },
    {
      id: '2',
      projectName: 'GTBank Product Launch',
      client: 'GTBank',
      generatedDate: 'May 15, 2026',
      kpiScore: '92.1 kA',
      trend: '+8.3%',
      status: 'completed'
    },
    {
      id: '3',
      projectName: 'Dangote Brand Monitor',
      client: 'Dangote',
      generatedDate: 'May 8, 2026',
      kpiScore: '78.9 kA',
      trend: '-2.1%',
      status: 'completed'
    },
    {
      id: '4',
      projectName: 'MTN Crisis Response',
      client: 'MTN',
      generatedDate: 'Apr 22, 2026',
      kpiScore: '65.4 kA',
      trend: '-12.5%',
      status: 'completed'
    }
  ])

  return (
    <div className="bg-[#0A0A0F] min-h-screen flex flex-col">
      <div className="border-b border-[#1E1E2E] px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#F8FAFC]">Reports Command Center</h1>
            <p className="text-[#94A3B8] mt-2 text-sm sm:text-base">Build, support and send client presentations.</p>
          </div>
          <button 
            onClick={() => setShowTemplateModal(true)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-[#D4A017] hover:bg-[#E6B420] text-[#0A0A0F] rounded-lg font-semibold transition-colors text-sm"
          >
            <Plus className="w-4 sm:w-5 h-4 sm:h-5" />
            + New Report
          </button>
        </div>
      </div>

      <div className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="mb-6">
          <div className="hidden sm:grid grid-cols-7 gap-2 sm:gap-4 px-4 sm:px-6 py-4 bg-[#1E1E2E] rounded-t-lg border border-[#1E1E2E] text-[#94A3B8] text-xs sm:text-sm font-semibold uppercase">
            <div>Project</div>
            <div>Client</div>
            <div>KPI Score</div>
            <div>Trend</div>
            <div>Status</div>
            <div>Generated</div>
            <div>Actions</div>
          </div>

          {reports.length > 0 ? (
            <div className="border border-t-0 border-[#1E1E2E] rounded-b-lg divide-y divide-[#1E1E2E] overflow-x-auto">
              {reports.map((report, idx) => (
                <div key={report.id} className="hidden sm:grid grid-cols-7 gap-2 sm:gap-4 px-4 sm:px-6 py-3 sm:py-4 items-center bg-[#12121A] hover:bg-[#1E1E2E] transition-colors text-sm">
                  {/* Project Name */}
                  <div>
                    <p className="text-[#F8FAFC] font-medium">{report.projectName}</p>
                  </div>

                  {/* Client */}
                  <div>
                    <div className="w-8 h-8 rounded bg-[#D4A017] flex items-center justify-center text-[#0A0A0F] text-xs font-bold">
                      {report.client.charAt(0)}
                    </div>
                  </div>

                  {/* KPI Score */}
                  <div>
                    <p className="text-[#F8FAFC] font-semibold">{report.kpiScore}</p>
                  </div>

                  {/* Trend */}
                  <div>
                    <span className={`px-3 py-1 rounded text-xs font-semibold ${
                      report.trend.startsWith('+') 
                        ? 'bg-[#2ECC8A]/20 text-[#2ECC8A]' 
                        : 'bg-[#E8832A]/20 text-[#E8832A]'
                    }`}>
                      {report.trend}
                    </span>
                  </div>

                  {/* Status */}
                  <div>
                    <span className="px-3 py-1 rounded text-xs font-semibold bg-[#2ECC8A]/20 text-[#2ECC8A]">
                      Completed
                    </span>
                  </div>

                  {/* Generated Date */}
                  <div>
                    <p className="text-[#94A3B8] text-sm">{report.generatedDate}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-[#252535] rounded transition-colors text-[#94A3B8] hover:text-[#D4A017]">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 hover:bg-[#252535] rounded transition-colors text-[#94A3B8] hover:text-[#D4A017]">
                      <Download className="w-4 h-4" />
                    </button>
                    <button className="p-2 hover:bg-[#252535] rounded transition-colors text-[#94A3B8] hover:text-[#D4A017]">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="border border-t-0 border-[#1E1E2E] rounded-b-lg p-6 sm:p-12 bg-[#12121A]">
              <div className="text-center">
                <AlertCircle className="w-8 sm:w-12 h-8 sm:h-12 text-[#D4A017] mx-auto mb-4 opacity-50" />
                <p className="text-[#F8FAFC] font-semibold mb-2 text-sm sm:text-base">No reports generated yet</p>
                <p className="text-[#94A3B8] text-xs sm:text-sm mb-6">Start by selecting a command and clicking Build to generate your first professional report.</p>
                <button 
                  onClick={() => setShowTemplateModal(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#D4A017] hover:bg-[#E6B420] text-[#0A0A0F] rounded-lg font-semibold transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  + New Report
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Generate Report Button */}
        <div className="mt-8">
          <button className="flex items-center gap-2 px-6 py-3 bg-[#D4A017] hover:bg-[#E6B420] text-[#0A0A0F] rounded-lg font-semibold transition-colors">
            <AlertCircle className="w-5 h-5" />
            Generate Report
          </button>
        </div>
      </div>

      {/* Template Selection Modal */}
      {showTemplateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#12121A] rounded-lg border border-[#1E1E2E] p-12 max-w-lg w-full mx-4">
            <h2 className="text-2xl font-bold text-[#F8FAFC] text-center mb-2">HOW WOULD YOU LIKE TO BUILD THIS REPORT?</h2>
            <p className="text-[#94A3B8] text-center text-sm mb-8">Select a structural foundation for your executive intelligence briefing. Our Flash Narrative engine prioritizes real-time signal analysis.</p>

            <div className="space-y-4 mb-8">
              {/* Option 1 */}
              <div className="border-2 border-[#1E1E2E] rounded-lg p-6 hover:border-[#D4A017] cursor-pointer transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[#D4A017] flex items-center justify-center flex-shrink-0 text-[#0A0A0F] text-lg">
                    ⚡
                  </div>
                  <div>
                    <h3 className="text-[#F8FAFC] font-bold mb-1">Use Flash Narrative Default</h3>
                    <p className="text-[#94A3B8] text-sm">Advanced Intelligence using our proprietary Flash algorithm.</p>
                  </div>
                </div>
              </div>

              {/* Option 2 */}
              <div className="border-2 border-[#1E1E2E] rounded-lg p-6 hover:border-[#D4A017] cursor-pointer transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[#D4A017] flex items-center justify-center flex-shrink-0 text-[#0A0A0F] text-lg">
                    📄
                  </div>
                  <div>
                    <h3 className="text-[#F8FAFC] font-bold mb-1">Upload Custom Template</h3>
                    <p className="text-[#94A3B8] text-sm">Utilize your firm&apos;s custom identity and reporting architecture to execute distribution.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button 
                onClick={() => setShowTemplateModal(false)}
                className="flex-1 px-6 py-3 border border-[#1E1E2E] text-[#F8FAFC] rounded-lg font-semibold hover:bg-[#1E1E2E] transition-colors"
              >
                Cancel
              </button>
              <button className="flex-1 px-6 py-3 bg-[#D4A017] hover:bg-[#E6B420] text-[#0A0A0F] rounded-lg font-semibold transition-colors">
                GET STARTED
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
