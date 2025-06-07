import { useMutation, useQueryClient } from '@tanstack/react-query';

import { getAuthErrorMessage } from '../LoginPage.utils';

import { CustomError } from '@/apis/config/error';
import { fetchClient } from '@/apis/config/fetchClient';
import { googleLogin, GoogleLoginParams, LoginResponse } from '@/apis/login';
import { loginWithCredentials } from '@/lib/auth-utils';
import { identifyUser, setUserProperties } from '@/lib/mixpanelClient';

const redirectUri = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI || '';

type LoginParams = Omit<GoogleLoginParams, 'redirectUri'>;

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

  return useMutation<LoginResponse, CustomError, LoginParams>({
    mutationFn: ({ code, role }: LoginParams) => googleLogin({ code, role, redirectUri }),
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
