# SecureView - CCTV Installation & Monitoring Website

## Overview
A professional business website for SecureView, a CCTV installation and monitoring company. The application features a modern landing page with services, gallery, and contact sections, plus an admin dashboard for content management.

## Project Structure
- `src/` - React frontend source code
  - `components/` - Reusable UI components (Header, Hero, Services, Gallery, etc.)
  - `pages/` - Page components (Index, NotFound)
  - `hooks/` - Custom React hooks (useAuth, useAlbums, etc.)
  - `services/` - API service layers
  - `config/` - Configuration files
- `backend/` - Express.js backend (optional, for API)
- `public/` - Static assets

## Tech Stack
- Frontend: React 18, TypeScript, Vite
- Styling: TailwindCSS, shadcn/ui components
- State Management: TanStack React Query
- Routing: React Router DOM v6
- Forms: React Hook Form with Zod validation

## Running the Project
The application runs on port 5000 using Vite dev server:
```
npm run dev
```

## Key Features
- Landing page with hero section, services, gallery, and contact form
- Admin login and dashboard for content management
- Album/installation gallery management
- Responsive design with dark theme

## Notes
- The application expects a backend API for album/gallery data
- Authentication is handled via the useAuth hook
- API base URL is configured in `src/config/api.ts`
