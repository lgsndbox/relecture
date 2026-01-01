import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import { transform } from 'lightningcss';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, '..');
const cssDir = path.join(projectRoot, 'src/css');
const outputDir = path.join(projectRoot, '_site/css');
const manifestPath = path.join(projectRoot, 'src/_data/manifest.json');
const isProduction = process.env.ELEVENTY_ENV === 'production';

// CSS layer order for cascade control
const layerOrder = '@layer reset, tokens, base, layout, navigation, components, utilities, responsive;';

// CSS files to bundle in order
const cssFiles = [
  'reset.css',
  'tokens.css',
  'base.css',
  'layout.css',

  // Base components (dependencies first)
  'components/badge.css',
  'components/button.css',
  'components/meta-and-tags.css',
  'components/page-header.css',
  'components/card.css',

  // Page components
  'components/author.css',
  'components/homepage.css',
  'components/hero-section.css',
  'components/theme-card.css',
  'components/independent-articles.css',
  'components/featured-grid.css',
  'components/article-page.css',
  'components/article-card.css',
  'components/theme-pages.css',
  'components/category-pages.css',

  'utilities.css',
  'print.css'
];

// Build the bundled CSS
let bundledCss = `/* ============================================================================
   PAUSE - La revue qui prend son temps
   Main Stylesheet (Bundled)
   ============================================================================ */

/* Define layer order for cascade control */
${layerOrder}

/* ============================================================================
   FONTS
   ============================================================================ */
/* Andada Pro - Variable font supporting weights 400-840 */
@font-face {
  font-family: 'Andada Pro';
  font-style: normal;
  font-weight: 400 840;
  font-display: swap;
  src: url('/fonts/andada-pro-regular.woff2') format('woff2');
}

@font-face {
  font-family: 'Andada Pro';
  font-style: italic;
  font-weight: 400 840;
  font-display: swap;
  src: url('/fonts/andada-pro-italic.woff2') format('woff2');
}

/* Faculty Glyphic */
@font-face {
  font-family: 'Faculty Glyphic';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('/fonts/faculty-glyphic-regular.woff2') format('woff2');
}

`;

// Append each CSS module with source comments for better debugging
cssFiles.forEach(file => {
  // Support both top-level files and files in subdirectories
  const filePath = file.includes('/')
    ? path.join(__dirname, '../src/css', file)
    : path.join(cssDir, file);

  if (!fs.existsSync(filePath)) {
    console.error(`ERROR: CSS file not found: ${filePath}`);
    console.error('Expected CSS files:', cssFiles.join(', '));
    process.exit(1);
  }
  const content = fs.readFileSync(filePath, 'utf8');

  // Add source comment before each file (preserved in dev mode)
  const sourceComment = isProduction ? '' : `\n/* Source: src/css/${file} */\n`;
  bundledCss += `${sourceComment}${content}\n`;
});

// Process CSS with lightningcss (minify in production, source maps not in production)
let finalCss = bundledCss;
let sourceMap = null;

try {
  const result = transform({
    filename: 'main.css',
    code: Buffer.from(bundledCss),
    minify: isProduction,
    sourceMap: !isProduction,  // do not generate source maps in production
    targets: {
      // Support browsers from last 2 years
      chrome: 95 << 16,
      firefox: 90 << 16,
      safari: 14 << 16,
      edge: 95 << 16,
    }
  });

  finalCss = result.code.toString();
  sourceMap = result.map ? result.map.toString() : null;

  if (isProduction) {
    console.log('✓ CSS bundled and minified for production');
  } else {
    console.log('✓ CSS bundled (development mode - not minified)');
  }
} catch (error) {
  console.error('⚠ CSS processing failed, using unprocessed CSS:', error.message);
  finalCss = bundledCss;
}

// Generate content hash for cache busting
const hash = crypto
  .createHash('md5')
  .update(finalCss)
  .digest('hex')
  .substring(0, 8);

const filename = `main.${hash}.css`;
const outputFile = path.join(outputDir, filename);
const sourceMapFile = path.join(outputDir, `${filename}.map`);

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Clean old hashed CSS files (keep only the new one)
const oldFiles = fs.readdirSync(outputDir)
  .filter(f => f.match(/^main\.[a-f0-9]{8}\.css(\.map)?$/));

oldFiles.forEach(f => {
  const oldPath = path.join(outputDir, f);
  if (f !== filename && f !== `${filename}.map`) {
    fs.unlinkSync(oldPath);
    console.log(`  Removed old file: ${f}`);
  }
});

// Add source map reference to CSS
if (sourceMap) {
  finalCss += `\n/*# sourceMappingURL=${filename}.map */`;
}

// Write the bundled CSS
fs.writeFileSync(outputFile, finalCss);
console.log(`  Generated: ${filename}`);

// Write source map
if (sourceMap) {
  fs.writeFileSync(sourceMapFile, sourceMap);
  console.log(`  Generated: ${filename}.map`);
}

// Write manifest for Eleventy templates
const manifest = {
  'main.css': `/css/${filename}`
};

fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
console.log(`  Updated: manifest.json`);
