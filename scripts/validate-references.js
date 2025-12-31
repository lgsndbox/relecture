#!/usr/bin/env node

/**
 * Validates category and theme references in articles
 * Prevents broken links from invalid slugs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { glob } from 'glob';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');

// Load data files
const categoriesPath = path.join(rootDir, 'src/_data/categories.json');
const themesPath = path.join(rootDir, 'src/_data/themes.json');

const categories = JSON.parse(fs.readFileSync(categoriesPath, 'utf8'));
const themes = JSON.parse(fs.readFileSync(themesPath, 'utf8'));

// Extract valid slugs
const validCategorySlugs = new Set(categories.map(cat => cat.slug));
const validThemeSlugs = new Set(themes.map(theme => theme.slug));

console.log('🔍 Validating category and theme references...\n');
console.log(`Valid categories: ${[...validCategorySlugs].join(', ')}`);
console.log(`Valid themes: ${[...validThemeSlugs].join(', ')}\n`);

// Find all article files
const articlesPattern = path.join(rootDir, 'src/articles/**/*.md');
const articleFiles = glob.sync(articlesPattern);

let hasErrors = false;
const issues = [];

// Validate each article
articleFiles.forEach(filePath => {
  const content = fs.readFileSync(filePath, 'utf8');
  const relativePath = path.relative(rootDir, filePath);

  // Extract frontmatter
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatterMatch) {
    console.warn(`⚠️  No frontmatter found in ${relativePath}`);
    return;
  }

  const frontmatter = frontmatterMatch[1];

  // Extract category
  const categoryMatch = frontmatter.match(/^category:\s*(.+)$/m);
  if (categoryMatch) {
    // Remove quotes if present
    const category = categoryMatch[1].trim().replace(/^["']|["']$/g, '');
    if (!validCategorySlugs.has(category)) {
      hasErrors = true;
      issues.push({
        file: relativePath,
        type: 'category',
        value: category,
        message: `Invalid category "${category}"`
      });
    }
  }

  // Extract theme
  const themeMatch = frontmatter.match(/^theme:\s*(.+)$/m);
  if (themeMatch) {
    // Remove quotes if present
    const theme = themeMatch[1].trim().replace(/^["']|["']$/g, '');
    if (!validThemeSlugs.has(theme)) {
      hasErrors = true;
      issues.push({
        file: relativePath,
        type: 'theme',
        value: theme,
        message: `Invalid theme "${theme}"`
      });
    }
  }
});

// Report results
if (hasErrors) {
  console.error('❌ Validation failed! Found invalid references:\n');

  issues.forEach(issue => {
    console.error(`  ${issue.file}`);
    console.error(`    ✗ ${issue.message}`);
    console.error(`    Valid ${issue.type}s: ${issue.type === 'category' ? [...validCategorySlugs].join(', ') : [...validThemeSlugs].join(', ')}\n`);
  });

  console.error(`\n📊 Summary: ${issues.length} invalid reference(s) found in ${articleFiles.length} articles`);
  process.exit(1);
} else {
  console.log(`✅ All references valid! Checked ${articleFiles.length} articles.\n`);
  process.exit(0);
}
