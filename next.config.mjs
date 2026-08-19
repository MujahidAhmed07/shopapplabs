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
  }
};

export default nextConfig;
