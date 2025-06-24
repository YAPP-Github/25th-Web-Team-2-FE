import { useMutation } from '@tanstack/react-query';

import { validateContactEmailInfo } from '@/apis/login';

const useCheckValidEmailInfoMutation = () => {
  return useMutation({
    mutationFn: (contactEmail: string) => validateContactEmailInfo({ contactEmail }),
  });
};

export default useCheckValidEmailInfoMutation;
