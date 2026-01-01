/**
 * Global computed data
 * These properties are computed for every page
 */

import ui from './ui.js';

export default {
  /**
   * Compute the social sharing image for OG tags
   * Priority order:
   * 1. Explicit ogImage in frontmatter
   * 2. Article image (converted to web path)
   * 3. Default OG image from site config
   */
  socialImage: (data) => {
    // Priority 1: Explicit ogImage in frontmatter
    if (data.ogImage) {
      return data.ogImage;
    }

    // Priority 2: Article image (convert src/ path to web path)
    if (data.image) {
      return data.image.replace('src/', '/');
    }

    // Priority 3: Default OG image
    return data.site.og.image;
  },

  /**
   * Generate breadcrumbs array based on page type and data
   * Moves complex conditional logic out of template into testable JavaScript
   *
   * @param {Object} data - All page data
   * @returns {Array} Array of breadcrumb objects with label, url, and current flag
   */
  breadcrumbs: (data) => {
    const { page, theme, category, title, themeSlug, categorySlug, authorSlug, layout, themes, categories } = data;

    // Start with home breadcrumb
    const crumbs = [
      { label: ui.nav.home, url: '/', current: false }
    ];

    // If custom breadcrumbs provided in frontmatter, use those
    if (data.breadcrumbs && Array.isArray(data.breadcrumbs)) {
      return [crumbs[0], ...data.breadcrumbs];
    }

    // Article with theme
    if (theme && layout === 'layouts/article.njk') {
      const themeData = themes?.find(t => t.slug === theme);

      crumbs.push({ label: ui.nav.themes, url: '/themes/', current: false });

      if (themeData) {
        crumbs.push({ label: themeData.name, url: `/themes/${theme}/`, current: false });
      }

      crumbs.push({ label: title, url: page.url, current: true });
      return crumbs;
    }

    // Article with category (no theme)
    if (category && layout === 'layouts/article.njk') {
      const categoryData = categories?.find(c => c.slug === category);

      if (categoryData) {
        crumbs.push({ label: categoryData.name, url: `/${category}/`, current: false });
      }

      crumbs.push({ label: title, url: page.url, current: true });
      return crumbs;
    }

    // Theme page
    if (themeSlug) {
      crumbs.push({ label: ui.nav.themes, url: '/themes/', current: false });
      crumbs.push({ label: title, url: page.url, current: true });
      return crumbs;
    }

    // Category page
    if (categorySlug) {
      crumbs.push({ label: title, url: page.url, current: true });
      return crumbs;
    }

    // Author page
    if (authorSlug) {
      crumbs.push({ label: ui.nav.authors, url: '/authors/', current: false });
      crumbs.push({ label: title, url: page.url, current: true });
      return crumbs;
    }

    // General page with title (but not "Bienvenue" or welcome message)
    if (title && title !== 'Bienvenue' && title !== ui.common.welcome) {
      crumbs.push({ label: title, url: page.url, current: true });
      return crumbs;
    }

    // Homepage or pages without specific breadcrumbs - return only home (should not be hidden by template)
    crumbs[0] = { label: ui.nav.home, url: '/', current: true }
    return crumbs;
  }
};
