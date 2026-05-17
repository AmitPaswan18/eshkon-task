# Page Studio - Engineering Write-up

## 1. Problem Framing
The goal was to create a "Page Studio" that bridges the gap between a CMS (Contentful) and a live site, providing a safe, versioned, and accessible editing experience. The challenge lies in maintaining strict schema validation while allowing flexibility in section types and property editing.

## 2. Key Decisions & Trade-offs
- **Redux for Studio State**: While React Context might suffice for smaller apps, Redux Toolkit was chosen for its robust handling of complex state transitions (reordering, prop updates) and its devtools, which are essential for debugging the "draft vs. original" logic.
- **Client-Side Editing vs. Server-Side Rendering**: The Studio is a client-heavy application for responsiveness, while the Preview page uses Next.js Server Components to ensure maximum performance and SEO.
- **Local Filesystem Snapshots**: For the purpose of this task, immutable releases are saved to the local filesystem. In a production environment, these would be saved to an S3 bucket or a dedicated "Releases" database.

## 3. Assumptions
- Contentful Content Types are named identically to our section types (hero, cta, etc.).
- The `slug` is the primary identifier for pages in the URL.
- Authentication is handled at the infrastructure/proxy level, and the app receives the user role via cookies/headers (simulated in middleware).

## 4. What is Not Included & Why
- **Real Contentful Space**: As I don't have access to the user's Contentful credentials, I implemented the client and adapter with mock data fallbacks.
- **Visual Drag and Drop**: Implemented a "Click to Select" and "Section List" approach for simplicity and better accessibility (dnd often has a11y hurdles), though dnd-kit could be added later.
- **User Authentication UI**: The focus was on RBAC enforcement rather than the login flow itself.

## 5. Redux Slice Responsibilities
- `draftPage`: The "source of truth" for the current editor session. It holds the working copy of the page data.
- `ui`: Handles the visual state of the studio (sidebar toggle, selected section, current user role).
- `publish`: Manages the lifecycle of a publish action, including version calculation and history tracking.

## 6. Accessibility Approach
We followed a "Design for AAA" approach:
- **Contrast**: Using Tailwind's slate/indigo palette ensuring high contrast ratios.
- **Focus States**: Custom, high-visibility focus rings on all interactive elements.
- **ARIA**: Explicit labels for complex controls (e.g., the section list).
- **Automated Gates**: CI fails if `axe` detects any violations, ensuring no regressions.

## 7. Architecture Overview
The application is built on Next.js App Router, combining Server Components for the public-facing preview with Client Components for the interactive Studio editor. 
- **Frontend/Preview**: Server-side rendered pages reading from a simulated database/file system to ensure SEO and performance.
- **Studio Editor**: A client-heavy application leveraging Redux Toolkit for complex state management (drafting, reordering, property editing).
- **Registry Pattern**: UI components are mapped to Contentful schema types via a centralized `registry.ts`, allowing dynamic rendering of page sections.

## 8. Contentful Model & Adapter
- **Model**: Pages consist of a `title`, `slug`, and an array of `sections`. Each section maps to a specific Contentful Content Type (e.g., Hero, Feature Grid, CTA) and contains structured fields.
- **Adapter**: Implemented in `src/lib/contentfulClient.ts`. It acts as an abstraction layer between the application and the headless CMS, normalizing API responses into standard TypeScript interfaces (`Page`, `Section`). In the current setup, it uses mock data to simulate Contentful's behavior without requiring real space credentials.

## 9. Publish & SemVer Logic
- **Versioning**: Handled via `src/lib/publish/semver.ts`. Versions follow the `MAJOR.MINOR.PATCH` format.
- **Publish Flow**: When a user publishes a draft, the system compares the draft state against the currently published version.
- **Logic**: 
  - Structural changes (adding, removing, or reordering sections) trigger a **MINOR** version bump.
  - Content changes (editing text or properties within an existing section) trigger a **PATCH** version bump.
  - Releases are serialized and stored immutably (currently to the local filesystem under the `releases/` directory via server actions or API routes) ensuring rollback capabilities.
