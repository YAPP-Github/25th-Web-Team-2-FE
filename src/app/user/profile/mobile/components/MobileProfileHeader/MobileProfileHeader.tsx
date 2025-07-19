'use client';

import { useRouter } from 'next/navigation';

import { headerTitle, mobileProfileHeaderWrapper } from './MobileProfileHeader.css';

import Icon from '@/components/Icon';
import { colors } from '@/styles/colors';
import useOverlay from '@/hooks/useOverlay';
import ProfileBottomSheet from './ProfileBottomSheet/ProfileBottomSheet';

const MobileProfileHeader = () => {
  const router = useRouter();
  const { open, close } = useOverlay();

  const openMenu = () => {
    open(() => <ProfileBottomSheet onClose={close} />);
  };

  return (
    <header className={mobileProfileHeaderWrapper}>
      <button onClick={() => router.back()}>
        <Icon icon="Arrow" color={colors.text06} />
      </button>
      <h1 className={headerTitle}>내 정보</h1>
      <button onClick={openMenu}>
        <Icon icon="AllMenu" />
      </button>
    </header>
  );
};

export default MobileProfileHeader;
