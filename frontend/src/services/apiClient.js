const getApiBaseUrl = () => {
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }
  // Dynamically use current host (works on localhost, cPanel, or any domain)
  return `${window.location.origin}/api`;
};

export async function checkSinglePlatform(platformId, username) {
  const baseUrl = getApiBaseUrl();
  try {
    const response = await fetch(`${baseUrl}/v1/checker/check/${platformId}?username=${encodeURIComponent(username)}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      // Fallback to legacy route
      const fallbackResponse = await fetch(`${baseUrl}/check/${platformId}?username=${encodeURIComponent(username)}`);
      if (fallbackResponse.ok) {
        return await fallbackResponse.json();
      }
      throw new Error(`HTTP Error ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    return {
      status: 'ERROR',
      message: error.message || 'Network error'
    };
  }
}
