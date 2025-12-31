/**
 * Pagination collections - arrays for paginated pages
 */

import { slugify, groupArticlesByAuthor } from '../helpers/index.js';
import { getArticles } from './article-collections.js';

/**
 * Authors as array for pagination
 */
export function authorsArrayCollection(collectionApi) {
  const byAuthor = groupArticlesByAuthor(getArticles(collectionApi));
  // Convert to array of [slug, authorData] pairs for pagination
  return Object.entries(byAuthor);
}

/**
 * Tags as array for pagination
 */
export function tagsArrayCollection(collectionApi) {
  const articles = getArticles(collectionApi);
  const byTag = {};

  articles.forEach(article => {
    const tags = article.data.tags || [];
    tags.forEach(tag => {
      const tagSlug = slugify(tag);
      // Skip empty slugs
      if (!tagSlug) return;

      if (!byTag[tagSlug]) {
        byTag[tagSlug] = {
          name: tag,
          slug: tagSlug,
          articles: []
        };
      }
      byTag[tagSlug].articles.push(article);
    });
  });

  // Sort articles within each tag by date
  Object.values(byTag).forEach(tag => {
    tag.articles.sort((a, b) => b.date - a.date);
  });

  // Convert to array of [slug, tagData] pairs for pagination
  // Sort by article count (most popular first)
  // Filter out any entries with empty slugs
  return Object.entries(byTag)
    .filter(([slug]) => slug && slug.length > 0)
    .sort((a, b) => b[1].articles.length - a[1].articles.length);
}
