/**
 * Article collections - basic filtered and sorted article collections
 */

import { CONSTANTS } from '../helpers/index.js';

// Cache articles to avoid multiple glob fetches
let articlesCache = null;

/**
 * Get all articles with caching
 * @param {Object} collectionApi - Eleventy collection API
 * @returns {Array} All articles
 */
export function getArticles(collectionApi) {
  if (!articlesCache) {
    articlesCache = collectionApi.getFilteredByGlob(CONSTANTS.ARTICLES_GLOB);
  }
  return articlesCache;
}

/**
 * All articles sorted by date (newest first)
 */
export function articlesCollection(collectionApi) {
  return getArticles(collectionApi)
    .slice()
    .sort((a, b) => b.date - a.date);
}

/**
 * Featured articles only
 */
export function featuredArticlesCollection(collectionApi) {
  return getArticles(collectionApi)
    .filter(article => article.data.featured === true)
    .sort((a, b) => b.date - a.date);
}

/**
 * Articles without a theme
 */
export function unthemedArticlesCollection(collectionApi) {
  return getArticles(collectionApi)
    .filter(article => !article.data.theme)
    .sort((a, b) => b.date - a.date);
}
