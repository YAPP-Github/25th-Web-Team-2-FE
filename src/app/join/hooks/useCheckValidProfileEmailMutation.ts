import { useMutation } from '@tanstack/react-query';

import { validateProfileContactEmail } from '@/apis/user';

const useCheckValidProfileEmailMutation = () => {
  return useMutation({
    mutationFn: (contactEmail: string) => validateProfileContactEmail({ contactEmail }),
  });
};

export default useCheckValidProfileEmailMutation;
