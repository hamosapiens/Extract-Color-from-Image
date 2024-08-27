const CACHE_NAME = "product-image-cache";

export const cacheImage = async (url: string, data: string) => {
  const cache = await caches.open(CACHE_NAME);
  const response = new Response(data, {
    headers: { "Content-Type": "image/jpeg" },
  });
  
  if (url.startsWith('http')) {
    await cache.put(url, response);
  } else {
    console.warn('Unsupported URL scheme for caching:', url);
  }
};

export const getCachedImage = async (url: string) => {
  if (!url.startsWith('http')) {
    console.warn('Unsupported URL scheme for retrieval:', url);
    return null;
  }

  const cache = await caches.open(CACHE_NAME);
  const response = await cache.match(url);
  if (response) {
    return response.text();
  }
  return null;
};

export const cacheColor = async (key: string, color: string) => {
  const cache = await caches.open(CACHE_NAME);
  const response = new Response(color, {
    headers: { "Content-Type": "text/plain" },
  });

  if (!key.startsWith('gid://')) {
    await cache.put(key, response);
  } else {
    console.warn('Unsupported key for caching color:', key);
  }
};

export const getCachedColor = async (key: string) => {
  if (key.startsWith('gid://')) {
    console.warn('Unsupported key for retrieval:', key);
    return null;
  }

  const cache = await caches.open(CACHE_NAME);
  const response = await cache.match(key);
  if (response) {
    return response.text();
  }
  return null;
};
