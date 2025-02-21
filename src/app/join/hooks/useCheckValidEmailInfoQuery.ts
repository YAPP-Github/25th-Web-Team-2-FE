import { useQuery } from '@tanstack/react-query';

import { validateContactEmailInfo } from '@/apis/login';
import { QUERY_KEY } from '@/constants/queryKey';

const useCheckValidEmailInfoQuery = (contactEmail: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.checkValidEmailInfo, contactEmail],
    queryFn: () => validateContactEmailInfo({ contactEmail }),
    enabled: false,
    retry: 0,
  });
};

export default useCheckValidEmailInfoQuery;
