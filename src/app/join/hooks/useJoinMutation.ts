import { useMutation } from '@tanstack/react-query';

import { API } from '@/apis/config';
import { join } from '@/apis/login';

const useJoinMutation = () => {
  return useMutation({
    mutationFn: join,
    onSuccess: ({ accessToken, refreshToken, memberInfo }) => {
      API.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      sessionStorage.setItem('refreshToken', refreshToken);
      sessionStorage.setItem('role', memberInfo.role);
    },
  });
};

export default useJoinMutation;
