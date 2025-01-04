'use client';

import Image from 'next/image';
import Logo from '../../assets/images/logo.svg';

import {
  buttonContainer,
  contactButton,
  headerContainer,
  headerLayout,
  image,
  loginButton,
} from './Header.styles';

const Header = () => {
  return (
    <div css={headerLayout}>
      <div css={headerContainer}>
        <Image src={Logo} alt="로고" css={image} />
        <div css={buttonContainer}>
          <button css={contactButton}>연구 참여자 모집하기</button>
          <button css={loginButton}>로그인</button>
        </div>
      </div>
    </div>
  );
};

export default Header;
