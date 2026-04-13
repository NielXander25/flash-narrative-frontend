# Flash Narrative - Project Structure

## Directory Organization

```
flash-narrative-frontend/
├── app/
│   ├── dashboard/
│   │   ├── command-center/
│   │   │   └── page.tsx          # Portfolio grid, alerts sidebar
│   │   ├── reports/
│   │   │   └── page.tsx          # Reports archive & templates
│   │   ├── api/
│   │   │   └── page.tsx          # API keys & webhooks management
│   │   ├── settings/
│   │   │   └── page.tsx          # Workspace branding & config
│   │   ├── layout.tsx            # Dashboard layout with sidebar
│   │   └── page.tsx              # Intelligence dashboard
│   ├── login/
│   │   └── page.tsx              # Authentication page
│   ├── layout.tsx                # Root layout with metadata
│   ├── page.tsx                  # Home redirect
│   └── globals.css               # Global styles & design tokens
├── components/
│   ├── dashboard/
│   │   ├── sidebar.tsx           # Navigation sidebar
│   │   ├── kpi-cards.tsx         # KPI metric cards
│   │   ├── sentiment-chart.tsx   # Donut chart
│   │   ├── sov-chart.tsx         # SOV bar chart
│   │   ├── mentions-table.tsx    # Data table component
│   │   └── modals.tsx            # Reusable modals
│   └── ui/                        # shadcn/ui components
├── lib/
│   ├── constants.ts              # Mock data & static values
│   ├── api.ts                    # API utilities & functions
│   ├── hooks.ts                  # Custom React hooks
│   └── types.ts                  # TypeScript interfaces
├── public/
│   ├── logo.png                  # Flash Narrative logo
│   ├── favicon.ico               # Favicon
│   └── apple-touch-icon.png      # iOS icon
├── package.json
├── tsconfig.json
└── tailwind.config.ts
```

## Key Patterns

- **No inline mock data**: All constants live in `lib/constants.ts`
- **Reusable hooks**: Custom hooks in `lib/hooks.ts` for common logic
- **Type safety**: Interfaces defined in `lib/types.ts`
- **API utilities**: Fetch wrappers in `lib/api.ts`
- **Component organization**: UI components in `components/ui/`, feature components in `components/dashboard/`

## File Size Guidelines

- Components: < 300 lines (split into smaller pieces if larger)
- Pages: < 400 lines (extract logic to components/utilities)
- Utilities: < 200 lines (single responsibility)
