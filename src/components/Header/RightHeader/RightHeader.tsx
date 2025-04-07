import Link from 'next/link';

import { buttonContainer, contactButton, loginButton } from '../Header.css';
import Menu from '../Menu';

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
          {isResearcher && (
            <Link href="/upload" className={contactButton}>
              실험 공고 등록
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
  );
};

export default RightHeader;
