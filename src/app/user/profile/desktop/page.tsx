'use client';

import { joinLayout } from '../ProfilePage.css';
import ParticipantUserInfo from './components/ParticipantUserInfo/ParticipantUserInfo';
import ResearcherUserInfo from './components/ResearcherUserInfo/ResearcherUserInfo';
import UserInfoHeader from './components/UserInfoHeader/UserInfoHeader';

import useUserInfo from '@/app/home/hooks/useUserInfo';
import { isParticipantInfo } from '@/utils/typeGuard';

const ProfilePage = () => {
  const { userInfo } = useUserInfo();

  if (!userInfo) return null;

  if (isParticipantInfo(userInfo)) {
    return (
      <section className={joinLayout}>
        <UserInfoHeader userInfo={userInfo} />
        <ParticipantUserInfo userInfo={userInfo} />
      </section>
    );
  }

  return (
    <section className={joinLayout}>
      <UserInfoHeader userInfo={userInfo} />
      <ResearcherUserInfo userInfo={userInfo} />
    </section>
  );
};

export default ProfilePage;
