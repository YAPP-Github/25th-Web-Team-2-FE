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

import useUserInfo from '@/app/home/hooks/useUserInfo';

const Header = () => {
  const { userInfo } = useUserInfo();

  return (
    <div css={headerLayout}>
      <Link href="/">
        <Image src={Logo} alt="로고" css={image} />
      </Link>
      <div css={buttonContainer}>
        <Link href="/upload">
          <button css={contactButton}>실험 공고 등록</button>
        </Link>

        {userInfo ? (
          <div css={buttonWrapper}>
            <button>{userInfo.memberInfo.name}</button>
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
