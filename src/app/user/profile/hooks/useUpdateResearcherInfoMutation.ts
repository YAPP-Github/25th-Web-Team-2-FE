import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateResearcherInfo } from '@/apis/user';
import { ROLE } from '@/constants/config';
import { queryKey } from '@/constants/queryKey';

const useUpdateResearcherInfoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateResearcherInfo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKey.userInfo(ROLE.researcher) });
    },
  });
};

export default useUpdateResearcherInfoMutation;
