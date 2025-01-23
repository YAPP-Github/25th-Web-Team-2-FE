import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { API } from '@/apis/config';
import { naverLogin, NaverLoginParams } from '@/apis/login';

const useNaverLoginMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: ({ code, role, state }: NaverLoginParams) => naverLogin({ code, role, state }),
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
    onError: () => {
      router.push('/login');
    },
  });
};

export default useNaverLoginMutation;
