'use client';

import { useState } from 'react';

import EditNotReadyModal from './components/EditNotReadyModal/EditNotReadyModal';
import ExperimentPostMobileContainer from './components/ExperimentPostMobileContainer/ExperimentPostMobileContainer';
import ExperimentPostMobileHeader from './components/ExperimentPostMobileHeader/ExperimentPostMobileHeader';

import ConfirmModal from '@/components/Modal/ConfirmModal/ConfirmModal';
import { colors } from '@/styles/colors';

const ExperimentPostMobilePage = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // 삭제 요청 함수
  const handleDelete = () => {
    // TODO: 삭제 API

    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <div>
        <ExperimentPostMobileHeader
          onEditClick={() => setIsEditModalOpen(true)}
          onDeleteClick={() => setIsDeleteModalOpen(true)}
        />
        <ExperimentPostMobileContainer />
      </div>
      <EditNotReadyModal isOpen={isEditModalOpen} onOpenChange={setIsEditModalOpen} />

      {/* 삭제 확인 모달 */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        confirmTitle="해당 공고를 삭제할까요?"
        cancelText="닫기"
        confirmText="삭제하기"
        confirmButtonColor={colors.field09}
        onConfirm={handleDelete}
        isMobile
        closeIcon={false}
      />
    </>
  );
};

export default ExperimentPostMobilePage;
