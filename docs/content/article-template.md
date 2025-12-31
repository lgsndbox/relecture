---
layout: layouts/article.njk
title: "Your Article Title Here"
description: "A brief description of 120-160 characters for SEO and social media sharing. Make it compelling!"
chapeau: "A short lead paragraph (1-3 sentences) that appears between the title and content. This draws readers in and sets the tone for the article."
image: src/images/articles/your-image.jpg
imageAlt: "Descriptive alt text for accessibility and SEO"
ogImage: "/images/articles/your-image-og.jpg"
keywords:
  - keyword1
  - keyword2
  - keyword3
author: Author Name
date: 2025-12-31
category: philosophie
theme: les-mots
editorial: false
mainArticle: false
featured: false
tags:
  - tag1
  - tag2
  - tag3
---

<!--
================================================================================
ARTICLE FRONTMATTER GUIDE
================================================================================

REQUIRED FIELDS:
----------------
layout: layouts/article.njk
  → Always use this value for articles

title: "Your Article Title"
  → Article title (4-10 words recommended)
  → Use quotes if title contains special characters
  → Appears in <h1>, browser tab, search results

date: 2025-12-31
  → Publication date in YYYY-MM-DD format
  → Used for sorting (newest first)
  → Future dates don't hide articles

category: philosophie
  → REQUIRED - Must match a category slug from src/_data/categories.json
  → Available categories:
    • entretiens - Conversations et interviews
    • analyse-discours - Décryptage et analyse de discours
    • culture - Littérature, arts, cinéma, théâtre, musique
    • philosophie - Réflexions philosophiques et pensée
    • societe - Questions sociales et vie quotidienne
    • politique - Actualité politique et débats
    • sciences - Sciences, technologie et environnement
    • correspondance - Correspondance et liens internationaux

HIGHLY RECOMMENDED FIELDS:
--------------------------
description: "Brief description for SEO"
  → 120-160 characters recommended
  → Used in meta tags, social sharing, article cards
  → Should entice without revealing everything

chapeau: "Short lead paragraph"
  → 1-3 sentences that hook the reader
  → Appears between title and main content
  → Provides context and sets expectations
  → Different purpose than description (which is for SEO/cards)

author: Full Author Name
  → Use proper accents (Émilie, François, etc.)
  → Auto-generates author page at /authors/author-slug/
  → Should match name in src/_data/authors.json for bio display
  → Slug auto-generated: "Émilie Gabiot" → "emilie-gabiot"

OPTIONAL FIELDS:
----------------
image: src/images/articles/my-image.jpg
  → Path to article's main illustration
  → Displayed at top of article page and in cards
  → Recommended size: 1200x630px minimum
  → Formats: JPG, PNG, WebP

imageAlt: "Description for screen readers"
  → REQUIRED if image is used
  → Describes image content for accessibility
  → Important for SEO and when image fails to load

ogImage: "/images/articles/my-image-og.jpg"
  → Custom Open Graph image for social sharing
  → Falls back to image if not specified
  → Recommended size: 1200x630px

keywords:
  - keyword1
  - keyword2
  → Array of SEO keywords
  → 3-8 keywords recommended
  → Should be specific and relevant

theme: les-mots
  → Associates article with a monthly theme
  → Must match theme slug from src/_data/themes.json
  → Available themes: les-mots, la-nature, le-temps, la-memoire, la-campagne
  → OMIT COMPLETELY for articles not associated with a theme
  → Makes article appear on theme page

editorial: true
  → Set to true for ONE special editorial article per theme
  → Shows red "ÉDITORIAL" badge
  → Typically written by editor/site owner
  → Introduces or reflects on the theme
  → Default: false (can be omitted)

mainArticle: true
  → Set to true for ONE main article per theme
  → Shows blue "ARTICLE PRINCIPAL" badge
  → Distinct from editorial (theme can have both)
  → Gets prominent homepage display
  → Default: false (can be omitted)

featured: true
  → Set to true to feature on homepage
  → Appears in "Articles à la Une" section
  → Can be from any theme (or no theme)
  → Limit to 3-6 featured articles sitewide
  → Update regularly to keep homepage fresh
  → Default: false (can be omitted)

tags:
  - tag1
  - tag2
  → Free-form tags (array)
  → Generates tag pages at /tags/tag-name/
  → 3-8 tags recommended per article
  → Auto-slugified: "Français" → "francais"
  → Be specific and consistent across articles
  → Don't duplicate category or theme as tags

================================================================================
QUICK EXAMPLES
================================================================================

GENERAL ARTICLE (no theme):
---------------------------
layout: layouts/article.njk
title: "Guide de Navigation"
description: "Comment naviguer efficacement sur le site PAUSE"
chapeau: "Découvrez toutes les fonctionnalités du site."
author: Claude Sonnet
date: 2025-12-15
category: culture
tags:
  - guide
  - documentation
  - navigation

THEMED ARTICLE:
---------------
layout: layouts/article.njk
title: "Le Pouvoir des Mots"
description: "Exploration de l'influence du langage sur la pensée"
chapeau: "Comment les mots façonnent-ils notre réalité ?"
image: src/images/articles/pouvoir-mots.jpg
imageAlt: "Lettres formant un réseau interconnecté"
author: Émilie Gabiot
date: 2025-12-10
category: philosophie
theme: les-mots
featured: true
tags:
  - linguistique
  - philosophie
  - wittgenstein

EDITORIAL ARTICLE:
------------------
layout: layouts/article.njk
title: "Éditorial : Les Mots"
description: "Introduction au thème du mois"
chapeau: "Pourquoi avons-nous choisi d'explorer les mots ce mois-ci ?"
author: Émilie Gabiot
date: 2025-12-01
category: philosophie
theme: les-mots
editorial: true
featured: true
tags:
  - éditorial
  - langage

================================================================================
CONTENT WRITING TIPS
================================================================================

Use Markdown formatting below this frontmatter section.

HEADINGS:
---------
## Main Section Heading (h2)
### Subsection Heading (h3)
#### Minor Heading (h4)

Don't use # (h1) - that's reserved for the article title.

PARAGRAPHS:
-----------
Write clear, concise paragraphs.
Leave blank lines between paragraphs.

Use the chapeau field for your opening hook, then start the main content.

CITATIONS:
----------
> Quote text here
>
> **Author Name**

EMPHASIS:
---------
**Bold text** for strong emphasis
*Italic text* for subtle emphasis

LISTS:
------
- Unordered list item
- Another item
  - Nested item (2 spaces)

1. Ordered list item
2. Another numbered item

LINKS:
------
[Link text](https://example.com)
[Internal link](/category/article-slug/)

IMAGES:
-------
![Alt text](image-path.jpg)
*Image caption goes here in italics*

CODE:
-----
Inline `code here` with backticks.

Blocks with triple backticks:
```javascript
const example = "code block";
```

TABLES:
-------
| Header 1 | Header 2 |
|----------|----------|
| Data 1   | Data 2   |
| Data 3   | Data 4   |

*Table caption above table in italics*

BREAKS:
-------
Use --- for horizontal rule (use sparingly)

---

-->

Write your article content here in Markdown.

Start with engaging content that follows naturally from your chapeau.

## First Major Section

Your first section content...

### Subsection

More detailed content...

## Second Major Section

Continue your article...

> Include relevant quotes when appropriate
>
> **Author Name**

## Conclusion

Wrap up your thoughts...

**Bold key takeaways** to help readers remember the main points.
