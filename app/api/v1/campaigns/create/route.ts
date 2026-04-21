import { NextRequest, NextResponse } from 'next/server'

interface CampaignPayload {
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

export async function POST(request: NextRequest) {
  try {
    const body: CampaignPayload = await request.json()

    // Validate required fields
    const requiredFields = ['campaign_name', 'target', 'industry', 'sources']
    for (const field of requiredFields) {
      if (!body[field as keyof CampaignPayload]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }

    // Validate sources array
    if (!Array.isArray(body.sources) || body.sources.length === 0) {
      return NextResponse.json(
        { error: 'At least one data source must be selected' },
        { status: 400 }
      )
    }

    // Validate KPIs if enabled
    const kpiFields = ['sentiment_target', 'share_of_voice_target', 'volume_target', 'engagement_rate']
    for (const kpi of kpiFields) {
      const value = body.kpis?.[kpi as keyof typeof body.kpis]
      if (value !== undefined) {
        if (typeof value !== 'number' || value < 0) {
          return NextResponse.json(
            { error: `Invalid KPI value for ${kpi}` },
            { status: 400 }
          )
        }
      }
    }

    // Validate date range for historical analysis
    if (body.analysis_type === 'historical') {
      if (!body.date_start || !body.date_end) {
        return NextResponse.json(
          { error: 'Historical analysis requires both start and end dates' },
          { status: 400 }
        )
      }
      if (new Date(body.date_start) > new Date(body.date_end)) {
        return NextResponse.json(
          { error: 'End date must be after start date' },
          { status: 400 }
        )
      }
    }

    // Validate schedule config for live tracking
    if (body.analysis_type === 'live') {
      if (!body.schedule_config?.interval_type) {
        return NextResponse.json(
          { error: 'Live tracking requires a schedule interval' },
          { status: 400 }
        )
      }
      
      // Validate daily time slots if interval is day
      if (
        body.schedule_config.interval_type === 'day' &&
        (!body.schedule_config.specific_times || body.schedule_config.specific_times.length === 0)
      ) {
        return NextResponse.json(
          { error: 'Daily interval requires at least one specific time slot' },
          { status: 400 }
        )
      }
    }

    // TODO: Backend integration
    // This is where you would:
    // 1. Save campaign to database
    // 2. Check user's API credit balance
    // 3. Queue the initial scrape job
    // 4. Set up recurring schedule if live tracking
    // 5. Send confirmation email

    console.log('Campaign created:', body)

    // For now, return success with mock campaign ID
    return NextResponse.json({
      success: true,
      message: 'Campaign created successfully',
      campaign: {
        id: `camp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        ...body,
        created_at: new Date().toISOString(),
        status: body.analysis_type === 'live' ? 'active' : 'processing',
      },
    })

  } catch (error) {
    console.error('Campaign creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create campaign', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
