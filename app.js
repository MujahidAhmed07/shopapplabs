import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Recursively fix directory & file permissions on .next to prevent Linux cPanel EACCES errors
function fixNextPermissions(dir) {
  try {
    if (!fs.existsSync(dir)) return;
    try { fs.chmodSync(dir, 0o755); } catch (e) {}
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        fixNextPermissions(fullPath);
      } else {
        try { fs.chmodSync(fullPath, 0o644); } catch (e) {}
      }
    }
  } catch (e) {}
}

const nextDir = path.join(__dirname, '.next');
fixNextPermissions(nextDir);

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

      // Direct fallback stream handler for /_next/static/ requests to guarantee CSS & JS loading in cPanel
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
          
          res.writeHead(200, {
            'Content-Type': contentType,
            'Cache-Control': 'public, max-age=31536000, immutable',
            'Access-Control-Allow-Origin': '*'
          });
          return fs.createReadStream(filePath).pipe(res);
        } else {
          // Stale asset requested by cached client -> return 404 cleanly so browser re-fetches fresh bundle
          res.writeHead(404, {
            'Content-Type': 'text/plain',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Access-Control-Allow-Origin': '*'
          });
          return res.end('Asset Not Found');
        }
      }

      // Direct static fallback handler for public/ files (favicon.ico, icon.png, apple-icon.png)
      if (pathname !== '/' && !pathname.startsWith('/api/')) {
        const safePublicPath = path.normalize(pathname.replace(/^\//, '')).replace(/^(\.\.[\/\\])+/, '');
        const publicFilePath = path.join(__dirname, 'public', safePublicPath);
        if (fs.existsSync(publicFilePath) && fs.statSync(publicFilePath).isFile()) {
          const ext = path.extname(publicFilePath).toLowerCase();
          let contentType = 'application/octet-stream';
          if (ext === '.ico') contentType = 'image/x-icon';
          else if (ext === '.png') contentType = 'image/png';
          else if (ext === '.svg') contentType = 'image/svg+xml';
          else if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg';
          
          res.writeHead(200, {
            'Content-Type': contentType,
            'Cache-Control': 'public, max-age=86400',
            'Access-Control-Allow-Origin': '*'
          });
          return fs.createReadStream(publicFilePath).pipe(res);
        }
      }

      // Set no-cache for HTML pages so browsers always fetch fresh HTML with current asset hashes
      if (!pathname.startsWith('/_next/') && !pathname.startsWith('/api/')) {
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');
      }

      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('Internal Server Error');
    }
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on port ${port}`);
  });
}).catch((ex) => {
  console.error(ex.stack);
  process.exit(1);
});

