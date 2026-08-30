const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const path = require('path');
const fs = require('fs');
const util = require('util');

// File logging helper for cPanel environment
const logFilePath = path.join(__dirname, 'server.log');

function writeToLog(type, ...args) {
  const time = new Date().toISOString();
  const message = args.map(a => {
    if (a instanceof Error) return a.stack || `${a.name}: ${a.message}`;
    if (typeof a === 'object' && a !== null) {
      const keys = Object.keys(a);
      const props = Object.getOwnPropertyNames(a);
      if (keys.length === 0 && props.length === 0) return '';
      return util.inspect(a, { depth: 4, colors: false, breakLength: Infinity });
    }
    return String(a);
  }).filter(Boolean).join(' ');

  if (!message || message.trim() === '{}') return;

  const logLine = `[${time}] [${type}] ${message}\n`;
  try {
    fs.appendFileSync(logFilePath, logLine);
  } catch (e) {}
}

const originalLog = console.log;
const originalError = console.error;

console.log = (...args) => {
  originalLog(...args);
  writeToLog('INFO', ...args);
};

console.error = (...args) => {
  originalError(...args);
  writeToLog('ERROR', ...args);
};

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

writeToLog('INFO', '=== Server Process Started ===');
writeToLog('INFO', `Node version: ${process.version}, Platform: ${process.platform}`);
writeToLog('INFO', `Current directory: ${__dirname}`);

// Fast lightweight permission check for top-level folders
try { if (fs.existsSync(path.join(__dirname, '.next'))) fs.chmodSync(path.join(__dirname, '.next'), 0o755); } catch (e) {}
try { if (fs.existsSync(path.join(__dirname, 'public'))) fs.chmodSync(path.join(__dirname, 'public'), 0o755); } catch (e) {}

const dev = false;
const app = next({ dev, dir: __dirname });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      let pathname = parsedUrl.pathname || '';

      try {
        pathname = decodeURIComponent(pathname);
      } catch (e) {}

      // Direct fallback stream handler for /_next/static/ requests
      if (pathname.startsWith('/_next/static/')) {
        const rawRelativePath = pathname.replace('/_next/static/', '');
        const safePath = path.normalize(rawRelativePath).replace(/^(\.\.[\/\\])+/, '');
        
        // Check primary .next/static location first, then public/_next/static fallback
        let filePath = path.join(__dirname, '.next', 'static', safePath);
        if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
          filePath = path.join(__dirname, 'public', '_next', 'static', safePath);
        }

        if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
          const ext = path.extname(filePath).toLowerCase();
          let contentType = 'application/octet-stream';
          if (ext === '.css') contentType = 'text/css; charset=utf-8';
          else if (ext === '.js') contentType = 'application/javascript; charset=utf-8';
          else if (ext === '.json') contentType = 'application/json; charset=utf-8';
          else if (ext === '.woff2') contentType = 'font/woff2';
          else if (ext === '.woff') contentType = 'font/woff';
          else if (ext === '.ttf') contentType = 'font/ttf';
          else if (ext === '.png') contentType = 'image/png';
          else if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg';
          else if (ext === '.svg') contentType = 'image/svg+xml';
          
          res.setHeader('Content-Type', contentType);
          res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
          res.setHeader('Access-Control-Allow-Origin', '*');
          
          const stream = fs.createReadStream(filePath);
          stream.on('error', () => {
            if (!res.headersSent) {
              res.statusCode = 500;
              res.end('Read Error');
            }
          });
          return stream.pipe(res);
        } else {
          if (!res.headersSent) {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/plain');
            res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
            res.setHeader('Access-Control-Allow-Origin', '*');
            return res.end('Asset Not Found');
          }
        }
      }

      // Direct static fallback handler for public/ files (favicon.ico, icon.png, apple-icon.png, etc.)
      if (pathname !== '/' && !pathname.startsWith('/api/') && !pathname.startsWith('/_next/')) {
        const safePublicPath = path.normalize(pathname.replace(/^\//, '')).replace(/^(\.\.[\/\\])+/, '');
        const publicFilePath = path.join(__dirname, 'public', safePublicPath);
        
        try {
          if (fs.existsSync(publicFilePath) && fs.statSync(publicFilePath).isFile()) {
            const ext = path.extname(publicFilePath).toLowerCase();
            let contentType = 'application/octet-stream';
            if (ext === '.ico') contentType = 'image/x-icon';
            else if (ext === '.png') contentType = 'image/png';
            else if (ext === '.svg') contentType = 'image/svg+xml';
            else if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg';
            else if (ext === '.json') contentType = 'application/json';
            else if (ext === '.txt') contentType = 'text/plain';
            else if (ext === '.xml') contentType = 'application/xml';
            
            res.setHeader('Content-Type', contentType);
            res.setHeader('Cache-Control', 'public, max-age=86400');
            res.setHeader('Access-Control-Allow-Origin', '*');
            
            const stream = fs.createReadStream(publicFilePath);
            stream.on('error', () => {
              if (!res.headersSent) {
                res.statusCode = 500;
                res.end('Read Error');
              }
            });
            return stream.pipe(res);
          }
        } catch (e) {}
      }

      // Set anti-caching headers for HTML page documents & Next.js RSC requests to prevent stale chunk mismatches
      if (
        (!pathname.startsWith('/_next/') && !pathname.startsWith('/api/') && !pathname.includes('.')) ||
        (parsedUrl.query && typeof parsedUrl.query._rsc !== 'undefined')
      ) {
        res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0, s-maxage=0');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');
        res.setHeader('Surrogate-Control', 'no-store');
        res.setHeader('CDN-Cache-Control', 'no-store');
        res.setHeader('Cloudflare-CDN-Cache-Control', 'no-store');
      }

      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      if (!res.headersSent) {
        res.statusCode = 500;
        res.end('Internal Server Error');
      }
    }
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on port ${port}`);
  });
}).catch((ex) => {
  console.error(ex.stack);
  process.exit(1);
});
