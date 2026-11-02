export const checkImageExists = async (
  url: string,
  retries = 10,
  delay = 600,
): Promise<boolean> => {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url, { method: 'HEAD', cache: 'no-store' });
      if (res.ok) return true;
    } catch (_) {}
    await new Promise((resolve) => setTimeout(resolve, delay));
  }
  return false;
};
