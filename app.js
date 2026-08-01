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

// Auto-sync .next/static to _next/static so Apache serves CSS/JS assets without dot-folder access blocks
function syncPublicStaticAssets() {
  try {
    const src = path.join(__dirname, '.next', 'static');
    const dest = path.join(__dirname, '_next', 'static');
    if (fs.existsSync(src)) {
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      fs.cpSync(src, dest, { recursive: true });
    }
  } catch (e) {}
}

const nextDir = path.join(__dirname, '.next');
fixNextPermissions(nextDir);
syncPublicStaticAssets();

const dev = false;
const app = next({ dev, dir: __dirname });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
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
