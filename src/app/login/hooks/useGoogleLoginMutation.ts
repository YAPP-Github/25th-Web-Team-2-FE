import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { googleLogin } from '@/apis/login';

const useGoogleLoginMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: ({ code, role }: { code: string; role: string }) => googleLogin(code, role),
    onSuccess: (data) => {
      if (data.isRegistered) {
        router.push('/');
        return;
      }

      sessionStorage.setItem('email', data.memberInfo.oauthEmail);
      router.push('/join');
    },
    onError: () => {
      router.push('/login');
    },
  });
};

export default useGoogleLoginMutation;
