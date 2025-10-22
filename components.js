// Shared header and footer components
function renderHeader() {
    return `
        <header>
            <div class="header-content">
                <div class="title-row">
                    <h1 class="site-title">PAUSE</h1>
                    <button class="dark-mode-toggle" id="darkModeToggle">
                        ☀︎
                    </button>
                </div>
                <nav>
                    <a href="index.html" class="nav-item">
                        <span class="home-icon">⌂</span>
                    </a>
                    <a href="index.html#art" class="nav-item">Art</a>
                    <a href="index.html#societe" class="nav-item">Société</a>
                    <a href="index.html#philosophie" class="nav-item">Philosophie</a>
                </nav>
            </div>
        </header>
    `;
}

function renderFooter() {
    return `
        <footer>
            <div>© 2025 — Tous droits réservés</div>
        </footer>
    `;
}

// Initialize components on page load
document.addEventListener('DOMContentLoaded', function() {
    // Insert header
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (headerPlaceholder) {
        headerPlaceholder.outerHTML = renderHeader();
    }
    
    // Insert footer
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        footerPlaceholder.outerHTML = renderFooter();
    }
    
    // Initialize dark mode toggle
    initializeDarkMode();
});

function initializeDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            body.classList.toggle('light-mode');
            body.classList.toggle('dark-mode');
            
            if (body.classList.contains('dark-mode')) {
                darkModeToggle.textContent = '☾';
            } else {
                darkModeToggle.textContent = '☀︎';
            }
        });
    }
}