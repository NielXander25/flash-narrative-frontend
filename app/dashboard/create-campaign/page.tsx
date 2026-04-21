'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import {
  Briefcase,
  Target,
  TrendingUp,
  Users,
  Globe,
  MessageSquare,
  BarChart3,
  AlertTriangle,
  Clock,
  Calendar as CalendarIcon,
  Repeat,
  CheckCircle2,
  X,
  Plus,
  ChevronRight,
  ChevronLeft,
  Info,
} from 'lucide-react'
import { format } from 'date-fns'

// Industry options
const INDUSTRIES = [
  { value: 'finance', label: 'Finance & Banking' },
  { value: 'tech', label: 'Technology' },
  { value: 'fmcg', label: 'FMCG (Fast-Moving Consumer Goods)' },
  { value: 'healthcare', label: 'Healthcare & Pharma' },
  { value: 'retail', label: 'Retail & E-commerce' },
  { value: 'automotive', label: 'Automotive' },
  { value: 'telecom', label: 'Telecommunications' },
  { value: 'energy', label: 'Energy & Utilities' },
  { value: 'media', label: 'Media & Entertainment' },
  { value: 'education', label: 'Education' },
  { value: 'real_estate', label: 'Real Estate' },
  { value: 'hospitality', label: 'Hospitality & Tourism' },
]

// Suggested competitors by industry
const SUGGESTED_COMPETITORS: Record<string, string[]> = {
  finance: ['GTBank', 'Access Bank', 'First Bank', 'UBA', 'Zenith Bank'],
  tech: ['Microsoft', 'Google', 'Apple', 'Amazon', 'Meta'],
  fmcg: ['Nestlé', 'Unilever', 'P&G', 'Coca-Cola', 'PepsiCo'],
  healthcare: ['Pfizer', 'Johnson & Johnson', 'Roche', 'Novartis', 'Merck'],
  retail: ['Walmart', 'Amazon', 'Target', 'Costco', 'Home Depot'],
  automotive: ['Toyota', 'Volkswagen', 'Ford', 'BMW', 'Mercedes-Benz'],
  telecom: ['MTN', 'Airtel', 'Glo', '9mobile', 'Vodacom'],
  energy: ['Shell', 'ExxonMobil', 'Chevron', 'BP', 'TotalEnergies'],
  media: ['Netflix', 'Disney', 'Warner Bros', 'NBCUniversal', 'Paramount'],
  education: ['Harvard', 'Stanford', 'MIT', 'Oxford', 'Cambridge'],
  real_estate: ['CBRE', 'JLL', 'Cushman & Wakefield', 'Colliers', 'Savills'],
  hospitality: ['Marriott', 'Hilton', 'Hyatt', 'IHG', 'Accor'],
}

const SOURCE_OPTIONS = [
  {
    id: 'news_and_web',
    title: 'News & Web',
    icon: Globe,
    description: 'Scan news articles, blogs, and web publications',
  },
  {
    id: 'social_pulse',
    title: 'Social Media Pulse',
    icon: MessageSquare,
    description: 'Monitor social platforms (saves API credits)',
  },
]

const KPI_OPTIONS = [
  {
    id: 'sentiment_target',
    label: 'Brand Sentiment Target',
    icon: TrendingUp,
    type: 'slider',
    min: 0,
    max: 100,
    unit: '%',
  },
  {
    id: 'share_of_voice_target',
    label: 'Share of Voice (SOV) Target',
    icon: BarChart3,
    type: 'slider',
    min: 0,
    max: 100,
    unit: '%',
  },
  {
    id: 'volume_target',
    label: 'Total Mention Volume',
    icon: Users,
    type: 'number',
    min: 0,
    max: 1000000,
    unit: 'mentions',
  },
  {
    id: 'engagement_rate',
    label: 'Engagement Rate',
    icon: Target,
    type: 'slider',
    min: 0,
    max: 100,
    unit: '%',
  },
]

const INTERVAL_OPTIONS = [
  { value: 'minute', label: 'Every Minute', seconds: 60 },
  { value: 'five_minutes', label: 'Every 5 Minutes', seconds: 300 },
  { value: 'hour', label: 'Every Hour', seconds: 3600 },
  { value: 'day', label: 'Every Day', seconds: 86400 },
]

const TIME_SLOTS = Array.from({ length: 24 }, (_, i) => {
  const hour = i.toString().padStart(2, '0')
  return `${hour}:00`
})

interface CampaignFormData {
  campaign_name: string
  target: string
  industry: string
  competitors: string[]
  sources: string[]
  kpis: {
    sentiment_target?: number
    share_of_voice_target?: number
    volume_target?: number
    engagement_rate?: number
  }
  alert_threshold: number
  alert_emails: string[]
  analysis_type: 'historical' | 'live'
  date_start?: string
  date_end?: string
  schedule_config?: {
    interval_type: string
    interval_value: number
    specific_times: string[]
  }
}

export default function CreateCampaignWizard() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Form state
  const [formData, setFormData] = useState<CampaignFormData>({
    campaign_name: '',
    target: '',
    industry: '',
    competitors: [],
    sources: [],
    kpis: {},
    alert_threshold: 100,
    alert_emails: [],
    analysis_type: 'historical',
    date_start: undefined,
    date_end: undefined,
    schedule_config: undefined,
  })

  // Temporary input states
  const [competitorInput, setCompetitorInput] = useState('')
  const [emailInput, setEmailInput] = useState('')
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<string[]>([])
  const [enabledKPIs, setEnabledKPIs] = useState<Record<string, boolean>>({
    sentiment_target: false,
    share_of_voice_target: false,
    volume_target: false,
    engagement_rate: false,
  })

  const totalSteps = 5

  const updateFormData = (updates: Partial<CampaignFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }))
  }

  const addCompetitor = (competitor: string) => {
    const trimmed = competitor.trim()
    if (trimmed && !formData.competitors.includes(trimmed)) {
      updateFormData({
        competitors: [...formData.competitors, trimmed],
      })
    }
    setCompetitorInput('')
  }

  const removeCompetitor = (competitor: string) => {
    updateFormData({
      competitors: formData.competitors.filter(c => c !== competitor),
    })
  }

  const addEmail = (email: string) => {
    const trimmed = email.trim()
    if (trimmed && !formData.alert_emails.includes(trimmed)) {
      updateFormData({
        alert_emails: [...formData.alert_emails, trimmed],
      })
    }
    setEmailInput('')
  }

  const removeEmail = (email: string) => {
    updateFormData({
      alert_emails: formData.alert_emails.filter(e => e !== email),
    })
  }

  const toggleSource = (sourceId: string) => {
    updateFormData({
      sources: formData.sources.includes(sourceId)
        ? formData.sources.filter(s => s !== sourceId)
        : [...formData.sources, sourceId],
    })
  }

  const toggleKPI = (kpiId: string) => {
    setEnabledKPIs(prev => ({ ...prev, [kpiId]: !prev[kpiId] }))
  }

  const updateKPI = (kpiId: string, value: number) => {
    updateFormData({
      kpis: { ...formData.kpis, [kpiId]: value },
    })
  }

  const toggleTimeSlot = (time: string) => {
    setSelectedTimeSlots(prev =>
      prev.includes(time) ? prev.filter(t => t !== time) : [...prev, time]
    )
  }

  // Validation
  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        if (!formData.campaign_name.trim()) {
          toast.error('Campaign Name is required')
          return false
        }
        if (!formData.target.trim()) {
          toast.error('Target Brand/Keyword is required')
          return false
        }
        if (!formData.industry) {
          toast.error('Industry is required')
          return false
        }
        return true

      case 2:
        if (formData.sources.length === 0) {
          toast.error('Please select at least one data source')
          return false
        }
        return true

      case 3:
        const enabledCount = Object.values(enabledKPIs).filter(v => v).length
        if (enabledCount === 0) {
          toast.error('Please enable at least one KPI')
          return false
        }
        return true

      case 4:
        if (formData.analysis_type === 'historical') {
          if (!formData.date_start || !formData.date_end) {
            toast.error('Please select both start and end dates')
            return false
          }
          if (formData.date_start && formData.date_end && new Date(formData.date_start) > new Date(formData.date_end)) {
            toast.error('End date must be after start date')
            return false
          }
        } else {
          if (!formData.schedule_config?.interval_type) {
            toast.error('Please select a schedule interval')
            return false
          }
          if (
            formData.schedule_config.interval_type === 'day' &&
            selectedTimeSlots.length === 0
          ) {
            toast.error('Please select at least one time slot for daily scheduling')
            return false
          }
        }
        return true

      default:
        return true
    }
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps))
    }
  }

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const handleSubmit = async () => {
    if (!validateStep(5)) return

    setIsSubmitting(true)

    // Compile final payload
    const payload = {
      campaign_name: formData.campaign_name,
      target: formData.target,
      industry: formData.industry,
      competitors: formData.competitors,
      sources: formData.sources,
      kpis: formData.kpis,
      alert_threshold: formData.alert_threshold,
      alert_emails: formData.alert_emails.length > 0 ? formData.alert_emails : ['default@user.com'],
      analysis_type: formData.analysis_type,
      date_start: formData.date_start,
      date_end: formData.date_end,
      schedule_config: formData.analysis_type === 'live' ? {
        interval_type: formData.schedule_config?.interval_type || 'day',
        interval_value: getIntervalValue(formData.schedule_config?.interval_type),
        specific_times: formData.schedule_config?.interval_type === 'day' ? selectedTimeSlots : [],
      } : undefined,
    }

    try {
      const response = await fetch('/api/v1/campaigns/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error('Failed to create campaign')
      }

      const result = await response.json()

      toast.success('Campaign created successfully!', {
        description: `Campaign "${formData.campaign_name}" is now ${formData.analysis_type === 'live' ? 'running' : 'processing'}`,
      })

      // Redirect to dashboard or campaign details
      router.push('/dashboard/command-center')
    } catch (error) {
      console.error('Campaign creation error:', error)
      toast.error('Failed to create campaign', {
        description: 'Please try again or contact support',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const getIntervalValue = (intervalType?: string): number => {
    switch (intervalType) {
      case 'minute':
        return 1
      case 'five_minutes':
        return 5
      case 'hour':
        return 1
      case 'day':
        return 1
      default:
        return 1
    }
  }

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {Array.from({ length: totalSteps }, (_, i) => i + 1).map(step => (
        <div key={step} className="flex items-center">
          <div
            className={cn(
              'flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300',
              step <= currentStep
                ? 'bg-primary border-primary text-primary-foreground'
                : 'border-muted-foreground/30 text-muted-foreground'
            )}
          >
            {step < currentStep ? (
              <CheckCircle2 className="w-5 h-5" />
            ) : (
              step
            )}
          </div>
          {step < totalSteps && (
            <div
              className={cn(
                'w-16 h-1 mx-2 transition-all duration-300',
                step < currentStep ? 'bg-primary' : 'bg-muted-foreground/30'
              )}
            />
          )}
        </div>
      ))}
    </div>
  )

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">Core Identifiers</h2>
        <p className="text-muted-foreground">Define what you want to track</p>
      </div>

      {/* Campaign Name */}
      <div className="space-y-2">
        <Label htmlFor="campaign_name" className="flex items-center gap-2">
          <Briefcase className="w-4 h-4" />
          Campaign Name
        </Label>
        <Input
          id="campaign_name"
          placeholder='e.g., "Zenith Bank Q1 Health"'
          value={formData.campaign_name}
          onChange={(e) => updateFormData({ campaign_name: e.target.value })}
          className="bg-background"
        />
      </div>

      {/* Target Brand/Keyword */}
      <div className="space-y-2">
        <Label htmlFor="target" className="flex items-center gap-2">
          <Target className="w-4 h-4" />
          Target Brand/Keyword <span className="text-destructive">*</span>
        </Label>
        <Input
          id="target"
          placeholder="The exact phrase to scrape"
          value={formData.target}
          onChange={(e) => updateFormData({ target: e.target.value })}
          className="bg-background"
          required
        />
      </div>

      {/* Industry */}
      <div className="space-y-2">
        <Label htmlFor="industry" className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4" />
          Industry <span className="text-destructive">*</span>
        </Label>
        <Select
          value={formData.industry}
          onValueChange={(value) => {
            updateFormData({ industry: value, competitors: [] })
          }}
        >
          <SelectTrigger className="bg-background">
            <SelectValue placeholder="Select an industry" />
          </SelectTrigger>
          <SelectContent>
            {INDUSTRIES.map(industry => (
              <SelectItem key={industry.value} value={industry.value}>
                {industry.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Competitors */}
      {formData.industry && (
        <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Competitors
            </Label>
            <div className="flex gap-2">
              <Input
                placeholder="Type and press Enter to add"
                value={competitorInput}
                onChange={(e) => setCompetitorInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    addCompetitor(competitorInput)
                  }
                }}
                className="bg-background flex-1"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => addCompetitor(competitorInput)}
                disabled={!competitorInput.trim()}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Suggested Competitors */}
          {SUGGESTED_COMPETITORS[formData.industry] && (
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">
                Suggested Competitors (click to add):
              </Label>
              <div className="flex flex-wrap gap-2">
                {SUGGESTED_COMPETITORS[formData.industry]
                  .filter(c => !formData.competitors.includes(c))
                  .map(competitor => (
                    <Badge
                      key={competitor}
                      variant="secondary"
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                      onClick={() => addCompetitor(competitor)}
                    >
                      {competitor}
                    </Badge>
                  ))}
              </div>
            </div>
          )}

          {/* Selected Competitors */}
          {formData.competitors.length > 0 && (
            <div className="space-y-2">
              <Label>Selected Competitors:</Label>
              <div className="flex flex-wrap gap-2">
                {formData.competitors.map(competitor => (
                  <Badge
                    key={competitor}
                    variant="default"
                    className="gap-1"
                  >
                    {competitor}
                    <button
                      onClick={() => removeCompetitor(competitor)}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">Data Source Routing</h2>
        <p className="text-muted-foreground">Choose where to gather intelligence</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {SOURCE_OPTIONS.map(source => {
          const Icon = source.icon
          const isSelected = formData.sources.includes(source.id)

          return (
            <Card
              key={source.id}
              className={cn(
                'cursor-pointer transition-all duration-300 border-2',
                isSelected
                  ? 'border-primary bg-primary/5'
                  : 'border-muted hover:border-muted-foreground/50'
              )}
              onClick={() => toggleSource(source.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        'p-2 rounded-lg',
                        isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted'
                      )}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <CardTitle className="text-lg">{source.title}</CardTitle>
                  </div>
                  <Checkbox checked={isSelected} className="pointer-events-none" />
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>{source.description}</CardDescription>
                {source.id === 'social_pulse' && (
                  <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                    <Info className="w-3 h-3" />
                    Disabling saves API credits and speeds up processing
                  </p>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {formData.sources.length === 0 && (
        <div className="text-center py-4 text-muted-foreground">
          Please select at least one data source to continue
        </div>
      )}
    </div>
  )

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">KPIs & Crisis Alerts</h2>
        <p className="text-muted-foreground">Define success metrics and alert thresholds</p>
      </div>

      {/* KPIs */}
      <div className="space-y-4">
        <Label className="text-base flex items-center gap-2">
          <BarChart3 className="w-5 h-5" />
          Key Performance Indicators
        </Label>

        {KPI_OPTIONS.map(kpi => {
          const Icon = kpi.icon
          const isEnabled = enabledKPIs[kpi.id]
          const value = formData.kpis[kpi.id as keyof typeof formData.kpis] || 0

          return (
            <Card key={kpi.id} className={cn(isEnabled && 'border-primary/50')}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        'p-2 rounded-lg',
                        isEnabled ? 'bg-primary text-primary-foreground' : 'bg-muted'
                      )}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <CardTitle className="text-base">{kpi.label}</CardTitle>
                    </div>
                  </div>
                  <Switch
                    checked={isEnabled}
                    onCheckedChange={() => toggleKPI(kpi.id)}
                  />
                </div>
              </CardHeader>
              {isEnabled && (
                <CardContent className="pt-0 animate-in fade-in slide-in-from-top-2">
                  {kpi.type === 'slider' ? (
                    <div className="space-y-4">
                      <Slider
                        value={[value]}
                        onValueChange={([v]) => updateKPI(kpi.id, v)}
                        min={kpi.min}
                        max={kpi.max}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>{kpi.min}{kpi.unit}</span>
                        <span className="font-semibold text-primary">
                          {value}{kpi.unit}
                        </span>
                        <span>{kpi.max}{kpi.unit}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-4">
                      <Input
                        type="number"
                        value={value || ''}
                        onChange={(e) => updateKPI(kpi.id, parseInt(e.target.value) || 0)}
                        min={kpi.min}
                        max={kpi.max}
                        className="w-32 bg-background"
                      />
                      <span className="text-muted-foreground">{kpi.unit}</span>
                    </div>
                  )}
                </CardContent>
              )}
            </Card>
          )
        })}
      </div>

      {/* Crisis Alert Threshold */}
      <div className="space-y-4 pt-4 border-t">
        <Label className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-destructive" />
          Crisis Alert Threshold
        </Label>
        <div className="flex items-center gap-4">
          <Input
            type="number"
            value={formData.alert_threshold}
            onChange={(e) => updateFormData({ alert_threshold: parseInt(e.target.value) || 0 })}
            className="w-32 bg-background"
          />
          <span className="text-muted-foreground">
            negative mentions per run triggers alert
          </span>
        </div>
      </div>

      {/* Alert Recipients */}
      <div className="space-y-4 pt-4 border-t">
        <Label className="flex items-center gap-2">
          <Users className="w-5 h-5" />
          Alert Recipients
        </Label>
        <div className="flex gap-2">
          <Input
            type="email"
            placeholder="Enter email and press Enter"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                addEmail(emailInput)
              }
            }}
            className="bg-background flex-1"
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => addEmail(emailInput)}
            disabled={!emailInput.trim()}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        {formData.alert_emails.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {formData.alert_emails.map(email => (
              <Badge key={email} variant="secondary" className="gap-1">
                {email}
                <button
                  onClick={() => removeEmail(email)}
                  className="ml-1 hover:text-destructive"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}
        <p className="text-xs text-muted-foreground">
          Defaults to logged-in user if no emails added
        </p>
      </div>
    </div>
  )

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">Timeframe & Automation</h2>
        <p className="text-muted-foreground">When should the analysis run?</p>
      </div>

      {/* Analysis Type */}
      <div className="space-y-4">
        <Label className="text-base flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Analysis Type
        </Label>

        <div className="grid gap-4 md:grid-cols-2">
          {/* Historical Snapshot */}
          <Card
            className={cn(
              'cursor-pointer transition-all duration-300 border-2',
              formData.analysis_type === 'historical'
                ? 'border-primary bg-primary/5'
                : 'border-muted hover:border-muted-foreground/50'
            )}
            onClick={() => updateFormData({ analysis_type: 'historical', schedule_config: undefined })}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    'p-2 rounded-lg',
                    formData.analysis_type === 'historical'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  )}
                >
                  <CalendarIcon className="w-5 h-5" />
                </div>
                <div>
                  <CardTitle className="text-base">Historical Snapshot</CardTitle>
                  <CardDescription>Analyze past data within a date range</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Live Tracker */}
          <Card
            className={cn(
              'cursor-pointer transition-all duration-300 border-2',
              formData.analysis_type === 'live'
                ? 'border-primary bg-primary/5'
                : 'border-muted hover:border-muted-foreground/50'
            )}
            onClick={() => updateFormData({ analysis_type: 'live' })}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    'p-2 rounded-lg',
                    formData.analysis_type === 'live'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  )}
                >
                  <Repeat className="w-5 h-5" />
                </div>
                <div>
                  <CardTitle className="text-base">Live Tracker (Compounding)</CardTitle>
                  <CardDescription>Continuous monitoring with automation</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>
      </div>

      {/* Conditional Content Based on Analysis Type */}
      {formData.analysis_type === 'historical' ? (
        <div className="space-y-4 animate-in fade-in slide-in-from-top-4">
          <Label>Date Range</Label>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="date_start" className="text-sm">Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      'w-full justify-start text-left font-normal bg-background',
                      !formData.date_start && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.date_start ? format(new Date(formData.date_start), 'PPP') : 'Pick a date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.date_start ? new Date(formData.date_start) : undefined}
                    onSelect={(date) => updateFormData({ date_start: date ? format(date, 'yyyy-MM-dd') : undefined })}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date_end" className="text-sm">End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      'w-full justify-start text-left font-normal bg-background',
                      !formData.date_end && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.date_end ? format(new Date(formData.date_end), 'PPP') : 'Pick a date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.date_end ? new Date(formData.date_end) : undefined}
                    onSelect={(date) => updateFormData({ date_end: date ? format(date, 'yyyy-MM-dd') : undefined })}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4 animate-in fade-in slide-in-from-top-4">
          <Label>Schedule Configuration</Label>

          {/* Interval Type */}
          <div className="space-y-2">
            <Label htmlFor="interval_type" className="text-sm">Schedule Interval</Label>
            <Select
              value={formData.schedule_config?.interval_type}
              onValueChange={(value) => {
                updateFormData({
                  schedule_config: {
                    interval_type: value,
                    interval_value: getIntervalValue(value),
                    specific_times: [],
                  },
                })
                setSelectedTimeSlots([])
              }}
            >
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Select interval" />
              </SelectTrigger>
              <SelectContent>
                {INTERVAL_OPTIONS.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Time Slots for Daily Schedule */}
          {formData.schedule_config?.interval_type === 'day' && (
            <div className="space-y-3 animate-in fade-in slide-in-from-top-2">
              <Label>Pick Specific Times (Daily)</Label>
              <div className="grid grid-cols-6 gap-2 max-h-48 overflow-y-auto p-2 border rounded-md bg-background">
                {TIME_SLOTS.map(time => (
                  <Badge
                    key={time}
                    variant={selectedTimeSlots.includes(time) ? 'default' : 'outline'}
                    className={cn(
                      'cursor-pointer transition-all',
                      selectedTimeSlots.includes(time)
                        ? 'bg-primary hover:bg-primary/90'
                        : 'hover:bg-muted'
                    )}
                    onClick={() => toggleTimeSlot(time)}
                  >
                    {time}
                  </Badge>
                ))}
              </div>
              {selectedTimeSlots.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {selectedTimeSlots.map(time => (
                    <Badge key={time} variant="secondary" className="gap-1">
                      {time}
                      <button
                        onClick={() => toggleTimeSlot(time)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          )}

          {formData.schedule_config?.interval_type &&
            formData.schedule_config.interval_type !== 'day' && (
              <div className="p-3 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <Info className="w-4 h-4" />
                  System will auto-trigger every{' '}
                  {INTERVAL_OPTIONS.find(o => o.value === formData.schedule_config?.interval_type)?.label.toLowerCase()}
                </p>
              </div>
            )}
        </div>
      )}
    </div>
  )

  const renderStep5 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">Review & Launch</h2>
        <p className="text-muted-foreground">Verify your campaign settings before launching</p>
      </div>

      <div className="space-y-4">
        {/* Campaign Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="w-5 h-5" />
              Campaign Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Campaign Name</p>
                <p className="font-semibold">{formData.campaign_name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Target</p>
                <p className="font-semibold">{formData.target}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Industry</p>
                <p className="font-semibold capitalize">{formData.industry.replace('_', ' ')}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Analysis Type</p>
                <p className="font-semibold capitalize">{formData.analysis_type}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Competitors */}
        {formData.competitors.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Competitors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {formData.competitors.map(competitor => (
                  <Badge key={competitor} variant="secondary">
                    {competitor}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Data Sources */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Data Sources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {formData.sources.map(sourceId => {
                const source = SOURCE_OPTIONS.find(s => s.id === sourceId)
                const Icon = source?.icon
                return (
                  <Badge key={sourceId} variant="outline" className="gap-1">
                    {Icon && <Icon className="w-3 h-3" />}
                    {source?.title}
                  </Badge>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* KPIs */}
        {Object.entries(enabledKPIs)
          .filter(([_, enabled]) => enabled)
          .length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                KPI Targets
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(enabledKPIs)
                  .filter(([_, enabled]) => enabled)
                  .map(([kpiId]) => {
                    const kpi = KPI_OPTIONS.find(k => k.id === kpiId)
                    const value = formData.kpis[kpiId as keyof typeof formData.kpis]
                    const Icon = kpi?.icon
                    return (
                      <div key={kpiId} className="flex items-center gap-2">
                        {Icon && (
                          <div className="p-1.5 bg-primary/10 rounded">
                            <Icon className="w-4 h-4 text-primary" />
                          </div>
                        )}
                        <div>
                          <p className="text-xs text-muted-foreground">{kpi?.label}</p>
                          <p className="font-semibold">
                            {value}
                            {kpi?.unit}
                          </p>
                        </div>
                      </div>
                    )
                  })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-destructive" />
              Crisis Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">Threshold</p>
              <p className="font-semibold">
                {formData.alert_threshold} negative mentions per run
              </p>
            </div>
            {formData.alert_emails.length > 0 && (
              <div>
                <p className="text-sm text-muted-foreground">Recipients</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {formData.alert_emails.map(email => (
                    <Badge key={email} variant="secondary" className="text-xs">
                      {email}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Schedule */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Schedule
            </CardTitle>
          </CardHeader>
          <CardContent>
            {formData.analysis_type === 'historical' ? (
              <div className="space-y-2">
                <div>
                  <p className="text-sm text-muted-foreground">Date Range</p>
                  <p className="font-semibold">
                    {formData.date_start && format(new Date(formData.date_start), 'PPP')}
                    {' → '}
                    {formData.date_end && format(new Date(formData.date_end), 'PPP')}
                  </p>
                </div>
                <Badge variant="outline">One-time Analysis</Badge>
              </div>
            ) : (
              <div className="space-y-2">
                <div>
                  <p className="text-sm text-muted-foreground">Interval</p>
                  <p className="font-semibold">
                    {INTERVAL_OPTIONS.find(
                      o => o.value === formData.schedule_config?.interval_type
                    )?.label || 'Not set'}
                  </p>
                </div>
                {formData.schedule_config?.interval_type === 'day' &&
                  selectedTimeSlots.length > 0 && (
                    <div>
                      <p className="text-sm text-muted-foreground">Daily Times</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {selectedTimeSlots.map(time => (
                          <Badge key={time} variant="secondary" className="text-xs">
                            {time}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                <Badge variant="default">Recurring</Badge>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )

  return (
    <div className="container mx-auto max-w-4xl py-8 px-4">
      {/* Step Indicator */}
      {renderStepIndicator()}

      {/* Step Content */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}
          {currentStep === 5 && renderStep5()}
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={currentStep === 1 || isSubmitting}
          className="gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </Button>

        {currentStep < totalSteps ? (
          <Button onClick={handleNext} disabled={isSubmitting} className="gap-2">
            Next
            <ChevronRight className="w-4 h-4" />
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="gap-2 bg-gradient-to-r from-primary to-primary/80"
            size="lg"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                Launching...
              </>
            ) : (
              <>
                <CheckCircle2 className="w-5 h-5" />
                Launch Campaign / Run Analysis
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  )
}
