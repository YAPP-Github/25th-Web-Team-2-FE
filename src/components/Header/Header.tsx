'use client';

import Image from 'next/image';
import Link from 'next/link';

import { buttonContainer, contactButton, headerLayout, image, loginButton } from './Header.css';
import Menu from './Menu';
import Logo from '../../assets/images/logo.svg';

import useUserInfo from '@/app/home/hooks/useUserInfo';
import { isResearcherInfo } from '@/utils/typeGuard';

const Header = () => {
  const { userInfo } = useUserInfo();

  return (
    <div className={headerLayout}>
      <Link href="/">
        <Image
          src={Logo}
          alt="로고"
          className={image}
          width={100.5}
          height={30}
          priority
          style={{ width: 'auto', height: 'auto' }}
        />
      </Link>
      <div className={buttonContainer}>
        {userInfo ? (
          <>
            {isResearcherInfo(userInfo) && (
              <Link href="/upload">
                <button className={contactButton}>실험 공고 등록</button>
              </Link>
            )}
            <Menu userInfo={userInfo} />
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
