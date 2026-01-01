# 🚀 Checklist Pré-Production - PAUSE

Liste complète des éléments à configurer avant la mise en production du site.

**🔴 = CRITIQUE (doit être fait)** | **🟡 = RECOMMANDÉ** | **⚪ = OPTIONNEL**

---

## 🔴 FICHIERS MANQUANTS CRITIQUES

### Favicons (OBLIGATOIRE)

- [ ] **Créer les fichiers favicon**
  - Fichiers manquants référencés dans `src/_includes/layouts/base.njk:78-81` et `src/site.webmanifest:14-24`:
    - `src/favicon-32x32.png` ❌ **N'EXISTE PAS**
    - `src/favicon-16x16.png` ❌ **N'EXISTE PAS**
    - `src/apple-touch-icon.png` ❌ **N'EXISTE PAS**
  - **Solution**: Générer avec [RealFaviconGenerator](https://realfavicongenerator.net/)
  - Upload votre logo, téléchargez le package, placez les fichiers dans `src/`

### Logo Publisher (OBLIGATOIRE pour SEO)

- [ ] **Créer le logo de l'éditeur**
  - Fichier manquant référencé dans `src/_data/site.js:32`:
    - `src/images/logo.png` ❌ **N'EXISTE PAS**
  - Utilisé dans le JSON-LD structured data (`base.njk:70`)
  - **Impact**: Google/Bing n'afficheront pas votre logo dans les résultats de recherche
  - **Format requis**: PNG, recommandé 512x512px minimum

---

## 🔧 Configuration Analytics

- [ ] **Cloudflare Web Analytics**
  - Fichier: `src/_includes/layouts/base.njk:234`
  - Remplacer `YOUR_CLOUDFLARE_TOKEN_HERE` par votre token Cloudflare
  - Obtenir le token: [Cloudflare Dashboard](https://dash.cloudflare.com/) → Web Analytics → Add a site

---

## 🌐 URLs et Domaine

- [ ] **URL du site** (3 emplacements à modifier)
  - `src/_data/site.js:8` - Remplacer `https://votre-domaine.fr`
  - `src/robots.txt:71` - Remplacer `https://votre-domaine.fr/sitemap.xml`
  - Format: `https://pause-revue.fr` (sans slash final)

- [ ] **Email de contact**
  - Fichier: `src/_data/site.js:36`
  - Remplacer `contact@votre-domaine.fr` par votre vraie adresse email

---

## 📱 Réseaux Sociaux

### Profils à créer et liens à mettre à jour

Fichier: `src/_includes/layouts/base.njk:209-223`

- [ ] **Instagram** (prioritaire)
  - Créer le compte Instagram
  - Remplacer `https://instagram.com/pause.revue` par l'URL réelle

- [ ] **Bluesky**
  - Créer le profil Bluesky
  - Remplacer `https://bsky.app/profile/pause.revue` par l'URL réelle

- [ ] **TikTok**
  - Créer le compte TikTok
  - Remplacer `https://tiktok.com/@pause.revue` par l'URL réelle

- [ ] **LinkedIn**
  - Créer la page entreprise LinkedIn
  - Remplacer `https://linkedin.com/company/pause-revue` par l'URL réelle

- [ ] **Facebook**
  - Créer la page Facebook
  - Remplacer `https://facebook.com/pause.revue` par l'URL réelle

### Handle Twitter/X (optionnel)

Fichier: `src/_data/site.js:17`

- [ ] **Twitter/X handle**
  - Si vous créez un compte Twitter/X, remplacer `@pauserevue`
  - Sinon, supprimer la section twitter du fichier site.js

---

## 🖼️ Images et Médias

### 🟡 Open Graph Images

- [ ] **OG Image par défaut** (vérifier et améliorer)
  - Fichier actuel: `src/images/og-default.png` (existe mais placeholder simple)
  - **À VÉRIFIER**: L'image s'affiche correctement (1200×630px)
  - **RECOMMANDÉ**: Créer une image professionnelle
  - Doit contenir: logo PAUSE, titre, visuel attrayant et cohérent avec la marque
  - Outils suggérés: Canva, Figma, Photoshop
  - Tester avec: [Facebook Debugger](https://developers.facebook.com/tools/debug/), [Twitter Validator](https://cards-dev.twitter.com/validator)

- [ ] **OG Images spécifiques pour articles** (optionnel, utilisera og-default.png sinon)
  - `src/images/articles/bienvenue-og.jpg` ❌ **Référencé dans `bienvenue.md:11` mais n'existe pas**
  - `src/images/articles/exemple-image-og.jpg` ❌ **Référencé dans `exemple-avec-image.md:11` mais n'existe pas**
  - `src/images/articles/le-pouvoir-des-mots-og.jpg` ❌ **Référencé dans `le-pouvoir-des-mots.md:20` mais n'existe pas**
  - **Action**: Créer ces images OU supprimer les références `ogImage:` dans les articles (utilisera og-default.png)

---

## 📄 Pages de Contenu

### Pages légales (OBLIGATOIRE)

- [ ] **Mentions Légales**
  - Fichier: `src/pages/mentions-legales.md` (existe)
  - URL générée: `/mentions-legales/`
  - **À VÉRIFIER**:
    - Nom et raison sociale de l'éditeur
    - Adresse du siège social
    - Numéro de téléphone et email de contact
    - Directeur de publication (nom complet)
    - Hébergeur: Cloudflare Pages (vérifier adresse et contact)
    - **Obligatoire en France (LCEN - Article 6)**

- [ ] **Politique de Confidentialité**
  - Fichier: `src/pages/politique-confidentialite.md` (existe)
  - URL générée: `/politique-confidentialite/`
  - **À VÉRIFIER**:
    - Documenter Cloudflare Web Analytics (collecte de données, IP, cookies techniques)
    - Mentionner l'absence de cookies publicitaires/tracking
    - Droits RGPD (accès, rectification, suppression)
    - Contact pour exercer les droits

### Pages informatives

- [ ] **Page Contact**
  - Fichier: `src/pages/contact.md` (existe)
  - URL générée: `/contact/`
  - **À VÉRIFIER**:
    - Adresse email fonctionnelle (correspond à celle dans site.js)
    - Si formulaire: vérifier qu'il fonctionne (Cloudflare Forms, Formspree, etc.)
    - Réseaux sociaux mentionnés (cohérence avec footer)

- [ ] **À Propos**
  - Fichier: `src/articles/a-propos.md` (existe)
  - URL générée: `/culture/a-propos/`
  - **À VÉRIFIER**:
    - Présentation de l'équipe complète et à jour
    - Mission et valeurs de PAUSE
    - Historique si pertinent
    - Photos d'équipe si disponibles

- [ ] **Contribuer**
  - Fichier: `src/articles/contribuer-pause.md` (existe)
  - URL générée: `/culture/contribuer-pause/`
  - **À VÉRIFIER**:
    - Instructions claires pour soumettre un article
    - Email de contact pour contributions
    - Lignes éditoriales et thématiques
    - Processus de validation/publication

### ⚪ Articles de démonstration/test

- [ ] **Décider du sort des articles exemples**
  - `src/articles/lorem-ipsum.md` - Article de démonstration avec images placeholder
  - `src/articles/exemple-avec-image.md` - Article exemple avec références à des placeholders
  - **Options**:
    - Les supprimer avant production
    - Les garder comme documentation (ajouter `draft: true` au frontmatter)
    - Les remplacer par du contenu réel

---

## 📋 Configuration à Vérifier

- [ ] **robots.txt**
  - Fichier: `src/robots.txt` (existe)
  - **À VÉRIFIER**:
    - URL du sitemap mise à jour (ligne 71): remplacer `votre-domaine.fr`
    - Règles de crawling appropriées
    - User-agents bloqués pour AI (déjà configuré: GPTBot, Claude-Web, etc.)

- [ ] **site.webmanifest**
  - Fichier: `src/site.webmanifest` (existe)
  - **À VÉRIFIER**:
    - Nom et description corrects
    - Couleurs theme_color et background_color (#be0028, #ffffff)
    - Icons array: vérifie que les 3 fichiers favicon existent une fois créés
    - Categories appropriées (magazines, books, lifestyle, education)

- [ ] **RSS Feed**
  - Template: `src/feed.njk` (existe)
  - URL générée: `/feed.xml`
  - **À VÉRIFIER**:
    - Tester le flux dans un lecteur RSS (Feedly, Inoreader)
    - Vérifier que l'URL du site est correcte
    - Vérifier que les articles récents apparaissent

- [ ] **Sitemap XML**
  - **À VÉRIFIER**:
    - Le sitemap est généré (plugin Eleventy)
    - Accessible à `/sitemap.xml`
    - Contient toutes les pages importantes
    - Pas de pages 404 ou draft

---

## 🔍 SEO et Validation

- [ ] **Google Search Console**
  - Créer un compte si nécessaire
  - Ajouter la propriété du site (après déploiement)
  - Soumettre le sitemap: `https://votre-domaine-reel.fr/sitemap.xml`
  - Vérifier l'indexation après 48-72h

- [ ] **Test Open Graph**
  - Tester avec [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
  - Tester avec [Twitter Card Validator](https://cards-dev.twitter.com/validator)
  - **Vérifier**:
    - Image OG s'affiche (1200×630px)
    - Titre et description corrects
    - URL canonique correcte
    - Type de carte Twitter approprié

- [ ] **Validation HTML**
  - Tester plusieurs pages avec [W3C Validator](https://validator.w3.org/)
  - Pages à tester: homepage, article, catégorie, 404
  - Corriger les erreurs critiques (warnings acceptables)

- [ ] **Test Performance**
  - Tester avec [PageSpeed Insights](https://pagespeed.web.dev/)
  - Pages à tester: homepage, article long, page avec images
  - **Objectif**: score > 90 sur mobile et desktop
  - **Vérifier**: fonts chargées, images optimisées, pas de scripts bloquants

- [ ] **Test Accessibilité**
  - Tester avec [WAVE](https://wave.webaim.org/)
  - **Vérifier**:
    - Contraste des couleurs suffisant
    - Tous les liens ont du texte descriptif
    - Images ont des attributs alt
    - Hiérarchie des titres H1-H6 logique
  - **Tests manuels**:
    - Navigation au clavier (Tab, Enter, Espace)
    - Lecteur d'écran (VoiceOver sur Mac, NVDA sur Windows)
    - Menu hamburger accessible sur mobile

---

## 🚀 Déploiement Cloudflare Pages

- [ ] **Repository GitHub**
  - Vérifier que le code est sur GitHub (public ou privé)
  - Derniers commits poussés

- [ ] **Cloudflare Pages Setup**
  - Connecter le repository GitHub
  - Framework preset: **Eleventy**
  - Build command: `npm run build`
  - Build output directory: `_site`
  - Node version: 18 ou supérieur

- [ ] **Variables d'environnement**
  - Aucune nécessaire pour cette config (tout est statique)

- [ ] **Domaine personnalisé**
  - Ajouter votre domaine dans Cloudflare Pages
  - Configurer les DNS (CNAME vers pages.dev)
  - Activer HTTPS automatique

---

## ✅ Tests Post-Déploiement

### Tests fonctionnels

- [ ] **Navigation principale**
  - Tester TOUS les liens du menu (Thèmes, Articles Autonomes, catégories)
  - Vérifier les breadcrumbs sur différentes pages
  - Vérifier que "aria-current" fonctionne (lien actif surligné)
  - Tester le lien logo/accueil

- [ ] **Recherche**
  - Page `/recherche/` accessible
  - Tester plusieurs requêtes (en français)
  - Vérifier que les résultats sont pertinents
  - Tester la recherche vide (doit afficher un message)

- [ ] **Pagination et filtrage**
  - Tester les pages thème (navigation entre thèmes)
  - Tester les pages catégorie (tous les articles s'affichent)
  - Tester les pages tag
  - Tester les pages auteur

- [ ] **Mobile responsive**
  - Tester sur smartphone réel (pas seulement dev tools)
  - **Vérifier**:
    - Menu hamburger fonctionne (ouverture/fermeture)
    - Navigation sticky fonctionne
    - Images responsive (pas de débordement)
    - Footer lisible et cliquable
    - Breadcrumbs adaptés
  - Tester sur tablette aussi

- [ ] **Thème Dark/Light**
  - Basculer entre les thèmes (desktop et mobile)
  - Vérifier la persistance: rafraîchir la page, thème doit rester
  - Vérifier le contraste dans les deux thèmes
  - Vérifier que les images sont visibles dans les deux modes

- [ ] **Flux RSS**
  - `/feed.xml` accessible et bien formaté (XML valide)
  - Tester l'ajout dans un lecteur RSS (Feedly, Inoreader, NetNewsWire)
  - Vérifier que les 10-20 derniers articles apparaissent
  - Vérifier les liens vers les articles (doivent être absolus)

### Tests analytics et tracking

- [ ] **Cloudflare Analytics**
  - Après 24-48h de déploiement
  - Se connecter à [Cloudflare Dashboard](https://dash.cloudflare.com/)
  - Vérifier que les pages vues sont comptabilisées
  - Vérifier les données de navigation (pages populaires, referrers)

### Tests réseaux sociaux

- [ ] **Partage social**
  - Partager l'URL homepage sur chaque plateforme:
    - Instagram Story (si possible)
    - Facebook (vérifier OG image)
    - Twitter/X (vérifier Twitter Card)
    - LinkedIn (vérifier titre et description)
  - Partager un article spécifique
  - **Vérifier**: Image, titre, description corrects pour chaque plateforme

- [ ] **Liens footer réseaux sociaux**
  - Cliquer sur chaque icône (Instagram, Bluesky, TikTok, LinkedIn, Facebook)
  - Vérifier que les liens mènent aux bons profils
  - Vérifier que les profils existent et sont publics

### Tests d'erreur

- [ ] **Page 404**
  - Tester une URL inexistante: `/page-qui-nexiste-pas/`
  - Vérifier que la page 404 personnalisée s'affiche
  - Vérifier que le menu fonctionne sur la page 404
  - Vérifier que le retour à l'accueil est possible

- [ ] **Images manquantes**
  - Ouvrir la console navigateur (F12)
  - Parcourir plusieurs pages
  - Vérifier qu'il n'y a pas d'erreur 404 sur des images ou ressources

---

---

## 📝 Résumé des Priorités

### 🔴 CRITIQUE - NE PAS DÉPLOYER SANS CELA

**Fichiers manquants critiques:**
1. [ ] Créer les 3 favicons (favicon-32x32.png, favicon-16x16.png, apple-touch-icon.png)
2. [ ] Créer le logo publisher (`src/images/logo.png` - 512×512px min)

**Configuration obligatoire:**
3. [ ] Remplacer TOUTES les URLs `votre-domaine.fr` (3 emplacements)
4. [ ] Remplacer l'email `contact@votre-domaine.fr`
5. [ ] Vérifier/compléter les mentions légales avec vraies informations (LCEN obligatoire)
6. [ ] Vérifier/compléter la politique de confidentialité (RGPD)

**Test bloquant:**
7. [ ] Lancer `npm run build` - doit réussir sans erreur
8. [ ] Tester localement avec `npx @11ty/eleventy --serve`

### 🟡 RECOMMANDÉ - À faire avant ou juste après lancement

**Analytics et suivi:**
1. [ ] Configurer Cloudflare Analytics token OU retirer le script
2. [ ] Vérifier que robots.txt a la bonne URL de sitemap

**Branding et réseaux:**
3. [ ] Créer les comptes réseaux sociaux (Instagram prioritaire)
4. [ ] Mettre à jour les 5 URLs de réseaux sociaux dans base.njk
5. [ ] Améliorer l'image OG par défaut (professionnaliser le placeholder)

**Contenu:**
6. [ ] Décider du sort des 2 articles de démonstration (supprimer/draft/modifier)
7. [ ] Vérifier le contenu des pages À Propos, Contact, Contribuer
8. [ ] Gérer les 3 OG images spécifiques manquantes (créer OU retirer références)

### ⚪ OPTIONNEL - Post-lancement (peut attendre quelques jours)

1. [ ] Configuration Google Search Console et soumission sitemap
2. [ ] Tests SEO approfondis (PageSpeed, W3C Validator)
3. [ ] Tests d'accessibilité détaillés (WAVE, lecteurs d'écran)
4. [ ] Optimisations performance avancées
5. [ ] Tests sur multiples appareils/navigateurs

---

## 🎯 Checklist Rapide Pré-Déploiement

**Vérification manuelle en 10 minutes avant de pousser le bouton "Deploy":**

### Étape 1: Fichiers critiques
```bash
# Vérifier que ces fichiers existent:
ls src/favicon-32x32.png
ls src/favicon-16x16.png
ls src/apple-touch-icon.png
ls src/images/logo.png
```
- [ ] Tous les fichiers existent (pas de "No such file")

### Étape 2: Grep des placeholders
```bash
# Rechercher les placeholders restants:
grep -r "votre-domaine" src/
grep -r "YOUR_" src/
grep -r "placeholder" src/ --include="*.js" --include="*.njk"
```
- [ ] Aucun résultat OU tous les résultats sont dans des articles de démo/commentaires

### Étape 3: Build et test local
```bash
# Build doit réussir:
npm run build

# Lancer le serveur local:
npx @11ty/eleventy --serve
```
- [ ] Build réussit sans erreur (warnings OK)
- [ ] Ouvrir http://localhost:8080 dans le navigateur
- [ ] Homepage charge correctement
- [ ] Cliquer sur 2-3 liens (menu, articles) - tout fonctionne
- [ ] Pas d'images cassées (icône 🖼️ brisée)
- [ ] Console navigateur (F12) - pas d'erreurs rouges critiques

### Étape 4: Vérification contenu légal
- [ ] Ouvrir `/mentions-legales/` - contient de vraies informations (pas "TODO")
- [ ] Ouvrir `/politique-confidentialite/` - contient de vraies informations
- [ ] Ouvrir `/contact/` - email correct et fonctionnel

### Étape 5: Double-check configuration
- [ ] `src/_data/site.js:8` - URL réelle (pas votre-domaine.fr)
- [ ] `src/_data/site.js:36` - Email réel
- [ ] `src/robots.txt:71` - URL réelle du sitemap

**✅ Si toutes les cases sont cochées → GO POUR LE DÉPLOIEMENT**

**❌ Si une case n'est pas cochée → STOP, corriger d'abord**

---

## 📊 Scan de Production (Automatique)

**Dernière analyse**: 2025-12-29

**Statut des fichiers:**
- ✅ `site.webmanifest` existe et configuré
- ✅ `robots.txt` existe (URL à mettre à jour)
- ✅ `feed.xml` généré
- ✅ Recherche Pagefind configurée
- ✅ Fonts auto-hébergés (90KB)
- ✅ CSS optimisé
- ❌ 3 favicons manquants
- ❌ Logo publisher manquant
- ⚠️ 3 OG images spécifiques manquantes (optionnel)

**Placeholders détectés:**
- `votre-domaine.fr` → 3 occurrences (site.js×2, robots.txt×1)
- `contact@votre-domaine.fr` → 1 occurrence (site.js)
- `YOUR_CLOUDFLARE_TOKEN_HERE` → 1 occurrence (base.njk)

**Pages générées**: 87 pages HTML
**Articles publiés**: 18 articles (dont 2 exemples/démo à vérifier)
