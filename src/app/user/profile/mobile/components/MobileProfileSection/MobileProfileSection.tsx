'use client';

import { useRouter } from 'next/navigation';

import ParticipantProfileSection from './ParticipantProfileSection/ParticipantProfileSection';
import ResearcherProfileTab from './ResearcherProfileTab/ResearcherProfileTab';

import { ParticipantResponse } from '@/apis/login';
import useUserInfo from '@/app/home/hooks/useUserInfo';
import { PATH } from '@/constants/path';
import { isParticipantInfo } from '@/utils/typeGuard';

const MATCH_TYPE_MAP = {
  ALL: '전체',
  OFFLINE: '대면',
  ONLINE: '비대면',
} as const;

export const getMatchTypeLabel = (matchType: ParticipantResponse['matchType']) => {
  if (matchType === null) return '-';

  return MATCH_TYPE_MAP[matchType];
};

interface MobileProfileSectionProps {
  defaultTab?: string;
}

const MobileProfileSection = ({ defaultTab }: MobileProfileSectionProps) => {
  const { userInfo } = useUserInfo();
  const router = useRouter();

  const goToEditPage = (infoType?: string) => {
    if (infoType) {
      router.push(PATH.editProfile(infoType));
    }
  };

  if (!userInfo) return null;

  if (isParticipantInfo(userInfo)) {
    return <ParticipantProfileSection userInfo={userInfo} goToEditPage={goToEditPage} />;
  }

  return (
    <ResearcherProfileTab userInfo={userInfo} goToEditPage={goToEditPage} defaultTab={defaultTab} />
  );
};

export default MobileProfileSection;
