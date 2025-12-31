/**
 * Article Card shortcode for reusable article cards with optimized images
 */

import { slugify } from '../helpers/index.js';
import { imageShortcode } from './image.js';

/**
 * Helper to escape HTML
 */
function escapeHtml(text) {
  return text?.toString()
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;') || '';
}

/**
 * Helper to find the correct theme name
 * 
 * */
function findTheme(themeSlug, themes) {
  if (!themeSlug || !Array.isArray(themes)) return null;

  const raw = themeSlug.toString().trim();
  if (!raw) return null;

  // Prefer matching by slug
  let theme = themes.find(t => t?.slug === raw);

  // Fallback: match by name (case-insensitive)
  if (!theme) {
    const needle = raw.toLowerCase();
    theme = themes.find(t => (t?.name || "").toLowerCase() === needle);
  }

  return theme || null;
}

/**
 * Article Card shortcode for reusable article cards with optimized images
 * @param {Object} article - Article object with data and url
 * @param {Object} options - Optional configuration
 * @param {boolean} options.showThemeBadge - Show theme badge (default: false)
 * @param {boolean} options.showCategoryBadge - Show category badge (default: false)
 * @param {boolean} options.showReadingTime - Show reading time (default: false)
 * @param {string} options.imageSizes - Responsive image sizes (default: "(min-width: 768px) 25vw, 100vw")
 * @returns {Promise<string>} HTML string for article card
 */
export async function articleCardShortcode(article, options = {}) {
  const {
    showThemeBadge = false,
    showCategoryBadge = false,
    showReadingTime = false,
    imageSizes = "(min-width: 768px) 25vw, 100vw"
  } = options;

  // Generate optimized image HTML if image exists
  let imageHtml = '';
  if (article.data.image) {
    try {
      imageHtml = await imageShortcode(article.data.image, article.data.imageAlt || article.data.title, imageSizes);
      imageHtml = `
    <div class="article-card__image">
        <a href="${article.url}">
            ${imageHtml}
        </a>
    </div>`;
    } catch (error) {
      // Image failed, skip it
    }
  }

  // Editorial badge
  const editorialBadge = article.data.editorial
    ? '<div class="badge badge--sm badge--primary badge--absolute--left">Éditorial</div>'
    : '';

  // Theme badge
  const theme = findTheme(article.data.theme, options.themes);

  const themeBadge =
     theme
      ? `<a class="badge badge--sm badge--primary badge--absolute" href="/themes/${escapeHtml(theme.slug)}/" aria-label="Thème ${escapeHtml(theme.name)}">
            <span>Thème ${escapeHtml(theme.number)}</span>
            <span aria-hidden="true">·</span>
            <span>${escapeHtml(theme.name)}</span>
        </a>`
      : '';

  // Category badge (requires access to categories data - will be empty for now)
  const categoryBadge = ''; // TODO: Implement if needed

  // Chapeau
  const chapeauHtml = article.data.chapeau
    ? `<p class="article-card__chapeau">${escapeHtml(article.data.chapeau)}</p>`
    : '';

  // Description
  const descriptionHtml = article.data.description
    ? `<p class="article-card__description">${escapeHtml(article.data.description)}</p>`
    : '';

  // Meta
  const authorHtml = article.data.author
    ? `<span class="meta-author"><a href="/authors/${slugify(article.data.author)}/" class="author-link">${escapeHtml(article.data.author)}</a></span>`
    : '';

  const dateHtml = article.data.date
    ? `<time datetime="${article.data.date.toISOString().split('T')[0]}" class="meta-date">${article.data.date.toLocaleDateString('fr-FR', {year: 'numeric', month: 'long', day: 'numeric'})}</time>`
    : '';

  const separator = (authorHtml && dateHtml)
    ? '<span class="meta-separator" aria-hidden="true">·</span>'
    : '';

  // Tags
  let tagsHtml = '';
  if (article.data.tags && Array.isArray(article.data.tags)) {
    const tagLinks = article.data.tags
      .map(tag => {
        const tagSlug = slugify(tag);
        return tagSlug ? `<a href="/tags/${tagSlug}/" class="tag tag--sm">
                <svg aria-hidden="true" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                    <line x1="7" y1="7" x2="7.01" y2="7"></line>
                </svg>
                <span>${escapeHtml(tag)}</span>
            </a>` : '';
      })
      .filter(Boolean)
      .join('\n                ');

    if (tagLinks) {
      tagsHtml = `
    <div class="article-card__tags">
        ${tagLinks}
    </div>`;
    }
  }

  return `<article class="article-card">
    ${editorialBadge}
    ${themeBadge}
    ${categoryBadge}
    ${imageHtml}
    <h3 class="article-card__title">
        <a href="${article.url}">${escapeHtml(article.data.title)}</a>
    </h3>
    ${chapeauHtml}
    ${descriptionHtml}
    <div class="article-card__meta">
        ${authorHtml}
        ${separator}
        ${dateHtml}
    </div>${tagsHtml}
</article>`;
}
