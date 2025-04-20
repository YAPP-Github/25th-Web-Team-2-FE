import React from 'react';

import { leaveHeaderWrapper, title, description } from './LeaveHeader.css';

import useUserInfo from '@/app/home/hooks/useUserInfo';

const LeaveHeader = () => {
  const { userInfo } = useUserInfo();
  const userName = userInfo?.memberInfo.name;

  return (
    <div className={leaveHeaderWrapper}>
      <h2 className={title}>{userName}님, 정말 탈퇴하시겠어요?</h2>
      <span className={description}>
        탈퇴를 결정한 이유를 말씀해 주세요. 서비스 개선에 중요한 자료로 활용할게요
      </span>
    </div>
  );
};

export default LeaveHeader;
