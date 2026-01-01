/**
 * Collection-related filters for categories, authors, themes, and tags
 */

import { slugify } from '../helpers/index.js';
import { CONSTANTS } from '../helpers/index.js';

/**
 * Generic helper to get item by slug from array
 * @param {Array} array - Array to search
 * @param {string} slug - Slug to find
 * @returns {Object|null} Found item or null
 */
function getBySlug(array, slug) {
  if (!array || !slug) return null;
  return array.find(item => item.slug === slug);
}

// Category filters
export function getCategoryBySlug(categoriesArray, slug) {
  return getBySlug(categoriesArray, slug);
}

export function getArticlesByCategory(articlesByCategory, categorySlug) {
  if (!articlesByCategory || !categorySlug) return [];
  return articlesByCategory[categorySlug] || [];
}

// Author filters
export function getAuthorBySlug(authorsArray, slug) {
  return getBySlug(authorsArray, slug);
}

// Theme filters
export function getThemeBySlug(themesArray, slug) {
  return getBySlug(themesArray, slug);
}

export function getArticlesByTheme(articlesByTheme, themeSlug) {
  if (!articlesByTheme || !themeSlug) return [];
  return articlesByTheme[themeSlug] || [];
}

export function getCurrentTheme(themesArray) {
  if (!themesArray) return null;
  return themesArray.find(theme => theme.current === true);
}

export function getPastThemes(themesArray) {
  if (!themesArray) return [];
  return themesArray
    .filter(theme => theme.current !== true)
    .sort((a, b) => b.number - a.number);
}

export function sortThemesByNumber(themesArray) {
  if (!themesArray) return [];
  return [...themesArray].sort((a, b) => a.number - b.number);
}

// Tag filters
export function getTagBySlug(tagsArray, slug) {
  return getBySlug(tagsArray, slug);
}

export function getArticlesByTag(articlesByTag, tagSlug) {
  if (!articlesByTag || !tagSlug) return [];
  return articlesByTag[tagSlug] || [];
}

export function getAllTags(articles) {
  if (!articles) return [];
  const tagCounts = {};

  articles.forEach(article => {
    const tags = article.data.tags || [];
    tags.forEach(tag => {
      // Skip non-string tags
      if (typeof tag !== 'string') return;

      const tagSlug = slugify(tag);
      // Skip empty slugs
      if (!tagSlug) return;

      if (!tagCounts[tagSlug]) {
        tagCounts[tagSlug] = {
          name: tag,
          slug: tagSlug,
          count: 0
        };
      }
      tagCounts[tagSlug].count++;
    });
  });

  return Object.values(tagCounts)
    .filter(tag => tag.slug && tag.slug.length > 0)
    .sort((a, b) => b.count - a.count);
}

// Related articles filter
export function getRelatedArticles(article, allArticles, limit = CONSTANTS.DEFAULT_RELATED_ARTICLES_LIMIT) {
  if (!article || !allArticles) return [];

  const related = [];
  const currentUrl = article.url;
  const articleData = article.data || article;
  const manualRelated = articleData.relatedArticles || [];

  // 1. If manual related articles are specified, use them first
  if (manualRelated.length > 0) {
    manualRelated.forEach(slug => {
      const foundArticle = allArticles.find(a => {
        const articleSlug = a.url.split('/').filter(Boolean).pop();
        return articleSlug === slug && a.url !== currentUrl;
      });
      if (foundArticle && related.length < limit) {
        related.push(foundArticle);
      }
    });
  }

  // If we have enough, return
  if (related.length >= limit) {
    return related.slice(0, limit);
  }

  // 2. Auto-fill with articles from same theme (highest priority)
  if (articleData.theme) {
    const sameTheme = allArticles.filter(a =>
      a.data.theme === articleData.theme &&
      a.url !== currentUrl &&
      !related.includes(a)
    );
    related.push(...sameTheme.slice(0, limit - related.length));
  }

  if (related.length >= limit) {
    return related.slice(0, limit);
  }

  // 3. Articles from same category
  if (articleData.category) {
    const sameCategory = allArticles.filter(a =>
      a.data.category === articleData.category &&
      a.url !== currentUrl &&
      !related.includes(a)
    );
    related.push(...sameCategory.slice(0, limit - related.length));
  }

  if (related.length >= limit) {
    return related.slice(0, limit);
  }

  // 4. Articles with shared tags
  if (articleData.tags && articleData.tags.length > 0) {
    const withSharedTags = allArticles
      .filter(a => {
        if (a.url === currentUrl || related.includes(a)) return false;
        if (!a.data.tags || a.data.tags.length === 0) return false;

        // Check if there are common tags
        const commonTags = a.data.tags.filter(tag =>
          articleData.tags.includes(tag)
        );
        return commonTags.length > 0;
      })
      .sort((a, b) => {
        // Sort by number of shared tags
        const aCommon = a.data.tags.filter(tag => articleData.tags.includes(tag)).length;
        const bCommon = b.data.tags.filter(tag => articleData.tags.includes(tag)).length;
        return bCommon - aCommon;
      });

    related.push(...withSharedTags.slice(0, limit - related.length));
  }

  if (related.length >= limit) {
    return related.slice(0, limit);
  }

  // 5. Same author (last resort)
  if (articleData.author) {
    const sameAuthor = allArticles.filter(a =>
      a.data.author === articleData.author &&
      a.url !== currentUrl &&
      !related.includes(a)
    );
    related.push(...sameAuthor.slice(0, limit - related.length));
  }

  return related.slice(0, limit);
}
