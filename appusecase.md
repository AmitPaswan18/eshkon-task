# 🚀 Page Studio: Application Use Case & Testing Guide

## 📖 What is Page Studio?

**Page Studio** is a high-performance, schema-driven landing page builder. It allows users to create, edit, and publish dynamic web pages using a predefined set of UI components (Sections). Unlike traditional CMS-heavy tools, Page Studio is built on a "Registry-based Rendering" architecture, ensuring that every page is type-safe, accessible, and fast.

### Core Philosophy
- **Schema-First**: Every component is validated using Zod, preventing broken layouts.
- **Accessible by Design**: Built to meet WCAG 2.2 AAA standards out of the box.
- **Deterministic Versioning**: Uses Semantic Versioning (SemVer) to track changes (Patch, Minor, Major) based on structural diffs.

---

## 🛠️ Key Features

1.  **Studio Editor**: A "WYSIWYG-lite" interface where you can:
    - Add, reorder, and remove sections.
    - Edit content (titles, text, images) in real-time.
    - Switch between user roles (Viewer, Editor, Publisher).
2.  **Live Preview**: Instantly see how your changes will look on the live site.
3.  **Smart Publishing**: Automatically calculates if a change is a "Patch" (text fix), "Minor" (new section), or "Major" (structural change).
4.  **Immutable Snapshots**: Every time you publish, a JSON snapshot is saved, allowing for future rollback or history tracking.

---

## 👨‍💻 How a Beginner Can Test This Application

If you are new to the project, follow these steps to explore and test the functionality.

### Step 1: Prepare Your Environment
Before testing, ensure you have:
- **Node.js 18+** installed.
- Run `npm install` to download dependencies.
- A `.env.local` file with valid Contentful credentials (see `README.md`).

### Step 2: Start the Application
Run the following command in your terminal:
```bash
npm run dev
```
Open your browser to: [http://localhost:3000/studio/test-page](http://localhost:3000/studio/test-page)

### Step 3: Manual Testing Flow (Try These!)

1.  **Edit Content**:
    - Click on the "Hero" section in the center canvas.
    - In the right sidebar, change the "Title" or "Subtitle". Notice how the canvas updates instantly.
2.  **Reorder Sections**:
    - Hover over a section and use the "Drag Handle" (dots icon) to move it up or down.
3.  **Add a Section**:
    - Click the "+" button in the sidebar.
    - Select "Features" or "CTA". A new section will appear at the bottom.
4.  **Test Permissions**:
    - Use the role switcher (if available in the UI) to switch to "Viewer". Notice the "Publish" button and editing controls disappear.
5.  **Publish Changes**:
    - Click **Publish**. You will see a notification showing the new version number (e.g., `1.0.1`).

### Step 4: Automated Testing (The "Professional" Way)
We use **Playwright** to test things that are hard to check by hand, like Accessibility.

Run this command:
```bash
npx playwright test
```

**What to look for:**
- If the tests pass, you'll see green checkmarks.
- It will automatically test if the colors have enough contrast and if the page works for people using screen readers.
- To see the detailed results, run: `npx playwright show-report`

---

## ♿ Why Accessibility (a11y) Matters
In this application, we don't just "check" accessibility; it's a requirement.
- **Keyboard users**: Try navigating the Studio using only the `Tab` and `Enter` keys.
- **Screen Readers**: All images have "alt" tags, and buttons have descriptive labels.
- **Motion**: If you have "Reduce Motion" enabled in your Windows settings, the animations will automatically turn off.

---

## 📂 Technical Structure for Nerds
- `src/components/sections`: The actual UI components.
- `src/lib/schema.ts`: The "Rules" for what data is allowed.
- `src/lib/store`: The "Brain" (Redux) that handles all the logic.
- `tests/`: Where the automated "Robots" live to check the code.
