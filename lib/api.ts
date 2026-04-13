export async function exportToPDF(data: any) {
  try {
    const response = await fetch('/api/export/pdf', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error('PDF export failed')
    return await response.blob()
  } catch (error) {
    console.error('PDF export error:', error)
    throw error
  }
}

export async function exportToExcel(data: any) {
  try {
    const response = await fetch('/api/export/excel', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error('Excel export failed')
    return await response.blob()
  } catch (error) {
    console.error('Excel export error:', error)
    throw error
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
