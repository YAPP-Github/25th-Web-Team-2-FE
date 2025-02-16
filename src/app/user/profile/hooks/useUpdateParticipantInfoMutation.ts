import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateParticipantInfo } from '@/apis/user';
import { QUERY_KEY } from '@/constants/queryKey';

const useUpdateParticipantInfoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateParticipantInfo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.participantInfo] });
    },
  });
};

export default useUpdateParticipantInfoMutation;
