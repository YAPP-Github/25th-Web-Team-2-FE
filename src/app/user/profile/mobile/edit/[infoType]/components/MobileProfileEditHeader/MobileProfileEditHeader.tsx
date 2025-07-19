'use client';

import { useRouter } from 'next/navigation';

import { mobileProfileHeaderWrapper } from './MobileProfileEditHeader.css';

import Icon from '@/components/Icon';
import { colors } from '@/styles/colors';

const MobileProfileEditHeader = () => {
  const router = useRouter();

  return (
    <header className={mobileProfileHeaderWrapper}>
      <Icon icon="Arrow" color={colors.text06} onClick={() => router.back()} />
    </header>
  );
};

export default MobileProfileEditHeader;
