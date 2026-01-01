---
title: "Exemple d'article avec image optimisée"
author: Claude Sonnet
date: 2025-12-26
category: culture
theme: les-mots
chapeau: "Découvrez comment intégrer des images optimisées dans vos articles"
description: "Un article exemple montrant l'utilisation du plugin d'images Eleventy"
image: src/images/articles/exemple-image.jpg
imageAlt: "Illustration montrant un exemple de rendu d'image optimisée avec plusieurs formats et tailles générés automatiquement"
ogImage: "/images/articles/exemple-image-og.jpg"
keywords:
  - "optimisation images"
  - Eleventy
  - "images responsives"
  - WebP
  - "performance web"
  - "lazy loading"
tags:
  - documentation
  - images
  - guide
---

Cet article est un exemple d'utilisation du plugin d'images Eleventy (`@11ty/eleventy-img`).

## Images automatiquement optimisées

Le plugin génère automatiquement plusieurs versions de chaque image :
- **4 tailles différentes** : 300px, 600px, 900px et 1200px
- **2 formats** : WebP (moderne et léger) et JPEG (compatible)
- **Lazy loading** : les images se chargent uniquement quand nécessaire
- **Responsive** : la bonne image est chargée selon la taille de l'écran

## L'image de cet article

L'image associée à cet article (visible dans le front matter avec `image: "/images/articles/exemple-image.jpg"`) sera automatiquement :
1. Redimensionnée en plusieurs tailles
2. Convertie en WebP pour les navigateurs modernes
3. Optimisée pour de meilleures performances

## Avantages

- Temps de chargement réduit
- Meilleure expérience utilisateur
- SEO amélioré
- Économie de bande passante

Vous pouvez remplacer les images SVG de placeholder par de vraies photos pour voir la différence !
