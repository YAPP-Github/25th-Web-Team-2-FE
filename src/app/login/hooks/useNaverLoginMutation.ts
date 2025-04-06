import { useMutation, useQueryClient } from '@tanstack/react-query';

import { API } from '@/apis/config';
import { naverLogin, NaverLoginParams } from '@/apis/login';
import { loginWithCredentials } from '@/lib/auth-utils';
import { identifyUser, setUserProperties } from '@/lib/mixpanelClient';

interface UseNaverLoginMutationProps {
  onSuccessLogin: () => void;
  onSuccessJoin: (oauthEmail: string) => void;
  onError: () => void;
}

const useNaverLoginMutation = ({
  onSuccessLogin,
  onSuccessJoin,
  onError,
}: UseNaverLoginMutationProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ code, role, state }: NaverLoginParams) => naverLogin({ code, role, state }),
    onSuccess: async ({ isRegistered, accessToken, refreshToken, memberInfo }) => {
      if (isRegistered) {
        API.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        await loginWithCredentials({ accessToken, refreshToken, role: memberInfo.role });

        identifyUser(memberInfo.oauthEmail);
        setUserProperties({ email: memberInfo.oauthEmail, role: memberInfo.role });

        onSuccessLogin();
        return;
      }

      onSuccessJoin(memberInfo.oauthEmail);
    },
    onError: (error) => {
      const errorMessage = error.message || '로그인 중 오류가 발생했습니다. 다시 시도해주세요.';
      queryClient.setQueryData(['loginError'], errorMessage);

      onError();
    },
  });
};

export default useNaverLoginMutation;
