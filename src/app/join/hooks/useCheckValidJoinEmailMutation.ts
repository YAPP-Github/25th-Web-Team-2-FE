import { useMutation } from '@tanstack/react-query';

import { validateJoinContactEmail } from '@/apis/login';

const useCheckValidJoinEmailMutation = () => {
  return useMutation({
    mutationFn: (contactEmail: string) => validateJoinContactEmail({ contactEmail }),
  });
};

export default useCheckValidJoinEmailMutation;
