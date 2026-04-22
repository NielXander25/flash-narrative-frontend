import { toast } from 'sonner'

/**
 * Centralized button click handlers for dashboard actions
 * All handlers use toast notifications for user feedback
 */

export const handleCreateCampaign = () => {
  toast.info('Create Campaign wizard launching...', {
    description: 'Configure your tracking parameters',
    duration: 3000,
  })
}

export const handleExportReport = (reportId: number) => {
  toast.success('Report export initiated', {
    description: `Report #${reportId} is being prepared`,
    duration: 3000,
  })
}

export const handleDownloadReport = (reportId: number) => {
  toast.success('Download started', {
    description: `Report #${reportId} will download shortly`,
    duration: 3000,
  })
}

export const handleSendReport = () => {
  toast.info('Email dispatch coming soon', {
    description: 'This feature will be available in the next update',
    duration: 3000,
  })
}

export const handleRevokeAPIKey = (keyId: string) => {
  toast.warning('API Key revoked', {
    description: `Key ${keyId.slice(0, 8)}... has been deactivated`,
    duration: 3000,
  })
}

export const handleSaveSettings = () => {
  toast.success('Settings saved', {
    description: 'Your preferences have been updated',
    duration: 3000,
  })
}

export const handleDeleteCampaign = (campaignId: number) => {
  toast.error('Campaign deleted', {
    description: `Campaign #${campaignId} has been removed`,
    duration: 3000,
  })
}

// --- NEWLY ADDED MISSING FUNCTIONS ---

export const handleBrandSelect = (brand: string) => {
  toast.success('Brand selected', {
    description: `Now tracking: ${brand}`,
    duration: 3000,
  })
}

export const handleUpgradeAccess = () => {
  toast.info('Upgrade Plan', {
    description: 'Redirecting to upgrade page...',
    duration: 3000,
  })
}

export const handleNewCampaign = () => {
  toast.info('New Campaign', {
    description: 'Opening campaign wizard...',
    duration: 3000,
  })
}

export const showNotification = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
  if (type === 'success') {
    toast.success(message, { duration: 3000 })
  } else if (type === 'error') {
    toast.error(message, { duration: 3000 })
  } else {
    toast.info(message, { duration: 3000 })
  }
}
