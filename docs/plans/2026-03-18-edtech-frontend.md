# EdTech Frontend (Vite React TS) Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the Vite starter app with a production-ready, scalable EdTech frontend (Coursera/Udemy-like) using React + TypeScript + Tailwind + shadcn-style UI, React Router, Framer Motion, and mock data.

**Architecture:** Route-based app with `AuthLayout` and `AppLayout`, protected routes under `/app/*`, reusable `components/ui` primitives (shadcn-style) + `components` feature components, typed mock API with async delays, and small hooks for theme/auth/state.

**Tech Stack:** React 19 + TypeScript, Vite, Tailwind CSS, Radix UI primitives (shadcn-style), React Router, Framer Motion, lucide-react icons, react-hook-form + zod for validation.

---

### Task 1: Add dependencies

**Files:**
- Modify: `package.json` (via `npm install`)

**Step 1: Install runtime deps**

Run:
- `npm i react-router-dom framer-motion lucide-react`
- `npm i @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-avatar @radix-ui/react-tabs @radix-ui/react-slot @radix-ui/react-separator @radix-ui/react-label`
- `npm i class-variance-authority clsx tailwind-merge`
- `npm i react-hook-form zod @hookform/resolvers`
- `npm i sonner`

**Step 2: Install dev deps (Tailwind)**

Run:
- `npm i -D tailwindcss postcss autoprefixer`

**Step 3: Verify install**

Run: `npm run dev`
Expected: server starts without dependency errors.

---

### Task 2: Tailwind + global styles + dark mode

**Files:**
- Create: `tailwind.config.ts`
- Create: `postcss.config.cjs`
- Modify: `src/index.css`

**Steps:**
- Initialize Tailwind config targeting `index.html` and `src/**/*`.
- Use shadcn-style CSS variables for colors in `src/index.css`.
- Set `html` to use `class="dark"` toggling (manual + stored).
- Add base typography/spacing and page background.

Verification:
- `npm run dev`
- Confirm light/dark toggle visibly changes UI.

---

### Task 3: App foundation (types, mock data, utilities, hooks)

**Files:**
- Create: `src/utils/cn.ts`
- Create: `src/utils/storage.ts`
- Create: `src/utils/format.ts`
- Create: `src/utils/mockApi.ts`
- Create: `src/utils/mockData.ts`
- Create: `src/types/index.ts`
- Create: `src/hooks/useTheme.ts`
- Create: `src/hooks/useAuth.ts`
- Create: `src/hooks/useDebouncedValue.ts`

**Steps:**
- Define typed models: `User`, `Course`, `Lesson`, `Enrollment`, `Progress`, `Post`, `Comment`.
- Implement mock API functions with async delays: auth, course list/detail, enrollments, feed.
- Implement `useAuth` with localStorage session and helpers.
- Implement `useTheme` to toggle `document.documentElement.classList`.

Verification:
- Typecheck with `npm run build` (should compile).

---

### Task 4: UI primitives (shadcn-style)

**Files (create):**
- `src/components/ui/button.tsx`
- `src/components/ui/input.tsx`
- `src/components/ui/textarea.tsx`
- `src/components/ui/label.tsx`
- `src/components/ui/card.tsx`
- `src/components/ui/badge.tsx`
- `src/components/ui/separator.tsx`
- `src/components/ui/dialog.tsx`
- `src/components/ui/dropdown-menu.tsx`
- `src/components/ui/tabs.tsx`
- `src/components/ui/avatar.tsx`
- `src/components/ui/skeleton.tsx`
- `src/components/ui/sonner.tsx`

**Steps:**
- Implement Radix-based primitives with `cn()` and Tailwind variants.
- Add `Toaster` via `sonner`.

Verification:
- Render buttons/cards in a page without runtime errors.

---

### Task 5: App components + layouts

**Files:**
- Create: `src/components/navbar/AppNavbar.tsx`
- Create: `src/components/sidebar/AppSidebar.tsx`
- Create: `src/components/shell/PageShell.tsx`
- Create: `src/components/empty/EmptyState.tsx`
- Create: `src/components/course/CourseCard.tsx`
- Create: `src/components/community/PostCard.tsx`
- Create: `src/components/community/CreatePostDialog.tsx`
- Create: `src/layouts/AuthLayout.tsx`
- Create: `src/layouts/AppLayout.tsx`

**Steps:**
- Navbar: search, theme toggle, profile dropdown, responsive.
- Sidebar: navigation, collapsible on mobile.
- Layout shells: consistent padding/max-width + animated route transitions.

---

### Task 6: Routing

**Files:**
- Create: `src/routes/router.tsx`
- Create: `src/routes/ProtectedRoute.tsx`
- Modify: `src/App.tsx`
- Modify: `src/main.tsx`

**Steps:**
- Build `createBrowserRouter` tree.
- Add protected `/app/*` routes requiring auth.
- Ensure auth pages redirect when already authed.

Verification:
- Navigate across routes; refresh works; guard works.

---

### Task 7: Pages (feature-complete mock UI)

**Files (create):**
- Auth: `src/pages/auth/LoginPage.tsx`, `SignupPage.tsx`, `ForgotPasswordPage.tsx`
- Dashboard: `src/pages/app/DashboardPage.tsx`
- Courses: `src/pages/app/CoursesPage.tsx`, `CourseDetailPage.tsx`, `LearnPage.tsx`
- Community: `src/pages/app/CommunityPage.tsx`
- Profile: `src/pages/app/ProfilePage.tsx`, `EditProfilePage.tsx`
- Settings: `src/pages/app/SettingsPage.tsx`
- Not found: `src/pages/NotFoundPage.tsx`

**Steps:**
- Use form validation (react-hook-form + zod) on auth and profile edit.
- Courses list: search + category filter + skeleton/empty.
- Course detail: syllabus + reviews + enroll CTA.
- Learn page: video placeholder player, notes, progress bar, next/prev lessons.
- Community feed: create post dialog (text + image URL), like/comment/share.
- Dashboard: greeting, enrolled courses progress, recommended list.

Verification:
- Manual check in browser for responsiveness + dark mode + basic interactions.

---

### Task 8: Verification

Run:
- `npm run dev` (manual smoke)
- `npm run build` (typecheck + build)
- `npm run lint`

Expected:
- Dev server renders app
- Build succeeds
- Lint has no new errors

