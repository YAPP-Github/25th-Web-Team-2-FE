'use client';

import { useRouter } from 'next/navigation';

import { PATH } from '@constants/path';
import useUserInfo from '@home/hooks/useUserInfo';
import { isParticipantInfo } from '@utils/typeGuard';

import ParticipantProfileSection from './ParticipantProfileSection';
import ResearcherProfileTab from './ResearcherProfileTab';


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
