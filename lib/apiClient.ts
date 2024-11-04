// apiClient.ts

export const toggleFavorite = async (
  id: string,
  isFavorited: boolean
): Promise<{ message?: string; error?: string }> => {
  const method = isFavorited ? "DELETE" : "POST";
  try {
    const response = await fetch(`/api/favorites/${id}`, { method });
    const data = await response.json();
    return data;
  } catch (err) {
    return { error: (err as Error).message };
  }
};

export const toggleWatchLater = async (
  id: string,
  isWatchLater: boolean
): Promise<{ message?: string; error?: string }> => {
  const method = isWatchLater ? "DELETE" : "POST";
  try {
    const response = await fetch(`/api/watch-later/${id}`, { method });
    const data = await response.json();
    return data;
  } catch (err) {
    return { error: (err as Error).message };
  }
};