'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useCallback, useMemo } from 'react';

import { ExperimentPostListFilters } from '@/apis/post';
import { URLFilterSchema } from '@/schema/filter/URLFilterSchema';

export const useURLFilters = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const filters = useMemo((): ExperimentPostListFilters => {
    const params = Object.fromEntries(searchParams.entries());
    const parsedFilters = URLFilterSchema().safeParse(params);

    if (!parsedFilters.success) {
      return {
        recruitStatus: 'ALL',
      };
    }

    return parsedFilters.data;
  }, [searchParams]);

  const isRecruiting = filters.recruitStatus === 'OPEN';

  const updateURLParams = useCallback(
    (newParams: URLSearchParams) => {
      const paramString = newParams.toString();
      const newURL = paramString ? `${pathname}?${paramString}` : pathname;
      router.replace(newURL, { scroll: false });
    },
    [pathname, router],
  );

  const handleFilterChange = useCallback(
    (filters: Record<string, string | string[] | number | null>) => {
      const newParams = new URLSearchParams(searchParams);

      Object.entries(filters).forEach(([key, value]) => {
        if (value === null || value === '' || (Array.isArray(value) && value.length === 0)) {
          newParams.delete(key);
        } else {
          const stringValue = Array.isArray(value) ? value.join(',') : String(value);
          newParams.set(key, stringValue);
        }
      });

      updateURLParams(newParams);
    },
    [searchParams, updateURLParams],
  );

  const handleToggleRecruitStatus = () => {
    handleFilterChange({ recruitStatus: isRecruiting ? 'ALL' : 'OPEN' });
  };

  const handleResetFilter = useCallback(() => {
    const newParams = new URLSearchParams();
    updateURLParams(newParams);
  }, [updateURLParams]);

  return {
    filters,
    isRecruiting,
    handleFilterChange,
    handleToggleRecruitStatus,
    handleResetFilter,
  };
};

export default useURLFilters;
