(function() {
  'use strict';

  // Theme toggle
  function getTheme() {
    try { return localStorage.getItem('theme'); } catch (_) { return null; }
  }

  function prefersDark() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  function currentEffectiveTheme() {
    return document.documentElement.getAttribute('data-theme') || (prefersDark() ? 'dark' : 'light');
  }

  function applyTheme(theme) {
    if (theme) document.documentElement.setAttribute('data-theme', theme);
    else document.documentElement.removeAttribute('data-theme');
  }

  // Helper function for screen reader announcements
  function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.className = 'sr-only';
    announcement.textContent = message;

    document.body.appendChild(announcement);

    // Remove after announcement
    setTimeout(function() { announcement.remove(); }, 1000);
  }

  function updateAria(btn) {
    const isDark = currentEffectiveTheme() === 'dark';
    btn.setAttribute('aria-pressed', String(isDark));

    // Update screen reader text if present
    const srText = btn.querySelector('.sr-only');
    if (srText) {
      srText.textContent = 'Actuel: Thème ' + (isDark ? 'sombre' : 'clair');
    }
  }

  function toggleTheme(btn) {
    const isDark = currentEffectiveTheme() === 'dark';
    const next = isDark ? 'light' : 'dark';
    applyTheme(next);
    try { localStorage.setItem('theme', next); } catch (_) {}
    updateAria(btn);

    // Announce theme change to screen readers
    announceToScreenReader('Thème ' + (next === 'light' ? 'clair' : 'sombre') + ' activé');
  }

  // Mobile navigation accessibility
  const navToggle = document.getElementById('nav-toggle');

  if (navToggle) {
    navToggle.addEventListener('change', function() {
      // Update checkbox aria-label based on state
      this.setAttribute('aria-label', this.checked ?
        'Fermer le menu de navigation' :
        'Ouvrir le menu de navigation'
      );
    });
  }

  document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme toggles (both desktop and mobile)
    const btns = document.querySelectorAll('.theme-toggle-btn');
    btns.forEach(function(btn) {
      updateAria(btn);
      btn.addEventListener('click', function() {
        toggleTheme(btn);
        // Update both buttons after toggle
        btns.forEach(function(b) { updateAria(b); });
      });
    });
  });
})();
