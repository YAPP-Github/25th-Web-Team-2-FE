'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { mobileRightHeader } from './MobileLoginHeader.css';
import MypageBottomSheet from './MypageBottomSheet/MypageBottomSheet';

import Icon from '@/components/Icon';
import MobileNotReadyModal, {
  NotReadyMenu,
} from '@/components/MobileNotReadyModal/MobileNotReadyModal';
import { HIDE_MODAL_COOKIE_KEYS } from '@/constants/hideModalCookieKey';
import useOverlay from '@/hooks/useOverlay';
import { getHideModalCookie } from '@/lib/cookies';

const routeMap = {
  profile: '/user/profile',
  upload: '/upload',
  myPosts: '/my-posts',
};

interface MobileLoginHeaderProps {
  isResearcher: boolean;
}

const MobileLoginHeader = ({ isResearcher }: MobileLoginHeaderProps) => {
  const [selectedMenu, setSelectedMenu] = useState<Exclude<NotReadyMenu, 'edit'>>('upload');
  const [isNotReadyModalOpen, setIsNotReadyModalOpen] = useState(false);

  const router = useRouter();
  const { open, close } = useOverlay();

  const handleSelectMenu = (menu: Exclude<NotReadyMenu, 'edit'>) => {
    const cookieKey = HIDE_MODAL_COOKIE_KEYS[menu];
    const shouldSkipModal = getHideModalCookie(cookieKey);

    if (shouldSkipModal) {
      //  하루동안 안보기 선택된 경우
      router.push(routeMap[menu]);
    } else {
      // 아니면 모달 띄우기
      setSelectedMenu(menu);
      setIsNotReadyModalOpen(true);
    }
  };

  const handleOpenMypageBottomSheet = () => {
    open(() => (
      <MypageBottomSheet
        isResearcher={isResearcher}
        handleSelectMenu={handleSelectMenu}
        onClose={close}
      />
    ));
  };

  return (
    <>
      <div className={mobileRightHeader}>
        {isResearcher && (
          <button onClick={() => handleSelectMenu('upload')}>
            <Icon icon="Pen" width={24} height={24} cursor="pointer" />
          </button>
        )}
        <button onClick={handleOpenMypageBottomSheet}>
          <Icon icon="Profile" width={24} height={24} cursor="pointer" />
        </button>
      </div>

      {/* 업로드 모달 */}
      <MobileNotReadyModal
        menu={selectedMenu}
        isOpen={isNotReadyModalOpen}
        onOpenChange={setIsNotReadyModalOpen}
      />
    </>
  );
};

export default MobileLoginHeader;
