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

import useParticipantInfoQuery from '@/app/home/hooks/useParticipantInfoQuery';
import useResearcherInfoQuery from '@/app/home/hooks/useResearcherInfoQuery';
import { ROLE } from '@/constants/config';
import useSessionStorage from '@/hooks/useSessionStorage';

const Header = () => {
  const role = useSessionStorage('role');
  const participantQuery = useParticipantInfoQuery({ enabled: role === ROLE.participant });
  const researcherQuery = useResearcherInfoQuery({ enabled: role === ROLE.researcher });

  const myData = role === ROLE.participant ? participantQuery.data : researcherQuery.data;

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
            <button>{myData.memberInfo.name}</button>
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
