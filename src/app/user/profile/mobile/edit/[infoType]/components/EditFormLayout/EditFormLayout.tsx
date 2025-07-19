'use client';

import { ReactNode } from 'react';

import TitleSection from '@/app/join/mobile/components/TitleSection/TitleSection';
import { mainContentLayout } from './EditFormLayout.css';
import ConfirmModal from '@/components/Modal/ConfirmModal/ConfirmModal';
import { useFormContext } from 'react-hook-form';
import useLeaveConfirmModal from '@/hooks/useLeaveConfirmModal';
import { colors } from '@/styles/colors';

interface EditFormLayoutProps {
  title: string;
  children: ReactNode;
  description?: string;
  emailBadge?: ReactNode;
}

const EditFormLayout = ({ title, description, children, emailBadge }: EditFormLayoutProps) => {
  const form = useFormContext();
  const { isLeaveConfirmModalOpen, handleCancelLeave, handleConfirmLeave } = useLeaveConfirmModal({
    isUserInputDirty: form.formState.isDirty,
  });

  return (
    <main className={mainContentLayout}>
      <TitleSection title={title} description={description} emailBadge={emailBadge} />
      <>{children}</>

      {/* 내 정보 수정 중 이탈 시 */}
      <ConfirmModal
        isMobile
        isOpen={isLeaveConfirmModalOpen}
        onOpenChange={(open) => {
          if (!open) {
            handleCancelLeave();
          }
        }}
        confirmTitle="페이지에서 나가시겠어요?"
        descriptionText="입력한 내용은 따로 저장되지 않아요"
        cancelText="취소"
        confirmText="나가기"
        confirmButtonColor={colors.primaryMint}
        onConfirm={() => handleConfirmLeave({ goHome: false })}
      />
    </main>
  );
};

export default EditFormLayout;
