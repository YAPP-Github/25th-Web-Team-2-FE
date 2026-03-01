import { checkImageExists } from './checkImageExists';
import { isValidImageUrl } from './isValidImageUrl';

import { convertToWebpUrl } from '@/app/upload/utils/convertToWebpUrl';

export const replaceImageListWithWebp = async (
  originalImages: string[],
): Promise<string[]> => {
  return await Promise.all(
    originalImages.map(async (originalUrl) => {
      if (!isValidImageUrl(originalUrl)) return originalUrl;

      const webpUrl = convertToWebpUrl(originalUrl);
      const isWebpAvailable = await checkImageExists(webpUrl);

      return isWebpAvailable ? webpUrl : originalUrl;
    }),
  );
};
