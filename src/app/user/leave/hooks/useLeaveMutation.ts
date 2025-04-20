import { useMutation } from '@tanstack/react-query';

import { leaveUser } from '@/apis/user';

const useLeaveMutation = () => {
  return useMutation({
    mutationFn: leaveUser,
  });
};

export default useLeaveMutation;
