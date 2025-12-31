# Guide des Catégories

## Vue d'ensemble

Les catégories organisent les articles par **sujet** (contrairement aux thèmes qui sont **temporels**).

**Catégories fixes :** Littérature, Culture, Arts, Philosophie, Société, Politique, Sciences

**Différence avec les thèmes :**
- **Catégorie** = De quoi parle l'article (sujet permanent)
- **Thème** = Dans quel contexte éditorial mensuel (temporel)

Un article peut avoir **les deux** : une catégorie ET un thème.

## Les 7 Catégories

Définies dans `_data/categories.json` :

| ID | Nom | Description |
|----|-----|-------------|
| `litterature` | Littérature | Livres, poésie, écriture et auteurs |
| `culture` | Culture | Cinéma, théâtre, musique et spectacles |
| `arts` | Arts | Peinture, sculpture, photographie et arts visuels |
| `philosophie` | Philosophie | Réflexions philosophiques et pensée |
| `societe` | Société | Questions sociales et vie quotidienne |
| `politique` | Politique | Actualité politique et débats |
| `sciences` | Sciences | Sciences, technologie et environnement |

## Utilisation dans les articles

### Front matter

**La catégorie est OBLIGATOIRE** pour tous les articles :

```yaml
---
layout: article.njk
title: Mon Article
author: Auteur
date: 2026-01-15
category: philosophie    # OBLIGATOIRE
theme: les-mots          # Optionnel
---
```

### Catégories disponibles

Utilisez exactement ces IDs (en minuscules, sans accents) :

- `litterature`
- `culture`
- `arts`
- `philosophie`
- `societe`
- `politique`
- `sciences`

## Pages générées automatiquement

Chaque catégorie génère une page à :

```
/[categorie-id]/
```

**Exemples :**
- `/litterature/` - Tous les articles de littérature
- `/philosophie/` - Tous les articles de philosophie
- `/sciences/` - Tous les articles de sciences

## Navigation

Les catégories apparaissent dans le menu principal :

```
Accueil | Littérature | Culture | Arts | Philosophie | Société | Politique | Sciences | Thèmes
```

## Affichage sur les articles

Chaque article affiche :
1. **Badge catégorie** - Avec lien vers la page catégorie
2. **Badge thème** - Si l'article a un thème (optionnel)

Les deux badges apparaissent côte à côte en haut de l'article.

## Exemples

### Article avec catégorie ET thème

```yaml
---
title: Le Pouvoir des Mots
category: philosophie
theme: les-mots
---
```

Affiche :
- Badge "Philosophie" (lien vers `/philosophie/`)
- Badge "Les Mots" (thème n°1)

### Article avec catégorie SANS thème

```yaml
---
title: Introduction à Kant
category: philosophie
# Pas de theme
---
```

Affiche :
- Badge "Philosophie" uniquement

## Modifier les catégories

### Ajouter une catégorie

**Ne pas faire !** Les catégories sont fixes par design.

Si vraiment nécessaire :

1. Ajouter dans `_data/categories.json`
2. Ajouter le lien dans `_includes/base.njk` (navigation)
3. Mettre à jour `CATEGORIES.md` et `_article-template.md`

### Renommer une catégorie

1. Modifier dans `_data/categories.json`
2. **Mettre à jour tous les articles** utilisant cette catégorie
3. Rebuild : `npx @11ty/eleventy`

### Choisir la bonne catégorie

**Littérature :**
- Romans, poésie, nouvelles
- Critiques littéraires
- Écriture, style

**Culture :**
- Cinéma, films, réalisateurs
- Théâtre, pièces, dramaturgie
- Musique, concerts, compositeurs

**Arts :**
- Peinture, peintres
- Sculpture, installation
- Photographie
- Architecture
- Arts visuels en général

**Philosophie :**
- Réflexions philosophiques
- Concepts, pensée
- Philosophes et courants

**Société :**
- Questions sociales
- Vie quotidienne
- Comportements, tendances
- Urbanisme, éducation

**Politique :**
- Actualité politique
- Débats politiques
- Institutions, gouvernance

**Sciences :**
- Sciences dures (physique, chimie, bio)
- Technologie, innovation
- Environnement, écologie
- Santé, médecine

## Bonnes pratiques

1. **Toujours spécifier une catégorie** dans chaque article
2. **Choisir la catégorie principale** si l'article touche plusieurs sujets
3. **Utiliser les tags** pour les sujets secondaires
4. **Cohérence** : même type d'article = même catégorie

## Vérification

Après avoir assigné des catégories aux articles :

1. Construire : `npx @11ty/eleventy`
2. Vérifier que l'article apparaît sur la page catégorie
3. Vérifier le badge catégorie sur l'article
4. Vérifier le lien du badge fonctionne

## Voir aussi

- **THEMES-GUIDE.md** - Gestion des thèmes (organisation temporelle)
- **AUTHORS.md** - Gestion des auteurs
- **_article-template.md** - Template pour nouveaux articles
