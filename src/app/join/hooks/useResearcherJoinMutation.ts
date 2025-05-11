import { useMutation } from '@tanstack/react-query';

import { fetchClient } from '@/apis/config/fetchClient';
import { joinResearcher } from '@/apis/login';
import { loginWithCredentials } from '@/lib/auth-utils';

const useResearcherJoinMutation = () => {
  return useMutation({
    mutationFn: joinResearcher,
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

export default useResearcherJoinMutation;
