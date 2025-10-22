'use client';

import React, { useMemo, useState } from 'react';
import { FormProvider } from 'react-hook-form';

import { buttonContainer, uploadContentLayout, uploadLayout } from './UploadContainer.css';
import useManageExperimentPostForm from '../../hooks/useManageExperimentPostForm';
import DescriptionSection from '../DescriptionSection/DescriptionSection';
import ProgressBarSection from '../ProgressBarSection/ProgressBarSection';

import AlertModal from '@/components/Modal/AlertModal/AlertModal';
import ConfirmModal from '@/components/Modal/ConfirmModal/ConfirmModal';
import useLeaveConfirmModal from '@/hooks/useLeaveConfirmModal';
import { UploadExperimentPostSchemaType } from '@/schema/upload/uploadExperimentPostSchema';
import { colors } from '@/styles/colors';
import useFunnel from '@/app/join/hooks/useFunnel';
import { STEP, UPLOAD_STEP_LIST } from '@/app/join/JoinPage.constants';
import Button from '@/components/Button/Button';

const AUTO_INPUT_FIELDS: (keyof UploadExperimentPostSchemaType)[] = ['leadResearcher', 'place'];

const UploadContainer = () => {
  const [addLink, setAddLink] = useState<boolean>(false);
  const [addContact, setAddContact] = useState<boolean>(false);
  const [isOnCampus, setIsOnCampus] = useState<boolean>(true);

  const [images, setImages] = useState<(File | string)[]>([]);

  const [openAlertModal, setOpenAlertModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const { form, handleSubmit } = useManageExperimentPostForm({
    addLink,
    addContact,
    isOnCampus,
    setOpenAlertModal,
    images,
    isEdit: false,
    setErrorMessage,
  });

  // 자동 입력 필드 제외 isDirty 체크
  const isUserInputDirty = useMemo(() => {
    return Object.keys(form.formState.dirtyFields).some(
      (key) => !AUTO_INPUT_FIELDS.includes(key as keyof UploadExperimentPostSchemaType),
    );
  }, [form.formState.dirtyFields]);

  const { isLeaveConfirmModalOpen, handleCancelLeave, handleConfirmLeave } = useLeaveConfirmModal({
    isUserInputDirty,
  });

  const { Funnel, currentStepIdx, Step, FunnelProvider, goToNext, goToPrev } =
    useFunnel(UPLOAD_STEP_LIST);

  return (
    <FormProvider {...form}>
      <FunnelProvider>
        <ProgressBarSection />
        <div className={uploadLayout}>
          <Funnel>
            {/* 실험 설명 */}
            <Step name={STEP.description}>
              <div className={uploadContentLayout}>
                <DescriptionSection images={images} setImages={setImages} />
              </div>
            </Step>
            {/* 실험 개요 */}
            <Step name={STEP.outline}>
              <div className={uploadContentLayout}>outline</div>
            </Step>
            {/* 실험 참여 방법 */}
            <Step name={STEP.applyMethod}>
              <div className={uploadContentLayout}>applyMethod</div>
            </Step>
            <Step name={STEP.success}>
              <div className={uploadContentLayout}>success</div>
            </Step>
          </Funnel>
          {/* 버튼 */}
          <div className={buttonContainer}>
            {currentStepIdx > 0 && (
              <Button variant="neutral" size="small" width="8.4rem" onClick={goToPrev}>
                이전으로
              </Button>
            )}
            <Button variant="primary" size="small" width="20rem" onClick={goToNext}>
              다음으로
            </Button>
          </div>
        </div>
      </FunnelProvider>

      {/* 공고 등록 실패 시 alert Modal */}
      <AlertModal
        title="공고 등록에 실패했어요"
        description={errorMessage ?? '시간을 두고 다시 시도해 주세요'}
        open={openAlertModal}
        onOpenChange={setOpenAlertModal}
        handleCloseModal={() => {
          setOpenAlertModal(false);
        }}
      />

      {/* 공고 등록 중 이탈 시 confirmModal */}
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
        onConfirm={() => handleConfirmLeave({ goHome: false })}
      />
    </FormProvider>
  );
};

export default UploadContainer;
