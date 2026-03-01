'use client';

import Link from 'next/link';

import DesktopLoginHeader from './DesktopLoginHeader';
import MobileLoginHeader from './MobileLoginHeader';
import { buttonContainer, loginButton } from '../../Header.css';

import useUserInfo from '@/app/home/hooks/useUserInfo';

export default function RightHeaderClient() {
  const { userInfo, isLoading, isResearcher } = useUserInfo();

  if (isLoading) return null;

  return (
    <div className={buttonContainer}>
      {userInfo ? (
        <>
          <DesktopLoginHeader userInfo={userInfo} />
          <MobileLoginHeader isResearcher={isResearcher} />
        </>
      ) : (
        <Link href="/login" className={loginButton}>
          로그인
        </Link>
      )}
    </div>
  );
}
