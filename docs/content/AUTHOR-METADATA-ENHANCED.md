# Enhanced Author Metadata (Optional)

This document shows optional enhancements you can make to author metadata for better SEO, social sharing, and user experience.

## Current Author Schema (Minimal)

**File:** `src/_data/authors.json`

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

**What this provides:**
- ✅ Author page at `/authors/emilie-gabiot/`
- ✅ Bio displayed on author page
- ✅ Author name on articles
- ✅ Basic functionality

## Enhanced Author Schema (Recommended)

```json
[
  {
    "slug": "emilie-gabiot",
    "name": "Émilie Gabiot",
    "bio": "Écrivaine et observatrice du quotidien, passionnée par les mots et la nature. Contributrice régulière à PAUSE depuis 2025.",
    "bioShort": "Écrivaine et observatrice du quotidien",
    "image": "/images/authors/emilie-gabiot.jpg",
    "imageAlt": "Portrait d'Émilie Gabiot",
    "email": "emilie@example.com",
    "website": "https://emiliegabiot.fr",
    "social": {
      "twitter": "@emiliegabiot",
      "mastodon": "@emilie@mastodon.social",
      "linkedin": "emilie-gabiot"
    },
    "seo": {
      "title": "Émilie Gabiot - Écrivaine et Contributrice PAUSE",
      "description": "Page auteur d'Émilie Gabiot sur PAUSE. Découvrez tous ses articles sur les mots, la nature et la contemplation."
    }
  }
]
```

## Field Descriptions

### Core Fields (Already Implemented)

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `slug` | string | Yes | URL-safe identifier (must match auto-generated slug from name) |
| `name` | string | Yes | Full display name with proper accents |
| `bio` | string | No | Biography (1-3 sentences) shown on author page |
| `email` | string | No | Contact email (not publicly displayed currently) |

### Enhanced Fields (Optional)

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `bioShort` | string | No | Short bio (1 sentence) for compact displays |
| `image` | string | No | Path to author photo/avatar |
| `imageAlt` | string | No* | Alt text for author image (*required if image provided) |
| `website` | string | No | Personal website or portfolio URL |
| `social` | object | No | Social media handles (see below) |
| `seo` | object | No | SEO-specific metadata (see below) |

### Social Object

```json
"social": {
  "twitter": "@emiliegabiot",      // Twitter handle
  "mastodon": "@emilie@mastodon.social",  // Mastodon address
  "linkedin": "emilie-gabiot",     // LinkedIn username
  "github": "emiliegabiot"         // GitHub username (if relevant)
}
```

### SEO Object

```json
"seo": {
  "title": "Custom page title for SEO",
  "description": "Custom meta description for author page"
}
```

## Implementation Examples

### Example 1: Writer with Social Media

```json
{
  "slug": "sophie-martin",
  "name": "Sophie Martin",
  "bio": "Écrivaine et philosophe, spécialisée dans les questions existentielles et la perception du temps. Auteure de trois essais sur la temporalité.",
  "bioShort": "Écrivaine et philosophe",
  "image": "/images/authors/sophie-martin.jpg",
  "imageAlt": "Photo de profil de Sophie Martin",
  "website": "https://sophiemartin.com",
  "social": {
    "twitter": "@sophiemartin",
    "mastodon": "@sophie@writing.exchange"
  },
  "seo": {
    "title": "Sophie Martin - Philosophe et Essayiste | PAUSE",
    "description": "Découvrez les articles de Sophie Martin sur la philosophie, le temps et l'existence. Contributions régulières à la revue PAUSE."
  }
}
```

### Example 2: Academic/Researcher

```json
{
  "slug": "dr-thomas-mercier",
  "name": "Dr. Thomas Mercier",
  "bio": "Neuroscientifique et chercheur au CNRS, spécialiste de la cognition et de la mémoire. Docteur en neurosciences de l'Université Paris-Saclay.",
  "bioShort": "Neuroscientifique, chercheur CNRS",
  "image": "/images/authors/thomas-mercier.jpg",
  "imageAlt": "Portrait du Dr. Thomas Mercier en laboratoire",
  "email": "thomas.mercier@cnrs.fr",
  "website": "https://research.cnrs.fr/thomas-mercier",
  "social": {
    "twitter": "@ThomasMercierCNRS",
    "linkedin": "thomas-mercier-phd"
  },
  "seo": {
    "title": "Dr. Thomas Mercier - Neuroscientifique | Articles PAUSE",
    "description": "Articles scientifiques du Dr. Thomas Mercier sur la cognition, la mémoire et les neurosciences. Chercheur CNRS et contributeur PAUSE."
  }
}
```

### Example 3: Journalist/Critic

```json
{
  "slug": "claire-rousseau",
  "name": "Claire Rousseau",
  "bio": "Journaliste culturelle et critique littéraire pour Le Monde et PAUSE. Passionnée par les arts et la création contemporaine depuis 15 ans.",
  "bioShort": "Journaliste culturelle",
  "image": "/images/authors/claire-rousseau.jpg",
  "imageAlt": "Claire Rousseau, journaliste culturelle",
  "website": "https://clairerousseau.net",
  "social": {
    "twitter": "@ClaireRousseauCulture",
    "linkedin": "claire-rousseau-journalist",
    "mastodon": "@claire@journa.host"
  }
}
```

### Example 4: Minimal (Current Implementation)

```json
{
  "slug": "jean-marc-durand",
  "name": "Jean-Marc Durand",
  "bio": "Linguiste et traducteur, expert en étymologie et en évolution des langues.",
  "email": ""
}
```

## Benefits of Enhanced Metadata

### Author Images
- **Visual recognition** - Readers can put a face to the name
- **Professional appearance** - Looks more polished
- **Author cards** - Can be used in article bylines, author listings
- **Social sharing** - Better OG images for author pages

### Social Links
- **Connect with readers** - Let them follow authors they like
- **Cross-platform presence** - Build author following
- **Credibility** - Shows active engagement in their field
- **Community building** - Foster connections

### SEO Metadata
- **Better search results** - Custom titles/descriptions for author pages
- **More traffic** - Optimized for "Author Name + topic" searches
- **Brand building** - Consistent presence across Google results
- **Click-through rate** - Better descriptions = more clicks

### Short Bio
- **Compact displays** - Use in article bylines, cards
- **Consistency** - Same short intro everywhere
- **Scannable** - Quick identification of expertise

## Template Usage Examples

### Displaying Author Images

```njk
{# In article byline #}
{% if author.image %}
<div class="article-byline__author-image">
  <img src="{{ author.image }}" alt="{{ author.imageAlt or author.name }}" loading="lazy">
</div>
{% endif %}
<div class="article-byline__author-info">
  <span class="article-byline__author-name">{{ author.name }}</span>
  {% if author.bioShort %}
  <span class="article-byline__author-bio">{{ author.bioShort }}</span>
  {% endif %}
</div>
```

### Displaying Social Links

```njk
{# On author page #}
{% if author.social %}
<div class="author-social">
  {% if author.social.twitter %}
  <a href="https://twitter.com/{{ author.social.twitter }}" class="social-link social-link--twitter">
    Twitter
  </a>
  {% endif %}
  {% if author.social.mastodon %}
  <a href="https://{{ author.social.mastodon.split('@')[2] }}/@{{ author.social.mastodon.split('@')[1] }}" class="social-link social-link--mastodon">
    Mastodon
  </a>
  {% endif %}
  {% if author.social.linkedin %}
  <a href="https://linkedin.com/in/{{ author.social.linkedin }}" class="social-link social-link--linkedin">
    LinkedIn
  </a>
  {% endif %}
</div>
{% endif %}
```

### Using Custom SEO

```njk
{# In item-author.njk frontmatter #}
eleventyComputed:
  title: "{{ author.seo.title or author.name }}"
  description: "{{ author.seo.description or ('Articles by ' + author.name) }}"
  socialImage: "{{ author.image or site.defaultImage }}"
```

## Migration Path

### Phase 1: Add Author Images (Low effort, high impact)
```json
{
  "slug": "existing-author",
  "name": "Existing Author",
  "bio": "...",
  "image": "/images/authors/existing-author.jpg",  // ADD THIS
  "imageAlt": "Portrait of Existing Author"        // ADD THIS
}
```

### Phase 2: Add Social Links (Optional)
```json
{
  "social": {
    "twitter": "@handle"  // ADD THIS
  }
}
```

### Phase 3: Add SEO (For key authors)
```json
{
  "seo": {
    "title": "Custom Title",
    "description": "Custom Description"
  }
}
```

## Image Guidelines

### Author Photos
- **Size:** 400x400px minimum (square)
- **Format:** JPG or WebP
- **Style:** Professional headshot or portrait
- **Background:** Clean, not distracting
- **Lighting:** Well-lit, clear face
- **Crop:** Face clearly visible

### Naming Convention
```
/images/authors/[author-slug].jpg

Examples:
/images/authors/emilie-gabiot.jpg
/images/authors/dr-thomas-mercier.jpg
/images/authors/claire-rousseau.jpg
```

## Backward Compatibility

**Good news:** All enhanced fields are **optional**. Existing authors with minimal metadata will continue to work perfectly.

The system gracefully falls back:
- No image? → No image displayed
- No social? → Social section not shown
- No SEO? → Uses default title/description

## Recommendations

### Do This:
1. ✅ Add images for regular contributors
2. ✅ Add social links if authors are active online
3. ✅ Use bioShort for compact displays
4. ✅ Add SEO for authors with many articles

### Optional:
5. 🤷 Add website if they have one
6. 🤷 Add custom SEO for all authors

### Don't Need To:
7. ❌ Add all fields for occasional contributors
8. ❌ Force social media on everyone
9. ❌ Make images mandatory

## Questions?

- **Do I need to update all authors?** No, only enhance the ones you want
- **What if an author doesn't have social media?** Skip the social object
- **Can I add fields later?** Yes, just update the JSON file
- **Will old authors break?** No, all new fields are optional

---

*This is an optional enhancement. The current minimal schema works great!*
