# Objet vs Tableau pour themes.json

## Structure actuelle : Objet (recommandé)

```json
{
  "les-mots": {
    "id": "les-mots",
    "name": "Les Mots",
    "number": 1,
    ...
  },
  "la-nature": { ... }
}
```

### Avantages
✅ Accès direct : `themes[themeId]`
✅ Performance O(1)
✅ Code simple dans les templates
✅ Pas de doublons d'ID possibles

### Inconvénients
❌ Ordre non garanti (théoriquement)

## Structure alternative : Tableau

```json
[
  {
    "id": "les-mots",
    "name": "Les Mots",
    "number": 1,
    ...
  },
  {
    "id": "la-nature",
    ...
  }
]
```

### Avantages
✅ Ordre garanti
✅ Plus facile à trier
✅ Structure classique

### Inconvénients
❌ Accès nécessite une boucle
❌ Performance O(n)
❌ Code plus complexe

## Si vous voulez passer au tableau

### 1. Renommer le fichier actuel
```bash
mv _data/themes.json _data/themes-object-backup.json
mv _data/themes-array-example.json _data/themes.json
```

### 2. Modifier home.njk

**Avant (objet) :**
```njk
{% for themeId, theme in themes %}
  <h3>{{ theme.name }}</h3>
  ...
{% endfor %}
```

**Après (tableau) :**
```njk
{% for theme in themes %}
  <h3>{{ theme.name }}</h3>
  ...
{% endfor %}
```

### 3. Modifier article.njk

**Avant (objet) :**
```njk
{% if theme and themes[theme] %}
  <span>{{ themes[theme].number }}</span>
  <span>{{ themes[theme].name }}</span>
{% endif %}
```

**Après (tableau) :**
```njk
{% set currentTheme = null %}
{% for t in themes %}
  {% if t.id == theme %}
    {% set currentTheme = t %}
  {% endif %}
{% endfor %}

{% if currentTheme %}
  <span>{{ currentTheme.number }}</span>
  <span>{{ currentTheme.name }}</span>
{% endif %}
```

## Solution retenue : Objet avec tri

Le projet utilise un **objet avec filtre de tri** :

```javascript
// eleventy.config.js
eleventyConfig.addFilter("sortThemes", function(themesObj) {
  const themesArray = Object.entries(themesObj);
  themesArray.sort((a, b) => a[1].number - b[1].number);
  return themesArray;
});
```

```njk
<!-- home.njk -->
{% for themeEntry in themes | sortThemes %}
  {% set themeId = themeEntry[0] %}
  {% set theme = themeEntry[1] %}
  <!-- ... -->
{% endfor %}
```

### Avantages de cette solution

✅ **Pas de champ `id` redondant** - L'ID est la clé
✅ **Ordre contrôlé** - Tri par le champ `number`
✅ **Performance** - Accès direct `themes[id]` ailleurs
✅ **Flexibilité** - Ajoutez les thèmes dans n'importe quel ordre

## Recommandation

**Gardez l'objet avec tri** car :
1. Pas de duplication de l'ID
2. Accès direct rapide par ID
3. Ordre garanti par le tri sur `number`
4. Meilleur des deux mondes

## Voir aussi

- `themes.json` - Structure actuelle (objet)
- `themes-array-example.json` - Exemple avec tableau
- `THEMES.md` - Guide de gestion des thèmes
