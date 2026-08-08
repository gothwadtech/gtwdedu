# AI Studio Agent Instructions & System Conventions - Gothwad Education

This document establishes the technical directives, architectural patterns, and design standards for AI coding agents operating on the **Gothwad Education** codebase.

---

## 🎯 Architecture Directives

### 1. Storage & Fail-Safe Persistence
- **Sandbox Safety**: Always use `safeStorage` (`src/lib/storage.ts`) instead of raw `window.localStorage`. Sandboxed iFrame containers deny raw `localStorage` access in restricted contexts.
- **State Store**: State mutations in `src/lib/store.ts` must update both reactive state and local storage wrappers seamlessly.

### 2. Branding & Assets
- **Splash & Logo**: The official platform logo is located at `/public/logo.jpg`.
- **Styling**: Always display the 512x512 logo using curved corner containers (`rounded-2xl` or `rounded-3xl` with subtle border and inner `object-cover`).

### 3. UI Styling & Visual Quality
- **Design Language**: Flat, modern, mobile-first Android Material/iOS hybrid UI with high contrast.
- **Color Palette**:
  - Primary Brand Accent: `#0494F4` (Gothwad Blue)
  - Light Background: `#F8FAFC` / `#FFFFFF`
  - Dark Canvas: `#202124` / `#1A1C1E`
  - Dark Surface Borders: `#3C4043`
- **Typography & Icons**: Use `lucide-react` icons and clear typographic hierarchy (`text-xs`, `text-sm`, `text-base`, `text-xl`).

### 4. Error Boundary & Robustness
- Root application must be wrapped inside `ErrorBoundary` (`src/components/ErrorBoundary.tsx`) to capture unexpected UI exceptions gracefully without crashing the view frame.

---

## 🔒 User Roles & Permissions

- **`admin`**: Full access to Student/Staff CRUD, Fee Records, School Notices, System Settings, Analytics.
- **`teacher`**: Access to Class Roster, Mark Attendance, Assign Homework, Grade Submissions, Generate Report Cards.
- **`student`**: Access to Personal Dashboard, Subject Timetable, Homework Submissions, Report Cards, Notices.
- **`parent`**: Access to Child Performance, Fee Payment Receipts, Teacher Feedback, School Announcements.

---

## ⚡ Development & Verification

- Before committing changes, run `npm run lint` and `npm run build` (`compile_applet`) to verify type safety and compilation.
- Ensure all new dependencies are added via `install_applet_package` or documented in `package.json`.
