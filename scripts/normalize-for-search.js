import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sourceDir = path.join(__dirname, '..', '_site');
const targetDir = path.join(__dirname, '..', '_site_normalized');

/**
 * Remove accents from text
 */
function removeAccents(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

/**
 * Recursively copy and normalize HTML files
 */
function processDirectory(src, dest) {
  // Create destination directory if it doesn't exist
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      // Recursively process subdirectories
      processDirectory(srcPath, destPath);
    } else if (entry.isFile()) {
      if (entry.name.endsWith('.html')) {
        // Normalize HTML files
        const content = fs.readFileSync(srcPath, 'utf8');
        const normalized = removeAccents(content);
        fs.writeFileSync(destPath, normalized);
        if (process.env.ELEVENTY_ENV !== 'production') {
          console.log(`Normalized: ${entry.name}`);
        }
      } else {
        // Copy other files as-is (CSS, images, JS, etc.)
        fs.copyFileSync(srcPath, destPath);
      }
    }
  }
}

console.log('Starting HTML normalization for search indexing...');

// Remove existing normalized directory if it exists
if (fs.existsSync(targetDir)) {
  fs.rmSync(targetDir, { recursive: true, force: true });
  console.log('Removed existing normalized directory');
}

// Process all files
processDirectory(sourceDir, targetDir);

console.log('✓ HTML normalization complete!');
console.log(`Normalized site created at: ${targetDir}`);
