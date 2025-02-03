import { useMutation } from '@tanstack/react-query';

import { API } from '@/apis/config';
import { API_URL } from '@/constants/url';

interface PresignedUrlResponse {
  preSignedUrl: string;
}

const useUploadImagesMutation = () => {
  return useMutation({
    mutationKey: [API_URL.uploadImage],
    mutationFn: async (file: File): Promise<string> => {
      const fileName = encodeURIComponent(file.name);

      const { data } = await API.post<PresignedUrlResponse>(API_URL.uploadImage, { fileName });

      if (!data.preSignedUrl) {
        throw new Error('❌ Presigned URL이 반환되지 않았습니다.');
      }

      try {
        const response = await fetch(data.preSignedUrl, {
          method: 'PUT',
          body: file,
          headers: {
            'Content-Type': file.type,
          },
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error(`❌ 업로드 실패: ${response.statusText} (${response.status})`);
        }

        const uploadedFileUrl = data.preSignedUrl.split('?')[0];

        return uploadedFileUrl;
      } catch (error) {
        console.error('❌ 이미지 업로드 실패:', error);
        throw new Error('이미지 업로드 중 오류가 발생했습니다.');
      }
    },
  });
};

export default useUploadImagesMutation;
