#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PurgeCSS } from 'purgecss';
import { glob } from 'glob';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const siteDir = path.join(__dirname, '../_site');
const cssSourceDir = path.join(__dirname, '../src/css');

async function analyzeUnusedCSS() {
  console.log('🔍 Analyzing CSS usage...\n');

  if (!fs.existsSync(siteDir)) {
    console.error('❌ _site directory not found. Build the site first:');
    console.error('   npm run build:prod');
    process.exit(1);
  }

  // Get all source CSS files (excluding main.css bundle)
  const cssFiles = glob.sync('**/*.css', {
    cwd: cssSourceDir,
    ignore: ['main.css']
  });

  console.log(`Found ${cssFiles.length} CSS source files\n`);

  // Analyze each file individually
  const results = [];

  for (const file of cssFiles) {
    const filePath = path.join(cssSourceDir, file);
    const content = fs.readFileSync(filePath, 'utf8');

    // Extract class selectors from this file
    const classMatches = [...content.matchAll(/\.([a-zA-Z_-][a-zA-Z0-9_-]*)/g)];
    const definedClasses = new Set(classMatches.map(m => m[1]));

    if (definedClasses.size === 0) {
      continue; // Skip files with no class definitions
    }

    // Run PurgeCSS on just this file
    const purgeCSSInstance = new PurgeCSS();
    const purgeResult = await purgeCSSInstance.purge({
      content: [
        path.join(siteDir, '**/*.html'),
        path.join(__dirname, '../src/js/**/*.js'),
      ],
      css: [{ raw: content }],
      safelist: {
        standard: ['sr-only', 'skip-link'],
        greedy: [
          /^theme-toggle/,
          /^theme-icon/,
          /nav-toggle/,
          /data-theme/,
        ]
      },
    });

    const purgedContent = purgeResult[0].css;
    const usedClassMatches = [...purgedContent.matchAll(/\.([a-zA-Z_-][a-zA-Z0-9_-]*)/g)];
    const usedClasses = new Set(usedClassMatches.map(m => m[1]));

    const unusedClasses = [...definedClasses].filter(c => !usedClasses.has(c));

    const originalSize = Buffer.byteLength(content, 'utf8');
    const purgedSize = Buffer.byteLength(purgedContent, 'utf8');
    const reduction = originalSize - purgedSize;
    const reductionPercent = ((reduction / originalSize) * 100).toFixed(1);

    results.push({
      file,
      definedClasses: definedClasses.size,
      usedClasses: usedClasses.size,
      unusedClasses: unusedClasses.length,
      unusedClassList: unusedClasses,
      originalSize,
      purgedSize,
      reduction,
      reductionPercent
    });
  }

  // Sort by reduction percentage (biggest opportunities first)
  results.sort((a, b) => b.reductionPercent - a.reductionPercent);

  // Display results
  console.log('================================================================================');
  console.log('CSS USAGE ANALYSIS REPORT');
  console.log('================================================================================\n');

  let totalOriginal = 0;
  let totalPurged = 0;
  let totalUnusedClasses = 0;

  results.forEach(r => {
    totalOriginal += r.originalSize;
    totalPurged += r.purgedSize;
    totalUnusedClasses += r.unusedClasses;

    if (r.unusedClasses > 0) {
      console.log(`📄 ${r.file}`);
      console.log(`   Classes: ${r.usedClasses} used / ${r.definedClasses} defined (${r.unusedClasses} unused)`);
      console.log(`   Size: ${(r.originalSize / 1024).toFixed(1)}KB → ${(r.purgedSize / 1024).toFixed(1)}KB (-${r.reductionPercent}%)`);

      if (r.unusedClasses <= 10) {
        console.log(`   Unused: ${r.unusedClassList.join(', ')}`);
      } else {
        console.log(`   Unused: ${r.unusedClassList.slice(0, 10).join(', ')}... (+${r.unusedClasses - 10} more)`);
      }
      console.log('');
    }
  });

  console.log('================================================================================');
  console.log('SUMMARY');
  console.log('================================================================================');
  console.log(`Total source CSS: ${(totalOriginal / 1024).toFixed(1)}KB`);
  console.log(`After purging: ${(totalPurged / 1024).toFixed(1)}KB`);
  console.log(`Potential savings: ${((totalOriginal - totalPurged) / 1024).toFixed(1)}KB (-${(((totalOriginal - totalPurged) / totalOriginal) * 100).toFixed(1)}%)`);
  console.log(`Total unused classes: ${totalUnusedClasses}`);
  console.log('');

  // Show files with no unused CSS
  const cleanFiles = results.filter(r => r.unusedClasses === 0);
  if (cleanFiles.length > 0) {
    console.log('✓ Files with no unused CSS:');
    cleanFiles.forEach(r => console.log(`  - ${r.file}`));
    console.log('');
  }

  // Recommendations
  console.log('RECOMMENDATIONS:');
  console.log('================================================================================');

  const highWaste = results.filter(r => r.reductionPercent > 20);
  if (highWaste.length > 0) {
    console.log('\n🎯 High-impact files (>20% unused):');
    highWaste.forEach(r => {
      console.log(`   ${r.file} - ${r.reductionPercent}% unused`);
    });
  }

  console.log('\nNext steps:');
  console.log('1. Review the unused classes listed above');
  console.log('2. Manually remove unused CSS from source files');
  console.log('3. Or run: node scripts/clean-unused-css.js (automated cleanup)');
  console.log('4. Test thoroughly after cleanup');
}

analyzeUnusedCSS().catch(console.error);
