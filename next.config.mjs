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
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.plugins.push({
        apply(compiler) {
          compiler.hooks.compilation.tap('ChunkRetryPlugin', (compilation) => {
            compilation.hooks.runtimeModule.tap('ChunkRetryPlugin', (module) => {
              if (module.name !== 'chunk_loading') return;
              const orig = module.generate.bind(module);
              module.generate = function () {
                const result = orig();
                const src = typeof result === 'string' ? result : result.source();
                return src.replace(
                  '__webpack_require__.l = ',
                  `var __orig_l__ = __webpack_require__.l;
__webpack_require__._retries = {};
__webpack_require__.l = `
                ) + `
// --- Chunk load retry: retry once with cache-bust, then reload page ---
(function() {
  function onScriptError(event) {
    try {
      var script = event.target;
      var src = script.src;
      if (!src || src.indexOf('/_next/static/chunks/') === -1) return;
      if (__webpack_require__._retries[src]) return;
      __webpack_require__._retries[src] = 1;

      // Retry with cache-busting query parameter
      var retrySrc = src + (src.indexOf('?') === -1 ? '?' : '&') + '_r=' + Date.now();
      var s = document.createElement('script');
      s.src = retrySrc;
      s.onload = function() { script.onload && script.onload(); };
      s.onerror = function() { doChunkReload(); };
      document.head.appendChild(s);
    } catch(e) { doChunkReload(); }
  }

  function doChunkReload() {
    try {
      var now = Date.now();
      var key = '__chunk_err_reload';
      var last = parseInt(sessionStorage.getItem(key) || '0', 10);
      if (now - last < 20000) return;
      sessionStorage.setItem(key, String(now));
      var cleanUrl = window.location.href.split('?')[0].split('#')[0];
      window.location.replace(cleanUrl + '?__r=' + now);
    } catch(e) {}
  }

  var _oe = __webpack_require__.l;
  __webpack_require__.l = function(url, done, key) {
    var origError = arguments[3];
    arguments[3] = function(event) {
      onScriptError(event);
      if (origError) origError(event);
    };
    return _oe.apply(this, arguments);
  };
})();`;
              };
            });
          });
        }
      });
    }
    return config;
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
