'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useCallback } from 'react';

export const useQueryParams = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const updateURLParams = useCallback(
    (newParams: URLSearchParams) => {
      const paramString = newParams.toString();
      const newURL = paramString ? `${pathname}?${paramString}` : pathname;
      router.replace(newURL, { scroll: false });
    },
    [pathname, router],
  );

  return {
    searchParams,
    updateURLParams,
  };
};

export default useQueryParams;
