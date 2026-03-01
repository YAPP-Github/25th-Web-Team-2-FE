import {
  userDetails,
  verticalLine,
  firstTitle,
  firstContent,
  userIDLabel,
  userDetailWrapper,
  userIDWrapper,
  userID,
} from './UserDetailInfo.css';

import { ParticipantResponse, ResearcherResponse } from '@/apis/login';
import { isParticipantInfo } from '@/utils/typeGuard';

const formatBirthDate = (date: string) => {
  if (!date) return '';
  return date.replace(/-/g, '. ') + '.';
};

const GENDER_LABEL = {
  MALE: '남성',
  FEMALE: '여성',
  ALL: '전체',
} as const;

interface UserDetailInfoProps {
  userInfo: ParticipantResponse | ResearcherResponse;
}

const UserDetailInfo = ({ userInfo }: UserDetailInfoProps) => {
  const memberInfo = userInfo?.memberInfo;
  const isParticipant = isParticipantInfo(userInfo);

  return (
    <div className={userDetails}>
      {isParticipant ? (
        <div className={userDetailWrapper}>
          <span className={firstTitle}>{GENDER_LABEL[userInfo.gender]}</span>
          <span className={verticalLine} />
          <span className={firstContent}>{formatBirthDate(userInfo.birthDate)}</span>
        </div>
      ) : (
        <div className={userDetailWrapper}>
          <span className={firstTitle}>학교 메일</span>
          <span className={firstContent}>{userInfo.univEmail}</span>
        </div>
      )}
      <div className={userIDWrapper}>
        <span className={userIDLabel}>ID</span>
        <span className={userID}>{memberInfo?.oauthEmail}</span>
      </div>
    </div>
  );
};

export default UserDetailInfo;
