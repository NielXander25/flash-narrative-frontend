/**
 * Generate a placeholder file for download
 * Used for buttons that will eventually connect to backend
 */

export function downloadPlaceholderFile(
  filename: string,
  content: string,
  fileType: 'txt' | 'json' | 'csv' = 'txt'
) {
  const mimeTypes = {
    txt: 'text/plain',
    json: 'application/json',
    csv: 'text/csv'
  }

  const blob = new Blob([content], { type: mimeTypes[fileType] })
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${filename}.${fileType}`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(url)
}

export function generatePlaceholderReport(pageName: string): string {
  return `FLASH NARRATIVE - PLACEHOLDER REPORT
Generated: ${new Date().toISOString()}
Page: ${pageName}

═══════════════════════════════════════════════════════════════

NOTICE: This is a placeholder file.

The functionality for this feature is currently under development 
and awaiting backend API integration.

Expected Features:
• Real data from backend
• Live analytics
• Custom filters
• Advanced reporting

═══════════════════════════════════════════════════════════════

To enable this feature:
1. Connect to the Flash Narrative backend API
2. Configure your authentication token
3. Set up data streaming

For more information, visit:
https://flash-narrative.vercel.app/docs

═══════════════════════════════════════════════════════════════

© 2026 Flash Narrative. All rights reserved.
`
}

export function generatePlaceholderJSON(pageName: string, dataType: string): string {
  return JSON.stringify({
    status: 'placeholder',
    page: pageName,
    dataType: dataType,
    message: 'This is placeholder data. Real data will be available once backend API is integrated.',
    timestamp: new Date().toISOString(),
    note: 'All functionality is ready for backend integration',
    data: {
      records: [],
      count: 0,
      message: `No ${dataType} data available yet`
    }
  }, null, 2)
}

export function generatePlaceholderCSV(pageName: string, columns: string[]): string {
  const header = columns.join(',')
  const footer = `\n\n"Note","This is placeholder data - backend integration required"
"Generated","${new Date().toISOString()}"`
  return header + footer
}
