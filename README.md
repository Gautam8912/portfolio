# 🔥 Premium Personal Portfolio — React + Vite + Firebase

A modern, premium personal portfolio web application that looks and feels like a SaaS product:
dark/light themes, glassmorphism, gradient design, full authentication, a project cart, and a
complete role-based admin dashboard.

![Stack](https://img.shields.io/badge/React_18-Vite_6-61DAFB?style=flat&logo=vite&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat&logo=tailwindcss&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-Auth_%7C_Firestore_%7C_Storage-FFCA28?style=flat&logo=firebase&logoColor=black)

---

## ✨ Features

### Public site
- **Home** — animated typing hero, profile card, stats, about/skills/featured projects, education,
  certifications, achievements and a contact CTA.
- **About / Skills / Projects / Education / Certificates / Contact** — all sections rendered from
  centrally managed content.
- **Projects** — search, category filters, tech-stack chips, detail modal, GitHub/live links.
- **Cart (Saved Projects)** — add/remove, quantity controls, clear-all with confirmation, header
  badge count, persisted in `localStorage`. It is a bookmark list, **not** a checkout.
- **Contact form** — validated, saved to Firestore (or local store in demo mode) for the admin inbox.
- **Dark / light theme toggle** (persisted), sticky glass header, hamburger mobile menu,
  global **Ctrl/Cmd+K search**, custom 404, back-to-top, page transitions, toasts, skeletons,
  empty states, error boundary.

### Authentication
- Real **Firebase Authentication**: signup (name/email/password/confirm), login (remember me,
  password visibility toggle), password reset email, persistent sessions, logout with confirmation.
- Passwords are handled exclusively by Firebase — **never** stored in plain text anywhere.

### Admin dashboard (`/admin`)
- Dedicated admin login + role-based protected routes (11 sections):
  Overview · Profile · Projects · Skills · Education · Certificates · Achievements · Messages ·
  Users · Settings · Logout.
- Analytics cards, recent activity, unread-message badge, image uploads, search/filter on every list,
  add/edit/delete with confirmation dialogs, responsive sidebar (drawer on mobile).

### Security
- Public signups always receive `role: user` — admins only come from `VITE_ADMIN_EMAILS`
  (or a manually-promoted Firestore document), enforced server-side by `firestore.rules`.

---

## 🚀 Quick start

```bash
# 1. Install dependencies
npm install

# 2. Configure environment (see Firebase setup below)
cp .env.example .env

# 3. Run the dev server
npm run dev        # → http://localhost:5173

# 4. Production build
npm run build      # → dist/
npm run preview    # preview the production build
```

> **Without Firebase credentials** the app runs in *local demo mode*: content and demo accounts
> persist in `localStorage` so every screen (including the admin dashboard) stays fully explorable.
> A banner reminds you to connect Firebase. Configure `.env` and restart to switch to the real
> cloud-backed implementation — demo auth disappears automatically.

### Demo credentials (demo mode only)

| Role  | Email                | Password  |
|-------|----------------------|-----------|
| Admin | `admin@portfolio.dev`| `Admin@123` |

---

## 🔥 Firebase setup (production)

1. Go to [Firebase Console](https://console.firebase.google.com) → **Add project**.
2. **Build → Authentication → Sign-in method** → enable **Email/Password**.
3. **Build → Firestore Database** → *Create database* (production mode).
4. **Build → Storage** → get started (for image uploads).
5. Project settings → **General → Your apps → Web (</>)** → register app → copy the config values.
6. Create `.env` from `.env.example` and paste the values:

```env
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
VITE_ADMIN_EMAILS=you@example.com
```

7. **Security rules**
   - Firestore → *Rules* tab → paste the contents of [`firestore.rules`](./firestore.rules) → Publish.
   - Storage → *Rules* tab → paste the contents of [`storage.rules`](./storage.rules) → Publish.
8. Sign up once with the email listed in `VITE_ADMIN_EMAILS`. Your account automatically receives
   the `admin` role on first login. Restart the dev server.

### Firestore data model

| Collection / doc        | Purpose                                     |
|-------------------------|---------------------------------------------|
| `profile/main`          | Hero + About content (single document)      |
| `settings/main`         | Site name, footer, contact, social links    |
| `skills`                | Skill documents `{name, category, level}`   |
| `projects`              | Project documents (featured flag, tech[])   |
| `education`             | Education entries                           |
| `certificates`          | Certificates                                |
| `achievements`          | Achievements                                |
| `messages`              | Contact form submissions (admin only read)  |
| `users/{uid}`           | `{fullName, email, role}` profile records   |

---

## 📁 Project structure

```
src/
├── assets/
├── components/          # Header, Footer, Button, Container, ProjectCard,
│                        # ProtectedRoute, Modal, FormField, GlobalSearch, skeletons…
├── pages/               # Home, About, Skills, Projects, Education, Certificates,
│                        # Cart, Contact, Login, Signup, NotFound
├── admin/               # AdminLogin, AdminLayout, Dashboard + 9 management pages
├── context/             # AuthContext, CartContext, ThemeContext, ToastContext,
│                        # ConfirmContext, DataContext
├── firebase/config.js   # Firebase init from env vars (never hardcode secrets)
├── hooks/               # usePageTitle, useTypingEffect
├── utils/               # validators, helpers, default seed data
├── App.jsx              # Routes + layout shell
├── main.jsx             # Provider composition
└── index.css            # Tailwind layers & design tokens
firestore.rules          # Role-based Firestore security rules
storage.rules            # Storage security rules
.env.example             # Environment template
vercel.json              # SPA rewrites for Vercel deployment
```

---

## 🧭 Key routes

| Route              | Access        | Description                    |
|--------------------|---------------|--------------------------------|
| `/`                | Public        | Home page                      |
| `/about` `/skills` `/projects` `/education` `/certificates` `/contact` | Public | Content pages |
| `/cart`            | Public        | Saved projects (localStorage)  |
| `/login` `/signup` | Public        | Firebase auth                  |
| `/admin/login`     | Public        | Administrator sign-in          |
| `/admin/*`         | Admin only    | Dashboard sections             |
| `*`                | Public        | Custom 404                     |

---

## 🛠 Scripts

| Command           | Description                       |
|-------------------|-----------------------------------|
| `npm run dev`     | Start Vite dev server (port 5173) |
| `npm run build`   | Production build to `dist/`       |
| `npm run preview` | Preview the production build      |

---

## ☁ Deploy to Vercel

1. Push the repo to GitHub.
2. [vercel.com](https://vercel.com) → **New Project** → import the repo (framework auto-detected: Vite).
3. Add every `VITE_*` variable from `.env` in **Project → Settings → Environment Variables**.
4. Deploy. `vercel.json` already contains the SPA rewrite so deep links work.

```bash
# Or deploy from the CLI
npm i -g vercel
vercel
```

---

## 🧪 Testing checklist

- [x] All navigation links work; 404 page renders for unknown routes
- [x] Theme toggle persists across refresh; no flash of wrong theme
- [x] Signup → login → logout; validation errors and password visibility toggles
- [x] Cart add/remove/qty/clear persists after refresh; header badge updates
- [x] Contact form validation + message lands in admin inbox
- [x] Admin route redirects unauthenticated and non-admin users
- [x] Admin CRUD for profile, projects, skills, education, certificates, achievements
- [x] Image upload (Firebase Storage when configured, data-URL otherwise)
- [x] Global search (Ctrl/Cmd+K), scroll-to-top, error boundary
- [x] `npm run build` succeeds

---

## 📄 License

MIT — free to use for your own portfolio. Remember to replace the demo content with your own!
#   p o r t f o l i o  
 