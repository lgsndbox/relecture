// Check for duplicate article slugs within the same category
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const articlesDir = path.join(__dirname, '../src/articles');

// Parse front matter to get category
function extractCategory(content) {
	const match = content.match(/^---\n([\s\S]*?)\n---/);
	if (!match) return null;
	const frontMatter = match[1];
	const categoryMatch = frontMatter.match(/^category:\s*(.+)$/m);
	return categoryMatch ? categoryMatch[1].trim() : null;
}

// Read all markdown files
const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.md'));

// Build map of category -> [slugs]
const categoryMap = new Map();

files.forEach(file => {
	const slug = path.basename(file, '.md');
	const content = fs.readFileSync(path.join(articlesDir, file), 'utf-8');
	const category = extractCategory(content);

	if (!category) {
		console.warn(`⚠️  No category found in: ${file}`);
		return;
	}

	if (!categoryMap.has(category)) {
		categoryMap.set(category, []);
	}
	categoryMap.get(category).push({ slug, file });
});

// Check for duplicates within each category
let hasDuplicates = false;

categoryMap.forEach((articles, category) => {
	const slugCounts = new Map();

	articles.forEach(({ slug, file }) => {
		slugCounts.set(slug, (slugCounts.get(slug) || 0) + 1);
	});

	slugCounts.forEach((count, slug) => {
		if (count > 1) {
			hasDuplicates = true;
			console.error(`❌ DUPLICATE in category "${category}": slug "${slug}" used ${count} times`);
			console.error(`   URL conflict: /${category}/${slug}/`);
		}
	});
});

if (!hasDuplicates) {
	console.log('✅ No duplicate slugs found! All article URLs are unique.');

	// Show the URL structure (verbose output only in development)
	if (process.env.ELEVENTY_ENV !== 'production') {
		console.log('\nCurrent article URLs:');
		const allUrls = [];
		categoryMap.forEach((articles, category) => {
			articles.forEach(({ slug }) => {
				allUrls.push(`/${category}/${slug}/`);
			});
		});
		allUrls.sort().forEach(url => console.log(`  ${url}`));
	}
}

process.exit(hasDuplicates ? 1 : 0);
