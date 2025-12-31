# Content Management Guide

Complete guide for creating and managing content in the PAUSE Eleventy site.

## Table of Contents

- [Creating Articles](#creating-articles)
- [Article Frontmatter Reference](#article-frontmatter-reference)
- [Managing Themes](#managing-themes)
- [Managing Authors](#managing-authors)
- [Managing Categories](#managing-categories)
- [Managing Tags](#managing-tags)
- [Best Practices](#best-practices)

---

## Creating Articles

### Quick Start

1. **Copy the template:**
   ```bash
   cp docs/_article-template.md src/articles/your-article-slug.md
   ```

2. **Edit the frontmatter** (the YAML between `---` markers)

3. **Write your content** in Markdown below the frontmatter

4. **Build and preview:**
   ```bash
   npm start
   ```

### File Naming Convention

- Use lowercase
- Use hyphens for spaces
- Be descriptive but concise
- Example: `pouvoir-des-mots.md`, `entretien-linguiste.md`

The filename becomes the URL slug: `/category/filename/`

---

## Article Frontmatter Reference

### Complete Example

```yaml
---
layout: layouts/article.njk
title: "Le Pouvoir des Mots"
description: "Exploration du langage et de son influence sur notre pensée et notre réalité"
chapeau: "Comment les mots façonnent-ils notre perception du monde ? Une exploration de la relation intime entre langage et pensée."
image: src/images/articles/pouvoir-mots.jpg
imageAlt: "Illustration abstraite de lettres et mots formant un réseau interconnecté"
ogImage: "/images/articles/pouvoir-mots-og.jpg"
keywords:
  - langage
  - linguistique
  - philosophie
  - cognition
author: Émilie Gabiot
date: 2025-12-15
category: philosophie
theme: les-mots
editorial: true
mainArticle: false
featured: true
tags:
  - linguistique
  - philosophie
  - wittgenstein
---
```

### Field-by-Field Explanation

#### Required Fields

##### `layout`
```yaml
layout: layouts/article.njk
```
- **Always** use `layouts/article.njk`
- This is the template that renders articles

##### `title`
```yaml
title: "Le Pouvoir des Mots"
```
- Article title shown in `<h1>`, browser tab, search results
- Use quotes if title contains special characters
- Should be compelling and descriptive
- Aim for 4-10 words

##### `date`
```yaml
date: 2025-12-15
```
- Publication date in `YYYY-MM-DD` format
- Used for sorting articles (newest first)
- Displayed on article page and cards
- Future dates won't hide articles (Eleventy builds all content)

##### `category`
```yaml
category: philosophie
```
- **Must** match a category `slug` from `src/_data/categories.json`
- Determines article's primary classification
- Affects URL: `/category/article-slug/`
- Shown as a badge on article cards
- See [Managing Categories](#managing-categories) for available categories

#### Recommended Fields

##### `description`
```yaml
description: "Brief description for SEO and social media sharing"
```
- **Dual purpose** - used for both SEO and display
- Used for:
  - **Article cards** (shown to site visitors browsing articles)
  - Meta description tag (Google search results)
  - Social media preview text (Facebook, Twitter)
  - Open Graph description
- Aim for 120-160 characters
- Should entice both search engine users AND site visitors
- Should work well in both contexts (search results and article cards)
- Think of it as your "elevator pitch" for the article

##### `chapeau`
```yaml
chapeau: "A compelling lead paragraph that draws readers in and sets the tone."
```
- **Highly recommended** for all articles
- Short introductory paragraph (1-3 sentences)
- Appears between title and content
- Provides context and hooks the reader
- Different from `description` (which is for SEO/cards)
- Think of it as the article's "thesis statement"

##### `author`
```yaml
author: Émilie Gabiot
```
- Author's full name (use proper accents)
- Generates author page automatically at `/authors/author-slug/`
- Slug auto-generated: "Émilie Gabiot" → "emilie-gabiot"
- Should match author name in `src/_data/authors.json` for bio display
- If omitted, articles won't appear on author pages

#### Optional Fields

##### `image`
```yaml
image: src/images/articles/my-article.jpg
```
- Path to article's main illustration image
- Displayed at top of article page
- Used in article cards if present
- Relative to project root
- Recommended size: 1200x630px minimum
- Formats: JPG, PNG, WebP

##### `imageAlt`
```yaml
imageAlt: "Descriptive text for screen readers and SEO"
```
- **Required if `image` is used**
- Describes image content for accessibility
- Used for:
  - Screen readers (accessibility)
  - When image fails to load
  - SEO (search engines index alt text)
  - Open Graph image alt (`og:image:alt`)
  - Twitter card image alt (`twitter:image:alt`)
- Be descriptive but concise
- Should make sense even without seeing the image

##### `ogImage`
```yaml
ogImage: "/images/articles/my-article-og.jpg"
```
- Custom Open Graph image for social sharing
- Falls back to `image` if not specified
- Recommended size: 1200x630px
- Appears when article is shared on social media

##### `keywords`
```yaml
keywords:
  - keyword1
  - keyword2
  - keyword3
```
- SEO keywords (array)
- Used in meta keywords tag
- 3-8 keywords recommended
- Should be specific and relevant

##### `theme`
```yaml
theme: les-mots
```
- **Must** match a theme `slug` from `src/_data/themes.json`
- Associates article with a monthly theme
- Makes article appear on theme page
- Shown as a theme badge on article
- **Omit completely** for articles not associated with a theme
- See [Managing Themes](#managing-themes)

##### `editorial`
```yaml
editorial: true
```
- Set to `true` for ONE special editorial article per theme
- Shows red "ÉDITORIAL" badge
- Should be set on only one article per theme
- Typically written by editor or site owner
- Introduces or reflects on the theme
- Default: `false` (can be omitted)

##### `mainArticle`
```yaml
mainArticle: true
```
- Set to `true` for ONE main article per theme
- Shows blue "ARTICLE PRINCIPAL" badge
- Should be set on only one article per theme
- Distinct from editorial (a theme can have both)
- Gets prominent display on homepage
- Default: `false` (can be omitted)

##### `featured`
```yaml
featured: true
```
- Set to `true` to feature article on homepage
- Article appears in "Articles à la Une" section
- Can be from any theme (or no theme)
- Limit to 3-6 featured articles sitewide
- Update regularly to keep homepage fresh
- Default: `false` (can be omitted)

##### `tags`
```yaml
tags:
  - linguistique
  - philosophie
  - wittgenstein
```
- Free-form tags (array)
- Generates tag pages automatically at `/tags/tag-name/`
- Displayed on article page and cards
- Tag clouds are auto-generated
- Slugified: "Français" → "francais", "Temps & Espace" → "temps-espace"
- See [Managing Tags](#managing-tags)

---

## Managing Themes

### What is a Theme?

Themes are monthly topics that organize related articles. Each theme has:
- A unique identifier (slug)
- A number (order in the series)
- A publication month/year
- Descriptive content
- A "current" status (only one theme can be current)

### Theme Data Structure

Themes are defined in `src/_data/themes.json` as an array:

```json
[
  {
    "slug": "les-mots",
    "name": "Les Mots",
    "chapeau": "Exploration du langage et du pouvoir des mots",
    "number": 1,
    "month": "Décembre",
    "year": 2025,
    "description": "Exploration du langage et des mots",
    "introduction": "Le premier thème de notre collection explore la richesse du langage et le pouvoir des mots. Comment les mots façonnent-ils notre pensée et notre réalité ?",
    "image": "src/images/themes/les-mots.jpg",
    "imageAlt": "Illustration abstraite représentant des lettres et des mots entrelacés",
    "ogImage": "/images/themes/les-mots-og.jpg",
    "keywords": ["langage", "mots", "linguistique"],
    "current": true
  }
]
```

### Theme Fields Explained

| Field | Required | Description |
|-------|----------|-------------|
| `slug` | Yes | Unique identifier (lowercase, hyphenated). Used in URLs and article frontmatter |
| `name` | Yes | Display name of the theme |
| `chapeau` | Yes | Short lead paragraph for theme cards and pages |
| `number` | Yes | Sequential number (1, 2, 3...). Determines order |
| `month` | Yes | Publication month (in French) |
| `year` | Yes | Publication year |
| `description` | Yes | Short description for cards (1-2 sentences) |
| `introduction` | Yes | Longer introduction for theme page and homepage (2-4 sentences) |
| `image` | Yes | Path to theme illustration image |
| `imageAlt` | Yes | Alt text for theme image |
| `ogImage` | Optional | Open Graph image for social sharing |
| `keywords` | Optional | Array of SEO keywords |
| `current` | Yes | Boolean - only ONE theme should be `true` |

### Creating a New Theme

1. **Open `src/_data/themes.json`**

2. **Add a new theme object to the array:**
   ```json
   {
     "slug": "le-voyage",
     "name": "Le Voyage",
     "chapeau": "Explorations géographiques et intérieures",
     "number": 6,
     "month": "Mai",
     "year": 2026,
     "description": "Voyages physiques et métaphoriques",
     "introduction": "Le voyage nous transforme. Qu'il soit géographique ou intérieur, il élargit nos horizons et nous confronte à l'altérité.",
     "image": "src/images/themes/le-voyage.jpg",
     "imageAlt": "Carte ancienne et éléments évoquant le voyage",
     "ogImage": "/images/themes/le-voyage-og.jpg",
     "keywords": ["voyage", "exploration", "découverte", "altérité"],
     "current": false
   }
   ```

3. **Create theme image:**
   - Add image to `src/images/themes/`
   - Recommended size: 1200x630px minimum

4. **Rebuild the site:**
   ```bash
   npm run build
   ```

5. **Verify:**
   - Theme appears at `/themes/le-voyage/`
   - Theme listed on `/themes/` page

### Changing the Current Theme

When starting a new month/theme:

1. **Open `src/_data/themes.json`**

2. **Find the current theme** (has `"current": true`)

3. **Change to** `"current": false`

4. **Find the new theme to activate**

5. **Change to** `"current": true`

6. **Rebuild:**
   ```bash
   npm run build
   ```

**Example:**
```json
// Old current theme
{
  "slug": "les-mots",
  "current": false  // Changed from true
},
// New current theme
{
  "slug": "la-nature",
  "current": true  // Changed from false
}
```

### Current Theme Special Treatment

The theme with `"current": true`:
- Featured prominently on homepage (`/`)
- Highlighted with "Actuel" badge on `/themes/` page
- Appears first in theme listings
- Gets hero section treatment

---

## Managing Authors

### What is an Author?

Authors are content creators. The system:
- Auto-generates author pages for anyone who writes an article
- Allows you to add bios and metadata via `authors.json`
- Creates slugs automatically from author names

### Author Data Structure

Authors are defined in `src/_data/authors.json` as an array:

```json
[
  {
    "slug": "emilie-gabiot",
    "name": "Émilie Gabiot",
    "bio": "Écrivaine et observatrice du quotidien, passionnée par les mots et la nature.",
    "email": ""
  }
]
```

### How Author Slugs Work

Slugs are auto-generated from the `author` field in article frontmatter:

| Author Name | Generated Slug | Author Page URL |
|-------------|----------------|-----------------|
| `Émilie Gabiot` | `emilie-gabiot` | `/authors/emilie-gabiot/` |
| `Dr. Thomas Mercier` | `dr-thomas-mercier` | `/authors/dr-thomas-mercier/` |
| `Jean-Marc Durand` | `jean-marc-durand` | `/authors/jean-marc-durand/` |

**Slug generation rules:**
- Converts to lowercase
- Removes accents: é → e, à → a
- Replaces spaces with hyphens
- Preserves dots (Dr.)
- Removes special characters except hyphens

### Adding an Author

#### Method 1: Just Write Articles (Automatic)

Simply add the author name to article frontmatter:

```yaml
author: Marie Dubois
```

- Author page auto-generated at `/authors/marie-dubois/`
- Lists all articles by this author
- No bio displayed (just name and article count)

#### Method 2: Add Bio (Recommended)

1. **Open `src/_data/authors.json`**

2. **Add author object:**
   ```json
   {
     "slug": "marie-dubois",
     "name": "Marie Dubois",
     "bio": "Journaliste et essayiste, spécialisée dans les questions culturelles contemporaines.",
     "email": "marie@example.com"
   }
   ```

3. **Ensure `slug` matches auto-generated slug:**
   - Author name in articles: `Marie Dubois`
   - Slug in authors.json: `marie-dubois`

4. **Rebuild:**
   ```bash
   npm run build
   ```

### Author Fields

| Field | Required | Description |
|-------|----------|-------------|
| `slug` | Yes | Must match auto-generated slug from article author names |
| `name` | Yes | Author's full display name (with proper accents) |
| `bio` | Optional | Short biography (1-3 sentences). Displayed on author page |
| `email` | Optional | Contact email. Currently not displayed but available for future use |

### Author Page Content

Each author page (`/authors/[author-slug]/`) shows:
- Author name
- Bio (if defined in authors.json)
- Article count
- Grid of all articles by this author
- Articles sorted by date (newest first)

---

## Managing Categories

### What is a Category?

Categories are the primary classification system for articles. They represent broad content types.

### Category Data Structure

Categories are defined in `src/_data/categories.json` as an array:

```json
[
  {
    "slug": "philosophie",
    "name": "Philosophie",
    "description": "Réflexions philosophiques et pensée"
  }
]
```

### Available Categories

Current categories (as of this guide):

| Slug | Name | Description |
|------|------|-------------|
| `entretiens` | Entretiens | Conversations et interviews |
| `analyse-discours` | Discours | Décryptage et analyse de discours |
| `culture` | Culture | Littérature, arts visuels, cinéma, théâtre, musique |
| `philosophie` | Philosophie | Réflexions philosophiques et pensée |
| `societe` | Société | Questions sociales et vie quotidienne |
| `politique` | Politique | Actualité politique et débats |
| `sciences` | Sciences | Sciences, technologie et environnement |
| `correspondance` | Correspondance | Correspondance et liens internationaux |

### Adding a New Category

1. **Open `src/_data/categories.json`**

2. **Add category to array:**
   ```json
   {
     "slug": "economie",
     "name": "Économie",
     "description": "Questions économiques et financières"
   }
   ```

3. **Position in array** determines navigation menu order

4. **Rebuild:**
   ```bash
   npm run build
   ```

5. **New category automatically:**
   - Appears in navigation menu
   - Gets index page at `/economie/`
   - Available for articles to use

### Category Fields

| Field | Required | Description |
|-------|----------|-------------|
| `slug` | Yes | Unique identifier (lowercase, hyphenated). Used in URLs and article frontmatter |
| `name` | Yes | Display name (can use accents and capitals) |
| `description` | Yes | Brief description of category content |

### Category Page Content

Each category page (`/[category-slug]/`) shows:
- Category name and description
- Grid of all articles in this category
- Articles sorted by date (newest first)
- Empty state message if no articles

---

## Managing Tags

### What are Tags?

Tags are free-form labels that create cross-references between articles. Unlike categories (one per article) and themes (optional), articles can have multiple tags.

### How Tags Work

Tags are completely automatic:

1. **Add tags to article frontmatter:**
   ```yaml
   tags:
     - linguistique
     - philosophie
     - wittgenstein
   ```

2. **Tag pages auto-generated** at `/tags/[tag-slug]/`

3. **Tag index page** shows all tags at `/tags/`

### Tag Slug Generation

Tags are auto-slugified:

| Tag in Frontmatter | Generated Slug | Tag Page URL |
|--------------------|----------------|--------------|
| `Linguistique` | `linguistique` | `/tags/linguistique/` |
| `Français` | `francais` | `/tags/francais/` |
| `Temps & Espace` | `temps-espace` | `/tags/temps-espace/` |
| `IA / AI` | `ia-ai` | `/tags/ia-ai/` |

**Slug rules:**
- Converts to lowercase
- Removes accents
- Replaces spaces and special chars with hyphens
- Collapses multiple hyphens
- Trims leading/trailing hyphens

### Tag Best Practices

**DO:**
- ✅ Use specific, meaningful tags
- ✅ Use 3-8 tags per article
- ✅ Be consistent with tag names across articles
- ✅ Use existing tags when possible
- ✅ Think of tags as "topics" or "keywords"

**DON'T:**
- ❌ Don't duplicate category as a tag
- ❌ Don't duplicate theme as a tag
- ❌ Don't use too many tags (over 10)
- ❌ Don't create one-off tags that won't be reused

**Examples:**

Good tags for article about Wittgenstein:
```yaml
tags:
  - philosophie
  - langage
  - wittgenstein
  - logique
  - analytique
```

Poor tags (too generic or redundant):
```yaml
tags:
  - article
  - philosophie  # Already the category
  - les-mots     # Already the theme
  - good
  - interesting
```

### Tag Index Page

The tag index (`/tags/`) shows:
- All tags used across the site
- Number of articles per tag
- Sorted alphabetically
- Clickable links to tag pages

### Tag Page Content

Each tag page (`/tags/[tag-slug]/`) shows:
- Tag name
- Number of articles with this tag
- Grid of all articles with this tag
- Articles sorted by date (newest first)

---

## Best Practices

### Article Writing

**Frontmatter:**
- Always fill in required fields
- Add `chapeau` for better article presentation
- Use `description` for SEO (120-160 chars)
- Add images when possible (improves engagement)
- Choose tags carefully (3-8 relevant tags)

**Content:**
- Use clear section headings (##, ###)
- Break up long paragraphs
- Use blockquotes for citations
- Add alt text to images
- Use lists for scannable content

### Theme Management

**When creating themes:**
- Plan themes months in advance
- Create theme images beforehand
- Write compelling introductions
- Keep themes broad enough for multiple articles
- Assign sequential numbers

**When switching themes:**
- Update all at once (set old to false, new to true)
- Check homepage displays correctly
- Verify theme page exists and renders
- Update any featured articles if needed

### Author Management

**For consistency:**
- Use full names with proper accents
- Be consistent with name format across articles
- Add bios for regular contributors
- Keep bios concise (1-3 sentences)
- Update bios when credentials change

### Category Management

**Before adding categories:**
- Ensure it's truly needed (don't over-categorize)
- Check it doesn't overlap with existing categories
- Plan for at least 5-10 articles in this category
- Consider future content in this category

### Tag Management

**To keep tags organized:**
- Review all tags periodically
- Consolidate similar tags (e.g., "AI" and "intelligence artificielle")
- Remove one-off tags with only one article
- Update old articles with newer, better tags
- Maintain a mental list of "standard" tags for your site

### Editorial Workflow

**Recommended process:**

1. **Plan** - Decide on theme and article topics
2. **Draft** - Write articles in markdown
3. **Review** - Check frontmatter is complete
4. **Images** - Add article and theme images
5. **Build** - Test locally with `npm start`
6. **Check** - Verify article appears on all relevant pages
7. **Tag** - Add appropriate tags
8. **Publish** - Deploy to production

### Quality Checklist

Before publishing an article:

- [ ] All required frontmatter fields filled
- [ ] `description` is compelling and ~150 chars
- [ ] `chapeau` provides good context
- [ ] `category` matches site categories
- [ ] `theme` matches site themes (if applicable)
- [ ] `date` is correct (YYYY-MM-DD)
- [ ] `author` name is consistent with other articles
- [ ] Images have `imageAlt` text
- [ ] 3-8 relevant tags added
- [ ] Content has proper headings (##, ###)
- [ ] Quotes use blockquote format
- [ ] Images have captions (if needed)
- [ ] Links work and open correctly
- [ ] Article builds without errors
- [ ] Article appears on category page
- [ ] Article appears on theme page (if applicable)
- [ ] Article appears on author page
- [ ] Featured badge shows (if `featured: true`)
- [ ] Editorial badge shows (if `editorial: true`)

---

## Quick Reference

### Article Template Location
```
docs/_article-template.md
```

### Data Files
```
src/_data/themes.json      # Theme definitions
src/_data/authors.json     # Author bios
src/_data/categories.json  # Category definitions
```

### Build Commands
```bash
npm start           # Dev server with live reload
npm run build       # Production build
npm run build:dev   # Development build
```

### Important URLs
```
/                          # Homepage (current theme spotlight)
/themes/                   # All themes archive
/themes/[theme-slug]/      # Individual theme page
/authors/[author-slug]/    # Author page
/[category-slug]/          # Category page
/tags/                     # All tags index
/tags/[tag-slug]/          # Individual tag page
/[category]/[article]/     # Article page
```

---

## Troubleshooting

### Article not appearing

**Check:**
- Article file is in `src/articles/` directory
- Frontmatter YAML is valid (no syntax errors)
- `category` matches a category in `categories.json`
- `theme` matches a theme in `themes.json` (if used)
- File has `.md` extension
- Ran `npm run build` after creating article

### Author page not showing bio

**Check:**
- Author `slug` in `authors.json` matches auto-generated slug
- Author `name` in `authors.json` matches article frontmatter exactly
- `bio` field is not empty
- Rebuilt site after adding bio

### Theme not appearing as current

**Check:**
- Only ONE theme has `"current": true`
- Theme JSON is valid
- Rebuilt site after changing current status
- Homepage displays current theme spotlight

### Category page is empty

**Check:**
- At least one article has this category
- Category `slug` in articles matches `categories.json`
- Articles have valid frontmatter
- Rebuilt site

### Tag page not generating

**Check:**
- At least one article has this tag
- Tag is in `tags` array in frontmatter
- Rebuilt site
- Tag hasn't been filtered out by configuration

---

## Need Help?

- Check `docs/CLAUDE.md` for complete project documentation
- Review `ELEVENTY-GUIDE.md` for technical details
- Examine existing articles in `src/articles/` for examples
- Build errors will show in terminal with helpful messages
