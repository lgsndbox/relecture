# Eleventy Theme-Based Article Site

## Project Overview

This is an Eleventy static site organized around **themes**. Each theme represents a monthly topic, and articles are associated with themes. The site features:

- **Current theme spotlight** on the homepage
- **Featured articles** curated from any theme
- **Individual theme pages** for browsing articles by theme
- **Author pages** listing all articles by each author
- **General articles** not tied to any specific theme

## Quick Commands

```bash
# Development
npm start               # Bundle CSS + start dev server with live reload
npm run serve           # Alias for npm start

# Production build
npm run build           # Full production build (CSS + duplicates check + Eleventy + search indexing)
npm run build:dev       # Development build (CSS + Eleventy, skip checks)
npm run build:prod      # Alias for npm run build

# Individual tasks
npm run bundle:css      # Bundle CSS files into main.css
npm run check:duplicates # Check for duplicate article slugs

# Search indexing (runs automatically after build)
npm run search:index    # Full search indexing pipeline
npm run search:normalize # Step 1: Normalize HTML for search
npm run search:pagefind  # Step 2: Generate Pagefind search index
npm run search:copy      # Step 3: Copy search files to _site
npm run search:cleanup   # Step 4: Remove temporary files

# Debugging search issues
npm run search:normalize && npm run search:pagefind  # Index without cleanup (inspect _site_normalized)
```

### Search Indexing

The search feature uses Pagefind and runs automatically after each build via the `postbuild` script. The process is broken into individual steps for easier debugging:

1. **normalize** - Creates a normalized copy of _site for indexing
2. **pagefind** - Generates search index from normalized site
3. **copy** - Copies search files to production _site
4. **cleanup** - Removes temporary _site_normalized directory

**To debug search issues:**
- Run steps individually to isolate problems
- Skip cleanup to inspect _site_normalized: `npm run search:normalize && npm run search:pagefind`
- Check Pagefind output for indexing warnings

All scripts are cross-platform compatible (Windows/Mac/Linux).

## Project Structure

```
.
├── _data/
│   ├── themes.json       # Theme definitions (name, number, dates, etc.)
│   ├── categories.json   # Category definitions (name, description, order)
│   └── authors.json      # Author bios and metadata
├── _includes/
│   ├── base.njk          # Base HTML template (used by all pages)
│   ├── article.njk       # Article page layout
│   ├── current-theme.njk # Homepage spotlight layout
│   ├── themes-archive.njk# All themes archive layout
│   ├── general-articles.njk # General articles page layout
│   └── home.njk          # OLD: kept for reference, not used
├── articles/
│   └── *.md              # Article markdown files
├── css/
│   └── main.css          # All site styles
├── eleventy.config.js    # Eleventy configuration
├── index.md              # Homepage (uses current-theme.njk)
├── themes.md             # All themes page
├── general.md            # General articles page
├── theme-page.njk        # Template for individual theme pages (pagination)
├── author-page.njk       # Template for author pages (pagination)
├── _article-template.md  # Template for creating new articles
├── CLAUDE.md             # This file
├── THEMES.md             # Guide for managing themes
└── AUTHORS.md            # Guide for managing authors
```

## Page Architecture

### Homepage (`/`)
**Template:** `_includes/current-theme.njk`
**Content:** `index.md`

Displays:
- The **current theme** with large badge, introduction, and link to theme page
- **Featured articles** from any theme (articles with `featured: true`)
- Call-to-action to explore all themes

### All Themes Page (`/themes/`)
**Template:** `_includes/themes-archive.njk`
**Content:** `themes.md`

Displays:
- **Current theme** section (highlighted)
- **Past themes** section (all non-current themes in reverse chronological order)
- Each theme shows: number, name, date, description, article count, and link to theme page

### Individual Theme Pages (`/themes/[theme-id]/`)
**Template:** `theme-page.njk` (pagination)
**Generated from:** `_data/themes.json`

Displays:
- Theme header with number, name, date
- Full introduction text
- Grid of all articles for this theme
- Back link to all themes

### Author Pages (`/authors/[author-slug]/`)
**Template:** `author-page.njk` (pagination)
**Generated from:** Articles collection grouped by author

Displays:
- Author name
- Biography (from `_data/authors.json` if defined)
- Article count
- Grid of all articles by this author

### General Articles Page (`/general/`)
**Template:** `_includes/general-articles.njk`
**Content:** `general.md`

Displays:
- Articles without a `theme` field
- Useful for announcements, site updates, general content

### Individual Article Pages (`/articles/[article-slug]/`)
**Template:** `_includes/layouts/article.njk`
**Content:** Markdown files in `content/articles/`

Displays:
- Editorial badge (if article has `editorial: true`)
- Category badge
- Theme badge (if article has a theme)
- Article image (if provided)
- Title
- Chapeau (short lead paragraph)
- Author, date, tags
- Article content (markdown rendered to HTML)
- Article byline

## Category System

### Category Data Structure

Categories are defined in `_data/categories.json` as an **array**:

```json
[
  {
    "slug": "category-slug",
    "name": "Category Name",
    "description": "Brief description of the category"
  }
]
```

**Key points:**
- Categories use an **array structure** (not object)
- The **array order** determines the navigation menu order (no need for an `order` field)
- Each category has an explicit `slug` field (used in URLs and article front matter)
- The navigation menu is **dynamically generated** from this array
- To reorder categories, simply rearrange items in the array
- To add a new category, add it to the array and rebuild

### Available Categories (in menu order)

1. **entretiens** - Conversations et interviews
2. **analyse-discours** - Décryptage et analyse de discours
3. **litterature** - Livres, poésie, écriture et auteurs
4. **culture** - Cinéma, théâtre, musique et spectacles
5. **arts** - Peinture, sculpture, photographie et arts visuels
6. **philosophie** - Réflexions philosophiques et pensée
7. **societe** - Questions sociales et vie quotidienne
8. **politique** - Actualité politique et débats
9. **sciences** - Sciences, technologie et environnement

### Adding a New Category

1. Open `_data/categories.json`
2. Add a new entry to the array:
```json
{
  "slug": "new-category",
  "name": "New Category",
  "description": "Description of the new category"
}
```
3. Position it in the array where you want it to appear in the menu
4. Rebuild the site: `npx @11ty/eleventy`
5. The category will automatically:
   - Appear in the navigation menu at the array position
   - Have its own index page at `/new-category/`
   - Be available for articles to use (via the `slug` field)

### Category Pages

Each category automatically gets an index page at `/{category-id}/` that displays:
- Category name and description
- Grid of all articles in that category
- Empty state message if no articles exist

## Theme System

### Theme Data Structure

Themes are defined in `_data/themes.json` as an **array**:

```json
[
  {
    "slug": "theme-slug",
    "name": "Theme Name",
    "chapeau": "Short lead paragraph for theme cards and pages",
    "number": 1,
    "month": "Décembre",
    "year": 2025,
    "description": "Short description for cards",
    "introduction": "Longer introduction for theme page and homepage spotlight",
    "image": "/images/themes/theme-name.jpg",
    "current": false
  }
]
```

**Key points:**
- Themes use an **array structure** (not object)
- Each theme has an explicit `slug` field (used in URLs and article front matter)
- Array is sorted by `number` field for display
- Only **one theme** should have `"current": true`
- `chapeau` appears between title and introduction on theme pages
- `description` appears on cards, `introduction` on dedicated pages
- `image` is the theme illustration image path

### Managing Themes

See **THEMES.md** for complete guide including:
- Creating new themes
- Marking a theme as current
- Theme properties explained
- Examples

### Current Theme

The theme with `"current": true` is:
- Featured on the homepage (`/`)
- Highlighted on the themes archive page (`/themes/`)
- Has a prominent badge in the themes list

## Article System

### Creating an Article

1. Copy `_article-template.md` to `articles/your-article-slug.md`
2. Edit the front matter:

```yaml
---
layout: layouts/article.njk
title: Your Article Title
description: Brief description for SEO and social
chapeau: Short lead paragraph that appears between title and content
image: /images/articles/your-image.jpg  # Optional
author: Author Name
date: 2025-12-25
category: philosophie  # REQUIRED: choose from available categories
theme: theme-id        # Optional: omit for general articles
editorial: false       # Optional: true for ONE article per theme
featured: false        # Optional: true to show on homepage
tags:
  - tag1
  - tag2
---
```

3. Write your content in Markdown
4. Build the site: `npx @11ty/eleventy`

### Article Front Matter Fields

| Field | Required | Description |
|-------|----------|-------------|
| `layout` | Yes | Always `layouts/article.njk` |
| `title` | Yes | Article title |
| `description` | Recommended | Short description for SEO and social sharing |
| `chapeau` | Recommended | Short lead paragraph (1-2 sentences) appearing between title and content |
| `image` | Optional | Article illustration image path (e.g., `/images/articles/my-image.jpg`) |
| `author` | Recommended | Author's full name |
| `date` | Yes | Publication date (YYYY-MM-DD) |
| `category` | Required | Category ID: `litterature`, `culture`, `arts`, `philosophie`, `societe`, `politique`, `sciences` |
| `theme` | Optional | Theme ID (from `themes.json`). Omit for general articles |
| `editorial` | Optional | Set to `true` for the ONE editorial article per theme |
| `featured` | Optional | Set to `true` to feature on homepage |
| `tags` | Optional | List of tags |

### Featured Articles

Articles with `featured: true` appear in the "Articles à la Une" section on the homepage.

**Best practices:**
- Limit to 3-6 featured articles
- Can be from any theme (or no theme)
- Update regularly to keep homepage fresh

### Editorial Articles

Each theme should have ONE special editorial article marked with `editorial: true`.

**Key points:**
- Only ONE article per theme should have `editorial: true`
- Editorial articles get a special red "ÉDITORIAL" badge
- The editorial is typically written by the editor or site owner
- It introduces or reflects on the theme
- Can also be marked as `featured` to appear on homepage

**Example:**
```yaml
---
title: Le Pouvoir des Mots
theme: les-mots
editorial: true
featured: true
---
```

### General Articles

Articles without a `theme` field:
- Appear on `/general/` page
- Don't appear in theme-specific pages
- Still appear on author pages
- Useful for site announcements, about pages, etc.

## Author System

### Author Data Structure

Authors are optionally defined in `_data/authors.json`:

```json
{
  "author-slug": {
    "name": "Author Name",
    "bio": "Short biography",
    "email": "optional@email.com"
  }
}
```

### Managing Authors

See **AUTHORS.md** for complete guide including:
- How slugs are auto-generated
- Adding author bios
- Author page structure

### Automatic Author Pages

Every author with at least one published article gets an automatic page at `/authors/[author-slug]/`.

**Slug generation:**
- `"Émilie Gabiot"` → `/authors/emilie-gabiot/`
- Removes accents, converts to lowercase, replaces spaces with dashes

## Eleventy Configuration

### Global Data

```javascript
year: new Date().getFullYear()  // Available as {{ year }} in templates
```

### Custom Filters

#### Date Filters
- `formatDate` - Formats dates in French: "20 décembre 2025"
- `isoDate` - ISO format for `<time>` datetime attribute: "2025-12-20"

#### Theme Filters
- `sortThemes` - Sorts themes object by `number` field, returns array of [id, theme] pairs
- `getCurrentTheme` - Returns the theme with `current: true` (or null)
- `getPastThemes` - Returns all themes with `current: false`, sorted by number descending

### Collections

#### `collections.featuredArticles`
Articles with `featured: true`, sorted by date descending

#### `collections.articlesByTheme`
Object with theme IDs as keys, arrays of articles as values

#### `collections.articlesByAuthor`
Object with author slugs as keys, objects with `{name, slug, articles[]}` as values

#### `collections.unthemedArticles`
Articles without a `theme` field, sorted by date descending

### Ignored Files

These files are excluded from the build:
- `CLAUDE.md`
- `THEMES.md`
- `AUTHORS.md`
- `ARRAY-VS-OBJECT.md`
- `_article-template.md`

## CSS Architecture

### Main Stylesheet

All styles are in `css/main.css`:
- Modern CSS Reset
- Base typography
- Layout styles
- Component styles (cards, buttons, badges)
- Page-specific styles
- Responsive adjustments

### CSS Class Naming

#### Homepage (Current Theme Spotlight)
- `.current-theme-spotlight` - Container
- `.hero-current-theme` - Hero section
- `.theme-badge-large` - Large theme badge
- `.featured-articles` - Featured articles section
- `.featured-grid` - Featured articles grid
- `.featured-card` - Individual featured article card
- `.explore-themes-cta` - Call-to-action section

#### Themes Archive
- `.themes-archive` - Container
- `.current-theme-section` - Current theme section
- `.theme-card-current` - Current theme card (highlighted)
- `.current-badge` - "Actuel" badge
- `.past-themes-section` - Past themes section
- `.themes-grid` - Theme cards grid
- `.theme-card` - Individual theme card
- `.theme-card-footer` - Theme card footer with button

#### Theme Page
- `.theme-page` - Container
- `.theme-page-header` - Theme header
- `.theme-articles-list` - Articles section
- `.articles-grid` - Articles grid
- `.article-card` - Individual article card
- `.theme-page-footer` - Back button footer

#### Author Page
- `.author-page` - Container
- `.author-page-header` - Author header
- `.author-bio` - Biography text
- `.author-article-count` - Article count
- `.author-articles-list` - Articles section

#### General Articles Page
- `.general-articles-page` - Container
- `.page-header` - Page header
- `.no-articles-section` - Empty state

#### Shared Components
- `.article-card` - Article card (used on multiple pages)
- `.article-card-title` - Article title
- `.article-card-description` - Article description
- `.article-card-meta` - Article metadata
- `.article-card-tags` - Article tags
- `.tag-small` - Small tag badge
- `.btn-explore`, `.btn-themes`, `.btn-view-theme`, `.btn-back` - Buttons

### Article-Specific Styles

Content within articles is wrapped in `.article-content`:

```css
.article-content p {
    /* Styles only apply to <p> within articles */
}

.article-content h2 {
    /* Styles only apply to <h2> within articles */
}
```

This allows you to style article content differently from other page content.

## Markdown Styling Conventions

### Citations

```markdown
> Quote text here
>
> **Author Name**
```

### Image Captions

```markdown
![Alt text](image.jpg)
*Caption text here*
```

The CSS selector `img + em` styles the caption.

### Table Captions

```markdown
*Table caption here*

| Header 1 | Header 2 |
|----------|----------|
| Data 1   | Data 2   |
```

The CSS selector `em:has(+ table)` styles the caption.

### Code

Inline: \`code here\`

Blocks:
\`\`\`javascript
const example = "code";
\`\`\`

### Lists

- Unordered lists
- Use dashes

1. Ordered lists
2. Use numbers

- [ ] Task lists
- [x] Are supported

## Development Workflow

### Adding a New Theme

1. Open `_data/themes.json`
2. Add new theme object
3. Set `"current": true` if it's the new current theme
4. Set previous current theme to `"current": false`
5. Build: `npx @11ty/eleventy`
6. Check homepage and `/themes/` page

### Adding a New Article

1. Copy `_article-template.md` to `articles/new-article.md`
2. Fill in front matter (title, author, date, theme, etc.)
3. Write content in Markdown
4. Build: `npx @11ty/eleventy`
5. Check article appears on:
   - Its theme page (`/themes/[theme-id]/`)
   - Author page (`/authors/[author-slug]/`)
   - Homepage if `featured: true`

### Adding a New Author Bio

1. Open `_data/authors.json`
2. Add author with correct slug (see AUTHORS.md for slug rules)
3. Build: `npx @11ty/eleventy`
4. Visit `/authors/[author-slug]/` to see bio

### Changing Current Theme

1. Open `_data/themes.json`
2. Find current theme (has `"current": true`)
3. Change to `"current": false`
4. Find new theme to feature
5. Change to `"current": true`
6. Build: `npx @11ty/eleventy`
7. Check homepage updates

### Featuring an Article

1. Open article file in `articles/`
2. Add or change `featured: true` in front matter
3. Build: `npx @11ty/eleventy`
4. Check homepage "Articles à la Une" section

## Troubleshooting

### Build Errors

**"Error: expected variable end"**
- Check Nunjucks syntax in templates
- Ensure all `{% %}` tags are closed
- Check for typos in variable names

**"Cannot read property of undefined"**
- Check data file paths in `_data/`
- Verify JSON is valid (no trailing commas)
- Ensure theme IDs in articles match `themes.json`

**"Pagination error"**
- Check `pagination` config in `theme-page.njk` and `author-page.njk`
- Ensure data sources exist (themes.json, collections)

### Theme Not Appearing

- Check JSON syntax in `themes.json`
- Verify theme has all required fields
- Rebuild: `npx @11ty/eleventy`

### Article Not Showing in Theme

- Verify `theme` field in article matches theme ID (key) in `themes.json`
- Check that theme ID has no typos
- Rebuild: `npx @11ty/eleventy`

### Author Page Not Generating

- Check that at least one article has this author's name
- Verify author name spelling is consistent across all articles
- Check that slug generated from name matches `authors.json` key

### Featured Articles Not Appearing

- Verify articles have `featured: true` in front matter
- Check that `collections.featuredArticles` collection exists
- Rebuild: `npx @11ty/eleventy`

## Technical Details

### Template Engine

- **Nunjucks** for layouts (`.njk` files)
- **Liquid** for markdown files (default Eleventy behavior)

### ES Modules

Package type is set to `"module"`, so config uses:
```javascript
export default function(eleventyConfig) { ... }
```

### Pagination

Both `theme-page.njk` and `author-page.njk` use Eleventy's pagination to generate multiple pages from data:

```javascript
pagination:
  data: themes          # Data source
  size: 1               # One page per item
  alias: themeData      # Variable name in template
permalink: "/themes/{{ themeData[0] }}/"  # URL pattern
```

### Object vs Array for Themes

Themes use an **object structure** (not array) because:
- ✅ Direct access: `themes[themeId]` is O(1)
- ✅ No ID duplication (ID is the key)
- ✅ Order controlled via `sortThemes` filter

See `ARRAY-VS-OBJECT.md` for detailed comparison.

## Future Enhancements

Potential features to add:
- Tags/topics index page (`/tags/`)
- Search functionality
- RSS feed
- Archive page by date (`/archive/`)
- All authors index page (`/authors/`)
- Related articles section
- Comments system
- Social sharing buttons

## Key Files Reference

- **eleventy.config.js** - All Eleventy configuration, filters, collections
- **_data/themes.json** - Theme definitions
- **_data/authors.json** - Author biographies
- **_data/eleventyComputed.js** - Computed data (breadcrumbs, socialImage)
- **_data/ui.js** - i18n UI strings
- **_includes/base.njk** - Base HTML template
- **_includes/current-theme.njk** - Homepage layout
- **_includes/article.njk** - Article page layout
- **theme-page.njk** - Individual theme page template
- **author-page.njk** - Author page template
- **css/main.css** - All site styles
- **CLAUDE.md** - This file - Complete project documentation
- **DATA-MODEL.md** - Data structures and access patterns guide
- **I18N-SETUP.md** - Internationalization system documentation
- **THEMES.md** - Theme management guide
- **AUTHORS.md** - Author management guide
- **_article-template.md** - Template for new articles
