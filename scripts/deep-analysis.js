#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { glob } from 'glob';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');

console.log('================================================================================');
console.log('DEEP CODEBASE ANALYSIS');
console.log('================================================================================\n');

// 1. CSS DUPLICATION ANALYSIS
console.log('1. CSS DUPLICATION ANALYSIS');
console.log('--------------------------------------------------------------------------------');

const cssFiles = glob.sync('src/css/**/*.css', { cwd: rootDir, ignore: 'src/css/main.css' });
const colorValues = {};
const duplicateRules = {};

cssFiles.forEach(file => {
  const content = fs.readFileSync(path.join(rootDir, file), 'utf8');

  // Find color values
  const colors = content.matchAll(/#[0-9a-fA-F]{3,6}|rgba?\([^)]+\)|hsl\([^)]+\)/g);
  for (const match of colors) {
    const color = match[0];
    if (!colorValues[color]) colorValues[color] = [];
    colorValues[color].push(file);
  }

  // Find repeated property patterns
  const rules = content.matchAll(/([a-z-]+):\s*([^;]+);/g);
  for (const match of rules) {
    const rule = `${match[1]}: ${match[2]}`;
    if (!duplicateRules[rule]) duplicateRules[rule] = [];
    duplicateRules[rule].push(file);
  }
});

// Report colors used multiple times
const repeatedColors = Object.entries(colorValues)
  .filter(([color, files]) => files.length > 3 && !color.startsWith('var('))
  .sort((a, b) => b[1].length - a[1].length)
  .slice(0, 10);

if (repeatedColors.length > 0) {
  console.log('\nColors used in multiple files (could use CSS variables):');
  repeatedColors.forEach(([color, files]) => {
    console.log(`  ${color} - used in ${files.length} files`);
  });
} else {
  console.log('✓ No significant color duplication found');
}

// 2. JAVASCRIPT ANALYSIS
console.log('\n\n2. JAVASCRIPT ANALYSIS');
console.log('--------------------------------------------------------------------------------');

const jsFiles = glob.sync('src/js/**/*.js', { cwd: rootDir });
let totalJsSize = 0;

if (jsFiles.length > 0) {
  jsFiles.forEach(file => {
    const filePath = path.join(rootDir, file);
    const size = fs.statSync(filePath).size;
    totalJsSize += size;
    console.log(`${file}: ${(size / 1024).toFixed(1)}KB`);
  });
  console.log(`\nTotal JavaScript: ${(totalJsSize / 1024).toFixed(1)}KB`);

  // Check for console.log in production code
  jsFiles.forEach(file => {
    const content = fs.readFileSync(path.join(rootDir, file), 'utf8');
    const consoleLogs = content.match(/console\.(log|warn|error)/g);
    if (consoleLogs && consoleLogs.length > 0) {
      console.log(`⚠️  ${file} contains ${consoleLogs.length} console statements`);
    }
  });
} else {
  console.log('No JavaScript files found');
}

// 3. IMAGE & FONT ANALYSIS
console.log('\n\n3. ASSETS ANALYSIS');
console.log('--------------------------------------------------------------------------------');

// Images
const imageFiles = glob.sync('src/images/**/*.{jpg,jpeg,png,gif,svg,webp,avif}', { cwd: rootDir });
let totalImageSize = 0;
const largeImages = [];

imageFiles.forEach(file => {
  const filePath = path.join(rootDir, file);
  const size = fs.statSync(filePath).size;
  totalImageSize += size;

  if (size > 100000) { // >100KB
    largeImages.push({ file, size });
  }
});

console.log(`Images: ${imageFiles.length} files, ${(totalImageSize / 1024).toFixed(1)}KB total`);
if (largeImages.length > 0) {
  console.log('\nLarge images (>100KB):');
  largeImages
    .sort((a, b) => b.size - a.size)
    .forEach(({ file, size }) => {
      console.log(`  ${file}: ${(size / 1024).toFixed(1)}KB`);
    });
}

// Fonts
const fontFiles = glob.sync('src/fonts/**/*.{woff,woff2,ttf,otf}', { cwd: rootDir });
let totalFontSize = 0;

fontFiles.forEach(file => {
  const filePath = path.join(rootDir, file);
  const size = fs.statSync(filePath).size;
  totalFontSize += size;
});

console.log(`\nFonts: ${fontFiles.length} files, ${(totalFontSize / 1024).toFixed(1)}KB total`);

// Check if fonts are actually used
const cssContent = fs.readFileSync(path.join(rootDir, 'src/css/main.css'), 'utf8');
fontFiles.forEach(file => {
  const fontName = path.basename(file, path.extname(file));
  if (!cssContent.includes(fontName)) {
    console.log(`⚠️  Font ${file} might be unused`);
  }
});

// 4. DATA FILES ANALYSIS
console.log('\n\n4. DATA FILES ANALYSIS');
console.log('--------------------------------------------------------------------------------');

const dataFiles = glob.sync('src/_data/**/*.{json,js}', { cwd: rootDir });
dataFiles.forEach(file => {
  const filePath = path.join(rootDir, file);
  const size = fs.statSync(filePath).size;
  console.log(`${file}: ${(size / 1024).toFixed(1)}KB`);
});

// Check for unused data files
console.log('\nChecking data file usage...');
const templateFiles = glob.sync('src/**/*.{njk,md,html}', { cwd: rootDir });
let allTemplateContent = '';
templateFiles.forEach(file => {
  allTemplateContent += fs.readFileSync(path.join(rootDir, file), 'utf8');
});

dataFiles.forEach(file => {
  const dataName = path.basename(file, path.extname(file));
  if (!allTemplateContent.includes(dataName)) {
    console.log(`⚠️  Data file ${file} might be unused`);
  }
});

// 5. TEMPLATE DUPLICATION
console.log('\n\n5. TEMPLATE ANALYSIS');
console.log('--------------------------------------------------------------------------------');

const layoutFiles = glob.sync('src/_includes/layouts/*.njk', { cwd: rootDir });
console.log(`Layout files: ${layoutFiles.length}`);

const componentFiles = glob.sync('src/_includes/components/*.njk', { cwd: rootDir });
console.log(`Component files: ${componentFiles.length}`);

const templateCount = glob.sync('src/templates/*.njk', { cwd: rootDir }).length;
console.log(`Template files: ${templateCount}`);

// 6. BUILD SCRIPTS ANALYSIS
console.log('\n\n6. BUILD SCRIPTS ANALYSIS');
console.log('--------------------------------------------------------------------------------');

const scriptFiles = glob.sync('scripts/*.js', { cwd: rootDir });
scriptFiles.forEach(file => {
  const filePath = path.join(rootDir, file);
  const size = fs.statSync(filePath).size;
  console.log(`${file}: ${(size / 1024).toFixed(1)}KB`);
});

// Check which scripts are actually used
const packageJson = JSON.parse(fs.readFileSync(path.join(rootDir, 'package.json'), 'utf8'));
const usedScripts = new Set();

Object.values(packageJson.scripts || {}).forEach(script => {
  scriptFiles.forEach(file => {
    const scriptName = path.basename(file);
    if (script.includes(scriptName)) {
      usedScripts.add(file);
    }
  });
});

console.log('\nScripts used in package.json:');
usedScripts.forEach(script => console.log(`  ✓ ${script}`));

console.log('\nScripts not referenced in package.json:');
scriptFiles.forEach(file => {
  if (!usedScripts.has(file)) {
    console.log(`  ⚠️  ${file}`);
  }
});

// 7. RECOMMENDATIONS
console.log('\n\n7. OPTIMIZATION RECOMMENDATIONS');
console.log('================================================================================');

const recommendations = [];

if (repeatedColors.length > 0) {
  recommendations.push('• Consider converting repeated color values to CSS custom properties');
}

if (largeImages.length > 0) {
  recommendations.push(`• Optimize ${largeImages.length} large images (>100KB)`);
}

if (totalJsSize > 50000) {
  recommendations.push('• Consider minifying JavaScript for production');
}

const unusedScripts = scriptFiles.filter(f => !usedScripts.has(f));
if (unusedScripts.length > 0) {
  recommendations.push(`• Review ${unusedScripts.length} scripts not referenced in package.json`);
}

if (recommendations.length > 0) {
  recommendations.forEach(rec => console.log(rec));
} else {
  console.log('✓ No major optimization opportunities found');
}

console.log('\n================================================================================');
