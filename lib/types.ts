export interface Mention {
  id: string
  title: string
  snippet: string
  platform_category: 'News' | 'Social'
  sentiment_label: 'Positive' | 'Neutral' | 'Negative' | 'Anger'
  published_date: string
  source: string
}

export interface SentimentData {
  name: string
  value: number
  color: string
}

export interface SOVData {
  name: string
  value: number
}

export interface ExportData {
  mentions: Mention[]
  sentiment: SentimentData[]
}
