'use client'

import { Button } from '@/components/ui/button'
import { Download, FileText, Calendar } from 'lucide-react'

interface Report {
  id: string
  name: string
  generatedDate: string
  type: 'Executive' | 'Full' | 'Custom'
  size: string
}

const mockReports: Report[] = [
  {
    id: '1',
    name: 'Q1 2026 Executive Summary',
    generatedDate: '2026-03-01',
    type: 'Executive',
    size: '2.4 MB',
  },
  {
    id: '2',
    name: 'February 2026 Full Report',
    generatedDate: '2026-02-28',
    type: 'Full',
    size: '12.8 MB',
  },
  {
    id: '3',
    name: 'Crisis Analysis Report',
    generatedDate: '2026-02-15',
    type: 'Custom',
    size: '3.1 MB',
  },
]

export default function ReportsPage() {
  const handleGeneratePDF = () => {
    console.log('Generating PDF...')
    // POST /api/v1/reports/generate/pdf
  }

  const handleDownloadReport = (reportId: string) => {
    console.log('Downloading report:', reportId)
    // GET /api/v1/reports/{reportId}/download
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-[#12121A] border-b border-[#1E1E2E] px-8 py-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#F8FAFC] mb-2">Reports</h1>
          <p className="text-[#94A3B8]">Generate and download your intelligence reports</p>
        </div>
        <Button
          onClick={handleGeneratePDF}
          className="bg-[#D4A017] hover:bg-[#E6B420] text-[#0A0A0F] font-semibold flex items-center gap-2 h-10"
        >
          <FileText className="w-4 h-4" />
          Generate Executive PDF
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-8">
        <div className="max-w-4xl">
          {mockReports.length > 0 ? (
            <div className="space-y-4">
              {mockReports.map((report) => (
                <div
                  key={report.id}
                  className="bg-[#12121A] border border-[#1E1E2E] rounded-lg p-6 flex items-center justify-between hover:border-[#D4A017] transition-colors"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 rounded-lg bg-[#1E1E2E] flex items-center justify-center flex-shrink-0">
                      <FileText className="w-6 h-6 text-[#D4A017]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-[#F8FAFC] font-semibold mb-1">{report.name}</h3>
                      <div className="flex items-center gap-4">
                        <p className="text-[#94A3B8] text-sm flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(report.generatedDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </p>
                        <span className="px-2.5 py-0.5 bg-[#1E1E2E] text-[#94A3B8] text-xs font-semibold rounded">
                          {report.type}
                        </span>
                        <span className="text-[#5B8FD4] text-sm">{report.size}</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleDownloadReport(report.id)}
                    className="bg-[#D4A017] hover:bg-[#E6B420] text-[#0A0A0F] font-semibold flex items-center gap-2 h-10"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-[#12121A] border border-[#1E1E2E] rounded-lg p-12 text-center">
              <FileText className="w-12 h-12 text-[#5B8FD4] mx-auto mb-4" />
              <h3 className="text-[#F8FAFC] font-semibold mb-2">No reports yet</h3>
              <p className="text-[#94A3B8] text-sm mb-6">Generate your first report to get started</p>
              <Button
                onClick={handleGeneratePDF}
                className="bg-[#D4A017] hover:bg-[#E6B420] text-[#0A0A0F] font-semibold"
              >
                Generate Report
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
