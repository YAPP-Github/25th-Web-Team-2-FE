import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateParticipantInfo } from '@/apis/user';
import { ROLE } from '@/constants/config';
import { queryKey } from '@/constants/queryKey';

const useUpdateParticipantInfoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateParticipantInfo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKey.userInfo(ROLE.participant) });
    },
  });
};

export default useUpdateParticipantInfoMutation;
