# Content Documentation

Documentation for content editors, writers, and anyone managing site content.

## 📚 Documentation Files

### [CONTENT-GUIDE.md](CONTENT-GUIDE.md) - **START HERE**
Complete guide covering everything you need to know about creating and managing content:
- Creating articles (step-by-step)
- Complete frontmatter reference
- Managing themes
- Managing authors
- Managing categories
- Managing tags
- Best practices and workflows
- Quality checklist
- Troubleshooting

**Size:** 800+ lines of comprehensive documentation

### [article-template.md](article-template.md)
Ready-to-use template for creating new articles:
- Complete frontmatter with all available fields
- Inline documentation for each field
- Quick examples (general, themed, editorial)
- Content writing tips
- Markdown guide

**Usage:**
```bash
cp docs/content/article-template.md src/articles/my-article.md
```

### [AUTHORS.md](AUTHORS.md)
Guide to the author system:
- How author pages are auto-generated
- Adding author bios
- Slug generation rules
- Author data structure

### [CATEGORIES.md](CATEGORIES.md)
Guide to the category system:
- Available categories
- Category structure
- Adding new categories
- Category page behavior

## 🚀 Quick Start

### Creating Your First Article

1. **Copy the template:**
   ```bash
   cp docs/content/article-template.md src/articles/my-first-article.md
   ```

2. **Edit the frontmatter** (the YAML between `---` markers):
   ```yaml
   ---
   layout: layouts/article.njk
   title: "My Article Title"
   description: "Brief description for SEO"
   chapeau: "Engaging lead paragraph"
   author: Your Name
   date: 2025-12-31
   category: culture  # Required: choose from available categories
   theme: les-mots    # Optional: omit for general articles
   tags:
     - tag1
     - tag2
   ---
   ```

3. **Write your content** in Markdown below the frontmatter

4. **Preview:**
   ```bash
   npm start
   ```
   Visit http://localhost:8080

5. **Check your article appears on:**
   - Category page: `/category/article-slug/`
   - Theme page: `/themes/theme-slug/` (if themed)
   - Author page: `/authors/author-slug/`

## 📖 Common Tasks

### Content Creation

| Task | Documentation |
|------|---------------|
| Create an article | [CONTENT-GUIDE.md#creating-articles](CONTENT-GUIDE.md#creating-articles) |
| Understand frontmatter | [CONTENT-GUIDE.md#article-frontmatter-reference](CONTENT-GUIDE.md#article-frontmatter-reference) |
| Use the template | [article-template.md](article-template.md) |
| Write in Markdown | [article-template.md](article-template.md) (see comments) |

### Content Management

| Task | Documentation |
|------|---------------|
| Create a new theme | [CONTENT-GUIDE.md#creating-a-new-theme](CONTENT-GUIDE.md#managing-themes) |
| Change current theme | [CONTENT-GUIDE.md#changing-the-current-theme](CONTENT-GUIDE.md#managing-themes) |
| Add author bio | [AUTHORS.md](AUTHORS.md) or [CONTENT-GUIDE.md#adding-an-author](CONTENT-GUIDE.md#managing-authors) |
| Add a category | [CATEGORIES.md](CATEGORIES.md) or [CONTENT-GUIDE.md#adding-a-new-category](CONTENT-GUIDE.md#managing-categories) |
| Manage tags | [CONTENT-GUIDE.md#managing-tags](CONTENT-GUIDE.md#managing-tags) |

## 🎯 Key Concepts

### Content Types

**Articles**
- Main content type
- Can be associated with a theme (optional)
- Always have a category
- Can have multiple tags
- Can be featured on homepage

**Themes**
- Monthly topics
- Group related articles
- Only one can be "current"
- Each has a dedicated page

**Authors**
- Auto-generated pages for everyone who writes
- Optional bios in `src/_data/authors.json`

**Categories**
- Primary classification (required for articles)
- Fixed list in `src/_data/categories.json`
- Each has a dedicated page

**Tags**
- Free-form labels
- Auto-generated pages
- Create cross-references between articles

### Special Article Types

**Editorial Article**
- One per theme
- Set `editorial: true`
- Red "ÉDITORIAL" badge
- Introduces the theme

**Main Article**
- One per theme
- Set `mainArticle: true`
- Blue "ARTICLE PRINCIPAL" badge
- Featured on homepage

**Featured Article**
- Set `featured: true`
- Appears in "Articles à la Une"
- Can be from any theme

## 📝 Content Workflow

Recommended process:

1. **Plan** - Decide theme and topics
2. **Draft** - Copy template, write content
3. **Review** - Check frontmatter completeness
4. **Images** - Add article images (optional)
5. **Build** - Test locally (`npm start`)
6. **Verify** - Check article appears on all relevant pages
7. **Tag** - Add appropriate tags
8. **Publish** - Deploy to production

## ✅ Pre-Publish Checklist

Before publishing an article:

- [ ] All required frontmatter fields filled
- [ ] `description` is ~150 characters and compelling
- [ ] `chapeau` provides good context
- [ ] `category` matches available categories
- [ ] `theme` matches available themes (if used)
- [ ] `date` is correct (YYYY-MM-DD)
- [ ] `author` name is consistent
- [ ] Images have `imageAlt` text
- [ ] 3-8 relevant tags added
- [ ] Content has proper headings
- [ ] Article builds without errors
- [ ] Article appears on category/theme/author pages

## 🔧 Data Files

Content is controlled by these data files:

```
src/_data/
├── themes.json       # Theme definitions
├── authors.json      # Author bios
└── categories.json   # Category definitions
```

**When to edit:**
- **themes.json** - Add new theme or change current theme
- **authors.json** - Add author bio
- **categories.json** - Add new category (rare)

**Don't edit directly:**
- Tags (auto-generated from article frontmatter)
- Author slugs (auto-generated from names)
- URLs (auto-generated from slugs)

## ❓ Troubleshooting

### Article not appearing

**Check:**
1. File is in `src/articles/` directory
2. Frontmatter YAML is valid
3. `category` matches a category in `categories.json`
4. `theme` matches a theme in `themes.json` (if used)
5. File has `.md` extension
6. Ran `npm start` or `npm run build`

### Author page not showing bio

**Check:**
1. Author slug in `authors.json` matches auto-generated slug
2. Author name in `authors.json` matches article frontmatter exactly
3. `bio` field is not empty
4. Rebuilt site after adding bio

### More troubleshooting

See [CONTENT-GUIDE.md#troubleshooting](CONTENT-GUIDE.md#troubleshooting)

## 📚 Additional Resources

- **For technical details** → See [../development/](../development/)
- **For project overview** → See [../development/CLAUDE.md](../development/CLAUDE.md)
- **For Eleventy specifics** → See [../development/ELEVENTY-GUIDE.md](../development/ELEVENTY-GUIDE.md)

---

*Documentation for content editors and writers. For development docs, see [../development/](../development/)*
