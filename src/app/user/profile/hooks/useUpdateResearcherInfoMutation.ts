import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateResearcherInfo } from '@/apis/user';
import { queryKey } from '@/constants/queryKey';
import { ROLE } from '@/constants/config';

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
