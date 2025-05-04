import { useMutation } from '@tanstack/react-query';

import fetchClient from '@/apis/config/fetchClient';
import { joinParticipant } from '@/apis/login';
import { loginWithCredentials } from '@/lib/auth-utils';

const useParticipantJoinMutation = () => {
  return useMutation({
    mutationFn: joinParticipant,
    onSuccess: async ({ accessToken, refreshToken, memberInfo }) => {
      fetchClient.onRequest((config) => {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${accessToken}`,
        };

        return config;
      });
      await loginWithCredentials({ accessToken, refreshToken, role: memberInfo.role });
    },
  });
};

export default useParticipantJoinMutation;
