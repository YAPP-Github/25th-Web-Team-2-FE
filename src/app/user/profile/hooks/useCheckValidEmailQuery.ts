import { useQuery } from '@tanstack/react-query';

import { validateContactEmail } from '@/apis/user';
import { QUERY_KEY } from '@/constants/queryKey';

const useCheckValidEmailQuery = (contactEmail: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.checkValidEmail, contactEmail],
    queryFn: () => validateContactEmail({ contactEmail }),
    enabled: false,
    retry: 0,
  });
};

export default useCheckValidEmailQuery;
