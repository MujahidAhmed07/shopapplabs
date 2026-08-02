/**
 * Generates pretty, smart username alternative suggestions for handles.
 * @param {string} username - The base username query
 * @returns {Array<string>} List of alternative username handles
 */
export function generateUsernameSuggestions(username) {
  if (!username) return [];
  const clean = username.trim().toLowerCase().replace(/^@/, '');
  if (!clean) return [];

  const suggestions = [
    `the_${clean}`,
    `${clean}_official`,
    `${clean}_hq`,
    `get_${clean}`,
    `real_${clean}`,
    `${clean}_dev`,
    `iam_${clean}`,
    `${clean}_app`,
  ];

  // Filter unique and return up to 6 clean suggestions
  return Array.from(new Set(suggestions)).slice(0, 6);
}
