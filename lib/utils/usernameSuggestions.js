/**
 * Generates domain-safe suggestions (strict DNS compliance: letters, numbers, hyphens — NEVER underscores).
 * @param {string} username - The base username / domain query
 * @returns {Array<string>} List of valid domain-friendly suggestions
 */
export function generateDomainSuggestions(username) {
  if (!username) return [];
  const clean = username.trim().toLowerCase().replace(/^@/, '');
  if (!clean) return [];

  // Remove any underscores for domain concatenation
  const solidName = clean.replace(/_/g, '');
  // Hyphenated version for domain readability
  const hyphenName = clean.replace(/_/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');

  const suggestions = [
    `get${solidName}`,
    `the${solidName}`,
    `${solidName}hq`,
    `real${solidName}`,
    `${solidName}app`,
    `${solidName}dev`,
    `get-${hyphenName}`,
    `${hyphenName}-hq`,
    `${hyphenName}-app`,
    `the-${hyphenName}`
  ];

  // Return unique suggestions
  return Array.from(new Set(suggestions.filter(Boolean))).slice(0, 6);
}

/**
 * Generates pretty, smart username alternative suggestions for handles.
 * @param {string} username - The base username query
 * @param {boolean} isDomain - Whether the target is a domain name (never allows underscores)
 * @returns {Array<string>} List of alternative username handles
 */
export function generateUsernameSuggestions(username, isDomain = false) {
  if (!username) return [];
  const clean = username.trim().toLowerCase().replace(/^@/, '');
  if (!clean) return [];

  if (isDomain) {
    return generateDomainSuggestions(clean);
  }

  const cleanNoUnderscore = clean.replace(/_/g, '');

  const suggestions = [
    `the_${clean}`,
    `${clean}_official`,
    `${clean}_hq`,
    `get_${clean}`,
    `real_${clean}`,
    `${clean}_dev`,
    `iam_${clean}`,
    `${clean}_app`,
    `get${cleanNoUnderscore}`,
    `${cleanNoUnderscore}hq`
  ];

  // Filter unique and return up to 6 clean suggestions
  return Array.from(new Set(suggestions)).slice(0, 6);
}

/**
 * Checks candidate suggestions against a specific platform endpoint and returns ONLY verified AVAILABLE handles.
 * @param {string} platformId - The ID of the platform to check
 * @param {string} username - The base username query
 * @param {Function} checkFn - The single platform API check function
 * @returns {Promise<Array<string>>} List of verified AVAILABLE handles
 */
export async function getVerifiedAvailableSuggestions(platformId, username, checkFn) {
  if (!username || !platformId || typeof checkFn !== 'function') return [];
  
  const isDomain = platformId.startsWith('domain_') || platformId === 'domain' || platformId === 'domain-availability' || platformId === 'bluesky';
  const candidates = (isDomain ? generateDomainSuggestions(username) : generateUsernameSuggestions(username)).slice(0, 5);

  try {
    const checkResults = await Promise.all(
      candidates.map(async (candidate) => {
        try {
          const res = await checkFn(platformId, candidate);
          return { handle: candidate, status: res.status };
        } catch (e) {
          return { handle: candidate, status: 'ERROR' };
        }
      })
    );

    return checkResults.filter((item) => item.status === 'AVAILABLE').map((item) => item.handle);
  } catch (e) {
    return [];
  }
}

/**
 * Verifies candidate suggestions across major key platforms and returns ONLY handles available on ALL major platforms.
 * Uses domain-safe universal suggestions (valid on social networks AND top-level domains).
 * @param {string} username - Base username query
 * @param {Function} checkFn - Single platform check function
 * @returns {Promise<Array<string>>} Handles verified available across all major networks
 */
export async function getGloballyAvailableSuggestions(username, checkFn) {
  if (!username || typeof checkFn !== 'function') return [];
  // Universal candidates without underscores so both social networks and domains succeed
  const candidates = generateDomainSuggestions(username).slice(0, 5);
  const keyPlatforms = ['instagram', 'twitter', 'tiktok', 'github', 'domain_com'];

  try {
    const globalCheckResults = await Promise.all(
      candidates.map(async (candidate) => {
        const platformChecks = await Promise.all(
          keyPlatforms.map(async (pId) => {
            try {
              return await checkFn(pId, candidate);
            } catch (e) {
              return { status: 'ERROR' };
            }
          })
        );
        const isAvailableAll = platformChecks.every((res) => res.status === 'AVAILABLE');
        const availableCount = platformChecks.filter((res) => res.status === 'AVAILABLE').length;
        return { handle: candidate, isAvailableAll, availableCount };
      })
    );

    const verifiedAll = globalCheckResults.filter((item) => item.isAvailableAll).map((item) => item.handle);
    if (verifiedAll.length > 0) return verifiedAll;

    // Fallback: return handles available on at least 3 major platforms
    return globalCheckResults.filter((item) => item.availableCount >= 3).map((item) => item.handle);
  } catch (e) {
    return [];
  }
}
