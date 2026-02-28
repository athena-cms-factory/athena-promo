#!/usr/bin/env node
// Download all jet images from image-urls.json to public/images/
// Usage: node scripts/download-images.mjs

import { readFileSync, mkdirSync, createWriteStream } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import https from 'https';
import http from 'http';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const OUTPUT_DIR = join(ROOT, 'public', 'images');
const URLS_FILE = join(ROOT, 'src', 'data', 'image-urls.json');

mkdirSync(OUTPUT_DIR, { recursive: true });

const urls = JSON.parse(readFileSync(URLS_FILE, 'utf8'));
const entries = Object.entries(urls);

function getExtension(url) {
  // Extract filename from URL (handles both weserv proxy and direct URLs)
  const decoded = decodeURIComponent(url);
  const match = decoded.match(/\.([a-zA-Z]{3,4})(?:[&?]|$)/i);
  return match ? match[1].toLowerCase() : 'jpg';
}

function download(url, destPath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;

    const request = (targetUrl) => {
      protocol.get(targetUrl, (res) => {
        // Follow redirects
        if (res.statusCode === 301 || res.statusCode === 302 || res.statusCode === 307) {
          const redirectUrl = res.headers.location;
          const redirectProtocol = redirectUrl.startsWith('https') ? https : http;
          redirectProtocol.get(redirectUrl, (res2) => {
            if (res2.statusCode !== 200) {
              reject(new Error(`HTTP ${res2.statusCode} for ${targetUrl}`));
              return;
            }
            const file = createWriteStream(destPath);
            res2.pipe(file);
            file.on('finish', () => file.close(resolve));
            file.on('error', reject);
          }).on('error', reject);
        } else if (res.statusCode === 200) {
          const file = createWriteStream(destPath);
          res.pipe(file);
          file.on('finish', () => file.close(resolve));
          file.on('error', reject);
        } else {
          reject(new Error(`HTTP ${res.statusCode} for ${targetUrl}`));
        }
      }).on('error', reject);
    };

    request(url);
  });
}

async function main() {
  console.log(`Downloading ${entries.length} images to ${OUTPUT_DIR}\n`);

  let ok = 0;
  let fail = 0;

  for (const [id, url] of entries) {
    const ext = getExtension(url);
    const destPath = join(OUTPUT_DIR, `${id}.${ext}`);
    process.stdout.write(`  ${id}.${ext} ... `);
    try {
      await download(url, destPath);
      console.log('OK');
      ok++;
    } catch (err) {
      console.log(`FAIL (${err.message})`);
      fail++;
    }
  }

  console.log(`\nKlaar: ${ok} geslaagd, ${fail} mislukt`);
}

main();
