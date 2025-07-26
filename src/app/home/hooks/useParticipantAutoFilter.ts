'use client';

import { useEffect, useRef, useState } from 'react';

import { calculateAgeFromBirthDate, filterParticipantInfo } from '../home.utils';
import useQueryParams from './useQueryParams';

import { ParticipantResponse, ResearcherResponse } from '@/apis/login';

interface UseParticipantAutoFilterProps {
  userInfo?: ParticipantResponse | ResearcherResponse;
  isUserInfoLoading: boolean;
}

export const useParticipantAutoFilter = ({
  userInfo,
  isUserInfoLoading,
}: UseParticipantAutoFilterProps) => {
  const { searchParams, updateURLParams } = useQueryParams();
  const participantInfo = filterParticipantInfo(userInfo);
  const [isAutoFilled, setIsAutoFilled] = useState(false);
  const hasAutoFilledRef = useRef(false);

  // 참여자 자동 필터링 로직
  useEffect(() => {
    if (!participantInfo) return;

    // NOTE: 첫 홈화면 마운트 시에만 적용하고 이후에는 사용자가 수정한 값으로 적용
    if (searchParams.toString().length > 0) {
      setIsAutoFilled(true);
      return;
    }

    const participantParams = new URLSearchParams();
    participantParams.set('recruitStatus', 'ALL');
    participantParams.set('gender', participantInfo.gender);
    participantParams.set('age', calculateAgeFromBirthDate(participantInfo.birthDate).toString());
    updateURLParams(participantParams);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [participantInfo, searchParams]);

  // 참여자가 아닐 때 처리
  useEffect(() => {
    if (!isUserInfoLoading && !participantInfo && !hasAutoFilledRef.current) {
      setIsAutoFilled(true);
      hasAutoFilledRef.current = true;
    }
  }, [isUserInfoLoading, participantInfo]);

  return { isAutoFilled };
};

export default useParticipantAutoFilter;
