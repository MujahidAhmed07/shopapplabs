# AGENTS.md — Agent & Workflow Instructions

## 🎯 Workspace Overview
This repository contains the full-stack Next.js web application for **ShopApp Labs Username Checker** (`shopapplabs.com`).

---

## 🛠️ Development & Build Workflows

### Development
```bash
npm run dev
```
Runs the Next.js development server at `http://localhost:3000`.

### Production Build
```bash
npm run build
```
Builds the optimized production application and initializes the server reference manifest key for cPanel deployment.

### Linting
```bash
npm run lint
```

---

## 📋 Coding Guidelines & Conventions

1. **Domain Checking & Handle Formatting**:
   - **Domains cannot use underscores (`_`)**: Domain name labels strictly allow only alphanumeric characters and hyphens (`-`).
   - Domain UI components must display clean domain names (e.g. `shopapp.com` or `shop-app.com`) rather than handle notations (`@shopapp`).
   - Any suggestions for domains must be DNS-compliant (use `generateDomainSuggestions` in `lib/utils/usernameSuggestions.js`).

2. **Frontend Styling & Components**:
   - Use Tailwind CSS with dark-first color schemes.
   - Dark background: `#090D16`.
   - Card styling: Glassmorphic borders (`border-white/10`) and subtle backdrops (`bg-white/[0.03]` / `bg-slate-900/90`).
   - Responsive design: Mobile-first navigation with hamburger drawer and responsive grids.

3. **SEO & Structured Data**:
   - Keep JSON-LD schemas updated on relevant routes (`WebSite`, `WebApplication`, `BreadcrumbList`, `HowTo`, `FAQPage`).
   - Maintain descriptive canonical URLs and OpenGraph / Twitter meta tags.

4. **Production Server & Apache Configuration**:
   - `app.js` wraps the Next.js request handler for cPanel CloudLinux Phusion Passenger.
   - Any modifications to routing or static asset delivery must preserve fallback streams and anti-caching headers for HTML documents.
   - Static chunks in `public/_next/static/` must be retained across builds to prevent `ChunkLoadError` for in-flight browser sessions.
