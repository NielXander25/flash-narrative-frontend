// Add this import at top:
import { CampaignWizard } from '@/components/dashboard/campaign-wizard'

// In the component:
export default function CommandCenterPage() {
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null)
  const [showCampaignWizard, setShowCampaignWizard] = useState(false)

  // ... rest of code ...

  return (
    <div className="bg-[#0A0A0F] min-h-screen">
      {/* Header */}
      <div className="border-b border-[#1E1E2E] px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#F8FAFC]">GLOBAL COMMAND CENTER</h1>
            <p className="text-[#94A3B8] mt-2 text-sm sm:text-base">Real-time narrative intelligence & systemic risk monitoring.</p>
          </div>
          <button 
            onClick={() => setShowCampaignWizard(true)}
            className="px-4 sm:px-6 py-2 sm:py-3 bg-[#D4A017] hover:bg-[#E6B420] text-[#0A0A0F] rounded-lg font-semibold transition-colors text-sm flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            + New Campaign
          </button>
        </div>
      </div>

      {/* Rest of page... */}

      {/* Campaign Wizard Modal */}
      <CampaignWizard 
        isOpen={showCampaignWizard}
        onClose={() => setShowCampaignWizard(false)}
      />
    </div>
  )
}
