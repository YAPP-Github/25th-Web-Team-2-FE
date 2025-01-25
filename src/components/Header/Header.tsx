'use client';

import Image from 'next/image';
import Link from 'next/link';

import {
  buttonContainer,
  buttonWrapper,
  contactButton,
  headerLayout,
  image,
  loginButton,
} from './Header.styles';
import Logo from '../../assets/images/logo.svg';
import Icon from '../Icon';

import { useUserInfoQuery } from '@/app/home/hooks/useUserInfoQuery';
import { ParticipantResponse, ResearcherResponse } from '@/apis/login';

export const isParticipantInfo = (data: Record<string, any>): data is ParticipantResponse => {
  return 'memberInfo' in data;
};

export const isResearcherInfo = (data: Record<string, any>): data is ResearcherResponse => {
  return 'leadResearcher' in data;
};

const getHeaderNickname = (data: ParticipantResponse | ResearcherResponse) => {
  if (isResearcherInfo(data)) {
    return data.leadResearcher;
  } else if (isParticipantInfo(data)) {
    return data.memberInfo.name;
  }
  throw new Error('유저 정보가 없습니다.');
};

const Header = () => {
  const role = sessionStorage.getItem('role') || '';
  const { data: myData } = useUserInfoQuery(role);

  return (
    <div css={headerLayout}>
      <Link href="/">
        <Image src={Logo} alt="로고" css={image} />
      </Link>
      <div css={buttonContainer}>
        <Link href="/upload">
          <button css={contactButton}>실험 공고 등록</button>
        </Link>

        {myData ? (
          <div css={buttonWrapper}>
            <button>{getHeaderNickname(myData)}</button>
            <Icon icon="TriangleArrow" width={20} height={20} rotate={180} />
          </div>
        ) : (
          <Link href="/login" css={loginButton}>
            로그인
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
