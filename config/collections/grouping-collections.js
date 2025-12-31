/**
 * Grouping collections - articles grouped by theme, category, tag, author
 */

import { slugify, groupArticlesByAuthor } from '../helpers/index.js';
import { getArticles } from './article-collections.js';

/**
 * Articles grouped by theme
 */
export function articlesByThemeCollection(collectionApi) {
  const articles = getArticles(collectionApi);
  const byTheme = {};

  articles.forEach(article => {
    const theme = article.data.theme;
    if (theme) {
      if (!byTheme[theme]) {
        byTheme[theme] = [];
      }
      byTheme[theme].push(article);
    }
  });

  return byTheme;
}

/**
 * Articles grouped by category
 */
export function articlesByCategoryCollection(collectionApi) {
  const articles = getArticles(collectionApi);
  const byCategory = {};

  articles.forEach(article => {
    const category = article.data.category;
    if (category) {
      if (!byCategory[category]) {
        byCategory[category] = [];
      }
      byCategory[category].push(article);
    }
  });

  return byCategory;
}

/**
 * Articles grouped by author (as object)
 */
export function articlesByAuthorCollection(collectionApi) {
  return groupArticlesByAuthor(getArticles(collectionApi));
}

/**
 * Articles grouped by tag
 */
export function articlesByTagCollection(collectionApi) {
  const articles = getArticles(collectionApi);
  const byTag = {};

  articles.forEach(article => {
    const tags = article.data.tags || [];
    tags.forEach(tag => {
      // Skip non-string tags
      if (typeof tag !== 'string') return;

      const tagSlug = slugify(tag);
      // Skip empty slugs
      if (!tagSlug) return;

      if (!byTag[tagSlug]) {
        byTag[tagSlug] = [];
      }
      byTag[tagSlug].push(article);
    });
  });

  // Sort articles within each tag by date (newest first)
  Object.values(byTag).forEach(articles => {
    articles.sort((a, b) => b.date - a.date);
  });

  return byTag;
}
