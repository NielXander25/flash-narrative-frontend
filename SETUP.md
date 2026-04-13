# Flash Narrative - Setup & Development

## Installation

```bash
# Install dependencies
npm install
# or
pnpm install

# Run development server
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Architecture Overview

### File Organization
- **app/** - Next.js App Router pages and layouts
- **components/** - Reusable React components
- **lib/** - Utilities, hooks, types, and constants
- **public/** - Static assets (logo, favicon)

### Key Utilities
- **lib/constants.ts** - All mock data, navigation items, and static values
- **lib/api.ts** - API calls and data export functions
- **lib/hooks.ts** - Custom React hooks (useExport, useSidebarToggle)
- **lib/types.ts** - TypeScript interfaces for type safety

## Code Patterns

### Imports
Always import constants from `lib/constants.ts`:
```tsx
import { MOCK_MENTIONS, SENTIMENT_DATA, BRANDS } from '@/lib/constants'
```

### Custom Hooks
For reusable logic:
```tsx
import { useExport } from '@/lib/hooks'

const { isExporting, error, startExport } = useExport()
```

### Type Safety
Use interfaces from `lib/types.ts`:
```tsx
import type { Mention, ExportData } from '@/lib/types'
```

## Development Workflow

1. **Create new features** in `components/dashboard/`
2. **Extract constants** to `lib/constants.ts`
3. **Add types** to `lib/types.ts`
4. **Create utilities** in `lib/api.ts` or `lib/hooks.ts`
5. **Keep pages thin** - delegate to components

## Comments Policy
- Minimal comments: Only on complex logic
- Self-documenting code: Clear variable/function names
- No verbose comment blocks: Let the code speak

## Responsive Design
- Mobile-first approach (base styles for mobile)
- Tablet breakpoint: `sm:` (640px)
- Desktop breakpoint: `lg:` (1024px)
- Use Tailwind utilities consistently

## Next Steps
- Backend API integration endpoints
- Real data connection to `/api` routes
- User authentication flow
- Real-time data updates
