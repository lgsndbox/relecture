/**
 * Hash and minify JavaScript files for cache busting
 *
 * - Processes JS files from src/js/
 * - Minifies in production (using esbuild)
 * - Generates content hash for cache busting
 * - Creates source maps for debugging
 * - Updates manifest.json for template references
 */

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import * as esbuild from 'esbuild';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, '..');
const jsSourceDir = path.join(projectRoot, 'src/js');
const outputDir = path.join(projectRoot, '_site/js');
const manifestPath = path.join(projectRoot, 'src/_data/manifest.json');
const isProduction = process.env.ELEVENTY_ENV === 'production';

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Read existing manifest (CSS already added)
let manifest = {};
if (fs.existsSync(manifestPath)) {
  manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
}

/**
 * Process a JavaScript file: minify, hash, and write with source map
 */
async function processJSFile(sourceFile, outputKey) {
  const sourcePath = path.join(jsSourceDir, sourceFile);
  const sourceContent = fs.readFileSync(sourcePath, 'utf8');
  const baseName = path.basename(sourceFile, '.js');

  let finalJS = sourceContent;
  let sourceMap = null;

  // Minify and generate source map
  try {
    const result = await esbuild.build({
      entryPoints: [sourcePath],
      minify: isProduction,
      sourcemap: 'external',  // Generate external source map
      target: ['es2020'],     // Modern browsers
      write: false,           // Don't write yet, we need to hash first
      bundle: false,          // Don't bundle, just minify single file
      outfile: `${baseName}.js`  // Temporary name for source map reference
    });

    if (result.outputFiles && result.outputFiles.length > 0) {
      // With outfile, esbuild returns files in order: [0] = JS, [1] = source map
      const jsFile = result.outputFiles.find(f => f.path.endsWith('.js'));
      const mapFile = result.outputFiles.find(f => f.path.endsWith('.map'));

      if (jsFile) {
        finalJS = jsFile.text;
      }

      if (mapFile) {
        sourceMap = mapFile.text;
      }
    }

    if (isProduction) {
      console.log(`✓ JS minified: ${sourceFile}`);
    } else {
      console.log(`✓ JS processed: ${sourceFile} (not minified)`);
    }
  } catch (error) {
    console.error(`⚠ JS processing failed for ${sourceFile}, using unprocessed:`, error.message);
    finalJS = sourceContent;
  }

  // Strip any existing source map reference from esbuild (references non-hashed name)
  finalJS = finalJS.replace(/\n?\/\/# sourceMappingURL=.*\n?$/, '');

  // Generate content hash
  const hash = crypto
    .createHash('md5')
    .update(finalJS)
    .digest('hex')
    .substring(0, 8);

  const filename = `${baseName}.${hash}.js`;
  const outputFile = path.join(outputDir, filename);
  const sourceMapFile = path.join(outputDir, `${filename}.map`);

  // Clean old hashed files for this JS file
  const oldFiles = fs.readdirSync(outputDir)
    .filter(f => f.match(new RegExp(`^${baseName}\\.[a-f0-9]{8}\\.js(\\.map)?$`)));

  oldFiles.forEach(f => {
    if (f !== filename && f !== `${filename}.map`) {
      fs.unlinkSync(path.join(outputDir, f));
      console.log(`  Removed old file: ${f}`);
    }
  });

  // Update source map to reference hashed filename
  if (sourceMap) {
    const mapObj = JSON.parse(sourceMap);
    mapObj.file = filename;  // Update reference to hashed filename
    sourceMap = JSON.stringify(mapObj);

    // Add source map reference to JS
    finalJS += `\n//# sourceMappingURL=${filename}.map\n`;
  }

  // Write JavaScript file
  fs.writeFileSync(outputFile, finalJS);
  console.log(`  Generated: ${filename}`);

  // Write source map
  if (sourceMap) {
    fs.writeFileSync(sourceMapFile, sourceMap);
    console.log(`  Generated: ${filename}.map`);
  }

  // Update manifest
  manifest[outputKey] = `/js/${filename}`;
}

// Process all JS files
async function main() {
  console.log(isProduction
    ? '✓ Processing and minifying JavaScript for production'
    : '✓ Processing JavaScript (development mode - not minified)'
  );

  // Process main.js
  await processJSFile('main.js', 'main.js');

  // Write updated manifest
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`  Updated: manifest.json`);
}

main().catch(error => {
  console.error('JavaScript processing failed:', error);
  process.exit(1);
});
