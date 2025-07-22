'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useCallback, useEffect } from 'react';

import { calculateAgeFromBirthDate, filterParticipantInfo } from '../home.utils';

import { ParticipantResponse, ResearcherResponse } from '@/apis/login';

export const useParticipantAutoFilter = (userInfo?: ParticipantResponse | ResearcherResponse) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const participantInfo = filterParticipantInfo(userInfo);

  const updateURLParams = useCallback(
    (newParams: URLSearchParams) => {
      const paramString = newParams.toString();
      const newURL = paramString ? `${pathname}?${paramString}` : pathname;
      router.replace(newURL, { scroll: false });
    },
    [pathname, router],
  );

  // 참여자 자동 필터 적용 (필터링이 없을 때만)
  useEffect(() => {
    if (!participantInfo) return;

    const hasQueryParams = searchParams.toString().length > 0;

    if (!hasQueryParams) {
      const participantParams = new URLSearchParams();
      participantParams.set('recruitStatus', 'ALL');
      participantParams.set('gender', participantInfo.gender);
      participantParams.set('age', calculateAgeFromBirthDate(participantInfo.birthDate).toString());
      updateURLParams(participantParams);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [participantInfo]);
};

export default useParticipantAutoFilter;
