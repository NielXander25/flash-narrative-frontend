'use client'

import { useState } from 'react'
import { X, AlertTriangle, ChevronDown, Trash2, Plus } from 'lucide-react'
import { 
  handleNewCampaign,
  handleRevokeAPIKey,
  showNotification 
} from '@/lib/button-handlers'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface RevokeAPIKeyModalProps {
  isOpen: boolean
  onClose: () => void
  keyId: string
  keyName: string
}

export function RevokeAPIKeyModal({ isOpen, onClose, keyId, keyName }: RevokeAPIKeyModalProps) {
  const [isRevoking, setIsRevoking] = useState(false)

  const handleRevoke = () => {
    setIsRevoking(true)
    // Simulate API call
    setTimeout(() => {
      handleRevokeAPIKey(keyId)
      setIsRevoking(false)
      onClose()
    }, 1000)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#0A0A0A] border-white/10 text-white sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-500">
            <AlertTriangle className="w-5 h-5" />
            Revoke API Key
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Are you sure you want to revoke the API key "{keyName}"? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
            <p className="text-sm text-red-400">
              Any applications using this key will immediately lose access.
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isRevoking} className="border-white/10">
            Cancel
          </Button>
          <Button 
            variant="destructive" 
            onClick={handleRevoke}
            disabled={isRevoking}
            className="bg-red-600 hover:bg-red-700"
          >
            {isRevoking ? 'Revoking...' : 'Revoke Key'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

interface InitiateCampaignModalProps {
  isOpen: boolean
  onClose: () => void
}

export function InitiateCampaignModal({ isOpen, onClose }: InitiateCampaignModalProps) {
  const [step, setStep] = useState(1)

  const handleNext = () => {
    if (step < 5) setStep(step + 1)
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleLaunch = () => {
    showNotification('Campaign launched successfully!', 'success')
    onClose()
    setStep(1)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#0A0A0A] border-white/10 text-white sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Create New Campaign</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Step {step} of 5: Configure your tracking parameters
          </DialogDescription>
        </DialogHeader>

        <div className="py-6">
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Core Identifiers</h3>
              <div className="space-y-2">
                <Label htmlFor="campaign-name">Campaign Name</Label>
                <Input id="campaign-name" placeholder="e.g., Zenith Bank Q1 Health" className="bg-black/20 border-white/10" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="target-keyword">Target Brand/Keyword</Label>
                <Input id="target-keyword" placeholder="Exact phrase to track" className="bg-black/20 border-white/10" />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Data Sources</h3>
              <p className="text-sm text-muted-foreground">Select where to gather intelligence from:</p>
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="h-24 flex flex-col gap-2 border-white/10 hover:bg-amber-500/10 hover:border-amber-500/50">
                  <span className="text-2xl">🌐</span>
                  <span>News & Web</span>
                </Button>
                <Button variant="outline" className="h-24 flex flex-col gap-2 border-white/10 hover:bg-amber-500/10 hover:border-amber-500/50">
                  <span className="text-2xl">📱</span>
                  <span>Social Media</span>
                </Button>
              </div>
            </div>
          )}

          {step >= 3 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Configuration steps {step} content goes here...</p>
            </div>
          )}
        </div>

        <DialogFooter className="gap-2">
          {step > 1 && (
            <Button variant="outline" onClick={handleBack} className="border-white/10">
              Back
            </Button>
          )}
          {step < 5 ? (
            <Button onClick={handleNext} className="bg-amber-600 hover:bg-amber-700">
              Next
            </Button>
          ) : (
            <Button onClick={handleLaunch} className="bg-gradient-to-r from-amber-600 to-amber-700">
              Launch Campaign
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
