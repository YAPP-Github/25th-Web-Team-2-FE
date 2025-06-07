import { useMutation, useQueryClient } from '@tanstack/react-query';

import { getAuthErrorMessage } from '../LoginPage.utils';

import { CustomError } from '@/apis/config/error';
import { fetchClient } from '@/apis/config/fetchClient';
import { googleLogin, LoginResponse } from '@/apis/login';
import { loginWithCredentials } from '@/lib/auth-utils';
import { identifyUser, setUserProperties } from '@/lib/mixpanelClient';

interface GoogleLoginParams {
  code: string;
  role: string;
}

interface UseGoogleLoginMutationProps {
  onSuccessLogin: () => void;
  onSuccessJoin: (oauthEmail: string) => void;
  onError: () => void;
}

const useGoogleLoginMutation = ({
  onSuccessLogin,
  onSuccessJoin,
  onError,
}: UseGoogleLoginMutationProps) => {
  const queryClient = useQueryClient();

  return useMutation<LoginResponse, CustomError, GoogleLoginParams>({
    mutationFn: ({ code, role }: GoogleLoginParams) => googleLogin(code, role),
    onSuccess: async ({ isRegistered, accessToken, refreshToken, memberInfo }) => {
      if (isRegistered) {
        fetchClient.onRequest((config) => {
          config.headers = {
            ...config.headers,
            Authorization: `Bearer ${accessToken}`,
          };

          return config;
        });
        await loginWithCredentials({ accessToken, refreshToken, role: memberInfo.role });

        identifyUser(memberInfo.oauthEmail);
        setUserProperties({ email: memberInfo.oauthEmail, role: memberInfo.role });

        onSuccessLogin();
        return;
      }

      onSuccessJoin(memberInfo.oauthEmail);
    },

    onError: (error, variables) => {
      const { role } = variables;
      const errorMessage = getAuthErrorMessage(role, error);

      queryClient.setQueryData(['loginError'], errorMessage);
      onError();
    },
  });
};

export default useGoogleLoginMutation;
