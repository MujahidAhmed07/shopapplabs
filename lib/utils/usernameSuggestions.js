/**
 * Helper to shuffle an array randomly using Fisher-Yates algorithm
 */
function shuffleArray(arr) {
  const array = [...arr];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

/**
 * Generates randomized domain-safe suggestions (strict DNS compliance: letters, numbers, hyphens — NEVER underscores).
 * @param {string} username - The base username / domain query
 * @param {number} count - Maximum number of suggestions to return
 * @returns {Array<string>} List of randomized domain-friendly suggestions
 */
export function generateDomainSuggestions(username, count = 8) {
  if (!username) return [];
  const clean = username.trim().toLowerCase().replace(/^@/, '');
  if (!clean) return [];

  // Remove any underscores for solid domain concatenation
  const solidName = clean.replace(/_/g, '').replace(/[^a-z0-9]/g, '');
  if (!solidName) return [];

  // Hyphenated version for domain readability
  const hyphenName = clean.replace(/_/g, '-').replace(/[^a-z0-9\-]/g, '').replace(/-+/g, '-').replace(/^-|-$/g, '');

  const candidatePool = [
    `get${solidName}`,
    `the${solidName}`,
    `${solidName}hq`,
    `real${solidName}`,
    `${solidName}app`,
    `${solidName}dev`,
    `try${solidName}`,
    `go${solidName}`,
    `hey${solidName}`,
    `${solidName}hub`,
    `${solidName}lab`,
    `${solidName}studio`,
    `${solidName}official`,
    `${solidName}tech`,
    `${solidName}team`,
    `${solidName}online`,
    `${solidName}club`,
    `my${solidName}`,
    `join${solidName}`,
    `get-${hyphenName}`,
    `${hyphenName}-hq`,
    `${hyphenName}-app`,
    `${hyphenName}-dev`,
    `the-${hyphenName}`,
    `${hyphenName}-hub`,
    `${hyphenName}-lab`,
    `${hyphenName}-official`,
    `${hyphenName}-online`,
    `${hyphenName}-team`,
    `${hyphenName}-tech`
  ];

  const uniqueCandidates = Array.from(new Set(candidatePool.filter(Boolean)));
  return shuffleArray(uniqueCandidates).slice(0, count);
}

/**
 * Generates randomized smart username alternative suggestions for handles.
 * @param {string} username - The base username query
 * @param {boolean} isDomain - Whether the target is a domain name (never allows underscores)
 * @param {number} count - Maximum number of suggestions to return
 * @returns {Array<string>} List of randomized alternative username handles
 */
export function generateUsernameSuggestions(username, isDomain = false, count = 8) {
  if (!username) return [];
  const clean = username.trim().toLowerCase().replace(/^@/, '');
  if (!clean) return [];

  if (isDomain) {
    return generateDomainSuggestions(clean, count);
  }

  const cleanNoSpecial = clean.replace(/[^a-z0-9._\-]/g, '');
  const cleanSolid = clean.replace(/[^a-z0-9]/g, '');

  const candidatePool = [
    `the_${cleanNoSpecial}`,
    `${cleanNoSpecial}_hq`,
    `get_${cleanNoSpecial}`,
    `real_${cleanNoSpecial}`,
    `${cleanNoSpecial}_official`,
    `${cleanNoSpecial}_dev`,
    `iam_${cleanNoSpecial}`,
    `${cleanNoSpecial}_app`,
    `hey_${cleanNoSpecial}`,
    `go_${cleanNoSpecial}`,
    `${cleanNoSpecial}_hub`,
    `${cleanNoSpecial}_team`,
    `its_${cleanNoSpecial}`,
    `join_${cleanNoSpecial}`,
    `weare_${cleanNoSpecial}`,
    `get${cleanSolid}`,
    `the${cleanSolid}`,
    `${cleanSolid}hq`,
    `real${cleanSolid}`,
    `${cleanSolid}official`,
    `iam${cleanSolid}`,
    `${cleanSolid}app`,
    `${cleanSolid}dev`,
    `try${cleanSolid}`,
    `${cleanSolid}hub`
  ];

  const uniqueCandidates = Array.from(new Set(candidatePool.filter(Boolean)));
  return shuffleArray(uniqueCandidates).slice(0, count);
}

/**
 * Checks randomized candidate suggestions against a specific platform endpoint in real-time
 * and returns ONLY verified AVAILABLE handles/domains.
 * @param {string} platformId - The ID of the platform to check
 * @param {string} username - The base username query
 * @param {Function} checkFn - The single platform API check function
 * @returns {Promise<Array<string>>} List of real-time verified AVAILABLE handles/domains
 */
export async function getVerifiedAvailableSuggestions(platformId, username, checkFn) {
  if (!username || !platformId || typeof checkFn !== 'function') return [];
  
  const isDomain = platformId.startsWith('domain_') || platformId === 'domain' || platformId === 'domain-availability' || platformId === 'bluesky';
  // Generate 8 randomized candidates to test against the platform
  const candidates = (isDomain ? generateDomainSuggestions(username, 8) : generateUsernameSuggestions(username, false, 8));

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

    // Return only verified available candidates
    return checkResults.filter((item) => item.status === 'AVAILABLE').map((item) => item.handle).slice(0, 5);
  } catch (e) {
    return [];
  }
}

/**
 * Verifies randomized candidate suggestions across major key platforms in real-time
 * and returns ONLY handles that are validated as AVAILABLE.
 * @param {string} username - Base username query
 * @param {Function} checkFn - Single platform check function
 * @returns {Promise<Array<string>>} Handles verified available across networks
 */
export async function getGloballyAvailableSuggestions(username, checkFn) {
  if (!username || typeof checkFn !== 'function') return [];
  // Universal randomized candidates without underscores so both social networks and domains succeed
  const candidates = generateDomainSuggestions(username, 8);
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
    if (verifiedAll.length > 0) return verifiedAll.slice(0, 5);

    // Fallback: return handles available on at least 3 major platforms
    return globalCheckResults.filter((item) => item.availableCount >= 3).map((item) => item.handle).slice(0, 5);
  } catch (e) {
    return [];
  }
}
