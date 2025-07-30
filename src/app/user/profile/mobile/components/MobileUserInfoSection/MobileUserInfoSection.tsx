'use client';

import { userInfoHeader, userInfoContent, userName, userBadge } from './MobileUserInfoSection.css';
import UserDetailInfo from './UserDetailInfo/UserDetailInfo';

import useUserInfo from '@/app/home/hooks/useUserInfo';
import { isParticipantInfo } from '@/utils/typeGuard';

const MobileUserInfoSection = () => {
  const { userInfo } = useUserInfo();
  const memberInfo = userInfo?.memberInfo;

  if (!userInfo || !memberInfo) return null;

  return (
    <div className={userInfoHeader}>
      <div className={userInfoContent}>
        <div className={userName}>
          <span>{memberInfo?.name} 님</span>
          <span className={userBadge({ role: memberInfo.role })}>
            {isParticipantInfo(userInfo) ? '참여자' : '연구자'}
          </span>
        </div>

        <UserDetailInfo userInfo={userInfo} />
      </div>
    </div>
  );
};

export default MobileUserInfoSection;
