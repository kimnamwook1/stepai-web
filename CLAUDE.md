# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

StepAI Frontend - A Next.js 14 application using App Router, TypeScript, and Tailwind CSS for styling.

## Essential Commands

```bash
# Development
npm run dev          # Start development server (http://localhost:3000)

# Build & Production
npm run build        # Create production build
npm start           # Run production server (requires build)

# Code Quality
npm run lint        # Run ESLint checks
npm run format      # Format code with Prettier
```

## Architecture

The project uses Next.js App Router with the following structure:

- `src/app/` - Page routes using App Router conventions
  - Each folder represents a route (e.g., `/corp`, `/expert`, `/trend`)
  - `layout.tsx` - Root layout with font configuration (Pretendard Variable)
  - `page.tsx` - Page components

- `src/components/` - Reusable UI components
  - Naming convention: PascalCase with underscores for multi-word components (e.g., `Button_Arrow.tsx`)
  - All components are TypeScript React functional components

## Development Guidelines

1. **Small Incremental Changes**: Break work into very small units and confirm details before proceeding
2. **Planning**: Always update Planner.md with new tasks and progress (never delete existing content)
3. **TypeScript**: Strict mode is enabled - ensure proper typing for all code
4. **Imports**: Use `@/` alias for imports from `src/` directory
5. **Styling**: Use Tailwind CSS classes exclusively - no inline styles or CSS modules

## Key Configuration

- **TypeScript**: Configured with strict mode and `@/*` path alias
- **Tailwind**: Extended theme with custom colors and Pretendard font family
- **ESLint**: Next.js Core Web Vitals rules applied
- **Node.js**: Requires version 18.x or higher

## Common Tasks

When implementing new pages:
1. Create a new folder in `src/app/` with the route name
2. Add `page.tsx` for the page component
3. Follow existing page structure patterns (see `corp/page.tsx` or `expert/page.tsx`)

When creating components:
1. Place in `src/components/` with PascalCase_Underscore naming
2. Export as default from the component file
3. Use TypeScript interfaces for props

## Active Development Notes

- The project tracks tasks in Planner.md - check this file for current priorities
- Git repository is active with frequent commits
- Multiple pages are under development simultaneously