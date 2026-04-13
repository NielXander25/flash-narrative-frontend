import { useCallback, useState } from 'react'

export function useExport() {
  const [isExporting, setIsExporting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const startExport = useCallback(async (exportFn: () => Promise<Blob>, filename: string) => {
    setIsExporting(true)
    setError(null)
    try {
      const blob = await exportFn()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Export failed')
    } finally {
      setIsExporting(false)
    }
  }, [])

  return { isExporting, error, startExport }
}

export function useSidebarToggle() {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = useCallback(() => setIsOpen(prev => !prev), [])
  const close = useCallback(() => setIsOpen(false), [])

  return { isOpen, toggle, close }
}
