# Page Studio Implementation Plan

This document outlines the step-by-step plan for building the Page Studio application.

## Phase 1: Project Initialization & Foundation
- [x] Initialize Next.js project with App Router and TypeScript.
- [x] Install dependencies: `lucide-react`, `zod`, `@reduxjs/toolkit`, `react-redux`, `contentful`, `clsx`, `tailwind-merge`.
- [x] Setup shadcn/ui components (Button, Input, Card, etc.).
- [x] Configure Tailwind CSS with premium aesthetics.

## Phase 2: Schema & Registry (Requirement 1)
- [x] Define Zod schemas for `Section` and `Page`.
- [x] Create `sectionRegistry.ts` mapping section types to components.
- [x] Implement `SectionRenderer` with error boundaries and `UnsupportedSection` fallback.
- [x] Create `/preview/[slug]` route for rendering pages.

## Phase 3: Contentful Integration (Requirement 2)
- [x] Create `contentfulClient.ts` adapter.
- [x] Implement data fetching logic with support for draft vs. published content.
- [x] Ensure clean separation between Contentful data models and internal application schemas.

## Phase 4: Redux & Studio Editor (Requirement 3)
- [x] Setup Redux store with `draftPage`, `ui`, and `publish` slices.
- [x] Create `/studio/[slug]` route.
- [x] Build the WYSIWYG-lite interface:
    - [x] Section list with reordering.
    - [x] Add section functionality.
    - [x] Property editor for Hero, CTA, etc.
- [x] Implement draft persistence (local storage or session).

## Phase 5: RBAC & Security (Requirement 4)
- [x] Define roles: `viewer`, `editor`, `publisher`.
- [x] Implement server-side role enforcement (middleware or server actions).
- [x] Update UI to reflect permissions (e.g., hide publish button for editors).

## Phase 6: Publish Flow & SemVer (Requirement 5)
- [x] Implement deterministic diff logic for SemVer (Patch, Minor, Major).
- [x] Create immutable snapshot logic (saving to `releases/[slug]/[version].json`).
- [x] Build the publish workflow in Redux.

## Phase 7: Quality Gates & Accessibility (Requirements 6 & 7)
- [x] Setup Playwright for e2e testing.
- [x] Integrate `@axe-core/playwright` for accessibility testing.
- [x] Create GitHub Actions CI workflow to run tests and a11y checks.
- [x] Document accessibility evidence and ensure WCAG 2.2 AAA compliance.

## Phase 8: Final Polish & Documentation
- [x] Finalize README with architecture overview and setup instructions.
- [x] Prepare the short write-up (Problem framing, decisions, etc.).
- [x] Conduct final verification of all requirements.
