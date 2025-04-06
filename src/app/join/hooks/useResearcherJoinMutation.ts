import { useMutation } from '@tanstack/react-query';

import { API } from '@/apis/config';
import { joinResearcher } from '@/apis/login';
import { loginWithCredentials } from '@/lib/auth-utils';

const useResearcherJoinMutation = () => {
  return useMutation({
    mutationFn: joinResearcher,
    onSuccess: async ({ accessToken, refreshToken, memberInfo }) => {
      API.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      await loginWithCredentials({ accessToken, refreshToken, role: memberInfo.role });
    },
  });
};

export default useResearcherJoinMutation;
