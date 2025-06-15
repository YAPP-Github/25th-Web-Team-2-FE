'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { mobileRightHeader } from './MobileLoginHeader.css';

import { NotReadyMenu } from '@/app/post/[postId]/mobile/components/EditNotReadyModal/EditNotReadyModal';
import HeaderMenuNotReadyModal from '@/app/post/[postId]/mobile/components/HeaderMenuNotReadyModal/HeaderMenuNotReadyModal';
import { HIDE_MODAL_COOKIE_KEYS } from '@/app/post/[postId]/mobile/ExperimentPostPage.constants';
import Icon from '@/components/Icon';
import { getHideModalCookie } from '@/lib/cookies';

interface MobileLoginHeaderProps {
  isResearcher: boolean;
}

const MobileLoginHeader = ({ isResearcher }: MobileLoginHeaderProps) => {
  const [selectedMenu, setSelectedMenu] = useState<NotReadyMenu>('upload');
  const [isNotReadyModalOpen, setIsNotReadyModalOpen] = useState(false);

  const router = useRouter();

  const handleSelectMenu = (menu: NotReadyMenu) => {
    const cookieKey = HIDE_MODAL_COOKIE_KEYS[menu];
    const shouldSkipModal = getHideModalCookie(cookieKey);

    if (shouldSkipModal) {
      //  하루동안 안보기 선택된 경우
      if (menu === 'profile') {
        router.push('/user/profile');
      } else if (menu === 'upload') {
        router.push('/upload');
      }
    } else {
      // 아니면 모달 띄우기
      setSelectedMenu(menu);
      setIsNotReadyModalOpen(true);
    }
  };

  return (
    <>
      <div className={mobileRightHeader}>
        {isResearcher && (
          <button onClick={() => handleSelectMenu('upload')}>
            <Icon icon="Pen" width={24} height={24} cursor="pointer" />
          </button>
        )}
        <button onClick={() => handleSelectMenu('profile')}>
          <Icon icon="Profile" width={24} height={24} cursor="pointer" />
        </button>
      </div>

      {/* 업로드 모달 */}
      <HeaderMenuNotReadyModal
        menu={selectedMenu}
        isOpen={isNotReadyModalOpen}
        onOpenChange={setIsNotReadyModalOpen}
      />
    </>
  );
};

export default MobileLoginHeader;
