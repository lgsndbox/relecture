# Development Documentation

Technical documentation for developers building and maintaining the PAUSE Eleventy site.

## 📚 Documentation Files

### [CLAUDE.md](CLAUDE.md) - **START HERE**
Complete project documentation and overview:
- Project structure
- Page architecture
- Theme, category, and author systems
- Collections and filters
- CSS architecture
- Development workflow
- Troubleshooting

**Size:** 20KB+ comprehensive guide

### [ELEVENTY-GUIDE.md](ELEVENTY-GUIDE.md)
Deep dive into Eleventy implementation:
- Detailed explanation for HTML/CSS/JS developers new to Eleventy
- Static site generation concepts
- Build process
- Templates and layouts
- Collections and filters
- Data cascade
- Common patterns

**Size:** 800+ lines of technical documentation

### [DATA-MODEL.md](DATA-MODEL.md)
Data structures and access patterns:
- Data file structures (themes, authors, categories)
- Collection structures
- How to access data in templates
- Computed data
- Data transformation patterns

### [I18N-SETUP.md](I18N-SETUP.md)
Internationalization system:
- i18n architecture
- UI strings management
- Adding translations
- Language switching (future)

### [ARRAY-VS-OBJECT.md](ARRAY-VS-OBJECT.md)
Technical decisions and rationale:
- Why themes/authors use arrays vs objects
- Performance considerations
- Trade-offs analysis

## 🚀 Quick Start

### Development Setup

```bash
# Install dependencies
npm install

# Start development server with live reload
npm start

# Build for production
npm run build

# Run validation
npm test
```

### Project Structure

```
.
├── src/
│   ├── _data/              # Data files (themes, authors, categories)
│   ├── _includes/          # Layouts and partials
│   ├── articles/           # Article markdown files
│   ├── css/                # CSS source files
│   ├── js/                 # JavaScript source files
│   ├── images/             # Images
│   └── pages/              # Site pages
├── _site/                  # Build output (generated)
├── config/                 # Eleventy config modules
├── scripts/                # Build scripts (CSS bundling, etc.)
├── eleventy.config.js      # Main Eleventy config
└── package.json            # Dependencies and scripts
```

## 🔧 Common Development Tasks

### Configuration

| Task | File | Documentation |
|------|------|---------------|
| Add filter | `config/filters/` | [ELEVENTY-GUIDE.md](ELEVENTY-GUIDE.md) |
| Add collection | `config/collections/` | [ELEVENTY-GUIDE.md](ELEVENTY-GUIDE.md) |
| Add shortcode | `config/shortcodes/` | [ELEVENTY-GUIDE.md](ELEVENTY-GUIDE.md) |
| Modify build | `eleventy.config.js` | [CLAUDE.md](CLAUDE.md) |

### Data Management

| Task | File | Documentation |
|------|------|---------------|
| Add theme | `src/_data/themes.json` | [DATA-MODEL.md](DATA-MODEL.md) |
| Add author bio | `src/_data/authors.json` | [DATA-MODEL.md](DATA-MODEL.md) |
| Add category | `src/_data/categories.json` | [DATA-MODEL.md](DATA-MODEL.md) |
| Computed data | `src/_data/eleventyComputed.js` | [DATA-MODEL.md](DATA-MODEL.md) |

### Styling

| Task | File | Documentation |
|------|------|---------------|
| Add CSS | `src/css/*.css` | [CLAUDE.md#css-architecture](CLAUDE.md) |
| Modify bundling | `scripts/bundle-css.js` | [CLAUDE.md](CLAUDE.md) |
| Cache headers | `src/_headers` | [CLAUDE.md](CLAUDE.md) |

### Build System

| Task | Documentation |
|------|---------------|
| CSS bundling & hashing | [CLAUDE.md](CLAUDE.md) |
| JS minification & hashing | [CLAUDE.md](CLAUDE.md) |
| Asset manifest | [CLAUDE.md](CLAUDE.md) |
| Search indexing | [CLAUDE.md](CLAUDE.md) |

## 🏗️ Architecture

### Build Process

```
CSS:  src/css/*.css → bundle-css.js → _site/css/main.[hash].css
JS:   src/js/*.js → hash-js.js → _site/js/main.[hash].js
HTML: src/**/*.md + layouts → Eleventy → _site/**/*.html
```

### Cache Busting

Both CSS and JS use content-based hashing:
- Files named: `main.[hash].css`, `main.[hash].js`
- Hash changes when content changes
- Manifest file: `src/_data/manifest.json`
- Templates reference: `{{ assets.css }}`, `{{ assets.js }}`

See `scripts/bundle-css.js` and `scripts/hash-js.js` for implementation.

### Data Flow

```
Data files (_data/*.json)
  ↓
Eleventy collections (config/collections/)
  ↓
Filters transform data (config/filters/)
  ↓
Templates render (src/_includes/)
  ↓
Static HTML output (_site/)
```

### Page Generation

**Static pages:**
- Homepage: `src/index.md` + `current-theme.njk`
- Themes archive: `src/pages/themes.md` + `list-themes.njk`

**Dynamic pages (pagination):**
- Theme pages: `theme-page.njk` (one per theme)
- Author pages: `author-page.njk` (one per author)
- Category pages: `item-category.njk` (one per category)
- Tag pages: `item-tag.njk` (one per tag)
- Article pages: `article.njk` (one per article)

## 🛠️ Development Patterns

### Adding a New Filter

1. Create file in `config/filters/`
2. Export function
3. Add to `config/filters/index.js`
4. Auto-registered via barrel export

Example:
```javascript
// config/filters/my-filter.js
export function myFilter(value) {
  return value.toUpperCase();
}

// config/filters/index.js
export * from './my-filter.js';
```

### Adding a New Collection

1. Create file in `config/collections/`
2. Export function
3. Add to `config/collections/index.js`
4. Auto-registered via barrel export

Example:
```javascript
// config/collections/my-collection.js
export function myCollection(collectionApi) {
  return collectionApi.getFilteredByGlob('src/my-content/**/*.md');
}

// config/collections/index.js
export * from './my-collection.js';
```

### Adding a New Page Template

1. Create `.njk` file in `src/_includes/layouts/`
2. Use frontmatter for pagination if needed
3. Reference data and collections
4. Use filters to transform data

See [ELEVENTY-GUIDE.md](ELEVENTY-GUIDE.md) for detailed examples.

## 🎯 Key Technologies

- **Eleventy** - Static site generator (v3.1.2)
- **Nunjucks** - Template engine
- **Liquid** - Markdown template processor
- **lightningcss** - CSS processing and minification
- **esbuild** - JavaScript minification
- **Pagefind** - Search indexing
- **Node.js** - Runtime (ES Modules)

## 📊 Performance

### Caching Strategy

Configured in `src/_headers`:

```
Hashed assets (CSS/JS):  1 year, immutable
HTML pages:              no cache
RSS/Sitemap:             1 hour
Source maps:             1 year, immutable
```

### Build Optimization

- CSS: Bundled, minified, hashed
- JS: Minified, hashed
- Images: Responsive with @11ty/eleventy-img
- Search: Post-build indexing with Pagefind

### Watch Targets

Configured in `eleventy.config.js`:
- CSS: `src/css/**/*.css`
- JS: `src/js/**/*.js`
- Auto-rebuilds on changes

## 🧪 Testing

```bash
# Run all validations
npm test

# Check for duplicate article slugs
npm run check:duplicates

# Validate theme/author/category references
npm run validate:references
```

## 🐛 Debugging

### Build Issues

**Enable verbose output:**
```bash
DEBUG=Eleventy* npx @11ty/eleventy
```

**Common issues:**
- Nunjucks syntax errors → Check template syntax
- Data not available → Check data cascade
- Collection empty → Check glob patterns
- Build slow → Check watch targets

### Search Issues

**Debug search indexing:**
```bash
npm run search:normalize  # Creates _site_normalized
npm run search:pagefind   # Indexes (check for warnings)
# Don't run cleanup to inspect _site_normalized
```

## 📚 Additional Resources

- **Eleventy Docs**: https://www.11ty.dev/docs/
- **Nunjucks Docs**: https://mozilla.github.io/nunjucks/
- **lightningcss**: https://lightningcss.dev/
- **esbuild**: https://esbuild.github.io/
- **Pagefind**: https://pagefind.app/

## 🤝 Contributing

### Code Style

- Use ES Modules (`import`/`export`)
- Modular configuration (separate files)
- Comments for complex logic
- Descriptive variable names

### Git Workflow

- Create feature branches
- Write clear commit messages
- Test locally before pushing
- Include AI attribution in commits

### Documentation

- Update relevant docs when changing code
- Add comments for non-obvious code
- Keep README files current
- Document breaking changes

---

*Documentation for developers. For content editing docs, see [../content/](../content/)*
