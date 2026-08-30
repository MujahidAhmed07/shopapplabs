# GEMINI.md — ShopApp Labs Developer & Agent Guidelines

## 🌟 Project Overview
**ShopApp Labs Username Checker** is a high-performance, real-time username and domain availability search engine supporting 100+ social media networks, developer platforms, gaming services, and top-level domain extensions (`.com`, `.io`, `.dev`, `.net`, `.co`, `.org`, `.ai`).

- **Framework**: Next.js 14 (App Router)
- **Runtime**: Node.js 18+ / CommonJS `app.js` server wrapper for cPanel CloudLinux Phusion Passenger
- **Styling**: Tailwind CSS + Custom Dark Theme Glassmorphism (`#090D16` background)
- **Icons**: `lucide-react`
- **DNS / WHOIS Lookups**: Cloudflare DNS-over-HTTPS JSON API (`cloudflare-dns.com`)

---

## 📁 Key File Structure & Architecture

```text
├── app/
│   ├── layout.jsx                           # Root layout with Schema.org JSON-LD & ChunkLoadError recovery script
│   ├── error.jsx                            # App Router error boundary with automatic chunk reload
│   ├── global-error.jsx                     # Root layout hydration/chunk error boundary
│   ├── page.jsx                             # SEO-optimized landing page with HowTo schema & platform rules
│   ├── checker/page.jsx                     # Main multi-platform real-time live search suite
│   ├── domain-availability-checker/page.jsx # Dedicated live domain DNS availability search
│   ├── [platformSlug]-username-checker/     # Dynamic dedicated hub pages for each platform
│   ├── platforms/page.jsx                   # Directory of all 100+ supported networks
│   ├── products/page.jsx                    # ShopApp Labs SaaS & developer store catalog
│   └── api/v1/checker/check/[platform]/     # Serverless REST API endpoint for handle verification
├── components/
│   ├── common/ (GlassCard, ResultBadge, SeoFaq)
│   └── layout/ (Navbar, Footer)
├── lib/
│   ├── config/platforms.js                  # 100+ platform configurations, categories, & URL patterns
│   ├── config/products.js                   # Products catalog metadata
│   ├── services/checkerService.js           # Platform-specific validation, scrapers & DNS resolution
│   ├── services/apiClient.js                # Client API dispatcher
│   └── utils/usernameSuggestions.js         # DNS-compliant domain suggestions & verified alternatives
├── app.js                                   # Node.js entry point with static stream fallback & anti-caching
├── .htaccess                                # Apache / Passenger configuration with strict Cache-Control
├── .cpanel.yml                              # Automated deployment script with static chunk preservation
└── next.config.mjs                          # Next.js configuration, redirects, and immutable asset headers
```

---

## 🔒 Critical Rules for AI Agents

### 1. Domain Naming Restrictions (RFC 1035 / RFC 1123)
- **Domains NEVER contain underscores (`_`)**.
- When processing domain lookups (`.com`, `.io`, `.dev`, etc.), sanitize any underscores to hyphens (`-`) or strip them.
- When generating domain suggestions in `lib/utils/usernameSuggestions.js`, always use hyphens or concatenated words (`getshopapp`, `shopapp-hq`), never underscores.

### 2. ChunkLoadError Prevention & Static Caching
- **Never delete or break the client error boundaries**: [app/error.jsx](file:///c:/Users/Maq/Desktop/username-checker/app/error.jsx), [app/global-error.jsx](file:///c:/Users/Maq/Desktop/username-checker/app/global-error.jsx), and the inline recovery script in [app/layout.jsx](file:///c:/Users/Maq/Desktop/username-checker/app/layout.jsx).
- **Static chunks** (`/_next/static/*`) must always have `Cache-Control: public, max-age=31536000, immutable`.
- **Dynamic HTML/RSC responses** must always have `Cache-Control: no-store, no-cache, must-revalidate, max-age=0` to ensure users never receive stale HTML pointing to deleted chunks.
- Keep the chunk preservation routine in [.cpanel.yml](file:///c:/Users/Maq/Desktop/username-checker/.cpanel.yml) so older chunks in `public/_next/static` are preserved across deployments.

### 3. Production Deployment Commands
- Build command:
  ```bash
  npm run build
  ```
- Local dev server:
  ```bash
  npm run dev
  ```
- Production start (cPanel Phusion Passenger runs `app.js` automatically via `.htaccess`).
