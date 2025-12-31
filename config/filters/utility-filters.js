/**
 * Utility filters
 */

import { slugify } from '../helpers/index.js';
import { CONSTANTS } from '../helpers/index.js';
import uiStrings from '../../src/_data/ui.js';

/**
 * Limit array to specified number of items
 * @param {Array} array - Array to limit
 * @param {number} limit - Maximum number of items
 * @returns {Array} Limited array
 */
export function limit(array, limit) {
  if (!array || !Array.isArray(array)) return [];
  return array.slice(0, limit);
}

/**
 * Convert text to URL-safe slug
 * @param {string} text - Text to slugify
 * @returns {string} URL-safe slug
 */
export function toSlug(text) {
  return slugify(text);
}

/**
 * Calculate reading time for content
 * @param {string} content - Content to analyze
 * @returns {string} Formatted reading time (e.g., "5 min")
 */
export function readingTime(content) {
  if (!content) return "1 min";

  // Remove HTML tags
  const text = content.replace(/<[^>]+>/g, '');

  // Count words (split by whitespace)
  const words = text.trim().split(/\s+/).length;

  // Calculate reading time based on configured reading speed
  const minutes = Math.ceil(words / CONSTANTS.WORDS_PER_MINUTE);

  // Return formatted string
  if (minutes === 1) {
    return "1 min";
  }
  return `${minutes} min`;
}

/**
 * Internationalization filter - Simple i18n string lookup
 * Usage: {{ "nav.home" | t }} or {{ "accessibility.skipToContent" | t }}
 * @param {string} key - Translation key (dot notation)
 * @returns {string} Translated string or key if not found
 */
export function t(key) {
  if (!key) return '';

  // Split the key by dots to navigate the object
  const keys = key.split('.');
  let value = uiStrings;

  // Navigate through the nested object
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      // Key not found, return the key itself as fallback
      console.warn(`[i18n] Translation key not found: ${key}`);
      return key;
    }
  }

  // Return the found value or the key if not a string
  return typeof value === 'string' ? value : key;
}

/**
 * Process theme articles into editorial, main, and regular categories
 * @param {Array} themeArticles - Array of theme articles
 * @returns {Object} Object with editorial, main, and regular articles
 */
export function processThemeArticles(themeArticles) {
  if (!Array.isArray(themeArticles)) {
    return { editorial: null, main: null, regular: [] };
  }

  let editorialArticle = null;
  let mainArticle = null;
  const regularArticles = [];

  themeArticles.forEach(article => {
    if (article.data?.editorial) {
      editorialArticle = article;
    } else if (article.data?.mainArticle) {
      mainArticle = article;
    } else {
      regularArticles.push(article);
    }
  });

  return {
    editorial: editorialArticle,
    main: mainArticle,
    regular: regularArticles
  };
}
