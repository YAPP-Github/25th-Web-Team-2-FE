import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { ParticipantResponse, ResearcherResponse } from '@/apis/login';
import useUserInfo from '@/app/home/hooks/useUserInfo';
import { ROLE } from '@/constants/config';

const useUserResearcherInfo = () => {
  const pathname = usePathname();
  const isEdit = pathname.startsWith('/edit');
  const { setValue } = useFormContext();
  const { userInfo } = useUserInfo();

  // todo 참여자의 경우 접근 방지 추가 예정
  // 연구자인지 확인하는 함수
  const isResearcher = (
    user: ParticipantResponse | ResearcherResponse,
  ): user is ResearcherResponse => {
    return (user as ResearcherResponse).memberInfo.role === ROLE.researcher;
  };

  // 로그인한 연구자 정보 자동 채우기
  useEffect(() => {
    if (isEdit || !userInfo || !isResearcher(userInfo)) return;

    const researcherName = `${userInfo.univName} ${userInfo.major} ${userInfo.memberInfo.name}`;
    setValue('leadResearcher', researcherName);
    setValue('place', userInfo.univName);
  }, [userInfo, setValue, isEdit]);
};

export default useUserResearcherInfo;
