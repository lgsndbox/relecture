#!/usr/bin/env node

/**
 * Standardizes frontmatter formatting across all articles
 * - Removes unnecessary quotes from simple string values
 * - Keeps quotes only when required (special characters, colons, etc.)
 * - Ensures consistent YAML formatting
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { glob } from 'glob';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');

// Fields that should ALWAYS be quoted (commonly have special chars)
const ALWAYS_QUOTE_FIELDS = new Set([
  'title',
  'description',
  'chapeau',
  'imageAlt',
  'ogImage'
]);

// Fields that should NEVER be quoted (simple values)
const NEVER_QUOTE_FIELDS = new Set([
  'layout',
  'author',
  'date',
  'category',
  'theme',
  'image',
  'featured',
  'editorial',
  'mainArticle'
]);

// Check if a value needs quotes
const needsQuotes = (key, value) => {
  if (typeof value !== 'string') return false;

  // Always quote certain fields
  if (ALWAYS_QUOTE_FIELDS.has(key)) return true;

  // Never quote certain fields (unless they have special chars)
  if (NEVER_QUOTE_FIELDS.has(key)) {
    // But do quote if has problematic characters
    if (value.match(/[:#@&*!|>'{}\[\],]/)) return true;
    if (value.includes(': ')) return true;
    return false;
  }

  // For other fields, quote only if necessary
  // Contains special characters that require quoting
  if (value.match(/[:#@&*!|>'{}\[\],]/)) return true;

  // Starts with special characters
  if (value.match(/^[-?%]/)) return true;

  // Contains colon followed by space
  if (value.includes(': ')) return true;

  // Could be interpreted as number, boolean, null
  if (value.match(/^(true|false|null|~|yes|no|on|off|\d+)$/i)) return true;

  return false;
};

// Remove quotes from a value if they're not needed
const normalizeValue = (key, value) => {
  const trimmed = value.trim();

  // Remove existing quotes
  let unquoted = trimmed;
  if ((unquoted.startsWith('"') && unquoted.endsWith('"')) ||
      (unquoted.startsWith("'") && unquoted.endsWith("'"))) {
    unquoted = unquoted.slice(1, -1);
  }

  // Add back quotes only if needed (based on field and value)
  if (needsQuotes(key, unquoted)) {
    // Use double quotes, escape any internal double quotes
    return `"${unquoted.replace(/"/g, '\\"')}"`;
  }

  return unquoted;
};

// Process frontmatter
const standardizeFrontmatter = (frontmatter) => {
  const lines = frontmatter.split('\n');
  const processed = [];

  for (const line of lines) {
    // Skip empty lines and comments
    if (!line.trim() || line.trim().startsWith('#')) {
      processed.push(line);
      continue;
    }

    // List items (tags, keywords, etc.)
    if (line.match(/^\s*-\s+/)) {
      const match = line.match(/^(\s*-\s+)(.+)$/);
      if (match) {
        const indent = match[1];
        // For list items, quote if has spaces or special chars
        const value = match[2].trim();
        let unquoted = value;
        if ((unquoted.startsWith('"') && unquoted.endsWith('"')) ||
            (unquoted.startsWith("'") && unquoted.endsWith("'"))) {
          unquoted = unquoted.slice(1, -1);
        }
        // Quote list items if they have spaces or special chars
        const shouldQuote = unquoted.includes(' ') || needsQuotes(null, unquoted);
        const normalized = shouldQuote ? `"${unquoted.replace(/"/g, '\\"')}"` : unquoted;
        processed.push(`${indent}${normalized}`);
        continue;
      }
    }

    // Key-value pairs
    const kvMatch = line.match(/^(\s*)(\w+):\s*(.*)$/);
    if (kvMatch) {
      const indent = kvMatch[1];
      const key = kvMatch[2];
      const value = kvMatch[3].trim();

      // Empty value
      if (!value) {
        processed.push(line);
        continue;
      }

      // Array start
      if (value === '[' || value === '[]') {
        processed.push(line);
        continue;
      }

      const normalized = normalizeValue(key, value);
      processed.push(`${indent}${key}: ${normalized}`);
      continue;
    }

    // Keep line as-is if we can't parse it
    processed.push(line);
  }

  return processed.join('\n');
};

// Find all article files
const articlesPattern = path.join(rootDir, 'src/articles/**/*.md');
const articleFiles = glob.sync(articlesPattern);

console.log('🔧 Standardizing frontmatter formatting...\n');

let filesChanged = 0;
let filesChecked = 0;

articleFiles.forEach(filePath => {
  const content = fs.readFileSync(filePath, 'utf8');
  const relativePath = path.relative(rootDir, filePath);
  filesChecked++;

  // Extract frontmatter
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!frontmatterMatch) {
    console.warn(`⚠️  No frontmatter found in ${relativePath}`);
    return;
  }

  const originalFrontmatter = frontmatterMatch[1];
  const bodyContent = frontmatterMatch[2];

  // Standardize frontmatter
  const standardizedFrontmatter = standardizeFrontmatter(originalFrontmatter);

  // Check if changed
  if (standardizedFrontmatter !== originalFrontmatter) {
    const newContent = `---\n${standardizedFrontmatter}\n---\n${bodyContent}`;
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`✓ Standardized ${relativePath}`);
    filesChanged++;
  }
});

console.log(`\n📊 Summary:`);
console.log(`  Checked: ${filesChecked} articles`);
console.log(`  Changed: ${filesChanged} articles`);
console.log(`  No changes needed: ${filesChecked - filesChanged} articles`);

if (filesChanged > 0) {
  console.log(`\n✅ Frontmatter standardized successfully!`);
} else {
  console.log(`\n✅ All frontmatter already standardized!`);
}
