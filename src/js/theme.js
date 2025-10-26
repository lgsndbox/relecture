(function() {
  const checkbox = document.getElementById('theme-checkbox');
  const saved = localStorage.getItem('theme');
  
  if (saved === 'dark') checkbox.checked = true;
  
  checkbox.addEventListener('change', () => {
    localStorage.setItem('theme', checkbox.checked ? 'dark' : 'light');
  });
})();