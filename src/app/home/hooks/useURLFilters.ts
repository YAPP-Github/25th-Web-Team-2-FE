'use client';

import { useCallback, useMemo } from 'react';

import useQueryParams from './useQueryParams';

import { ExperimentPostListFilters } from '@/apis/post';
import { DEFAULT_RECRUIT_STATUS } from '@/constants/filters';
import { useToast } from '@/hooks/useToast';
import { URLFilterSchema } from '@/schema/filter/URLFilterSchema';
import { ExperimentPostListFilterParams } from '@/types/filter';

const INVALID_FILTER_MESSAGE = '필터 조건이 올바르지 않습니다. 다시 적용해주세요.';

const useURLFilters = () => {
  const { searchParams, updateURLParams } = useQueryParams();
  const toast = useToast();

  const filters = useMemo((): ExperimentPostListFilters => {
    const params = Object.fromEntries(searchParams.entries());
    const parsedFilters = URLFilterSchema().safeParse(params);

    if (!parsedFilters.success) {
      toast.error({ message: INVALID_FILTER_MESSAGE });
      const newParams = new URLSearchParams({ recruitStatus: DEFAULT_RECRUIT_STATUS });
      updateURLParams(newParams);

      return {
        recruitStatus: DEFAULT_RECRUIT_STATUS,
      };
    }

    return parsedFilters.data;
  }, [searchParams, updateURLParams, toast]);

  const isRecruiting = filters.recruitStatus === DEFAULT_RECRUIT_STATUS;

  const handleFilterChange = useCallback(
    (filters: ExperimentPostListFilterParams) => {
      const newParams = new URLSearchParams(searchParams);

      Object.entries(filters).forEach(([key, value]) => {
        if (value === null || (Array.isArray(value) && value.length === 0)) {
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
    handleFilterChange({ recruitStatus: isRecruiting ? 'ALL' : DEFAULT_RECRUIT_STATUS });
  };

  const handleResetFilter = useCallback(() => {
    const newParams = new URLSearchParams({ recruitStatus: DEFAULT_RECRUIT_STATUS });
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
