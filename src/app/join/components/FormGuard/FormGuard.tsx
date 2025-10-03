'use client';

import { PropsWithChildren } from 'react';
import { useFormContext } from 'react-hook-form';

import ConfirmModal from '@/components/Modal/ConfirmModal/ConfirmModal';
import useLeaveConfirmModal from '@/hooks/useLeaveConfirmModal';
import { colors } from '@/styles/colors';

const FormGuard = ({ children }: PropsWithChildren) => {
  const { formState } = useFormContext();
  const { isLeaveConfirmModalOpen, handleConfirmLeave, handleCancelLeave } = useLeaveConfirmModal({
    isUserInputDirty: formState.isDirty,
  });

  return (
    <>
      {children}
      <ConfirmModal
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
        confirmButtonColor={colors.field09}
        onConfirm={() => handleConfirmLeave({ goHome: true })}
      />
    </>
  );
};

export default FormGuard;
