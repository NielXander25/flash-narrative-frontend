export const NAVIGATION_ITEMS = [
  { label: 'Command Center', icon: 'Compass', href: '/dashboard/command-center' },
  { label: 'Intelligence Dashboard', icon: 'BarChart3', href: '/dashboard' },
  { label: 'Reports', icon: 'FileText', href: '/dashboard/reports' },
  { label: 'API & Integrations', icon: 'Command', href: '/dashboard/api' },
  { label: 'Settings', icon: 'Settings', href: '/dashboard/settings' },
]

export const MOCK_MENTIONS = [
  {
    id: 'https://nairametrics.com/example',
    title: 'Zenith Bank launches new premium service',
    snippet: 'The new service aims to provide better customer experience and financial inclusion...',
    platform_category: 'News',
    sentiment_label: 'Positive',
    published_date: '2026-03-02T10:00:00Z',
    source: 'Nairae Metrics',
  },
  {
    id: 'https://nairaland.com/forum/123',
    title: 'Wahala for this new app',
    snippet: 'This new app feature is pure wahala oo. Why is everything so complicated?',
    platform_category: 'Social',
    sentiment_label: 'Anger',
    published_date: '2026-03-02T11:30:00Z',
    source: 'Nairaland',
  },
  {
    id: 'https://businessday.ng/tech',
    title: 'Nigeria fintech sector records growth',
    snippet: 'Industry experts predict continued growth in digital payment solutions...',
    platform_category: 'News',
    sentiment_label: 'Positive',
    published_date: '2026-03-01T14:20:00Z',
    source: 'Business Day',
  },
  {
    id: 'https://twitter.com/example',
    title: 'Just switched to new banking app',
    snippet: 'Really impressed with the new features. Much better than expected!',
    platform_category: 'Social',
    sentiment_label: 'Positive',
    published_date: '2026-03-01T09:15:00Z',
    source: 'Twitter',
  },
]

export const SENTIMENT_DATA = [
  { name: 'Positive', value: 45, color: '#2ECC8A' },
  { name: 'Neutral', value: 30, color: '#5B8FD4' },
  { name: 'Negative', value: 18, color: '#E8832A' },
  { name: 'Anger', value: 7, color: '#E84242' },
]

export const SOV_DATA = [
  { name: 'Flash Narrative', value: 60 },
  { name: 'Competitor A', value: 25 },
  { name: 'Competitor B', value: 15 },
]

export const BRANDS = [
  {
    id: 'zoom-bank',
    name: 'Zoom Bank Asset',
    client: 'Zoom',
    mentions: 12,
    trend: '+8%',
    alerts: 3,
    sentiment: 'positive',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop',
  },
  {
    id: 'otbank',
    name: 'OTBank',
    client: 'OTBank',
    mentions: 48,
    trend: '+12%',
    alerts: 2,
    sentiment: 'positive',
    thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&h=200&fit=crop',
  },
  {
    id: 'desgee',
    name: 'Desgee Group',
    client: 'Desgee',
    mentions: 9,
    trend: '-2%',
    alerts: 1,
    sentiment: 'neutral',
    thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=300&h=200&fit=crop',
  },
  {
    id: 'wtm',
    name: 'WTM Nigeria',
    client: 'WTM',
    mentions: 15,
    trend: '+5%',
    alerts: 4,
    sentiment: 'warning',
    thumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=300&h=200&fit=crop',
  },
]

export const RECENT_ALERTS = [
  {
    brand: 'WTM Nigeria',
    title: 'Trending mention on Twitter',
    time: '2 mins ago',
    severity: 'high',
  },
  {
    brand: 'Zoom Bank',
    title: 'Positive sentiment spike',
    time: '15 mins ago',
    severity: 'low',
  },
  {
    brand: 'OTBank',
    title: 'New competitor activity',
    time: '1 hour ago',
    severity: 'low',
  },
  {
    brand: 'Desgee Group',
    title: 'Media coverage detected',
    time: '3 hours ago',
    severity: 'high',
  },
]
