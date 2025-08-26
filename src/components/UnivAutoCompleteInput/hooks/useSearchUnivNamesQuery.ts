import { useQuery } from '@tanstack/react-query';

import { searchUnivNames } from '@/apis/login';
import { queryKey } from '@/constants/queryKey';

export const useSearchUnivNamesQuery = (query: string) => {
  return useQuery({
    queryKey: queryKey.univSearch(query),
    queryFn: () => searchUnivNames(query),
    enabled: !!query,
  });
};
