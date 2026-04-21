'use client'

import { useState } from 'react'
import { ExternalLink } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'

interface Mention {
  id: string
  title: string
  snippet: string
  platform_category: string
  sentiment_label: string
  published_date: string
  source?: string
}

interface MentionsTableProps {
  data: Mention[]
  activeTab: 'news' | 'social'
}

const getSentimentColor = (sentiment: string) => {
  const map: Record<string, { bg: string; text: string }> = {
    'Positive': { bg: 'bg-[#2ECC8A]/20', text: 'text-[#2ECC8A]' },
    'Neutral': { bg: 'bg-[#5B8FD4]/20', text: 'text-[#5B8FD4]' },
    'Negative': { bg: 'bg-[#E8832A]/20', text: 'text-[#E8832A]' },
    'Anger': { bg: 'bg-[#E84242]/20', text: 'text-[#E84242]' },
  }
  return map[sentiment] || map['Neutral']
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export function MentionsTable({ data, activeTab }: MentionsTableProps) {
  const [rowsPerPage, setRowsPerPage] = useState('10')
  const [currentPage, setCurrentPage] = useState(1)

  const filteredData = data.filter((item) => {
    if (activeTab === 'news') {
      return ['News', 'Regulatory'].includes(item.platform_category)
    }
    return item.platform_category === 'Social'
  })

  const pageSize = parseInt(rowsPerPage)
  const totalPages = Math.ceil(filteredData.length / pageSize)
  const startIdx = (currentPage - 1) * pageSize
  const paginatedData = filteredData.slice(startIdx, startIdx + pageSize)

  return (
    <div className="bg-[#12121A] border border-[#1E1E2E] rounded-lg overflow-hidden">
      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-[#1E1E2E] border-b border-[#1E1E2E]">
            <TableRow className="hover:bg-[#1E1E2E]">
              {activeTab === 'news' ? (
                <>
                  <TableHead className="text-[#94A3B8] font-semibold">Source</TableHead>
                  <TableHead className="text-[#94A3B8] font-semibold">Article Title</TableHead>
                  <TableHead className="text-[#94A3B8] font-semibold">Snippet</TableHead>
                  <TableHead className="text-[#94A3B8] font-semibold">Sentiment</TableHead>
                  <TableHead className="text-[#94A3B8] font-semibold">Date</TableHead>
                  <TableHead className="text-[#94A3B8] font-semibold">Action</TableHead>
                </>
              ) : (
                <>
                  <TableHead className="text-[#94A3B8] font-semibold">Platform</TableHead>
                  <TableHead className="text-[#94A3B8] font-semibold">Username</TableHead>
                  <TableHead className="text-[#94A3B8] font-semibold">Post Content</TableHead>
                  <TableHead className="text-[#94A3B8] font-semibold">Sentiment</TableHead>
                  <TableHead className="text-[#94A3B8] font-semibold">Date</TableHead>
                  <TableHead className="text-[#94A3B8] font-semibold">Action</TableHead>
                </>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((mention) => {
              const sentimentColor = getSentimentColor(mention.sentiment_label)
              return (
                <TableRow key={mention.id} className="border-b border-[#1E1E2E] hover:bg-[#1E1E2E]/50">
                  <TableCell className="text-[#94A3B8] text-sm whitespace-nowrap">{mention.source || mention.platform_category}</TableCell>
                  <TableCell className="text-[#F8FAFC] text-sm font-medium max-w-xs truncate">{mention.title}</TableCell>
                  <TableCell className="text-[#94A3B8] text-sm max-w-sm truncate">{mention.snippet}</TableCell>
                  <TableCell className="whitespace-nowrap">
                    <Badge className={`${sentimentColor.bg} ${sentimentColor.text} border-0 text-xs`}>{mention.sentiment_label}</Badge>
                  </TableCell>
                  <TableCell className="text-[#94A3B8] text-sm whitespace-nowrap">{formatDate(mention.published_date)}</TableCell>
                  <TableCell className="text-center">
                    <a href={mention.id} target="_blank" rel="noopener noreferrer" className="text-[#D4A017] hover:text-[#E6B420] inline-flex">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Footer */}
      <div className="bg-[#1E1E2E] border-t border-[#1E1E2E] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-[#94A3B8] text-sm">Rows per page:</span>
          <Select value={rowsPerPage} onValueChange={setRowsPerPage}>
            <SelectTrigger className="w-[100px] bg-[#12121A] border-[#1E1E2E] text-[#F8FAFC]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#12121A] border-[#1E1E2E]">
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-[#94A3B8] text-sm">
            Page {currentPage} of {totalPages || 1}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 text-[#D4A017] hover:text-[#E6B420] disabled:text-[#5B8FD4] disabled:cursor-not-allowed text-sm font-medium"
            >
              Previous
            </button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 text-sm font-medium rounded ${
                  currentPage === page
                    ? 'bg-[#D4A017] text-[#0A0A0F]'
                    : 'text-[#94A3B8] hover:text-[#F8FAFC]'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 text-[#D4A017] hover:text-[#E6B420] disabled:text-[#5B8FD4] disabled:cursor-not-allowed text-sm font-medium"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
