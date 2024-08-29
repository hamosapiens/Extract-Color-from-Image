const CACHE_NAME = "product-cache";

const isValidKey = (key: string): boolean => {
  // Allow only Shopify GID URIs and HTTPS URLs
  return key.startsWith("gid://") || key.startsWith("https://");
};

const transformKey = (key: string): string => {
  // Replace 'gid://' with a safe prefix for caching
  return key.replace('gid://', 'safe-gid-');
};

export const cacheImage = async (url: string, data: string) => {
  if (!isValidKey(url)) {
    console.warn('Unsupported URL scheme for caching:', url);
    return;
  }

  const cache = await caches.open(CACHE_NAME);
  const response = new Response(data, {
    headers: { "Content-Type": "image/jpeg" },
  });

  await cache.put(transformKey(url), response);
};

export const getCachedImage = async (url: string) => {
  if (!isValidKey(url)) {
    console.warn('Unsupported URL scheme for retrieval:', url);
    return null;
  }

  const cache = await caches.open(CACHE_NAME);
  const response = await cache.match(transformKey(url));
  if (response) {
    return response.text();
  }
  return null;
};

export const cacheColor = async (key: string, color: string) => {
  if (!isValidKey(key)) {
    console.warn('Unsupported key for caching color:', key);
    return;
  }

  const cache = await caches.open(CACHE_NAME);
  const response = new Response(color, {
    headers: { "Content-Type": "text/plain" },
  });

  await cache.put(transformKey(key), response);
};

export const getCachedColor = async (key: string) => {
  if (!isValidKey(key)) {
    console.warn('Unsupported key for retrieval:', key);
    return null;
  }

  const cache = await caches.open(CACHE_NAME);
  const response = await cache.match(transformKey(key));
  if (response) {
    return response.text();
  }
  return null;
};

export const clearCache = async () => {
  const cache = await caches.open(CACHE_NAME);
  const keys = await cache.keys();
  for (const key of keys) {
    await cache.delete(key);
  }
};
