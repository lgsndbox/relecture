// ============================================================================
// IMPORTS
// ============================================================================
// ES Module compatible plug-ins imports
import pluginRss from "@11ty/eleventy-plugin-rss";

// Needed to get the url of the site
// _data files content are available in templates
// but not in config, so we need that explicit import
import siteData from "./src/_data/site.js";

// Needed for the article-card shortcode.
import themes from "./src/_data/themes.json" with { type: "json" };

// needed to perform css bundling/minifying in before step
import { execSync } from 'child_process';

// Import all filters
import * as filters from './config/filters/index.js';

// Import all shortcodes
import * as shortcodes from './config/shortcodes/index.js';

// Import all collections
import * as collections from './config/collections/index.js';

// ============================================================================
// ELEVENTY CONFIGURATION
// ============================================================================
export default async function(eleventyConfig) {
	// ========================================================================
	// ASSET PROCESSING & WATCH
	// ========================================================================
	// Auto-process assets (CSS + JS) before each build (including watch rebuilds)
	eleventyConfig.on("eleventy.before", async () => {
		try {
			// Bundle CSS
			execSync('node scripts/bundle-css.js', {
				stdio: 'inherit',
				env: process.env  // Pass environment variables to child process
			});
			// Hash JS
			execSync('node scripts/hash-js.js', {
				stdio: 'inherit',
				env: process.env
			});
		} catch (error) {
			console.error('Asset processing failed:', error);
		}
	});

	// Watch source files to trigger rebuild (which runs asset processing)
	// CSS and JS files aren't templates, and we are not using addPassthroughCopy,
	// so we need explicit watch targets
	// Assets output to _site/css/ and _site/js/, so no watch conflicts
	eleventyConfig.addWatchTarget("src/css/**/*.css");
	eleventyConfig.addWatchTarget("src/js/**/*.js");

	// ========================================================================
	// PLUGINS
	// ========================================================================
	// simple addPlugin because that plugin is compatible with ES Modules
	eleventyConfig.addPlugin(pluginRss);

	// Sitemap plugin (using dynamic import for CommonJS compatibility)
	const sitemap = await import("@quasibit/eleventy-plugin-sitemap");
	eleventyConfig.addPlugin(sitemap.default, {
		sitemap: {
			hostname: siteData.url,
		},
	});

	// No more Plugins.
	// @11ty/eleventy-img is NOT a plugin - it's a utility library,
	// so no declaration here

	// ========================================================================
	// SHORTCODES
	// ========================================================================
	eleventyConfig.addAsyncShortcode("image", shortcodes.imageShortcode);
	eleventyConfig.addAsyncShortcode("articleCard", async (article, options = {}) => {
	  return shortcodes.articleCardShortcode(article, { ...options, themes });
	});

	// ========================================================================
	// GLOBAL DATA
	// ========================================================================
	// Compute the current year, so that data will be accessible to templates
	eleventyConfig.addGlobalData("year", new Date().getFullYear());

	// ========================================================================
	// FILTERS
	// ========================================================================
	// Register all filters from modules
	Object.entries(filters).forEach(([name, filter]) => {
		eleventyConfig.addFilter(name, filter);
	});

	// ========================================================================
	// OPTIONAL: HTML SANITIZATION FOR RSS FEED
	// ========================================================================

	// IMPORTANT: Only enable this if you accept external contributions or user-submitted content
	// Current status: DISABLED - all content comes from trusted authors
	//
	// To enable sanitization:
	// 1. Install package: npm install sanitize-html
	// 2. Uncomment the import at the top of this file
	// 3. Uncomment the filter below
	// 4. Update feed.njk to use: {{ article.content | sanitize }}
	//
	// import sanitizeHtml from 'sanitize-html';
	//
	// eleventyConfig.addFilter("sanitize", (content) => {
	// 	return sanitizeHtml(content, {
	// 		allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'figure', 'figcaption']),
	// 		allowedAttributes: {
	// 			...sanitizeHtml.defaults.allowedAttributes,
	// 			img: ['src', 'alt', 'width', 'height', 'loading', 'decoding'],
	// 			a: ['href', 'name', 'target', 'rel']
	// 		},
	// 		allowedSchemes: ['http', 'https', 'mailto'],
	// 		allowedSchemesByTag: {
	// 			img: ['http', 'https', 'data']
	// 		}
	// 	});
	// });

	// ========================================================================
	// COLLECTIONS
	// ========================================================================
	// Register all collections from modules
	const collectionMappings = {
		"articles": collections.articlesCollection,
		"featuredArticles": collections.featuredArticlesCollection,
		"unthemedArticles": collections.unthemedArticlesCollection,
		"articlesByTheme": collections.articlesByThemeCollection,
		"articlesByCategory": collections.articlesByCategoryCollection,
		"articlesByAuthor": collections.articlesByAuthorCollection,
		"articlesByTag": collections.articlesByTagCollection,
		"authorsArray": collections.authorsArrayCollection,
		"tagsArray": collections.tagsArrayCollection
	};

	Object.entries(collectionMappings).forEach(([name, collectionFn]) => {
		eleventyConfig.addCollection(name, collectionFn);
	});

	// ========================================================================
	// IGNORES
	// ========================================================================
	// Ignore documentation files. Do not generate site pages for them.
	eleventyConfig.ignores.add("../docs/**/*");

	// ========================================================================
	// PASSTHROUGH COPY
	// ========================================================================
	// Note: CSS is bundled by bundle-css.js to _site/css/main.css
	// Note: JS is hashed by hash-js.js to _site/js/*.js
	// (not copied via passthrough)
	// These will be watched and copied as is in the _site folder
	eleventyConfig.addPassthroughCopy("src/images");
	eleventyConfig.addPassthroughCopy("src/fonts");
	eleventyConfig.addPassthroughCopy("src/site.webmanifest");
	eleventyConfig.addPassthroughCopy("src/_headers");
	eleventyConfig.addPassthroughCopy("src/.htaccess");

	// ========================================================================
	// DIRECTORY CONFIGURATION
	// ========================================================================
	// src/ folder is used to distinguish
	// build engine (eleventy.config.js and al)
	// from build material (.md, templates, etc..)
	// _site/ folder contains the build output, the static website.
	return {
		dir: {
			input: "src",
			output: "_site"
		}
	};
}
