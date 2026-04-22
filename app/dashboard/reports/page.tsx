'use client'

import { useState } from 'react'
import { Plus, Download, FileText, MoreVertical, Send, Share2 } from 'lucide-react'
import { 
  handleExportReport, 
  handleDownloadReport,
  handleSendReport
} from '@/lib/button-handlers'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

// Mock data for demonstration
const mockReports = [
  {
    id: 1,
    title: 'Zenith Bank Q1 Brand Health Report',
    type: 'Brand Analysis',
    date: '2024-03-20',
    status: 'completed',
    format: 'PDF',
    size: '2.4 MB'
  },
  {
    id: 2,
    title: 'Competitive Landscape - Finance Sector',
    type: 'Competitor Analysis',
    date: '2024-03-19',
    status: 'completed',
    format: 'Excel',
    size: '1.8 MB'
  },
  {
    id: 3,
    title: 'Crisis Alert Summary - March 2024',
    type: 'Crisis Report',
    date: '2024-03-18',
    status: 'processing',
    format: 'PDF',
    size: '-'
  },
  {
    id: 4,
    title: 'Social Media Sentiment Analysis',
    type: 'Social Pulse',
    date: '2024-03-17',
    status: 'completed',
    format: 'PDF',
    size: '3.1 MB'
  }
]

export default function ReportsPage() {
  const [reports] = useState(mockReports)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/10 text-green-500 border-green-500/20'
      case 'processing':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20'
      case 'failed':
        return 'bg-red-500/10 text-red-500 border-red-500/20'
      default:
        return 'bg-gray-500/10 text-gray-500 border-gray-500/20'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Reports</h1>
          <p className="text-muted-foreground mt-1">
            Generate and manage your brand intelligence reports
          </p>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                onClick={() => handleSendReport()}
                disabled
                className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800"
              >
                <Send className="w-4 h-4 mr-2" />
                Send Report
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Email dispatch feature coming soon</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Reports List */}
      <Card className="border-white/5 bg-black/20">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-white">Generated Reports</CardTitle>
              <CardDescription>
                Your recently generated intelligence reports
              </CardDescription>
            </div>
            <Button variant="outline" className="border-amber-500/30 text-amber-500 hover:bg-amber-500/10">
              <Plus className="w-4 h-4 mr-2" />
              New Report
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reports.map((report) => (
              <div
                key={report.id}
                className="flex items-center justify-between p-4 rounded-lg border border-white/5 hover:border-amber-500/30 transition-colors bg-black/20"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-amber-500" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">{report.title}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="outline" className="text-xs border-white/10 text-muted-foreground">
                        {report.type}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{report.date}</span>
                      <Badge className={`text-xs ${getStatusColor(report.status)}`}>
                        {report.status}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-sm text-white font-medium">{report.format}</div>
                    <div className="text-xs text-muted-foreground">{report.size}</div>
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-white">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-[#0A0A0A] border-white/10">
                      <DropdownMenuItem 
                        onClick={() => handleExportReport(report.id)}
                        className="text-muted-foreground hover:text-white hover:bg-white/5"
                      >
                        <Share2 className="w-4 h-4 mr-2" />
                        Export
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleDownloadReport(report.id)}
                        className="text-muted-foreground hover:text-white hover:bg-white/5"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
