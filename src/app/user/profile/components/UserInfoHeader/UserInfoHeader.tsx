import { assignInlineVars } from '@vanilla-extract/dynamic';

import {
  badge,
  emailWrapper,
  headerContainer,
  infoContainer,
  subTitle,
  title,
  titleContainer,
  verticalLine,
} from './UserInfoHeader.css';

import { ParticipantResponse, ResearcherResponse } from '@/apis/login';
import { colors } from '@/styles/colors';
import { isParticipantInfo } from '@/utils/typeGuard';

const GENDER_LABEL = {
  MALE: '남성',
  FEMALE: '여성',
} as const;

const UserInfoHeader = ({ userInfo }: { userInfo: ParticipantResponse | ResearcherResponse }) => {
  const { memberInfo } = userInfo;
  const isParticipant = isParticipantInfo(userInfo);

  if (isParticipant) {
    return (
      <div className={headerContainer}>
        <div className={titleContainer}>
          <span
            className={badge}
            style={assignInlineVars({
              '--badge-color': colors.primaryMint,
              '--badge-bg': colors.primaryTinted,
            })}
          >
            참여자
          </span>
          <span className={title}>{memberInfo.name}님의 회원정보</span>
        </div>
        <div className={infoContainer}>
          <span>{GENDER_LABEL[userInfo.gender]}</span>
          <span className={verticalLine} />
          <span>{userInfo.birthDate}</span>
          <span className={verticalLine} />
          <div className={emailWrapper}>
            <span>ID</span>
            <span>{memberInfo.oauthEmail}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={headerContainer}>
      <div className={titleContainer}>
        <span
          className={badge}
          style={assignInlineVars({
            '--badge-color': colors.secondaryPink,
            '--badge-bg': colors.secondaryTinted,
          })}
        >
          연구자
        </span>
        <span className={title}>{memberInfo.name}님의 회원정보</span>
      </div>
      <div className={infoContainer}>
        <span className={subTitle}>학교 메일</span>
        <span>{userInfo.univEmail}</span>
        <span className={verticalLine} />
        <div className={emailWrapper}>
          <span className={subTitle}>ID</span>
          <span>{memberInfo.oauthEmail}</span>
        </div>
      </div>
    </div>
  );
};

export default UserInfoHeader;
