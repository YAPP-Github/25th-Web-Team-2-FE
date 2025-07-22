'use client';

import { useEffect } from 'react';

import { calculateAgeFromBirthDate, filterParticipantInfo } from '../home.utils';
import useQueryParams from './useQueryParams';

import { ParticipantResponse, ResearcherResponse } from '@/apis/login';

export const useParticipantAutoFilter = (userInfo?: ParticipantResponse | ResearcherResponse) => {
  const { searchParams, updateURLParams } = useQueryParams();
  const participantInfo = filterParticipantInfo(userInfo);

  // 참여자 자동 필터링 적용
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
