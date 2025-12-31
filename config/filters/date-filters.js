/**
 * Date formatting filters
 */

/**
 * Format date for humans (French locale)
 * @param {Date|string} date - Date to format
 * @returns {string} Formatted date string
 */
export function formatDate(date) {
  if (!date) return "";
  const d = new Date(date);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return d.toLocaleDateString('fr-FR', options);
}

/**
 * Format date for computers (ISO 8601)
 * @param {Date|string} date - Date to format
 * @returns {string} ISO date string (YYYY-MM-DD)
 */
export function isoDate(date) {
  if (!date) return "";
  const d = new Date(date);
  return d.toISOString().split('T')[0];
}
