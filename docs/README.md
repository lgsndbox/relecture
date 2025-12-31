# PAUSE Documentation

Welcome to the PAUSE documentation! This guide is organized into two main sections based on your role.

## 📝 For Content Editors

If you're writing articles, managing themes, or editing content, start here:

**[→ Content Documentation](content/)**

- **[Content Guide](content/CONTENT-GUIDE.md)** - Complete guide to creating and managing content
- **[Article Template](content/article-template.md)** - Template for creating new articles
- **[Authors Guide](content/AUTHORS.md)** - Managing author bios and pages
- **[Categories Guide](content/CATEGORIES.md)** - Understanding and managing categories

### Quick Start for Content Editors

```bash
# 1. Copy the article template
cp docs/content/article-template.md src/articles/my-article.md

# 2. Edit the frontmatter and write your content

# 3. Preview your changes
npm start
```

## 🔧 For Developers

If you're building features, modifying the site structure, or need technical details:

**[→ Development Documentation](development/)**

- **[Project Overview](development/CLAUDE.md)** - Complete project documentation
- **[Eleventy Guide](development/ELEVENTY-GUIDE.md)** - Eleventy technical guide (800+ lines)
- **[Data Model](development/DATA-MODEL.md)** - Data structures and access patterns
- **[Internationalization](development/I18N-SETUP.md)** - i18n system documentation
- **[Technical Decisions](development/ARRAY-VS-OBJECT.md)** - Architecture decisions

### Quick Start for Developers

```bash
# Development server
npm start

# Production build
npm run build

# Run tests
npm test
```

## Documentation Structure

```
docs/
├── README.md                    # This file - documentation overview
├── content/                     # For content editors and writers
│   ├── README.md               # Content documentation overview
│   ├── CONTENT-GUIDE.md        # Complete content management guide
│   ├── article-template.md     # Template for new articles
│   ├── AUTHORS.md              # Managing authors
│   └── CATEGORIES.md           # Managing categories
│
└── development/                 # For developers and site builders
    ├── README.md               # Development documentation overview
    ├── CLAUDE.md               # Complete project documentation
    ├── ELEVENTY-GUIDE.md       # Eleventy technical guide
    ├── DATA-MODEL.md           # Data structures
    ├── I18N-SETUP.md           # Internationalization
    └── ARRAY-VS-OBJECT.md      # Technical decisions
```

## Common Tasks

### Content Editors

- **Create an article** → See [Content Guide](content/CONTENT-GUIDE.md#creating-articles)
- **Add a new theme** → See [Content Guide](content/CONTENT-GUIDE.md#managing-themes)
- **Add author bio** → See [Authors Guide](content/AUTHORS.md)
- **Understand categories** → See [Categories Guide](content/CATEGORIES.md)

### Developers

- **Understand project structure** → See [Project Overview](development/CLAUDE.md)
- **Add new features** → See [Eleventy Guide](development/ELEVENTY-GUIDE.md)
- **Work with data** → See [Data Model](development/DATA-MODEL.md)
- **Add translations** → See [i18n Setup](development/I18N-SETUP.md)

## Need Help?

- **Content questions** → Check the [Content Guide](content/CONTENT-GUIDE.md)
- **Technical questions** → Check the [Eleventy Guide](development/ELEVENTY-GUIDE.md)
- **Build errors** → See troubleshooting sections in respective guides
- **Not sure where to look?** → Start with this README and follow the links

## Contributing

Whether you're contributing content or code:

1. **Read the relevant documentation** (content/ or development/)
2. **Follow the examples** provided in the guides
3. **Test locally** before committing
4. **Commit with clear messages**

---

*Last updated: December 2025*
