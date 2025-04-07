import { useMutation } from '@tanstack/react-query';

import { API } from '@/apis/config';
import { joinParticipant } from '@/apis/login';
import { loginWithCredentials } from '@/lib/auth-utils';

const useParticipantJoinMutation = () => {
  return useMutation({
    mutationFn: joinParticipant,
    onSuccess: async ({ accessToken, refreshToken, memberInfo }) => {
      API.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      await loginWithCredentials({ accessToken, refreshToken, role: memberInfo.role });
    },
  });
};

export default useParticipantJoinMutation;
