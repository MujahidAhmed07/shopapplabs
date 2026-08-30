/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  outputFileTracing: false,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.githubusercontent.com' },
      { protocol: 'https', hostname: '**.instagram.com' },
      { protocol: 'https', hostname: '**.tiktok.com' }
    ]
  },
  async redirects() {
    return [
      {
        source: '/username-checker',
        destination: '/checker',
        permanent: true,
      },
      {
        source: '/user-checker',
        destination: '/checker',
        permanent: true,
      },
      {
        source: '/handle-checker',
        destination: '/checker',
        permanent: true,
      },
      {
        source: '/social-media-username-checker',
        destination: '/checker',
        permanent: true,
      },
      {
        source: '/name-checker',
        destination: '/checker',
        permanent: true,
      }
    ];
  },
  async headers() {
    return [
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          }
        ]
      }
    ];
  }
};

export default nextConfig;
