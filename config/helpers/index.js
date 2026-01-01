/**
 * Helper functions for Eleventy configuration
 */

import authorsData from '../../src/_data/authors.json' with { type: 'json' };

/**
 * Creates a URL-safe slug from a string by:
 * - Converting to lowercase
 * - Removing accents (é → e, à → a, etc.)
 * - Replacing non-alphanumeric characters with dashes
 * - Removing leading/trailing dashes
 * @param {string} text - The text to slugify
 * @returns {string} URL-safe slug
 */
export function slugify(text) {
  if (!text || typeof text !== 'string') return '';
  return text.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Remove accents
    .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric with dashes
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing dashes
}

/**
 * Groups articles by author, creating author objects with slug and articles array
 * @param {Array} articles - Array of article objects
 * @returns {Object} Object with author slugs as keys, author data as values
 */
export function groupArticlesByAuthor(articles) {
  const byAuthor = {};

  articles.forEach(article => {
    const author = article.data.author;
    if (author) {
      const authorSlug = slugify(author);

      if (!byAuthor[authorSlug]) {
        // Find author data from authors.json
        const authorInfo = authorsData.find(a => a.slug === authorSlug);

        byAuthor[authorSlug] = {
          name: author,
          slug: authorSlug,
          bio: authorInfo?.bio || '',
          email: authorInfo?.email || '',
          articles: []
        };
      }
      byAuthor[authorSlug].articles.push(article);
    }
  });

  // Sort articles within each author by date (newest first)
  Object.values(byAuthor).forEach(author => {
    author.articles.sort((a, b) => b.date - a.date);
  });

  return byAuthor;
}

/**
 * Configuration constants
 */
export const CONSTANTS = {
  /** Responsive image widths for different viewport sizes */
  IMAGE_WIDTHS: [300, 600, 900, 1200],

  /** Average reading speed for French text in words per minute */
  WORDS_PER_MINUTE: 200,

  /** Default number of related articles to display */
  DEFAULT_RELATED_ARTICLES_LIMIT: 4,

  /** Articles glob pattern */
  ARTICLES_GLOB: "src/articles/**/*.md"
};
