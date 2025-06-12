'use client';

import { useState } from 'react';

import { mobileRightHeader } from './MobileLoginHeader.css';

import { NotReadyMenu } from '@/app/post/[postId]/mobile/components/EditNotReadyModal/EditNotReadyModal';
import HeaderMenuNotReadyModal from '@/app/post/[postId]/mobile/components/HeaderMenuNotReadyModal/HeaderMenuNotReadyModal';
import Icon from '@/components/Icon';

interface MobileLoginHeaderProps {
  isResearcher: boolean;
}

const MobileLoginHeader = ({ isResearcher }: MobileLoginHeaderProps) => {
  const [selectedMenu, setSelectedMenu] = useState<NotReadyMenu>('upload');
  const [isNotReadyModalOpen, setIsNotReadyModalOpen] = useState(false);

  const selectUpload = () => {
    setIsNotReadyModalOpen(true);
    setSelectedMenu('upload');
  };

  const selectProfile = () => {
    setIsNotReadyModalOpen(true);
    setSelectedMenu('profile');
  };

  return (
    <>
      <div className={mobileRightHeader}>
        {isResearcher && (
          <button onClick={selectUpload}>
            <Icon icon="Pen" width={24} height={24} cursor="pointer" />
          </button>
        )}
        <button onClick={selectProfile}>
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
