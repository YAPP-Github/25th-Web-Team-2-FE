import { useMutation } from '@tanstack/react-query';

import { validateJoinContactEmail } from '@/apis/login';

const useCheckValidEmailMutation = () => {
  return useMutation({
    mutationFn: (contactEmail: string) => validateJoinContactEmail({ contactEmail }),
  });
};

export default useCheckValidEmailMutation;
