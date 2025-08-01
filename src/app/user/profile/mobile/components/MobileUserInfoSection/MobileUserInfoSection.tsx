'use client';

import {
  userInfoHeader,
  userInfoContent,
  userName,
  userBadge,
  userDetails,
  verticalLine,
  gender,
  birthDate,
  userIDLabel,
  userDetailWrapper,
  userIDWrapper,
  userID,
} from './MobileUserInfoSection.css';

import useUserInfo from '@/app/home/hooks/useUserInfo';
import { colors } from '@/styles/colors';
import { isParticipantInfo } from '@/utils/typeGuard';

export const formatBirthDate = (date: string) => {
  if (!date) return '';
  return date.replace(/-/g, '. ') + '.';
};

const GENDER_LABEL = {
  MALE: '남성',
  FEMALE: '여성',
  ALL: '전체',
} as const;

const MobileUserInfoSection = () => {
  const { userInfo } = useUserInfo();
  const isParticipant = isParticipantInfo(userInfo);
  const memberInfo = userInfo?.memberInfo;

  if (!userInfo) return null;

  return (
    <div className={userInfoHeader}>
      <div className={userInfoContent}>
        <div className={userName}>
          <span>{memberInfo?.name} 님</span>
          <span
            className={userBadge}
            style={{
              color: isParticipant ? colors.primaryMint : colors.secondaryPink,
            }}
          >
            {isParticipant ? '참여자' : '연구자'}
          </span>
        </div>
        <div className={userDetails}>
          {isParticipant && (
            <div className={userDetailWrapper}>
              <span className={gender}>{GENDER_LABEL[userInfo.gender]}</span>
              <span className={verticalLine} />
              <span className={birthDate}>{formatBirthDate(userInfo.birthDate)}</span>
            </div>
          )}
          <div className={userIDWrapper}>
            <span className={userIDLabel}>ID</span>
            <span className={userID}>{memberInfo?.oauthEmail}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileUserInfoSection;
