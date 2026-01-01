/**
 * UI Strings - Internationalization Data
 *
 * This file contains all user-facing French strings used throughout the site.
 * Organized by category for easy maintenance and future i18n plugin migration.
 *
 * Structure designed to be compatible with eleventy-plugin-i18n and similar
 * internationalization solutions.
 */

export default {
  // Accessibility strings - Screen readers, ARIA labels, skip links
  accessibility: {
    skipToContent: "Aller au contenu principal",
    openMenu: "Ouvrir le menu de navigation",
    homeLink: "Accueil - PAUSE",
    searchLink: "Rechercher",
    tagsLink: "Tags",
    themeToggle: "Changer le thème",
    themeStatus: "Actuel: Thème clair",
    breadcrumbs: "Fil d'Ariane",
    footerNav: "Navigation du pied de page",
    socialLinks: "Réseaux sociaux"
  },

  // Navigation - Main menu and breadcrumbs
  nav: {
    home: "Accueil",
    themes: "Thèmes",
    allThemes: "Tous les Thèmes",
    standalone: "Autres Articles",
    search: "Recherche",
    tags: "Tags",
    authors: "Auteurs"
  },

  // Theme-related strings
  theme: {
    themeLabel: "Thème",
    number: "Numéro",
    numberShort: "N°",
    themePrefix: "Thème",
    articlesOfTheme: "Articles du thème",
    articlesTitle: "Articles du thème",
    noCurrentTheme: "Aucun thème actuel n'est défini pour le moment.",
    noArticles: "Aucun article n'a encore été publié pour ce thème.",
    viewTheme: "Voir le thème",
    viewThemeArrow: "Voir le thème →",
    backToThemes: "← Retour à tous les thèmes",
    discoverThemes: "Découvrir les Thèmes",
    discoverDescription: "Explorez notre collection complète de thèmes et leurs articles",
    viewAllThemes: "Voir tous les thèmes"
  },

  // Article-related strings
  article: {
    by: "Par",
    writtenBy: "Écrit par",
    publishedOn: "Publié le",
    readMore: "Lire la suite",
    relatedArticles: "À lire aussi",
    relatedDescription: "Articles en lien avec ce sujet",
    articles: "Articles",
    independentDescription: "Articles non liés à un thème spécifique, explorant des sujets variés au fil de nos réflexions.",
    viewAllIndependent: "Voir tous les articles indépendants"
  },

  // Badges - Labels and status indicators
  badges: {
    editorial: "Éditorial",
    featured: "À la Une",
    currentTheme: "Thème actuel"
  },

  // Common UI elements
  common: {
    welcome: "Bienvenue",
    article: "article",
    articles: "articles",
    published: "publié",
    publishedPlural: "publiés",
    min: "min",
    readingTime: "min de lecture"
  },

  // Footer - Site footer content
  footer: {
    tagline: "PAUSE - La revue qui prend son temps",
    copyright: "PAUSE",
    followUs: "Suivez-nous :",
    links: {
      about: "À propos",
      contribute: "Contribuer",
      contact: "Contact",
      themes: "Thèmes",
      tags: "Tags",
      sitemap: "Plan du site",
      legal: "Mentions légales",
      privacy: "Confidentialité",
      rss: "RSS"
    }
  },

  // Social media - Platform names for aria-labels
  social: {
    instagram: "Instagram",
    bluesky: "Bluesky",
    tiktok: "TikTok",
    linkedin: "LinkedIn",
    facebook: "Facebook"
  }
};
