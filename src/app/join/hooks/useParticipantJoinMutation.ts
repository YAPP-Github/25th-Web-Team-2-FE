import { useMutation } from '@tanstack/react-query';

import { API } from '@/apis/config';
import { joinParticipant } from '@/apis/login';

const useParticipantJoinMutation = () => {
  return useMutation({
    mutationFn: joinParticipant,
    onSuccess: ({ accessToken, refreshToken, memberInfo }) => {
      API.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      sessionStorage.setItem('refreshToken', refreshToken);
      sessionStorage.setItem('role', memberInfo.role);
    },
  });
};

export default useParticipantJoinMutation;
