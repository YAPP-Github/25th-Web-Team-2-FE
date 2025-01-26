import { useMutation } from '@tanstack/react-query';

import { API } from '@/apis/config';
import { joinResearcher } from '@/apis/login';

const useResearcherJoinMutation = () => {
  return useMutation({
    mutationFn: joinResearcher,
    onSuccess: ({ accessToken, refreshToken, memberInfo }) => {
      API.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      sessionStorage.setItem('refreshToken', refreshToken);
      sessionStorage.setItem('role', memberInfo.role);
    },
  });
};

export default useResearcherJoinMutation;
