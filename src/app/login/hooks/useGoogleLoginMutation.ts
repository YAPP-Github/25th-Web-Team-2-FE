import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { API } from '@/apis/config';
import { googleLogin } from '@/apis/login';

const useGoogleLoginMutation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ code, role }: { code: string; role: string }) => googleLogin(code, role),
    onSuccess: ({ isRegistered, accessToken, refreshToken, memberInfo }) => {
      if (isRegistered) {
        API.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        sessionStorage.setItem('refreshToken', refreshToken);
        sessionStorage.setItem('role', memberInfo.role);
        router.push('/');
        return;
      }

      sessionStorage.setItem('email', memberInfo.oauthEmail);
      router.push('/join');
    },
    onError: (error) => {
      const errorMessage = error.message || '로그인 중 오류가 발생했습니다. 다시 시도해주세요.';
      queryClient.setQueryData(['loginError'], errorMessage);

      router.push('/login');
    },
  });
};

export default useGoogleLoginMutation;
