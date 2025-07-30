import { useMutation } from '@tanstack/react-query';

import { validateContactEmail } from '@/apis/login';

const useCheckValidEmailInfoMutation = () => {
  return useMutation({
    mutationFn: (contactEmail: string) => validateContactEmail({ contactEmail }),
  });
};

export default useCheckValidEmailInfoMutation;
