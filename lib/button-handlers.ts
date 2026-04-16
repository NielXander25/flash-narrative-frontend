export const showNotification = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
  console.log(`[${type.toUpperCase()}] ${message}`)
}

export const handleExportCommandCenter = () => showNotification('Command Center data exported', 'success')
export const handleViewAllAlerts = () => showNotification('Opening alerts view', 'info')
export const handleUpgradeAccess = () => showNotification('Redirecting to upgrade', 'info')
export const handleBrandSelect = (brandId: string, brandName: string) => showNotification(`Selected: ${brandName}`, 'info')
export const handleCreateNewCampaign = () => showNotification('Opening campaign wizard', 'info')

export const handleExportReport = () => showNotification('Reports exported', 'success')
export const handleSendReport = () => showNotification('Opening send modal', 'info')
export const handleGenerateReport = (campaignName: string, template: string) => showNotification(`Generating ${template}`, 'info')
export const handleDownloadReport = (reportId: string, reportName: string) => showNotification(`Downloaded: ${reportName}`, 'success')
export const handleShareReport = (reportId: string) => showNotification('Share link copied', 'success')
export const handleDeleteReport = (reportId: string) => showNotification('Report deleted', 'success')
export const handleNewReport = () => showNotification('Opening report builder', 'info')

export const handleSecureTransmit = (reportData: any) => showNotification('Report transmitted securely', 'success')
export const handleSaveAsDraft = (reportData: any) => showNotification('Saved as draft', 'success')
export const handleNewCampaign = (campaignData: any) => showNotification(`Campaign created`, 'info')
export const handleRevokeAPIKey = (keyName: string) => showNotification(`Key revoked`, 'success')

export const handleGenerateAPIKey = () => {
  const key = `sk_${Date.now()}`
  showNotification('API key generated', 'success')
  return key
}
export const handleCopyAPIKey = (key: string) => { navigator.clipboard.writeText(key); showNotification('Copied', 'success') }
export const handleDownloadAPIKey = () => showNotification('Downloaded', 'success')
export const handleCopyToClipboard = (text: string, label: string = 'Text') => { navigator.clipboard.writeText(text); showNotification(`${label} copied`, 'success') }

export const handleExportPDF = () => showNotification('Exporting PDF', 'info')
export const handleExportExcel = () => showNotification('Exporting Excel', 'info')
export const handleViewIntelligence = (campaignId: string) => showNotification('Opening dashboard', 'info')

export const handleGoogleSSO = () => showNotification('Google SSO initiated', 'info')
export const handleGoogleSignup = () => showNotification('Google signup initiated', 'info')
export const handleGoogleLogin = () => showNotification('Google login initiated', 'info')
export const handleSignup = (formData: any) => showNotification('Account created', 'info')

export const handleSaveSettings = (settingsData: any) => showNotification('Settings saved', 'success')
export const handleUploadLogo = (file: File) => showNotification('Logo uploaded', 'success')
export const handleUpdateTheme = (colors: any) => {
  showNotification('Theme updated', 'success')
  document.documentElement.style.setProperty('--primary', colors.primary)
  document.documentElement.style.setProperty('--primary-hover', colors.primaryHover)
}

export const handleToggleSidebar = () => {}
export const handleCloseSidebar = () => {}
export const handleNavigate = (href: string) => {}
export const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {}
export const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {}
export const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {}
export const handleCreateFirstCampaign = () => showNotification('Opening wizard', 'info')
export const handleCreateFirstReport = () => showNotification('Opening builder', 'info')
