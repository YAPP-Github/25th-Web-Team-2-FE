import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { API } from '@/apis/config';
import { googleLogin } from '@/apis/login';
import { identifyUser, setUserProperties } from '@/lib/mixpanelClient';

const useGoogleLoginMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: ({ code, role }: { code: string; role: string }) => googleLogin(code, role),
    onSuccess: ({ isRegistered, accessToken, refreshToken, memberInfo }) => {
      if (isRegistered) {
        API.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        sessionStorage.setItem('refreshToken', refreshToken);
        sessionStorage.setItem('role', memberInfo.role);

        identifyUser(memberInfo.oauthEmail);
        setUserProperties({ email: memberInfo.oauthEmail, role: memberInfo.role });

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

export default useGoogleLoginMutation;
