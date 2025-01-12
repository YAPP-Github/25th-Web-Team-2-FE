'use client';

import Image from 'next/image';
import Link from 'next/link';

import { buttonContainer, contactButton, headerLayout, image, loginButton } from './Header.styles';
import Logo from '../../assets/images/logo.svg';

const Header = () => {
  return (
    <div css={headerLayout}>
      <Link href="/">
        <Image src={Logo} alt="로고" css={image} />
      </Link>
      <div css={buttonContainer}>
        <button css={contactButton}>실험 공고 등록</button>
        <Link href="/login" css={loginButton}>
          로그인
        </Link>
      </div>
    </div>
  );
};

export default Header;
