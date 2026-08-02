import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// File logging helper for cPanel environment
const logFilePath = path.join(__dirname, 'server.log');

function writeToLog(type, ...args) {
  const time = new Date().toISOString();
  const message = args.map(a => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' ');
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


// Recursively fix directory & file permissions on .next & public to prevent Linux cPanel EACCES errors
function fixPermissions(dir) {
  try {
    if (!fs.existsSync(dir)) return;
    try { fs.chmodSync(dir, 0o755); } catch (e) {}
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        fixPermissions(fullPath);
      } else {
        try { fs.chmodSync(fullPath, 0o644); } catch (e) {}
      }
    }
  } catch (e) {}
}

fixPermissions(path.join(__dirname, '.next'));
fixPermissions(path.join(__dirname, 'public'));

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
        const filePath = path.join(__dirname, '.next', 'static', safePath);

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

      // Set anti-caching headers ONLY for HTML page documents (not static assets or extension files)
      if (!pathname.startsWith('/_next/') && !pathname.startsWith('/api/') && !pathname.includes('.')) {
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');
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


