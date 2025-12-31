# Eleventy Site Architecture Guide

> A comprehensive guide for developers familiar with HTML/CSS/JavaScript who want to understand how this Eleventy site works.

## Table of Contents

1. [What is Eleventy?](#what-is-eleventy)
2. [How Static Site Generators Work](#how-static-site-generators-work)
3. [Project Structure](#project-structure)
4. [The Build Process](#the-build-process)
5. [Configuration System](#configuration-system)
6. [Data Flow](#data-flow)
7. [Templates & Layouts](#templates--layouts)
8. [Collections](#collections)
9. [Filters](#filters)
10. [Shortcodes](#shortcodes)
11. [Common Tasks](#common-tasks)

---

## What is Eleventy?

**Eleventy (11ty)** is a **static site generator** (SSG) written in JavaScript/Node.js.

### Static Site Generator vs Traditional Web Development

**Traditional dynamic site (e.g., WordPress):**
```
User visits page → Server runs PHP → Database query → HTML generated → Sent to browser
```
*Happens on EVERY page view*

**Static site generator (Eleventy):**
```
Build time: Markdown + Data + Templates → HTML files generated once
Runtime: User visits page → Pre-built HTML sent instantly
```
*HTML is pre-generated, served as static files*

### Why Use Eleventy?

- ✅ **Fast**: No server processing, just static HTML
- ✅ **Secure**: No database, no server-side code to hack
- ✅ **Simple hosting**: Any web server (GitHub Pages, Netlify, etc.)
- ✅ **Developer-friendly**: Write content in Markdown, templates in HTML/Nunjucks
- ✅ **Flexible**: Use data from JSON, APIs, frontmatter

---

## How Static Site Generators Work

Think of Eleventy as a **factory assembly line**:

```
INPUT                    ELEVENTY PROCESSING              OUTPUT
┌─────────────┐         ┌──────────────────┐         ┌──────────────┐
│             │         │                  │         │              │
│ Markdown    │────────▶│  1. Read files   │         │              │
│ Templates   │         │  2. Process data │────────▶│  Static HTML │
│ Data files  │         │  3. Apply layouts│         │  CSS/JS      │
│ Images      │         │  4. Generate HTML│         │  Images      │
│             │         │                  │         │              │
└─────────────┘         └──────────────────┘         └──────────────┘
   (Source)              (Build process)              (_site folder)
```

### The Build Process

1. **Read source files** from `src/`
2. **Process Markdown** → Convert to HTML
3. **Inject data** from frontmatter, JSON files, collections
4. **Apply templates** (Nunjucks layouts)
5. **Run filters & shortcodes** (custom functions)
6. **Write output** to `_site/` folder

---

## Project Structure

```
eleventytest/
│
├── src/                          # SOURCE FILES (what you edit)
│   ├── _data/                    # Global data available to all templates
│   │   ├── site.js               # Site metadata (title, URL, description)
│   │   ├── ui.js                 # UI strings for i18n
│   │   ├── authors.json          # Author information
│   │   ├── categories.json       # Category definitions
│   │   └── themes.json           # Theme definitions
│   │
│   ├── _includes/                # Reusable template parts
│   │   ├── layouts/              # Page layouts (base structure)
│   │   │   ├── base.njk          # Master layout (all pages use this)
│   │   │   ├── article.njk       # Layout for articles
│   │   │   └── homepage.njk      # Layout for homepage
│   │   └── partials/             # Smaller reusable components
│   │       ├── header.njk        # Site header
│   │       ├── footer.njk        # Site footer
│   │       └── nav.njk           # Navigation menu
│   │
│   ├── articles/                 # Article content (Markdown files)
│   │   ├── bienvenue.md
│   │   ├── le-pouvoir-des-mots.md
│   │   └── ...
│   │
│   ├── pages/                    # Static pages
│   │   ├── contact.md
│   │   ├── tags.njk
│   │   └── recherche.njk
│   │
│   ├── templates/                # Dynamic page templates
│   │   ├── item-category.njk     # Template for category pages
│   │   ├── item-theme.njk        # Template for theme pages
│   │   ├── item-author.njk       # Template for author pages
│   │   └── item-tag.njk          # Template for tag pages
│   │
│   ├── css/                      # Stylesheets
│   │   ├── reset.css
│   │   ├── tokens.css            # CSS variables (colors, spacing)
│   │   ├── base.css              # Base styles
│   │   ├── layout.css            # Layout styles
│   │   ├── components/           # Component styles
│   │   │   ├── badge.css
│   │   │   ├── button.css
│   │   │   └── ...
│   │   └── main.css              # Generated bundle (don't edit)
│   │
│   ├── js/                       # JavaScript files
│   │   └── search.js
│   │
│   ├── images/                   # Images
│   └── index.md                  # Homepage content
│
├── config/                       # ELEVENTY CONFIGURATION (modular)
│   ├── helpers/                  # Shared utility functions
│   │   └── index.js              # slugify, groupArticlesByAuthor, CONSTANTS
│   │
│   ├── filters/                  # Template filters (modify data in templates)
│   │   ├── date-filters.js       # Format dates
│   │   ├── utility-filters.js    # General utilities
│   │   ├── collection-filters.js # Work with collections
│   │   └── index.js              # Export all filters
│   │
│   ├── shortcodes/               # Template shortcodes (reusable components)
│   │   ├── image.js              # Responsive images
│   │   ├── article-card.js       # Article cards
│   │   └── index.js              # Export all shortcodes
│   │
│   └── collections/              # Data collections (grouped content)
│       ├── article-collections.js    # Article collections
│       ├── grouping-collections.js   # Group by theme/category/etc.
│       ├── pagination-collections.js # Arrays for pagination
│       └── index.js                  # Export all collections
│
├── scripts/                      # Build scripts
│   ├── bundle-css.js             # Concatenate & minify CSS
│   ├── validate-references.js    # Check category/theme references
│   └── check-duplicates.js       # Check for duplicate slugs
│
├── _site/                        # OUTPUT (generated, don't edit)
│   └── [All your HTML files]
│
├── eleventy.config.js            # MAIN CONFIGURATION FILE
├── package.json                  # Node.js dependencies & scripts
└── .eleventy.js                  # (optional, points to config)
```

---

## The Build Process

### Step 1: Running the Build

```bash
npm run build
```

This runs the command in `package.json`:
```json
{
  "scripts": {
    "build": "npm run build:prod"
  }
}
```

### Step 2: What Happens During Build

```
┌─────────────────────────────────────────────────────────────┐
│ 1. ELEVENTY.BEFORE EVENT                                    │
│    → Run scripts/bundle-css.js (combine all CSS)            │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│ 2. READ DATA FILES                                          │
│    → Load src/_data/*.json (site, authors, categories)      │
│    → Available globally as {{ site }}, {{ authors }}, etc.  │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│ 3. CREATE COLLECTIONS                                       │
│    → Find all articles (src/articles/**/*.md)               │
│    → Group by theme, category, author, tag                  │
│    → Sort by date, count, etc.                              │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│ 4. PROCESS EACH FILE                                        │
│    For each Markdown/Nunjucks file:                         │
│    a) Read frontmatter (YAML at top)                        │
│    b) Convert Markdown → HTML                               │
│    c) Apply layout template                                 │
│    d) Process filters & shortcodes                          │
│    e) Write to _site/ folder                                │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│ 5. COPY STATIC FILES                                        │
│    → Copy CSS, JS, images to _site/                         │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│ 6. POST-BUILD                                               │
│    → Generate search index (Pagefind)                       │
│    → Validate references                                    │
└─────────────────────────────────────────────────────────────┘
```

### Example: How an Article Becomes a Page

**Input:** `src/articles/bienvenue.md`

```markdown
---
title: "Bienvenue"
category: societe
date: 2024-01-15
layout: layouts/article.njk
---

# Bienvenue sur Pause

Contenu de l'article...
```

**Processing:**

1. **Read frontmatter**:
   - `title` = "Bienvenue"
   - `category` = "societe"
   - `date` = 2024-01-15
   - `layout` = "layouts/article.njk"

2. **Convert Markdown to HTML**:
   ```html
   <h1>Bienvenue sur Pause</h1>
   <p>Contenu de l'article...</p>
   ```

3. **Apply layout** (`layouts/article.njk`):
   - Wraps content in article layout
   - Article layout extends `layouts/base.njk`
   - Injects `{{ title }}`, `{{ content }}`, etc.

4. **Process filters**:
   - `{{ date | formatDate }}` → "15 janvier 2024"
   - `{{ content | readingTime }}` → "5 min"

5. **Generate URL**:
   - Based on category: `/societe/bienvenue/`

**Output:** `_site/societe/bienvenue/index.html`

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <title>Bienvenue - Pause</title>
  ...
</head>
<body>
  <article>
    <h1>Bienvenue sur Pause</h1>
    <p>Contenu de l'article...</p>
  </article>
</body>
</html>
```

---

## Configuration System

### Main Config: `eleventy.config.js`

This is the **control center** of your Eleventy site. It's a JavaScript file that exports a function:

```javascript
export default async function(eleventyConfig) {
  // Configuration goes here
}
```

### What the Config Does

```javascript
// 1. IMPORT MODULES
import * as filters from './config/filters/index.js';
import * as shortcodes from './config/shortcodes/index.js';
import * as collections from './config/collections/index.js';

export default async function(eleventyConfig) {

  // 2. REGISTER PLUGINS
  eleventyConfig.addPlugin(pluginRss);  // RSS feed generation

  // 3. REGISTER FILTERS (modify data in templates)
  Object.entries(filters).forEach(([name, filter]) => {
    eleventyConfig.addFilter(name, filter);
  });
  // Now you can use: {{ date | formatDate }}

  // 4. REGISTER SHORTCODES (reusable components)
  eleventyConfig.addAsyncShortcode("image", shortcodes.imageShortcode);
  // Now you can use: {% image "path.jpg", "Alt text" %}

  // 5. REGISTER COLLECTIONS (grouped data)
  eleventyConfig.addCollection("articles", collections.articlesCollection);
  // Now you can use: {% for article in collections.articles %}

  // 6. COPY STATIC FILES
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");

  // 7. SET WATCH TARGETS (auto-rebuild on change)
  eleventyConfig.addWatchTarget("src/css/**/*.css");

  // 8. CONFIGURE DIRECTORIES
  return {
    dir: {
      input: "src",      // Source files
      output: "_site"    // Generated files
    }
  };
}
```

---

## Data Flow

### Global Data (`src/_data/`)

Files in `_data/` are automatically available to ALL templates:

**`src/_data/site.js`:**
```javascript
export default {
  title: "Pause",
  url: "https://pause-magazine.com",
  description: "Magazine littéraire..."
};
```

**Usage in any template:**
```html
<title>{{ site.title }}</title>
<meta name="description" content="{{ site.description }}">
```

### Frontmatter Data

Data at the top of Markdown files (YAML format):

```markdown
---
title: "Mon Article"
category: culture
tags: [litterature, poesie]
date: 2024-01-15
---

Content here...
```

**Available in templates as:**
```html
{{ title }}           → "Mon Article"
{{ category }}        → "culture"
{{ tags[0] }}         → "litterature"
{{ date | formatDate }} → "15 janvier 2024"
```

### Collection Data

Generated by Eleventy based on your content:

```javascript
collections.articles  // All articles
collections.featuredArticles  // Only featured
collections.articlesByTheme["les-mots"]  // Articles in theme
```

### Data Cascade (Priority Order)

When the same variable is defined in multiple places:

```
1. Frontmatter (highest priority)
   ↓
2. Directory data files (like articles.json)
   ↓
3. Global data (_data/ files)
   ↓
4. Layout defaults (lowest priority)
```

Example:
```markdown
---
title: "My Article"  ← This wins
---
```
vs
```javascript
// _data/site.js
{ title: "Pause" }   ← This is overridden
```

---

## Templates & Layouts

### Template Languages

This site uses **Nunjucks** (`.njk`) - similar to Jinja2, Liquid, Twig.

### Basic Nunjucks Syntax

```njk
{# Comments (not in output) #}

{{ variable }}  {# Output variable #}

{% if condition %}  {# Control flow #}
  <p>True</p>
{% endif %}

{% for item in items %}  {# Loops #}
  <li>{{ item.title }}</li>
{% endfor %}

{{ text | uppercase }}  {# Filters #}

{% include "partials/header.njk" %}  {# Include partial #}
```

### Layout Inheritance

**Base layout** (`layouts/base.njk`):
```njk
<!DOCTYPE html>
<html>
<head>
  <title>{{ title }} - {{ site.title }}</title>
</head>
<body>
  {% include "partials/header.njk" %}

  <main>
    {{ content | safe }}  {# Child content goes here #}
  </main>

  {% include "partials/footer.njk" %}
</body>
</html>
```

**Article layout** (`layouts/article.njk`):
```njk
---
layout: layouts/base.njk  {# Extends base #}
---

<article class="article">
  <header>
    <h1>{{ title }}</h1>
    <time>{{ date | formatDate }}</time>
  </header>

  <div class="article-content">
    {{ content | safe }}
  </div>
</article>
```

**Article file** (`articles/my-article.md`):
```markdown
---
layout: layouts/article.njk  {# Uses article layout #}
title: "My Article"
date: 2024-01-15
---

Article content here...
```

**Result:** Base → Article layout → Content = Full HTML page

---

## Collections

### What are Collections?

Collections are **groups of related content** that Eleventy creates for you.

### How Collections are Created

**In `config/collections/article-collections.js`:**

```javascript
export function articlesCollection(collectionApi) {
  // Get all files matching the glob pattern
  const articles = collectionApi.getFilteredByGlob("src/articles/**/*.md");

  // Sort by date (newest first)
  return articles.sort((a, b) => b.date - a.date);
}
```

**Registered in `eleventy.config.js`:**
```javascript
eleventyConfig.addCollection("articles", collections.articlesCollection);
```

### Using Collections in Templates

```njk
{# Loop through all articles #}
{% for article in collections.articles %}
  <h2>{{ article.data.title }}</h2>
  <p>{{ article.data.description }}</p>
  <a href="{{ article.url }}">Read more</a>
{% endfor %}
```

### Collection Object Structure

Each item in a collection has:

```javascript
{
  url: "/societe/bienvenue/",     // Generated URL
  inputPath: "./src/articles/bienvenue.md",
  outputPath: "./_site/societe/bienvenue/index.html",
  data: {                          // Frontmatter + global data
    title: "Bienvenue",
    category: "societe",
    date: Date object,
    tags: ["presentation"],
    // ... all other frontmatter
  },
  content: "<p>HTML content...</p>",  // Rendered content
  date: Date object
}
```

### Common Collections in This Site

```javascript
collections.articles              // All articles, sorted by date
collections.featuredArticles      // Only featured articles
collections.unthemedArticles      // Articles without a theme

collections.articlesByTheme       // Object: { "les-mots": [...], "la-nature": [...] }
collections.articlesByCategory    // Object: { "culture": [...], "societe": [...] }
collections.articlesByTag         // Object: { "litterature": [...], "politique": [...] }

collections.authorsArray          // Array for author pagination
collections.tagsArray             // Array for tag pagination
```

### Advanced: How Grouping Works

**Grouping articles by category:**

```javascript
export function articlesByCategoryCollection(collectionApi) {
  const articles = getArticles(collectionApi);
  const byCategory = {};

  // Group articles
  articles.forEach(article => {
    const category = article.data.category;
    if (category) {
      if (!byCategory[category]) {
        byCategory[category] = [];  // Create array if doesn't exist
      }
      byCategory[category].push(article);  // Add to category
    }
  });

  return byCategory;
}
```

**Result:**
```javascript
{
  "culture": [article1, article2, article3],
  "societe": [article4, article5],
  "philosophie": [article6]
}
```

**Usage:**
```njk
{# Get articles from "culture" category #}
{% set cultureArticles = collections.articlesByCategory["culture"] %}

{% for article in cultureArticles %}
  <h3>{{ article.data.title }}</h3>
{% endfor %}
```

---

## Filters

### What are Filters?

Filters are **functions that transform data** in templates. They use the pipe `|` syntax.

```njk
{{ "hello" | uppercase }}  → "HELLO"
{{ date | formatDate }}    → "15 janvier 2024"
{{ content | readingTime }} → "5 min"
```

### How Filters Work

**Define filter** (`config/filters/date-filters.js`):

```javascript
export function formatDate(date) {
  if (!date) return "";
  const d = new Date(date);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return d.toLocaleDateString('fr-FR', options);
}
```

**Register filter** (`eleventy.config.js`):
```javascript
eleventyConfig.addFilter("formatDate", filters.formatDate);
```

**Use filter** (any template):
```njk
{{ date | formatDate }}
```

### Common Filters in This Site

#### Date Filters

```njk
{{ date | formatDate }}  → "15 janvier 2024" (human-readable)
{{ date | isoDate }}     → "2024-01-15" (machine-readable, for <time> tags)
```

#### Utility Filters

```njk
{{ collections.articles | limit(5) }}  → First 5 articles only

{{ "Hello World" | toSlug }}  → "hello-world"

{{ content | readingTime }}  → "5 min"

{{ "nav.home" | t }}  → Translate key to UI string
```

#### Collection Filters

```njk
{# Get category by slug #}
{% set category = categories | getCategoryBySlug("culture") %}

{# Get articles in a category #}
{% set articles = collections.articlesByCategory | getArticlesByCategory("culture") %}

{# Get related articles #}
{% set related = article | getRelatedArticles(collections.articles, 4) %}
```

### Creating Custom Filters

**Example: Uppercase filter**

1. **Create filter** (`config/filters/utility-filters.js`):
```javascript
export function uppercase(text) {
  return text.toUpperCase();
}
```

2. **Export it** (`config/filters/index.js`):
```javascript
export { uppercase } from './utility-filters.js';
```

3. **Use it**:
```njk
{{ "hello" | uppercase }}  → "HELLO"
```

### Chaining Filters

You can chain multiple filters:

```njk
{{ title | toSlug | uppercase }}
```

Process:
1. `title` = "Mon Article"
2. `toSlug` = "mon-article"
3. `uppercase` = "MON-ARTICLE"

---

## Shortcodes

### What are Shortcodes?

Shortcodes are **reusable components** that generate HTML. Think of them as functions you can call in templates.

### How Shortcodes Work

**Define shortcode** (`config/shortcodes/image.js`):

```javascript
export async function imageShortcode(src, alt, sizes = "100vw") {
  // Generate responsive images
  let metadata = await Image(src, {
    widths: [300, 600, 900, 1200],
    formats: ["avif", "webp", "jpeg"],
    outputDir: "./_site/img/",
    urlPath: "/img/",
  });

  return Image.generateHTML(metadata, {
    alt,
    sizes,
    loading: "lazy",
    decoding: "async",
  });
}
```

**Register shortcode** (`eleventy.config.js`):
```javascript
eleventyConfig.addAsyncShortcode("image", shortcodes.imageShortcode);
```

**Use shortcode** (any template):
```njk
{% image "photo.jpg", "My photo", "(min-width: 768px) 50vw, 100vw" %}
```

**Output:**
```html
<picture>
  <source type="image/avif" srcset="/img/hash-300w.avif 300w, /img/hash-600w.avif 600w, ...">
  <source type="image/webp" srcset="/img/hash-300w.webp 300w, /img/hash-600w.webp 600w, ...">
  <img src="/img/hash-600w.jpeg" alt="My photo" loading="lazy" decoding="async">
</picture>
```

### Article Card Shortcode

**Complex example** (`config/shortcodes/article-card.js`):

```javascript
export async function articleCardShortcode(article, options = {}) {
  const {
    showThemeBadge = false,
    imageSizes = "(min-width: 768px) 25vw, 100vw"
  } = options;

  // Generate image
  let imageHtml = '';
  if (article.data.image) {
    imageHtml = await imageShortcode(article.data.image, article.data.imageAlt);
  }

  // Generate HTML
  return `<article class="article-card">
    ${imageHtml}
    <h3><a href="${article.url}">${article.data.title}</a></h3>
    <p>${article.data.description}</p>
  </article>`;
}
```

**Usage:**
```njk
{% for article in collections.featuredArticles %}
  {% articleCard article %}
{% endfor %}
```

### Paired Shortcodes

You can also create shortcodes with content between opening and closing tags:

```javascript
eleventyConfig.addPairedShortcode("callout", function(content, type) {
  return `<div class="callout callout--${type}">
    ${content}
  </div>`;
});
```

**Usage:**
```njk
{% callout "warning" %}
  This is important information!
{% endcallout %}
```

---

## Common Tasks

### 1. Add a New Article

**Create file:** `src/articles/my-new-article.md`

```markdown
---
title: "My New Article"
description: "Short description"
category: culture
theme: les-mots
tags: [litterature, poesie]
author: Sophie Martin
date: 2024-01-20
layout: layouts/article.njk
image: /images/my-photo.jpg
imageAlt: "Description of photo"
---

# My Article Title

Your content here in Markdown...

## Section

More content...
```

**Build:**
```bash
npm run build
```

**Output:** `_site/culture/my-new-article/index.html`

### 2. Add a New Filter

**Create filter** (`config/filters/utility-filters.js`):

```javascript
export function excerpt(content, maxLength = 150) {
  // Strip HTML tags
  const text = content.replace(/<[^>]+>/g, '');

  // Truncate
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  }

  return text;
}
```

**Export it** (`config/filters/index.js`):
```javascript
export { excerpt } from './utility-filters.js';
```

**Use it:**
```njk
<p>{{ article.content | excerpt(200) }}</p>
```

### 3. Add a New Collection

**Create collection** (`config/collections/article-collections.js`):

```javascript
export function recentArticlesCollection(collectionApi) {
  return getArticles(collectionApi)
    .sort((a, b) => b.date - a.date)
    .slice(0, 10);  // Only 10 most recent
}
```

**Export it** (`config/collections/index.js`):
```javascript
export { recentArticlesCollection } from './article-collections.js';
```

**Register it** (`eleventy.config.js`):
```javascript
const collectionMappings = {
  // ... existing collections
  "recentArticles": collections.recentArticlesCollection
};
```

**Use it:**
```njk
{% for article in collections.recentArticles %}
  <h3>{{ article.data.title }}</h3>
{% endfor %}
```

### 4. Modify a Layout

**Edit:** `src/_includes/layouts/article.njk`

```njk
---
layout: layouts/base.njk
---

<article class="article">
  {# Add new element #}
  <div class="article-metadata">
    <span>{{ date | formatDate }}</span>
    <span>{{ content | readingTime }}</span>
  </div>

  <header>
    <h1>{{ title }}</h1>
  </header>

  <div class="article-content">
    {{ content | safe }}
  </div>

  {# Add related articles section #}
  {% if relatedArticles %}
    <aside class="related-articles">
      <h2>Articles liés</h2>
      {% for related in relatedArticles %}
        <h3><a href="{{ related.url }}">{{ related.data.title }}</a></h3>
      {% endfor %}
    </aside>
  {% endif %}
</article>
```

### 5. Add Global Data

**Create:** `src/_data/social.js`

```javascript
export default {
  twitter: "https://twitter.com/pause_magazine",
  facebook: "https://facebook.com/pause.magazine",
  instagram: "https://instagram.com/pause.magazine"
};
```

**Use anywhere:**
```njk
<a href="{{ social.twitter }}">Follow us on Twitter</a>
```

### 6. Create a Custom Page Template

**Create:** `src/templates/archive.njk`

```njk
---
layout: layouts/base.njk
pagination:
  data: collections.articles
  size: 20
  alias: articles
permalink: "/archive/{% if pagination.pageNumber > 0 %}page-{{ pagination.pageNumber + 1 }}/{% endif %}index.html"
---

<h1>All Articles - Page {{ pagination.pageNumber + 1 }}</h1>

{% for article in articles %}
  <article>
    <h2><a href="{{ article.url }}">{{ article.data.title }}</a></h2>
    <time>{{ article.data.date | formatDate }}</time>
    <p>{{ article.data.description }}</p>
  </article>
{% endfor %}

{# Pagination #}
{% if pagination.previousPageHref %}
  <a href="{{ pagination.previousPageHref }}">← Previous</a>
{% endif %}

{% if pagination.nextPageHref %}
  <a href="{{ pagination.nextPageHref }}">Next →</a>
{% endif %}
```

This creates:
- `/archive/index.html` (first 20 articles)
- `/archive/page-2/index.html` (next 20)
- `/archive/page-3/index.html` (etc.)

### 7. Debug Templates

**See what data is available:**

```njk
{# Dump all data #}
<pre>{{ page | dump }}</pre>

{# Or specific variable #}
<pre>{{ article.data | dump }}</pre>
```

**Check if variable exists:**

```njk
{% if myVariable %}
  <p>{{ myVariable }}</p>
{% else %}
  <p>Variable not found!</p>
{% endif %}
```

**Log to console during build:**

Add to your config:
```javascript
eleventyConfig.addFilter("log", function(value) {
  console.log(value);
  return value;
});
```

Use in template:
```njk
{{ article.data | log }}
```

---

## Performance Tips

### 1. Use Caching in Collections

```javascript
let articlesCache = null;

export function getArticles(collectionApi) {
  if (!articlesCache) {
    articlesCache = collectionApi.getFilteredByGlob("src/articles/**/*.md");
  }
  return articlesCache;
}
```

This prevents reading files multiple times during build.

### 2. Optimize Images

The `image` shortcode automatically:
- Generates multiple sizes (300w, 600w, 900w, 1200w)
- Creates modern formats (AVIF, WebP)
- Adds lazy loading
- Caches processed images

### 3. Watch Only What Changes

In `eleventy.config.js`:
```javascript
// Don't watch _site/ or node_modules/
eleventyConfig.watchIgnores.add("_site/**/*");
eleventyConfig.watchIgnores.add("node_modules/**/*");
```

---

## Troubleshooting

### Build Fails

**Check for:**
- Syntax errors in templates (missing `{% endif %}`, `{% endfor %}`)
- Invalid frontmatter YAML
- Missing referenced files
- Node.js errors in config files

**Run in verbose mode:**
```bash
DEBUG=Eleventy* npx eleventy
```

### Template Not Updating

1. **Clear cache:**
   ```bash
   rm -rf _site
   npm run build
   ```

2. **Check watch targets** in `eleventy.config.js`

3. **Hard reload browser** (Cmd+Shift+R)

### Data Not Appearing

1. **Check data cascade** (frontmatter > directory data > global data)
2. **Verify collection is created** (`{{ collections.myCollection | dump }}`)
3. **Check filter is registered** (typo in filter name?)

### URLs Wrong

**Permalink configuration:**

In frontmatter:
```markdown
---
permalink: /custom-url/
---
```

Or computed:
```markdown
---
permalink: "{{ category }}/{{ page.fileSlug }}/"
---
```

---

## Additional Resources

### Eleventy Documentation
- Official docs: https://www.11ty.dev/docs/
- Starter projects: https://www.11ty.dev/docs/starter/
- Community plugins: https://www.11ty.dev/docs/plugins/

### Nunjucks Template Language
- Official docs: https://mozilla.github.io/nunjucks/
- Similar to: Jinja2 (Python), Liquid (Ruby), Twig (PHP)

### Learning Path

1. **Start here:** Understand static site generators
2. **Next:** Learn Nunjucks syntax (variables, loops, conditionals)
3. **Then:** Understand Eleventy concepts (collections, filters, data cascade)
4. **Finally:** Master advanced features (pagination, plugins, custom data)

---

## Summary

**Eleventy transforms this:**
```
Markdown files + Data + Templates
```

**Into this:**
```
Static HTML files ready to deploy
```

**Key concepts:**
- 📝 **Content** in Markdown (easy to write)
- 🎨 **Templates** in Nunjucks (HTML with logic)
- 📊 **Data** from JSON files (structured information)
- 🔧 **Config** in JavaScript (filters, collections, shortcodes)
- 🏗️ **Build** process (transforms everything into HTML)

**The beauty of Eleventy:**
- Write content in Markdown (simple)
- Use JavaScript you already know (no new language)
- Get fast, secure static HTML (no server needed)
- Deploy anywhere (GitHub Pages, Netlify, Vercel, etc.)

Happy building! 🚀
