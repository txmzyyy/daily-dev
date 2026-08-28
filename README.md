# Moringa Daily Dev — Frontend

A daily.dev-style tech content platform built for the Moringa School Phase capstone. Students, tech writers, and admins can share and discover verified articles, videos, and podcasts from the Moringa community — interviews with industry experts, alumni, and staff.

Live locally at `http://localhost:5173` once running (see below).

---

## Tech Stack

| Layer | Tool |
|---|---|
| Framework | React 18 + Vite |
| State management | Redux Toolkit |
| Routing | React Router v6 |
| Styling | Tailwind CSS (+ `@tailwindcss/typography` for article content) |
| Rich text editing | Tiptap (`@tiptap/react`, `@tiptap/starter-kit`) |
| Icons | lucide-react |
| Backend (planned) | Flask + PostgreSQL |

---

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev
```

Open the URL Vite prints in the terminal (usually `http://localhost:5173`). If that port is busy, Vite will automatically try the next one — always use the URL shown in your terminal, not an old browser tab.

Other scripts:
```bash
npm run build      # production build
npm run preview    # preview the production build locally
npm run lint        # run ESLint
```

---

## Project Structure

```
src/
├── components/
│   ├── common/       # Button, Input, ModalShell, CategoryChip, RichTextEditor
│   ├── layout/        # AppLayout, Header, BottomNav
│   └── content/       # ContentCard, CommentThread, MediaViewer
│
├── features/           # Redux Toolkit slices, one folder per domain
│   ├── auth/
│   ├── content/
│   ├── categories/
│   ├── moderation/
│   └── notifications/
│
├── pages/
│   ├── shared/         # Landing, Login, SignUp, Onboarding, ContentDetail, NotFound
│   ├── user/            # Feed, Explore, Wishlist, Notifications, Profile
│   ├── writer/          # WriterDashboard, CreateContent
│   └── admin/            # AdminDashboard, UserManagement, ContentModeration, CategoryManagement
│
├── routes/              # AppRoutes (route table), ProtectedRoute (role guarding)
├── store/                # Redux store setup
└── styles/               # Global Tailwind + Tiptap CSS
```

**Important:** every folder above must sit at the exact nesting level shown — e.g. `pages/user/` is a sibling of `pages/shared/`, not nested inside it, and `components/layout/` is a sibling of `components/common/`, not inside it. Misplaced folders are the most common cause of `Failed to resolve import` errors. If you hit one, run:

```bash
find src -type d | sort
```

and compare against the tree above.

---

## Role-Based Access

Routes are guarded by `ProtectedRoute` based on `state.auth.user.role`:

- **user, writer, admin** → feed, explore, wishlist, notifications, profile, content detail
- **writer, admin** → writer dashboard & content creation
- **admin** → admin dashboard, user management, moderation, category management

Use the demo quick-login buttons on the Sign In page (User / Tech Writer / Admin) to preview each role without a real backend.

---

## Content Creation & Rich Text

The Writer's "Create Content" page (`pages/writer/CreateContentPage.jsx`) uses a Tiptap-powered `RichTextEditor` (`components/common/RichTextEditor.jsx`) for **ARTICLE** posts — a WYSIWYG toolbar with bold, italic, strikethrough, inline code, H2/H3 headings, bullet/numbered lists, blockquotes, and undo/redo. Content is stored as HTML.

**VIDEO** and **PODCAST** post types switch automatically to a plain URL input instead, since those aren't prose content.

Article HTML is rendered on the content detail page (`components/content/MediaViewer.jsx`) using Tailwind's `prose` classes, themed to match the app's dark UI.

---

## Backend Integration

This frontend currently runs on mock data (`src/features/*/​*Slice.js`) so it works standalone without a backend. To connect the real Flask/PostgreSQL API:

1. Replace the mock reducers/thunks in each slice with real API calls (see `authApi.js` for the pattern).
2. Swap the guest/demo auth flow for real session/token handling.
3. Point content, category, moderation, and notification slices at their respective backend endpoints.

---

## Troubleshooting

- **Blank white page, no error** → check that `index.html` has `<div id="root"></div>` matching what `main.jsx` looks for, and that you're on the exact port your terminal printed.
- **`Failed to resolve import "..."` errors** → almost always a misplaced folder (see Project Structure note above). Use `find src -type d | sort` to check.
- **`npm install` only adds a handful of packages** → `package.json` is likely invalid JSON (duplicate keys, mismatched braces). Validate it, fix, then `rm -rf node_modules package-lock.json && npm install`.
- **Port already in use / stale old server** → run `pkill -f vite` to kill leftover dev server processes, then `npm run dev` again.

---
