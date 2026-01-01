# Guide de Gestion des Auteurs

## Où sont stockés les auteurs ?

Les informations des auteurs sont définies dans le fichier **`_data/authors.json`**

## Structure d'un auteur

Chaque auteur est défini par une **clé** (le slug de l'auteur) et un **objet** avec ses propriétés :

```json
"auteur-slug": {
  "name": "Nom de l'Auteur",
  "bio": "Courte biographie de l'auteur",
  "email": "email@example.com"
}
```

**Note :** Le slug de l'auteur est la **clé de l'objet**. Il doit correspondre au slug généré automatiquement à partir du nom de l'auteur dans les articles.

### Propriétés

| Propriété | Type | Requis | Description | Exemple |
|-----------|------|--------|-------------|---------|
| **Clé** | string | Oui | Slug de l'auteur (kebab-case, sans accents) | `"emilie-gabiot"` |
| `name` | string | Oui | Nom complet de l'auteur | `"Émilie Gabiot"` |
| `bio` | string | Non | Biographie courte | `"Écrivaine et observatrice..."` |
| `email` | string | Non | Email (peut être vide) | `"email@example.com"` |

## Génération automatique des slugs

Le système génère automatiquement un slug à partir du nom d'auteur dans les articles :

- `"Émilie Gabiot"` → `"emilie-gabiot"`
- `"Jean-Pierre Martin"` → `"jean-pierre-martin"`
- `"Marie O'Connor"` → `"marie-oconnor"`

**Règles de conversion :**
1. Conversion en minuscules
2. Suppression des accents
3. Remplacement des caractères non alphanumériques par des tirets
4. Suppression des tirets en début et fin

## Comment ajouter un nouvel auteur

### Méthode 1 : Sans informations supplémentaires

Si vous voulez juste qu'un auteur puisse écrire des articles sans page dédiée :

1. **Utilisez simplement le nom dans le front matter des articles**
2. Aucune modification de `authors.json` n'est nécessaire

```yaml
---
layout: article.njk
title: Mon Article
author: Nouveau Auteur    # ← Ajoutez simplement le nom ici
date: 2026-01-15
theme: les-mots
---
```

Le système créera automatiquement une page auteur à `/authors/nouveau-auteur/` qui listera tous ses articles.

### Méthode 2 : Avec biographie

Si vous voulez ajouter une biographie qui s'affichera sur la page de l'auteur :

1. Ouvrez `_data/authors.json`
2. Ajoutez une nouvelle entrée :

```json
{
  "emilie-gabiot": {
    "name": "Émilie Gabiot",
    "bio": "Écrivaine et observatrice du quotidien, passionnée par les mots et la nature.",
    "email": ""
  },
  "nouveau-auteur": {
    "name": "Nouveau Auteur",
    "bio": "Biographie du nouvel auteur ici.",
    "email": "nouveau@example.com"
  }
}
```

**Important :** Le slug (clé) doit correspondre exactement au slug généré automatiquement à partir du nom.

## Vérifier le slug d'un auteur

Pour vérifier quel slug sera généré pour un nom :

| Nom dans l'article | Slug généré | Clé dans authors.json |
|-------------------|-------------|----------------------|
| `Émilie Gabiot` | `emilie-gabiot` | `"emilie-gabiot"` |
| `Jean-Marie Dupont` | `jean-marie-dupont` | `"jean-marie-dupont"` |
| `O'Neil Martin` | `oneil-martin` | `"oneil-martin"` |
| `François Lefèvre` | `francois-lefevre` | `"francois-lefevre"` |

## Exemple complet

### 1. Ajouter l'auteur dans authors.json

```json
{
  "emilie-gabiot": {
    "name": "Émilie Gabiot",
    "bio": "Écrivaine et observatrice du quotidien, passionnée par les mots et la nature.",
    "email": ""
  },
  "pierre-durand": {
    "name": "Pierre Durand",
    "bio": "Photographe et écrivain voyageur, toujours à la recherche de nouvelles histoires.",
    "email": "pierre@example.com"
  }
}
```

### 2. Utiliser le nom dans un article

```yaml
---
layout: article.njk
title: Voyage en Islande
author: Pierre Durand    # ← Le nom exact tel que défini dans authors.json
date: 2026-02-15
theme: la-nature
tags:
  - voyage
  - photographie
---

Contenu de l'article...
```

### 3. Construire le site

```bash
npx @11ty/eleventy
```

Le système créera automatiquement :
- Une page auteur : `/authors/pierre-durand/`
- Listant tous les articles de Pierre Durand
- Affichant sa biographie

## Pages auteur

Chaque auteur ayant publié au moins un article obtient automatiquement une page à :

```
/authors/[auteur-slug]/
```

**Exemple :**
- `Émilie Gabiot` → `/authors/emilie-gabiot/`
- `Pierre Durand` → `/authors/pierre-durand/`

Cette page affiche :
- Le nom de l'auteur
- Sa biographie (si définie dans `authors.json`)
- Le nombre d'articles publiés
- La liste de tous ses articles avec :
  - Titre
  - Description
  - Thème associé
  - Date de publication
  - Tags

## Modifier un auteur existant

Pour modifier les informations d'un auteur :

1. Ouvrez `_data/authors.json`
2. Modifiez les propriétés de l'auteur
3. Reconstruisez le site : `npx @11ty/eleventy`

**Attention :** Si vous changez le `name`, assurez-vous de :
1. Mettre à jour le nom dans tous les articles de cet auteur
2. Mettre à jour la clé (slug) dans `authors.json` si le slug change

## Supprimer un auteur

Pour retirer un auteur :

1. Option 1 : Supprimez son entrée dans `_data/authors.json`
   - Sa page auteur continuera d'exister si des articles portent son nom
   - Seule la biographie disparaîtra

2. Option 2 : Retirez le champ `author` de tous ses articles
   - Sa page auteur ne sera plus générée

## Bonnes pratiques

### Nommage

- Utilisez des noms complets et cohérents : `"Émilie Gabiot"` pas `"E. Gabiot"` ou `"Émilie"`
- Gardez la même orthographe partout (accents inclus)
- Le système gère automatiquement la conversion en slug

### Biographies

- Gardez-les courtes (2-3 phrases maximum)
- Décrivez l'expertise ou les centres d'intérêt de l'auteur
- Pas besoin de répéter le nom (il est déjà affiché)

### Email

- Peut être laissé vide (`""`) si vous ne voulez pas le publier
- Actuellement non affiché sur le site (réservé pour usage futur)

## Vérification

Après avoir modifié `authors.json`, vérifiez que :

1. Le JSON est valide
2. Les slugs correspondent aux noms d'auteurs dans les articles
3. Le build fonctionne : `npx @11ty/eleventy`
4. Les pages auteur sont générées correctement

## Auteurs actuels

Pour voir la liste des auteurs actuellement configurés, consultez `_data/authors.json`.

Pour voir tous les auteurs ayant publié des articles, visitez `/authors/` après avoir construit le site (cette page pourrait être ajoutée dans une future version).
