import Link from 'next/link';

import { buttonContainer, loginButton } from '../Header.css';
import DesktopLoginHeader from './components/DesktopLoginHeader/DesktopLoginHeader';
import MobileLoginHeader from './components/MobileLoginHeader/MobileLoginHeader';

import useUserInfo from '@/app/home/hooks/useUserInfo';

const RightHeader = () => {
  const { userInfo, isLoading, isResearcher } = useUserInfo();

  if (isLoading) {
    return null;
  }

  return (
    <div className={buttonContainer}>
      {userInfo ? (
        <>
          <DesktopLoginHeader isResearcher={isResearcher} userInfo={userInfo} />
          <MobileLoginHeader isResearcher={isResearcher} />
        </>
      ) : (
        <Link href="/login" className={loginButton}>
          로그인
        </Link>
      )}
    </div>
  );
};

export default RightHeader;
