import { downloadBlob } from './api'

interface ExportOptions {
  format: 'pdf' | 'excel'
  filename: string
  data: Record<string, unknown>
}

export const handleExport = async (options: ExportOptions): Promise<void> => {
  const { format, filename, data } = options
  
  try {
    const blob = new Blob([JSON.stringify(data)], { type: 'application/json' })
    downloadBlob(blob, `${filename}.${format === 'pdf' ? 'pdf' : 'xlsx'}`)
  } catch (error) {
    console.error(`Failed to export as ${format}:`, error)
    throw error
  }
}

interface ModalState {
  isOpen: boolean
  type?: 'revoke' | 'send' | 'campaign' | 'template'
  data?: Record<string, unknown>
}

export const handleModalToggle = (
  modalState: ModalState,
  setModalState: (state: ModalState) => void,
  type: ModalState['type']
): void => {
  setModalState({
    isOpen: !modalState.isOpen,
    type,
    data: modalState.data,
  })
}

interface FormData {
  [key: string]: string | number | boolean
}

export const handleFormSubmit = async (
  formData: FormData,
  onSuccess?: () => void,
  onError?: (error: Error) => void
): Promise<void> => {
  try {
    console.log('Form submitted:', formData)
    if (onSuccess) {
      onSuccess()
    }
  } catch (error) {
    const errorInstance = error instanceof Error ? error : new Error(String(error))
    console.error('Form submission error:', errorInstance)
    if (onError) {
      onError(errorInstance)
    }
  }
}

export const handleNavigate = (path: string): void => {
  if (typeof window !== 'undefined') {
    window.location.href = path
  }
}

interface CopyOptions {
  text: string
  label?: string
  onCopySuccess?: () => void
}

export const handleCopyToClipboard = async (options: CopyOptions): Promise<void> => {
  const { text, label = 'Text', onCopySuccess } = options
  
  try {
    await navigator.clipboard.writeText(text)
    console.log(`${label} copied to clipboard`)
    if (onCopySuccess) {
      onCopySuccess()
    }
  } catch (error) {
    console.error(`Failed to copy ${label}:`, error)
    throw error
  }
}

interface DeleteOptions {
  id: string
  itemName: string
  onConfirm?: () => void | Promise<void>
}

export const handleDelete = async (options: DeleteOptions): Promise<void> => {
  const { id, itemName, onConfirm } = options
  
  const confirmed = window.confirm(`Are you sure you want to delete ${itemName}?`)
  
  if (confirmed) {
    try {
      console.log(`Deleting ${itemName} (${id})`)
      if (onConfirm) {
        await onConfirm()
      }
    } catch (error) {
      console.error(`Failed to delete ${itemName}:`, error)
      throw error
    }
  }
}

export const handleInputChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  setValue: (value: string) => void
): void => {
  setValue(e.target.value)
}

export const handleSelectChange = (
  value: string,
  setValue: (value: string) => void
): void => {
  setValue(value)
}
