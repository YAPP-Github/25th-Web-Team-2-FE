import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateParticipantInfo } from '@/apis/user';
import { queryKey } from '@/constants/queryKey';
import { ROLE } from '@/constants/config';

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
