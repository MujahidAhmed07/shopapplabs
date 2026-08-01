import { PLATFORMS_CONFIG } from '@/lib/config/platforms';

export default async function sitemap() {
  const baseUrl = 'https://shopapplabs.com';

  // Base pages
  const routes = [
    '',
    '/checker',
    '/platforms',
    '/products',
    '/domain-availability-checker'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'daily',
    priority: route === '' ? 1.0 : 0.8
  }));

  // Platform specific SEO landing pages
  const platformRoutes = [
    'instagram',
    'tiktok',
    'youtube',
    'twitter',
    'github',
    'facebook',
    'discord',
    'twitch',
    'reddit',
    'pinterest'
  ].map((platformKey) => ({
    url: `${baseUrl}/${platformKey}-username-checker`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: 0.9
  }));

  return [...routes, ...platformRoutes];
}
