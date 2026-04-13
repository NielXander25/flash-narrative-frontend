'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Copy, Trash2, AlertCircle, Plus } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { RevokeAPIKeyModal } from '@/components/dashboard/modals'

interface APIKey {
  id: string
  name: string
  key: string
  createdDate: string
  status: 'Active' | 'Inactive'
  environment: 'Production' | 'Staging' | 'Development'
}

const mockAPIKeys: APIKey[] = [
  {
    id: 'key-1',
    name: 'Production API Key',
    key: 'sk-prod-8x7y2k9m...',
    createdDate: '2026-01-15',
    status: 'Active',
    environment: 'Production',
  },
  {
    id: 'key-2',
    name: 'Staging Environment',
    key: 'sk-stag-4a9b2c7d...',
    createdDate: '2026-02-03',
    status: 'Active',
    environment: 'Staging',
  },
  {
    id: 'key-3',
    name: 'Development Key',
    key: 'sk-dev-1x2y3z4a...',
    createdDate: '2025-12-20',
    status: 'Active',
    environment: 'Development',
  },
]

export default function APIPage() {
  const [apiKeys, setApiKeys] = useState(mockAPIKeys)
  const [revokeDialog, setRevokeDialog] = useState<{ open: boolean; keyId: string | null }>({
    open: false,
    keyId: null,
  })
  const { toast } = useToast()

  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key)
    toast({
      title: 'Copied',
      description: 'API key copied to clipboard',
    })
  }

  const handleRevokeClick = (keyId: string) => {
    setRevokeDialog({ open: true, keyId })
  }

  const handleRevokeClose = () => {
    setRevokeDialog({ open: false, keyId: null })
  }

  return (
    <div className="flex flex-col h-full w-full">
      <div className="bg-[#12121A] border-b border-[#1E1E2E] px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#F8FAFC] mb-2">API & Integration Hub</h1>
          <p className="text-[#94A3B8] text-sm sm:text-base">Manage API keys for your enterprise integrations</p>
        </div>
        <Button className="w-full sm:w-auto bg-[#D4A017] hover:bg-[#E6B420] text-[#0A0A0F] font-semibold flex items-center justify-center gap-2 h-10 text-sm">
          <Plus className="w-4 h-4" />
          Generate New Key
        </Button>
      </div>

      <div className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
        <div className="max-w-6xl space-y-4 sm:space-y-6">
          <div className="bg-[#5B8FD4]/10 border border-[#5B8FD4]/30 rounded-lg p-3 sm:p-4 flex items-start gap-3 sm:gap-4">
            <AlertCircle className="w-5 h-5 text-[#5B8FD4] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-[#5B8FD4] font-semibold text-sm mb-1">Keep your API keys secure</p>
              <p className="text-[#5B8FD4]/80 text-sm">
                Never share them publicly or commit them to version control. Use environment variables.
              </p>
            </div>
          </div>

          {/* API Keys Table */}
          {apiKeys.length > 0 ? (
            <div className="bg-[#12121A] border border-[#1E1E2E] rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-[#1E1E2E] border-b border-[#1E1E2E]">
                    <TableRow className="hover:bg-[#1E1E2E]">
                      <TableHead className="text-[#94A3B8] font-semibold">Key Name</TableHead>
                      <TableHead className="text-[#94A3B8] font-semibold">API Key</TableHead>
                      <TableHead className="text-[#94A3B8] font-semibold">Date Created</TableHead>
                      <TableHead className="text-[#94A3B8] font-semibold">Status</TableHead>
                      <TableHead className="text-[#94A3B8] font-semibold text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {apiKeys.map((key) => (
                      <TableRow
                        key={key.id}
                        className="border-b border-[#1E1E2E] hover:bg-[#1E1E2E]/50"
                      >
                        <TableCell className="text-[#F8FAFC] font-medium">{key.name}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <code className="bg-[#0A0A0F] px-3 py-1 rounded text-[#94A3B8] text-xs font-mono">
                              {key.key}
                            </code>
                            <button
                              onClick={() => handleCopyKey(key.key)}
                              className="text-[#D4A017] hover:text-[#E6B420] transition-colors"
                            >
                              <Copy className="w-4 h-4" />
                            </button>
                          </div>
                        </TableCell>
                        <TableCell className="text-[#94A3B8] text-sm">
                          {new Date(key.createdDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-[#2ECC8A]/20 text-[#2ECC8A] border-0">
                            {key.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <button
                            onClick={() => handleRevokeClick(key.id)}
                            className="text-[#E84242] hover:text-[#E84242]/80 transition-colors inline-flex items-center gap-1"
                          >
                            <Trash2 className="w-4 h-4" />
                            Revoke
                          </button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          ) : (
            <div className="bg-[#12121A] border border-[#1E1E2E] rounded-lg p-12 text-center">
              <div className="w-12 h-12 rounded-full bg-[#1E1E2E] flex items-center justify-center mx-auto mb-4">
                <Plus className="w-6 h-6 text-[#5B8FD4]" />
              </div>
              <h3 className="text-[#F8FAFC] font-semibold mb-2">No API keys yet</h3>
              <p className="text-[#94A3B8] text-sm mb-6">
                Generate your first key to get started with the Flash Narrative API
              </p>
              <Button className="bg-[#D4A017] hover:bg-[#E6B420] text-[#0A0A0F] font-semibold">
                Generate First Key
              </Button>
            </div>
          )}

          {/* Quick Start Section */}
          <div className="bg-[#12121A] border border-[#1E1E2E] rounded-lg p-8">
            <h3 className="text-[#F8FAFC] font-semibold text-lg mb-4">Quick Start</h3>
            <p className="text-[#94A3B8] text-sm mb-4">
              Get started with the Flash Narrative API in minutes. Use your API key to authenticate requests:
            </p>
            <div className="bg-[#0A0A0F] rounded-lg p-4 overflow-x-auto">
              <code className="text-[#2ECC8A] text-xs font-mono whitespace-nowrap">
                curl -H "Authorization: Bearer YOUR_API_KEY" https://api.flash-narrative.com/v1/mentions
              </code>
            </div>
            <p className="text-[#94A3B8] text-sm mt-4">
              For full documentation, visit our{' '}
              <a href="#" className="text-[#D4A017] hover:text-[#E6B420] underline">
                API documentation
              </a>
              .
            </p>
          </div>
        </div>
      </div>

      {/* Revoke API Key Modal */}
      <RevokeAPIKeyModal 
        isOpen={revokeDialog.open} 
        onClose={handleRevokeClose}
        keyName={apiKeys.find(k => k.id === revokeDialog.keyId)?.environment || 'Production'}
      />
    </div>
  )
}
