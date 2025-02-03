/* eslint-disable no-console */
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

      // 1️⃣ Presigned URL 요청
      const { data } = await API.post<PresignedUrlResponse>(API_URL.uploadImage, { fileName });

      console.log('📥 Presigned URL 응답:', data);

      if (!data.preSignedUrl) {
        throw new Error('❌ Presigned URL이 반환되지 않았습니다.');
      }

      // 2️⃣ PUT 요청을 S3에 보냄 (업로드)
      try {
        const response = await fetch(data.preSignedUrl, {
          method: 'PUT',
          body: file,
          headers: {
            'Content-Type': file.type, // 🔥 백엔드 설정과 동일하게 맞춰야 함
          },
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error(`❌ 업로드 실패: ${response.statusText} (${response.status})`);
        }

        // 3️⃣ 업로드된 파일의 최종 URL 반환 (쿼리 스트링 제거)
        const uploadedFileUrl = data.preSignedUrl.split('?')[0];
        console.log('✅ 업로드된 파일 URL:', uploadedFileUrl);

        return uploadedFileUrl;
      } catch (error) {
        console.error('❌ 이미지 업로드 실패:', error);
        throw new Error('이미지 업로드 중 오류가 발생했습니다.');
      }
    },
  });
};

export default useUploadImagesMutation;
