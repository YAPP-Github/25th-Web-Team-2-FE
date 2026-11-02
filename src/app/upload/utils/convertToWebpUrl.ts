export const convertToWebpUrl = (originalUrl: string) => {
  return originalUrl
    .replace('/images/', '/resized-images/')
    .replace(/\.\w+$/, '.webp');
};
