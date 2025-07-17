'use client';

import { useRouter } from 'next/navigation';

import { headerTitle, mobileProfileHeaderWrapper } from '../ProfilePage.css';

import Icon from '@/components/Icon';
import { colors } from '@/styles/colors';

const MobileProfilePage = () => {
  const router = useRouter();

  return (
    <>
      <header className={mobileProfileHeaderWrapper}>
        <Icon icon="Arrow" color={colors.text06} onClick={() => router.back()} />
        <h1 className={headerTitle}>내 정보</h1>
        <Icon icon="AllMenu" />
      </header>
    </>
  );
};

export default MobileProfilePage;
