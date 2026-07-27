# ShopApp Labs — Username Checker

A powerful, high-performance real-time username availability checker for 100+ social media platforms, tech sites, gaming platforms, and top-level domain extensions (.com, .io, .dev, .net, .co, .org).

Built by **ShopApp Labs**.

---

## ⚡ Features

- 🌐 **100+ Supported Platforms**: Check handles on Instagram, TikTok, X (Twitter), YouTube, GitHub, Twitch, Snapchat, Reddit, Pinterest, Spotify, Steam, and 100+ services.
- 🌐 **Domain Name Search**: Live DNS & WHOIS availability checks for `.com`, `.io`, `.dev`, `.co`, `.net`, `.org`.
- ⚡ **Real-Time Live Search**: Debounced instant as-you-type search streaming.
- 📱 **Mobile-First Responsive Design**: 5-column CSS grid with mobile drawer navigation and tab badges.
- 🔍 **Enterprise SEO & AEO**: Full Schema.org JSON-LD structured data (`WebApplication`, `FAQPage`, `HowTo`, `BreadcrumbList`, `Speakable`, `SiteLinksSearchBox`).

---

## 🚀 Installation & Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/shopapp-labs-username-checker.git
   cd shopapp-labs-username-checker
   ```

2. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Run the local dev server:**
   ```bash
   python app.py
   ```
   Open `http://127.0.0.1:5000` in your browser.

---

## 🌐 Production Deployment (cPanel WSGI)

- **Entry Point File**: `passenger_wsgi.py`
- **Application Object**: `application`
- Serves static assets, `sitemap.xml`, and `robots.txt` automatically.

---

© 2026 **ShopApp Labs** (`shopapplab.com`). All rights reserved.
