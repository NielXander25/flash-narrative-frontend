'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Upload, Copy } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export default function SettingsPage() {
  const [workspaceName, setWorkspaceName] = useState('Zenith Bank')
  const [primaryColor, setPrimaryColor] = useState('#D4A017')
  const [secondaryColor, setSecondaryColor] = useState('#E6B420')
  const [logoUrl, setLogoUrl] = useState(null)
  const { toast } = useToast()

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setLogoUrl(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = () => {
    // In production: POST /api/v1/settings/whitelabel
    toast({
      title: 'Settings saved',
      description: 'Your branding has been updated across the platform.',
    })
  }

  const handleCancel = () => {
    // Reset form
  }

  return (
    <div className="flex flex-col h-full w-full">
      <div className="bg-[#12121A] border-b border-[#1E1E2E] px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#F8FAFC] mb-2">Agency Branding</h1>
        <p className="text-[#94A3B8] text-sm sm:text-base">Customize your dashboard with your brand identity</p>
      </div>

      <div className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="lg:col-span-2 space-y-6 sm:space-y-8">
              <div className="bg-[#12121A] border border-[#1E1E2E] rounded-lg p-6 sm:p-8">
                <h2 className="text-lg sm:text-xl font-semibold text-[#F8FAFC] mb-6">Brand Assets</h2>

                <div className="mb-6 sm:mb-8">
                  <label className="text-[#94A3B8] text-xs sm:text-sm font-semibold uppercase block mb-4">
                    Upload Logo
                  </label>
                  <div className="border-2 border-dashed border-[#1E1E2E] rounded-lg p-6 sm:p-8 text-center hover:border-[#D4A017] transition-colors cursor-pointer group">
                    <input
                      type="file"
                      accept=".svg,.png"
                      onChange={handleLogoUpload}
                      className="hidden"
                      id="logo-upload"
                    />
                    <label htmlFor="logo-upload" className="cursor-pointer block">
                      <Upload className="w-8 h-8 text-[#5B8FD4] mx-auto mb-3 group-hover:text-[#D4A017] transition-colors" />
                      <p className="text-[#F8FAFC] font-medium mb-1">Drop your logo here</p>
                      <p className="text-[#94A3B8] text-sm">SVG or PNG (max 5MB)</p>
                    </label>
                  </div>
                  {logoUrl && (
                    <div className="mt-4 p-4 bg-[#1E1E2E] rounded-lg">
                      <img src={logoUrl} alt="Logo preview" className="h-16 w-auto" />
                    </div>
                  )}
                </div>

                {/* Workspace Name */}
                <div>
                  <label className="text-[#94A3B8] text-sm font-semibold uppercase block mb-2">
                    Workspace Name
                  </label>
                  <input
                    type="text"
                    value={workspaceName}
                    onChange={(e) => setWorkspaceName(e.target.value)}
                    placeholder="e.g. Ogilvy PR Nigeria"
                    className="w-full bg-[#0A0A0F] border border-[#1E1E2E] rounded-lg px-4 py-3 text-[#F8FAFC] placeholder-[#5B8FD4] focus:outline-none focus:border-[#D4A017] focus:ring-1 focus:ring-[#D4A017]"
                  />
                </div>
              </div>

              {/* Visual Identity Section */}
              <div className="bg-[#12121A] border border-[#1E1E2E] rounded-lg p-8">
                <h2 className="text-xl font-semibold text-[#F8FAFC] mb-6">Visual Identity</h2>

                <div className="space-y-6">
                  {/* Primary Color */}
                  <div>
                    <label className="text-[#94A3B8] text-sm font-semibold uppercase block mb-3">
                      Primary Color
                    </label>
                    <div className="flex items-center gap-4">
                      <div className="flex-1 flex items-center gap-3">
                        <input
                          type="color"
                          value={primaryColor}
                          onChange={(e) => setPrimaryColor(e.target.value)}
                          className="w-16 h-10 rounded-lg cursor-pointer border border-[#1E1E2E]"
                        />
                        <input
                          type="text"
                          value={primaryColor}
                          onChange={(e) => setPrimaryColor(e.target.value)}
                          className="flex-1 bg-[#0A0A0F] border border-[#1E1E2E] rounded-lg px-4 py-2 text-[#F8FAFC] font-mono text-sm focus:outline-none focus:border-[#D4A017] focus:ring-1 focus:ring-[#D4A017]"
                        />
                      </div>
                    </div>
                    <p className="text-[#94A3B8] text-sm mt-2">Used for buttons, links, and primary actions.</p>
                  </div>

                  {/* Secondary Color */}
                  <div>
                    <label className="text-[#94A3B8] text-sm font-semibold uppercase block mb-3">
                      Secondary Color
                    </label>
                    <div className="flex items-center gap-4">
                      <div className="flex-1 flex items-center gap-3">
                        <input
                          type="color"
                          value={secondaryColor}
                          onChange={(e) => setSecondaryColor(e.target.value)}
                          className="w-16 h-10 rounded-lg cursor-pointer border border-[#1E1E2E]"
                        />
                        <input
                          type="text"
                          value={secondaryColor}
                          onChange={(e) => setSecondaryColor(e.target.value)}
                          className="flex-1 bg-[#0A0A0F] border border-[#1E1E2E] rounded-lg px-4 py-2 text-[#F8FAFC] font-mono text-sm focus:outline-none focus:border-[#D4A017] focus:ring-1 focus:ring-[#D4A017]"
                        />
                      </div>
                    </div>
                    <p className="text-[#94A3B8] text-sm mt-2">Used for accents and secondary elements.</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button
                  onClick={handleSave}
                  className="w-full sm:w-auto bg-[#D4A017] hover:bg-[#E6B420] text-[#0A0A0F] font-semibold px-6 sm:px-8 h-10 text-sm"
                >
                  Save Changes
                </Button>
                <Button
                  onClick={handleCancel}
                  variant="outline"
                  className="w-full sm:w-auto border-[#1E1E2E] text-[#D4A017] hover:bg-[#1E1E2E] px-6 sm:px-8 h-10 text-sm"
                >
                  Cancel
                </Button>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-8 bg-[#12121A] border border-[#1E1E2E] rounded-lg p-4 sm:p-6">
                <h3 className="text-[#F8FAFC] font-semibold mb-4 sm:mb-6 text-sm sm:text-base">Live Preview</h3>

                {/* Preview Sidebar */}
                <div className="bg-[#1E1E2E] rounded-lg p-4 mb-6">
                  <div className="space-y-3">
                    <div
                      className="px-4 py-3 rounded-lg text-[#0A0A0F] font-semibold text-sm transition-all"
                      style={{ backgroundColor: primaryColor }}
                    >
                      Dashboard
                    </div>
                    <div className="px-4 py-3 rounded-lg text-[#94A3B8] hover:text-[#F8FAFC] text-sm cursor-pointer transition-colors">
                      Reports
                    </div>
                    <div className="px-4 py-3 rounded-lg text-[#94A3B8] hover:text-[#F8FAFC] text-sm cursor-pointer transition-colors">
                      API Management
                    </div>
                    <div className="px-4 py-3 rounded-lg text-[#94A3B8] hover:text-[#F8FAFC] text-sm cursor-pointer transition-colors">
                      Settings
                    </div>
                  </div>
                </div>

                {/* Preview Buttons */}
                <div className="space-y-2">
                  <button
                    className="w-full px-4 py-2 rounded-lg font-semibold text-[#0A0A0F] text-sm transition-all"
                    style={{ backgroundColor: primaryColor }}
                  >
                    Primary Button
                  </button>
                  <button
                    className="w-full px-4 py-2 rounded-lg font-semibold text-[#0A0A0F] text-sm transition-all"
                    style={{ backgroundColor: secondaryColor }}
                  >
                    Secondary Button
                  </button>
                </div>

                {/* Color Indicators */}
                <div className="mt-6 pt-6 border-t border-[#1E1E2E] space-y-2">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: primaryColor }}
                    />
                    <span className="text-[#94A3B8] text-xs uppercase font-semibold">Primary</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: secondaryColor }}
                    />
                    <span className="text-[#94A3B8] text-xs uppercase font-semibold">Secondary</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
