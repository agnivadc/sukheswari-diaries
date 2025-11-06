# From Bumble to Forever - Birthday Celebration Web App

## Overview

A romantic, interactive birthday celebration web application built to commemorate a long-distance relationship and celebrate a 28th birthday. The app features a scrollable storytelling experience with architectural and design aesthetics, combining modern web technologies with heartfelt, personalized content. The project showcases a journey from "Bumble to Forever" through multiple themed sections including timeline milestones, memory cards, photo galleries, and future dreams.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build Tools:**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server with hot module replacement
- Wouter for lightweight client-side routing
- TanStack Query (React Query) for server state management

**UI Component Library:**
- Shadcn/ui component system built on Radix UI primitives
- Tailwind CSS for utility-first styling with custom design tokens
- Custom CSS variables for theming (light/dark mode support)
- Class Variance Authority (CVA) for component variant management

**Design System:**
- Color palette: Blush pink, lavender, soft blue, and gold accents
- Typography: Playfair Display (serif headings), Dancing Script (romantic accents), Inter (body text)
- Architectural/urban planner aesthetic with geometric shapes and clean lines
- Scroll-driven animations and parallax effects

**Key Components:**
- `HeroSection`: Full-screen gradient hero with animated text and confetti interactions
- `GirlDollChapter`: Personal message section with watercolor background and fade-up animations
- `OurStory`: Combined timeline and memory cards with milestone markers
- `PhotoGallery`: Interactive polaroid-style photo display with like functionality
- `BirthdayCelebration`: Animated balloon section with confetti effects
- `FutureDreams`: Future-focused section with dream cards
- `PasswordGate`: Session-based authentication (client-side only)

### Backend Architecture

**Server Framework:**
- Express.js with TypeScript for the Node.js server
- Custom middleware for request/response logging
- Vite integration in development mode for HMR and asset serving
- Static file serving in production mode

**Authentication:**
- Session-based password protection using sessionStorage (client-side)
- Password: "pinky" (case-insensitive)
- Note: This is a courtesy gate only, not true security

**Storage Layer:**
- In-memory storage implementation (`MemStorage`) with CRUD interface
- Prepared for database integration via Drizzle ORM
- User schema defined with username/password fields

**Development vs Production:**
- Development: Vite middleware for hot reloading and module transformation
- Production: Pre-built static assets served from `dist/public`

### Data Storage Solutions

**ORM Configuration:**
- Drizzle ORM configured for PostgreSQL integration
- Schema location: `shared/schema.ts`
- Migration output directory: `./migrations`
- Database URL expected via `DATABASE_URL` environment variable

**Current Implementation:**
- In-memory storage for development/prototype
- No persistent database currently connected
- Schema includes users table with id (UUID), username, and password fields

**Database Schema (Defined but not actively used):**
```typescript
users {
  id: varchar (primary key, UUID)
  username: text (unique)
  password: text
}
```

### External Dependencies

**UI Libraries:**
- @radix-ui/* - Comprehensive suite of accessible, unstyled UI primitives
- lucide-react - Icon library for consistent iconography
- embla-carousel-react - Touch-friendly carousel functionality
- vaul - Drawer component for mobile interactions

**Form & Validation:**
- react-hook-form - Performant form state management
- @hookform/resolvers - Validation resolver adapters
- zod - TypeScript-first schema validation
- drizzle-zod - Zod schema generation from Drizzle schemas

**Database & Backend:**
- @neondatabase/serverless - Serverless PostgreSQL driver
- drizzle-orm - TypeScript ORM with type safety
- connect-pg-simple - PostgreSQL session store

**Development Tools:**
- @replit/vite-plugin-runtime-error-modal - Development error overlay
- @replit/vite-plugin-cartographer - Replit integration
- @replit/vite-plugin-dev-banner - Development banner
- tsx - TypeScript execution for Node.js

**Styling & Utilities:**
- tailwindcss - Utility-first CSS framework
- tailwind-merge & clsx - Class name utilities
- class-variance-authority - Component variant management
- date-fns - Date manipulation and formatting

**Deployment Notes:**
- Configured for GitHub Pages deployment (documented in DEPLOYMENT.md)
- Client-side password protection noted as insufficient for true security
- Alternative hosting options include Netlify/Vercel for enhanced security features