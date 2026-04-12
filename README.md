Flash Narrative — Enterprise PR Intelligence Platform

> Boardroom-ready, multi-tenant B2B SaaS platform for PR Agencies and C-Suite Executives.
> Real-time media monitoring · AI sentiment analysis · Competitive Share of Voice · White-label ready.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-flash--narrative.vercel.app-D4A017?style=flat-square)](https://flash-narrative.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-16.2.2-black?style=flat-square)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-06B6D4?style=flat-square)](https://tailwindcss.com)
[![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-Latest-white?style=flat-square)](https://ui.shadcn.com)

Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Screens](#screens)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Design System](#design-system)
- [Deployment](#deployment)
- [Roadmap](#roadmap)

Overview

Flash Narrative is transitioning from a single-page Streamlit prototype into a premium, multi-tenant enterprise platform. It is built for PR Agencies and Corporate Executives (Bank CEOs, CMOs, Chief Communications Officers) who need real-time brand intelligence delivered in a boardroom-ready interface.

The platform is built around three strategic pillars:

| Pillar | Description |
|--------|-------------|
|  Boardroom Ready | Dark, gold-accented aesthetic referencing Bloomberg Terminal meets luxury fintech |
| The Chameleon Effect | Full white-labelling — agencies brand the platform as their own via CSS custom properties |
| Information Hierarchy | Strict separation of Tier-1 media signals from social noise via tabbed data architecture |

Features

Core Platform
- Global Command Center — Agency director overview with live crisis radar, 4 aggregated KPI cards, and agency portfolio grid with sparklines
- Intelligence Dashboard — Campaign-specific deep analysis with Recharts Sentiment Donut, SOV Bar Chart, 3-tab data tables (News, Social, Regulatory), and AI Executive Summary
- Reports Command Center — Campaign reporting archive, template selection modal, full-screen document editor with drag-and-drop Data Palette, and email dispatch panel
- Agency Settings — Logo upload, HEX color pickers with real-time CSS variable injection and live interface preview
- API & Integration Hub — Credential management, masked key display, copy-to-clipboard, revocation modal, webhook configuration
- New Campaign Wizard — 3-step modal: Brand Identity → Competitive Landscape → Data Stream Selection

Authentication
- Google OAuth SSO via NextAuth.js — no email/password fields
- Enterprise invitation-only workspace model
- JWT session management with protected route middleware

White-Label Architecture
- CSS custom properties at `:root` level (`--primary`, `--primary-hover`)
- Runtime theme injection on workspace load via `applyAgencyTheme()`
- Agency logo, colors, and workspace name stored per tenant

Responsive Design
- Desktop (1280px+) — full sidebar, side-by-side layouts
- Tablet (768px) — collapsed icon rail sidebar
- Mobile (375px) — hamburger drawer, stacked cards, horizontal scroll tables

---

Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router) | 16.2.2 |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS | 4.x |
| Components | shadcn/ui | Latest |
| Charts | Recharts | Latest |
| Authentication | NextAuth.js | Beta |
| State Management | Zustand | Latest |
| Icons | Lucide React | Latest |
| Rich Text Editor | BlockNote *(planned)* | — |
| Deployment | Vercel | — |

---

Screens

| # | Screen | Route | Status |
|---|--------|-------|--------|
| 1 | Authentication & Login | `/login` | ✅ Complete |
| 2 | Global Command Center | `/command-center` | ✅ Complete |
| 3 | New Campaign Wizard Modal | *(overlay on Command Center)* | ✅ Complete |
| 4 | Intelligence Dashboard | `/intelligence` | ✅ Complete |
| 5 | Reports Command Center | `/reports` | ✅ Complete |
| 6 | Report Builder Template Modal | *(overlay on Reports)* | ✅ Complete |
| 7 | Report Builder Canvas + Email Modal | *(full-screen on Reports)* | ✅ Complete |
| 8 | Agency Settings & White-Label Engine | `/settings` | ✅ Complete |
| 9 | API & Integration Hub | `/api-hub` | ✅ Complete |
| 10 | Revoke API Key Modal | *(overlay on API Hub)* | ✅ Complete |
| 11 | Mobile Hamburger Navigation | *(responsive — all screens)* | ✅ Complete |


Getting Started

Prerequisites

- Node.js 18+
- npm or yarn
- Git

Installation

```bash
# Clone the repository
git clone https://github.com/NielXander25/flash-narrative.git
cd flash-narrative

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local
# Fill in your credentials (see Environment Variables section)

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

Build for Production

```bash
npm run build
npm start
```

Environment Variables

Create a `.env.local` file in the root of the project:

```env
# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-minimum-32-characters

# Google OAuth — obtain from Google Cloud Console
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

Project Structure

```
flash-narrative/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   └── login/
│   │   │       └── page.tsx          # Authentication screen
│   │   ├── (dashboard)/
│   │   │   ├── layout.tsx            # Shared layout (Sidebar + Main)
│   │   │   ├── command-center/
│   │   │   │   └── page.tsx          # Global Command Center
│   │   │   ├── intelligence/
│   │   │   │   └── page.tsx          # Intelligence Dashboard
│   │   │   ├── reports/
│   │   │   │   └── page.tsx          # Reports Command Center
│   │   │   ├── settings/
│   │   │   │   └── page.tsx          # Agency Settings
│   │   │   └── api-hub/
│   │   │       └── page.tsx          # API & Integration Hub
│   │   ├── api/
│   │   │   └── auth/
│   │   │       └── [...nextauth]/
│   │   │           └── route.ts      # NextAuth handler
│   │   ├── globals.css               # CSS custom properties & design tokens
│   │   ├── layout.tsx                # Root layout
│   │   └── page.tsx                  # Root redirect → /command-center
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Sidebar.tsx           # Collapsible sidebar + mobile drawer
│   │   │   └── Navbar.tsx            # Top navbar with actions
│   │   └── ui/                       # shadcn/ui components
│   └── lib/
│       └── utils.ts                  # Utility functions (cn, whiteLabel)
├── middleware.ts                     # Route protection
├── .env.local                        # Environment variables (not committed)
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

Design System

Color Tokens

All colors are defined as CSS custom properties in `globals.css`:

```css
:root {
  --background:    #0A0A0F;   /* Page background */
  --card:          #12121A;   /* Cards, sidebar, navbar */
  --border:        #1E1E2E;   /* Borders and dividers */
  --primary:       #D4A017;   /* Gold — brand accent (white-labelable) */
  --primary-hover: #E6B420;   /* Gold hover state */
  --text-primary:  #F8FAFC;   /* Headlines and values */
  --text-muted:    #94A3B8;   /* Labels and subtitles */
  --positive:      #2ECC8A;   /* Positive sentiment */
  --neutral:       #5B8FD4;   /* Neutral sentiment */
  --negative:      #E8832A;   /* Negative sentiment */
  --crisis:        #E84242;   /* Crisis/Anger sentiment */
}
```

White-Label Injection

```ts
// Apply agency branding at runtime
export function applyAgencyTheme(primary: string, secondary: string) {
  document.documentElement.style.setProperty('--primary', primary);
  document.documentElement.style.setProperty('--primary-hover', secondary);
  localStorage.setItem('agency_primary', primary);
  localStorage.setItem('agency_secondary', secondary);
}
```

Typography

- Font: Inter (Google Fonts)
- Display: 48px / Bold 700
- Page Title: 30px / Bold 700
- KPI Value: 32px / Bold 700
- Body: 14px / Regular 400
- Badge: 12px / Medium 500

Deployment

The project is deployed on Vercel with automatic deployments on every push to `main`.

Live URL: [https://flash-narrative.vercel.app](https://flash-narrative.vercel.app)

* Environment Variables on Vercel


Roadmap

   Phase 2
- [x] Next.js scaffold + Vercel deployment
- [x] All 11 screens built and styled
- [x] shadcn/ui component integration
- [x] Recharts (Sentiment Donut + SOV Bar Chart)
- [x] Mobile responsive layout + hamburger menu
- [x] 3-step Campaign Wizard modal
- [ ] Google OAuth credentials configuration
- [ ] Protected route middleware
- [ ] Loading skeleton states

   Phase 3 — Upcoming
- [ ] Backend REST API integration (replace mock data)
- [ ] AI Sentiment Engine connection
- [ ] AI Executive Summary API
- [ ] White-label CSS architecture (tailwind.config.ts tokens)
- [ ] BlockNote rich text editor for Report Builder
- [ ] PDF & Excel export functionality
- [ ] Email dispatch via Resend/SendGrid

### Phase 4 — Launch
- [ ] WCAG 2.1 AA accessibility audit
- [ ] Cross-browser QA
- [ ] Lighthouse performance optimization (target 90+)
- [ ] End-to-end tests with Playwright
- [ ] Custom domain configuration (flashnarrative.com)

Contributing

This is a private enterprise project. For access or contributions contact the Engineering Lead.

License

Private & Proprietary — Flash Narrative Enterprise © 2026. All rights reserved.


<p align="center">
  Built with precision by <strong>Alexander Jathniel</strong> — Frontend & UI/UX Engineering Lead
  <br />
  <a href="https://flash-narrative.vercel.app">flash-narrative.vercel.app</a>
</p>
