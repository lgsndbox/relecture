const body = document.body;
const darkModeToggle = document.getElementById('darkModeToggle');
const navItems = document.querySelectorAll('.nav-item');
const articleLists = document.querySelectorAll('.article-list');
const articles = document.querySelectorAll('article');
const articleCards = document.querySelectorAll('.article-card');

// Mode sombre
darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    body.classList.toggle('dark-mode');
    
    // Changer l'icône
    if (body.classList.contains('dark-mode')) {
        darkModeToggle.textContent = '☾';
    } else {
        darkModeToggle.textContent = '☀︎';
    }
});

// Navigation
navItems.forEach(item => {
    item.addEventListener('click', () => {
        const category = item.dataset.category;
        
        // Mise à jour de l'élément de navigation actif
        navItems.forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');
        
        // Afficher la liste correspondante
        articleLists.forEach(list => list.classList.remove('active'));
        document.getElementById(`list-${category}`).classList.add('active');
        
        // Masquer les articles
        articles.forEach(article => article.classList.remove('active'));
    });
});

// Cartes d'articles
articleCards.forEach(card => {
    card.addEventListener('click', () => {
        const articleId = card.dataset.article;
        
        // Masquer les listes
        articleLists.forEach(list => list.classList.remove('active'));
        
        // Afficher l'article
        articles.forEach(article => article.classList.remove('active'));
        document.getElementById(`article-${articleId}`).classList.add('active');
        
        // Retour en haut
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

// Bouton retour
function showList() {
    // Masquer les articles
    articles.forEach(article => article.classList.remove('active'));
    
    // Afficher la liste active
    const activeNav = document.querySelector('.nav-item.active');
    const category = activeNav.dataset.category;
    document.getElementById(`list-${category}`).classList.add('active');
    
    // Retour en haut
    window.scrollTo({ top: 0, behavior: 'smooth' });
}