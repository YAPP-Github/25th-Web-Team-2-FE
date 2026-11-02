import { convertToWebpUrl } from '@upload/utils/convertToWebpUrl';

import { checkImageExists } from './checkImageExists';
import { isValidImageUrl } from './isValidImageUrl';


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
