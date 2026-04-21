# Flash Narrative - Project Structure

```
flash-narrative-frontend/
├── app/                              # Next.js App Router
│   ├── layout.tsx                    # Root layout with metadata & viewport
│   ├── page.tsx                      # Home page (redirects to login)
│   ├── globals.css                   # Global styles & CSS variables
│   ├── login/
│   │   └── page.tsx                  # Authentication & login screen
│   └── dashboard/
│       ├── layout.tsx                # Dashboard layout with responsive sidebar
│       ├── page.tsx                  # Intelligence Dashboard (main screen)
│       ├── command-center/
│       │   └── page.tsx              # Global Command Center screen
│       ├── reports/
│       │   └── page.tsx              # Reports Command Center screen
│       ├── settings/
│       │   └── page.tsx              # Agency Settings & White-Label Engine
│       └── api/
│           └── page.tsx              # API & Integration Hub
│
├── components/
│   ├── dashboard/                    # Dashboard-specific components
│   │   ├── sidebar.tsx               # Navigation sidebar with menu
│   │   ├── kpi-cards.tsx             # KPI metric cards component
│   │   ├── sentiment-chart.tsx        # Sentiment breakdown donut chart
│   │   ├── sov-chart.tsx             # Share of Voice bar chart
│   │   ├── mentions-table.tsx        # News/Social mentions data table
│   │   └── modals.tsx                # Modal dialogs (revoke, send, etc)
│   ├── ui/                           # shadcn/ui components (reusable)
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── tabs.tsx
│   │   ├── dialog.tsx
│   │   ├── badge.tsx
│   │   └── [other UI components]
│   └── theme-provider.tsx            # Theme provider wrapper
│
├── lib/                              # Utilities & business logic
│   ├── constants.ts                  # Mock data & hardcoded constants
│   ├── api.ts                        # API utilities & fetch helpers
│   ├── hooks.ts                      # Custom React hooks
│   ├── types.ts                      # TypeScript type definitions
│   └── handlers.ts                   # Button & event handlers
│
├── public/                           # Static assets
│   ├── logo.png                      # Organization logo
│   ├── favicon.ico                   # Favicon
│   ├── favicon.png                   # PNG favicon variant
│   └── apple-touch-icon.png          # iOS home screen icon
│
├── .vercel/                          # Vercel project configuration
│   └── project.json
│
├── node_modules/                     # Dependencies (gitignored)
├── .next/                            # Next.js build output (gitignored)
│
├── package.json                      # Project metadata & dependencies
├── package-lock.json                 # Dependency lock file
├── tsconfig.json                     # TypeScript configuration
├── tailwind.config.ts                # Tailwind CSS configuration
├── next.config.js                    # Next.js configuration
├── components.json                   # shadcn/ui configuration
│
├── README.md                         # Project documentation
├── SETUP.md                          # Setup & installation guide
├── REFACTOR_NOTES.md                 # Refactoring documentation
└── PROJECT_STRUCTURE.md              # This file
```

## Key Files by Feature

### Authentication (Login)
- `app/login/page.tsx` - Login UI with Google SSO button

### Dashboard Screens
- `app/dashboard/page.tsx` - Main Intelligence Dashboard (sentiment, SOV charts)
- `app/dashboard/command-center/page.tsx` - Brand portfolio & alerts
- `app/dashboard/reports/page.tsx` - Report generation & archive
- `app/dashboard/settings/page.tsx` - White-label branding configuration
- `app/dashboard/api/page.tsx` - API key & webhook management

### Data & Logic
- `lib/constants.ts` - Mock brands, mentions, alerts, KPI data
- `lib/api.ts` - Export utilities (PDF/Excel download)
- `lib/handlers.ts` - Button click handlers & form submissions
- `lib/hooks.ts` - useExport, useModal, useForm custom hooks
- `lib/types.ts` - TypeScript interfaces for Brand, Mention, Alert, etc

### UI Components
- `components/dashboard/sidebar.tsx` - Navigation with route detection
- `components/dashboard/kpi-cards.tsx` - Metric card display
- `components/dashboard/sentiment-chart.tsx` - Recharts donut chart
- `components/dashboard/sov-chart.tsx` - Recharts bar chart
- `components/dashboard/mentions-table.tsx` - Data table with pagination
- `components/dashboard/modals.tsx` - Modal dialogs (RevokeAPIKeyModal, etc)

## Architecture Patterns

**State Management**: React hooks (useState, useCallback)
**Data Fetching**: Async/await with error handling
**Styling**: Tailwind CSS with design tokens (CSS variables)
**Charts**: Recharts library
**Tables**: shadcn/ui Table component
**Forms**: HTML form elements with validation
**Modals**: shadcn/ui Dialog component

## Responsive Design

- Mobile-first approach with Tailwind breakpoints
- `sm:` (640px) - Tablets & small devices
- `lg:` (1024px) - Desktops & large screens
- Hamburger menu on mobile, sidebar on desktop
- Responsive grid layouts that adapt automatically

## Deployment & Build

- **Build Command**: `npm run build`
- **Start Command**: `npm start`
- **Dev Server**: `npm run dev`
- **Framework**: Next.js 14+ (App Router)
- **Package Manager**: npm
- **Deployment**: Vercel (automatic)
