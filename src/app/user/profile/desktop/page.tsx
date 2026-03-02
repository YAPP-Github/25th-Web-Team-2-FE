'use client';

import useUserInfo from '@home/hooks/useUserInfo';
import { isParticipantInfo } from '@utils/typeGuard';

import { joinLayout } from '../ProfilePage.css';
import ParticipantUserInfo from './components/ParticipantUserInfo';
import ResearcherUserInfo from './components/ResearcherUserInfo';
import UserInfoHeader from './components/UserInfoHeader';


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
