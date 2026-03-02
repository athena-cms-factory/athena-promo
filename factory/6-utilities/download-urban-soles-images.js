import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Readable } from 'stream';
import { finished } from 'stream/promises';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const productsPath = path.join(__dirname, '../../sites/urban-soles/src/data/producten.json');
const imagesDir = path.join(__dirname, '../../sites/urban-soles/public/images');

if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

async function downloadImage(url, filename) {
  const filePath = path.join(imagesDir, filename);
  
  try {
    console.log(`⏳ Downloading & Overwriting ${filename} from ${url}...`);
    const response = await fetch(url);
    if (!response.ok) throw new Error(`unexpected response ${response.statusText}`);
    
    const fileStream = fs.createWriteStream(filePath);
    await finished(Readable.fromWeb(response.body).pipe(fileStream));
    console.log(`✨ Saved ${filename}`);
  } catch (error) {
    console.error(`❌ Failed to download ${url}: ${error.message}`);
  }
}

async function run() {
  for (const product of products) {
    const filename = `${product.id}.jpg`;
    await downloadImage(product.afbeelding, filename);
  }
  console.log('🚀 All images downloaded and overwritten!');
}

run();
