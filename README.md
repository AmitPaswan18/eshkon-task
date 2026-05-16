# Page Studio

A high-performance, schema-driven landing page studio built with Next.js, Redux, and Contentful.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or pnpm

### Installation
```bash
git clone <repo-url>
cd eshkon-task
npm install
```

### Environment Setup
Create a `.env.local` file:
```env
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_ACCESS_TOKEN=your_delivery_token
CONTENTFUL_PREVIEW_TOKEN=your_preview_token
CONTENTFUL_ENVIRONMENT=master
```

### Running Locally
```bash
npm run dev
```
Open [http://localhost:3000/studio/test-page](http://localhost:3000/studio/test-page) to access the studio.

### Testing
```bash
npx playwright test
```

## 🏗️ Architecture Overview

The application is built using a **Registry-based Rendering** architecture, ensuring a clean separation between data definitions and UI implementation.

### 🧠 Redux Slice Responsibilities
- **`draftPage`**: The "Source of Truth" for the current editing session. It holds the active `page` object and an `originalPage` for diffing. It handles all content mutations (reordering, prop updates).
- **`ui`**: Manages the Studio's interactive state, including the active viewport (Mobile/Desktop), user roles (Viewer/Editor/Publisher), and the currently selected section for the property editor.
- **`publish`**: Responsible for the release lifecycle. It stores the publication history, calculates version bumps using the SemVer service, and manages immutable snapshots of the page.

### 🔗 Contentful Model & Adapter
We use an **Adapter Pattern** to decouple our UI from Contentful's internal data structure:
- **Model**: A "Page" content type in Contentful links to multiple "Section" entries.
- **Adapter (`contentfulClient.ts`)**: This layer fetches the nested entry tree and flattens it into our internal `Page` schema. It maps Contentful's content-type IDs to our registry types, ensuring that changes in the CMS don't break the UI.

## 📜 SemVer Logic

The publish flow implements deterministic versioning:
- **Patch**: Triggered by text or prop changes within a section.
- **Minor**: Triggered by adding a section.
- **Major**: Triggered by removing a section or changing its type.

Every publish creates an immutable snapshot in `releases/[slug]/[version].json`.

## ♿ Accessibility Evidence

We have targeted **WCAG 2.2 AAA** compliance through:
1. **Automated Testing**: Integrated `@axe-core/playwright` into the CI pipeline.
2. **Quality Dashboard**: Built a live `/quality` route that visualizes the latest automated audit reports.
3. **Keyboard Operability**: Custom focus-visible rings (High Contrast) and a "Skip to Content" link for power users.
4. **Motion Control**: All UI animations use `motion-reduce:animate-none` to respect system-level reduced motion preferences.
5. **Semantics**: Validated heading hierarchy (h1-h6) and ARIA landmark regions used throughout.

## ⚠️ What is Incomplete & Why

1. **Persistent Backend**: Currently, snapshots are saved in Redux (memory). A production version would require a database (e.g., PostgreSQL) to persist `releases/` across sessions.
2. **Real-time Contentful Sync**: While the adapter is ready, the "Save to Contentful" action is mocked to avoid accidental mutations during assessment.
3. **Multi-user Presence**: Collaborative editing (Conflict resolution) was out of scope for this sprint.

## 🛠️ Tech Stack
- **Framework**: Next.js 14 (App Router)
- **State**: Redux Toolkit
- **Validation**: Zod
- **UI**: Tailwind CSS + shadcn/ui
- **Testing**: Playwright + axe-core
- **CMS**: Contentful
