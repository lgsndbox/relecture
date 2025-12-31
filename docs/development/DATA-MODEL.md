# Data Model & Access Patterns

**Date:** 2025-12-30
**Purpose:** Document data structures and consistent access patterns

## Overview

This document explains how to correctly access data in templates to avoid confusion and maintain consistency.

---

## Collection Items

Articles and other content from Eleventy collections have this structure:

```javascript
{
  url: "/category/article-slug/",      // Generated URL
  inputPath: "src/articles/file.md",   // Source file path
  outputPath: "_site/category/article-slug/index.html",

  data: {
    // All frontmatter fields
    title: "Article Title",
    author: "Author Name",
    category: "category-slug",         // Slug (string)
    theme: "theme-slug",               // Slug (string)
    date: Date,
    tags: ["tag1", "tag2"],
    image: "/images/article.jpg",
    // ... other frontmatter
  },

  content: "<p>Rendered HTML content...</p>",  // Processed markdown
  templateContent: "<p>...</p>"                // Final rendered content
}
```

### ✅ Correct Access Pattern

```njk
{# When iterating over collection items #}
{% for article in collections.articles %}
  <h2>{{ article.data.title }}</h2>
  <p>By {{ article.data.author }}</p>
  <a href="{{ article.url }}">Read more</a>

  {# Get full theme object from slug #}
  {% set themeData = themes | getThemeBySlug(article.data.theme) %}
  {% if themeData %}
    <span>Theme: {{ themeData.name }}</span>
  {% endif %}
{% endfor %}
```

### ❌ Common Mistakes

```njk
{# WRONG: Missing .data #}
{{ article.title }}        <!-- Undefined! -->
{{ article.author }}       <!-- Undefined! -->

{# WRONG: Treating slug as object #}
{{ article.data.theme.name }}  <!-- Error! theme is just a string slug -->
```

---

## Page Context Data

In the current page's template, frontmatter fields are available directly:

```javascript
{
  // Direct access to frontmatter
  title: "Page Title",
  author: "Author Name",
  category: "category-slug",      // Slug only (string)
  theme: "theme-slug",            // Slug only (string)
  date: Date,

  // Page metadata
  page: {
    url: "/current/page/url/",
    inputPath: "src/path.md",
    outputPath: "_site/path/index.html",
    date: Date,
    fileSlug: "page-slug"
  },

  // Site-wide data
  site: { /* from src/_data/site.js */ },
  categories: [ /* from src/_data/categories.json */ ],
  themes: [ /* from src/_data/themes.json */ ],

  // Collections
  collections: {
    all: [...],
    articles: [...],
    articlesByTheme: {...},
    // ... etc
  }
}
```

### ✅ Correct Access Pattern

```njk
{# In the current page template (e.g., article.njk) #}
<h1>{{ title }}</h1>                    <!-- Direct access -->
<p>By {{ author }}</p>                  <!-- Direct access -->
<time>{{ date | formatDate }}</time>   <!-- Direct access -->

{# Get full objects from slugs #}
{% set themeData = themes | getThemeBySlug(theme) %}
{% set categoryData = categories | getCategoryBySlug(category) %}

{% if themeData %}
  <span>Theme: {{ themeData.name }}</span>
{% endif %}
```

### ❌ Common Mistakes

```njk
{# WRONG: Using .data in page context #}
{{ data.title }}      <!-- Undefined! -->
{{ page.title }}      <!-- Undefined! -->

{# WRONG: Expecting objects when you have slugs #}
{{ theme.name }}      <!-- Error! theme is a string slug, not an object -->
{{ category.name }}   <!-- Error! category is a string slug, not an object -->
```

---

## Getting Full Objects from Slugs

Use filters to convert slugs to full data objects:

### Themes

```njk
{# Input: theme slug (string) #}
{% set theme = "les-mots" %}

{# Output: full theme object #}
{% set themeData = themes | getThemeBySlug(theme) %}

{# Now you can access theme properties #}
{{ themeData.name }}          → "Les Mots"
{{ themeData.number }}        → 1
{{ themeData.description }}   → "Theme description"
{{ themeData.current }}       → true/false
```

### Categories

```njk
{# Input: category slug (string) #}
{% set category = "philosophie" %}

{# Output: full category object #}
{% set categoryData = categories | getCategoryBySlug(category) %}

{# Now you can access category properties #}
{{ categoryData.name }}         → "Philosophie"
{{ categoryData.description }}  → "Category description"
```

### Authors

```njk
{# Input: author slug (string) #}
{% set authorSlug = "emilie-gabiot" %}

{# Output: full author object #}
{% set authorData = authors | getAuthorBySlug(authorSlug) %}

{# Now you can access author properties #}
{{ authorData.name }}  → "Émilie Gabiot"
{{ authorData.bio }}   → "Author bio"
```

---

## Naming Conventions

Follow these conventions for consistent, readable code:

### Variable Names

| Type | Convention | Example | Usage |
|------|------------|---------|-------|
| **Slugs** | `{type}Slug` or `{type}` | `themeSlug`, `categorySlug`, `theme`, `category` | String identifiers |
| **Full Objects** | `{type}Data` | `themeData`, `categoryData`, `authorData` | After using filters |
| **Current Page Context** | `current{Type}` | `currentTheme`, `currentCategory` | In pagination templates |
| **Collection Items** | Singular noun | `article`, `tag`, `author` | When iterating |

### ✅ Good Examples

```njk
{# Clear and consistent #}
{% set themeSlug = article.data.theme %}
{% set themeData = themes | getThemeBySlug(themeSlug) %}

{# Or more concise #}
{% set themeData = themes | getThemeBySlug(article.data.theme) %}

{# Iteration #}
{% for article in collections.articles %}
  {% set categoryData = categories | getCategoryBySlug(article.data.category) %}
{% endfor %}
```

### ❌ Bad Examples

```njk
{# Inconsistent and confusing #}
{% set t = themes | getThemeBySlug(article.data.theme) %}  <!-- Too short -->
{% set the_theme = themes | getThemeBySlug(theme) %}       <!-- Wrong style -->
{% set Theme = themes | getThemeBySlug(theme) %}           <!-- Wrong case -->
```

---

## Common Patterns

### Pattern 1: Display Article with Theme

```njk
{# In a list of articles #}
{% for article in collections.articles %}
  <article>
    <h2>{{ article.data.title }}</h2>
    <p>{{ article.data.author }}</p>

    {# Get theme if article has one #}
    {% if article.data.theme %}
      {% set themeData = themes | getThemeBySlug(article.data.theme) %}
      {% if themeData %}
        <span class="theme-badge">{{ themeData.name }}</span>
      {% endif %}
    {% endif %}
  </article>
{% endfor %}
```

### Pattern 2: Display Current Page with Category

```njk
{# In article.njk template #}
<article>
  <h1>{{ title }}</h1>

  {# Get category data from slug #}
  {% if category %}
    {% set categoryData = categories | getCategoryBySlug(category) %}
    {% if categoryData %}
      <a href="/{{ category }}/">{{ categoryData.name }}</a>
    {% endif %}
  {% endif %}

  {{ content | safe }}
</article>
```

### Pattern 3: Theme Page with Articles

```njk
{# In item-theme.njk pagination template #}
{% set currentTheme = theme %}  {# From pagination context #}
{% set themeArticles = collections.articlesByTheme | getArticlesByTheme(currentTheme.slug) %}

<h1>{{ currentTheme.name }}</h1>

{% for article in themeArticles %}
  <article>
    <h2>{{ article.data.title }}</h2>
    <p>{{ article.data.chapeau }}</p>
  </article>
{% endfor %}
```

---

## Data Sources

### Global Data Files

Located in `src/_data/`:

- `site.js` - Site-wide configuration
- `categories.json` - Array of category objects
- `themes.json` - Array of theme objects
- `authors.json` - Object of author data by slug
- `ui.js` - Internationalization strings

### Computed Data

Located in `src/_data/eleventyComputed.js`:

- `socialImage` - Computes OG image for each page
- `breadcrumbs` - Generates breadcrumb trail

### Collections

Created in `eleventy.config.js`:

- `collections.all` - All content
- `collections.articles` - All articles
- `collections.featuredArticles` - Articles with `featured: true`
- `collections.articlesByTheme` - Articles grouped by theme
- `collections.articlesByAuthor` - Articles grouped by author
- `collections.unthemedArticles` - Articles without theme
- `collections.authorsArray` - Array of [slug, authorData] pairs

---

## Helper Filters

### Theme Filters

```njk
{{ themes | getCurrentTheme }}                    {# Get current theme #}
{{ themes | getPastThemes }}                      {# Get all past themes #}
{{ themes | sortThemesByNumber }}                 {# Sort by number #}
{{ themes | getThemeBySlug(slug) }}               {# Get specific theme #}
```

### Category Filters

```njk
{{ categories | getCategoryBySlug(slug) }}        {# Get specific category #}
{{ collections.articlesByCategory | getArticlesByCategory(slug) }}
```

### Author Filters

```njk
{{ authors | getAuthorBySlug(slug) }}             {# Get specific author #}
```

### Article Filters

```njk
{{ collections.articlesByTheme | getArticlesByTheme(slug) }}
{{ themeArticles | processThemeArticles }}        {# Separate editorial/main/regular #}
```

---

## Quick Reference

### When to use `.data`

```njk
✅ YES: When accessing collection item properties
{% for article in collections.articles %}
  {{ article.data.title }}
  {{ article.data.author }}
{% endfor %}

❌ NO: When in the page's own template
{# In article.njk #}
{{ title }}        <!-- NOT {{ data.title }} -->
{{ author }}       <!-- NOT {{ data.author }} -->
```

### When to use filters

```njk
✅ YES: When you have a slug and need the full object
{% set themeData = themes | getThemeBySlug(article.data.theme) %}
{{ themeData.name }}

❌ NO: When you already have the full object
{# currentTheme is already the full object in pagination #}
{{ currentTheme.name }}        <!-- NOT themes | getThemeBySlug(...) -->
```

### When to use direct access

```njk
✅ YES: In the current page template for frontmatter fields
{{ title }}
{{ category }}
{{ theme }}

❌ NO: When iterating over collections
{{ article.title }}        <!-- WRONG! Use article.data.title -->
```

---

## Troubleshooting

### Problem: "Cannot read property 'name' of undefined"

**Likely cause:** Trying to access a property on a slug string

```njk
❌ WRONG:
{{ theme.name }}           <!-- theme is a string, not an object! -->

✅ CORRECT:
{% set themeData = themes | getThemeBySlug(theme) %}
{{ themeData.name }}
```

### Problem: "title is undefined"

**Likely cause:** Using wrong access pattern for collection items

```njk
❌ WRONG:
{% for article in collections.articles %}
  {{ article.title }}      <!-- Missing .data! -->
{% endfor %}

✅ CORRECT:
{% for article in collections.articles %}
  {{ article.data.title }}
{% endfor %}
```

### Problem: Getting null from filter

**Likely cause:** Slug doesn't exist in data

```njk
{# Check if data exists before using #}
{% set themeData = themes | getThemeBySlug(theme) %}
{% if themeData %}
  {{ themeData.name }}
{% else %}
  <!-- Handle missing data gracefully -->
  <span>Theme not found</span>
{% endif %}
```

---

## Best Practices

1. **Be Consistent:** Always use the same naming conventions
2. **Check for null:** Use `if` checks when data might be missing
3. **Use meaningful names:** `themeData` is better than `t` or `theme1`
4. **Comment complex logic:** Help future developers understand
5. **Follow patterns:** Look at existing templates for examples

---

## Related Documentation

- **Main Guide:** `CLAUDE.md` - Complete project documentation
- **i18n:** `I18N-SETUP.md` - Internationalization system
- **BEM Migration:** `PHASE*-COMPLETE.md` - CSS refactoring docs

---

**Last Updated:** 2025-12-30
**Maintainer:** Development Team
