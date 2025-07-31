'use client';

import { useRouter } from 'next/navigation';

import { profileSectionLayout } from './MobileProfileSection.css';

import { ParticipantResponse } from '@/apis/login';
import useUserInfo from '@/app/home/hooks/useUserInfo';
import { PATH } from '@/constants/path';
import { isParticipantInfo } from '@/utils/typeGuard';
import ParticipantProfileSection from './ParticipantProfileSection/ParticipantProfileSection';
import ResearcherProfileSection from './ResearcherProfileSection/ResearcherProfileSection';

const MATCH_TYPE_MAP = {
  ALL: '전체',
  OFFLINE: '대면',
  ONLINE: '비대면',
} as const;

export const getMatchTypeLabel = (matchType: ParticipantResponse['matchType']) => {
  if (matchType === null) return '-';

  return MATCH_TYPE_MAP[matchType];
};

const MobileProfileSection = () => {
  const { userInfo } = useUserInfo();
  const router = useRouter();

  const goToEditPage = (infoType?: string) => {
    if (infoType) {
      router.push(PATH.editProfile(infoType));
    }
  };

  if (!userInfo) return null;

  return (
    <section className={profileSectionLayout}>
      {isParticipantInfo(userInfo) ? (
        <ParticipantProfileSection userInfo={userInfo} goToEditPage={goToEditPage} />
      ) : (
        <ResearcherProfileSection userInfo={userInfo} goToEditPage={goToEditPage} />
      )}
    </section>
  );
};

export default MobileProfileSection;
