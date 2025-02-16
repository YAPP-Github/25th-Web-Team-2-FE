import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateResearcherInfo } from '@/apis/user';
import { QUERY_KEY } from '@/constants/queryKey';

const useUpdateParticipantInfoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateResearcherInfo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.researcherInfo] });
    },
  });
};

export default useUpdateParticipantInfoMutation;
