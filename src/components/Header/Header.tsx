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
  myPostsButton,
} from './Header.css';
import Logo from '../../assets/images/logo.svg';
import Icon from '../Icon';

import useUserInfo from '@/app/home/hooks/useUserInfo';

const Header = () => {
  const { userInfo } = useUserInfo();

  return (
    <div className={headerLayout}>
      <Link href="/">
        <Image src={Logo} alt="로고" className={image} />
      </Link>
      <div className={buttonContainer}>
        {userInfo?.memberInfo.role === 'RESEARCHER' && (
          <Link href="/upload">
            <button className={contactButton}>실험 공고 등록</button>
          </Link>
        )}

        {userInfo ? (
          <>
            {userInfo?.memberInfo.role === 'RESEARCHER' && (
              <Link href="/my-posts">
                <button className={myPostsButton}>내가 쓴 글</button>
              </Link>
            )}

            <div className={buttonWrapper}>
              <button>{userInfo.memberInfo.name}</button>
              <Icon icon="TriangleArrow" width={20} height={20} rotate={180} />
            </div>
          </>
        ) : (
          <Link href="/login" className={loginButton}>
            로그인
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
