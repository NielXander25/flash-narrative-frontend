/**
 * Client-side PDF export simulation
 * In production, this would call a real API endpoint
 */
export async function exportToPDF(data: any): Promise<Blob> {
  try {
    // Mock delay to simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Create a simple text-based PDF simulation
    const content = `FLASH NARRATIVE INTELLIGENCE REPORT
Generated: ${new Date().toISOString()}

MENTIONS DATA:
${JSON.stringify(data.mentions || [], null, 2)}

SENTIMENT DATA:
${JSON.stringify(data.sentiment || {}, null, 2)}`

    return new Blob([content], { type: 'text/plain' })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error occurred'
    throw new Error(`PDF export failed: ${message}`)
  }
}

/**
 * Client-side Excel export simulation
 * In production, this would call a real API endpoint
 */
export async function exportToExcel(data: any): Promise<Blob> {
  try {
    // Mock delay to simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Create CSV format as Excel simulation
    const mentions = data.mentions || []
    if (mentions.length === 0) {
      return new Blob(['No data available'], { type: 'text/plain' })
    }

    const headers = Object.keys(mentions[0]).join(',')
    const rows = mentions.map((item: any) => 
      Object.values(item).map(val => `"${val}"`).join(',')
    ).join('\n')
    
    return new Blob([`${headers}\n${rows}`], { type: 'text/csv' })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error occurred'
    throw new Error(`Excel export failed: ${message}`)
  }
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(url)
}
