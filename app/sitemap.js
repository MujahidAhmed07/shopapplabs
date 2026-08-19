import { PLATFORMS_CONFIG } from '@/lib/config/platforms';

export default async function sitemap() {
  const baseUrl = 'https://shopapplabs.com';
  const currentDate = new Date().toISOString();

  // Core high-priority pages
  const coreRoutes = [
    { url: `${baseUrl}`, priority: 1.0, changeFrequency: 'daily' },
    { url: `${baseUrl}/checker`, priority: 1.0, changeFrequency: 'daily' },
    { url: `${baseUrl}/platforms`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${baseUrl}/domain-availability-checker`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${baseUrl}/products`, priority: 0.8, changeFrequency: 'weekly' },
  ].map((route) => ({
    ...route,
    lastModified: currentDate,
  }));

  // Dedicated landing pages for every supported platform
  const platformRoutes = PLATFORMS_CONFIG
    .filter((p) => !p.id.startsWith('domain_'))
    .map((platform) => ({
      url: `${baseUrl}/${platform.id}-username-checker`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    }));

  return [...coreRoutes, ...platformRoutes];
}

