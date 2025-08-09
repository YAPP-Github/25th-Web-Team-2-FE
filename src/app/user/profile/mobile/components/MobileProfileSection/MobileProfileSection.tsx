'use client';

import { useRouter } from 'next/navigation';

import ParticipantProfileSection from './ParticipantProfileSection/ParticipantProfileSection';
import ResearcherProfileTab from './ResearcherProfileTab/ResearcherProfileTab';

import useUserInfo from '@/app/home/hooks/useUserInfo';
import { PATH } from '@/constants/path';
import { isParticipantInfo } from '@/utils/typeGuard';

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
