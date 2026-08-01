export async function checkSinglePlatform(platformId, username) {
  try {
    const response = await fetch(`/api/v1/checker/check/${platformId}?username=${encodeURIComponent(username)}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
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
