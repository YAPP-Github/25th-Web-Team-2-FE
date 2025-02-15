'use client';

import ParticipantUserInfo from './components/ParticipantUserInfo/ParticipantUserInfo';
import UserInfoHeader from './components/UserInfoHeader/UserInfoHeader';
import { joinLayout } from './ProfilePage.css';

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
};

export default ProfilePage;
