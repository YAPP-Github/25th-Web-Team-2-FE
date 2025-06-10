'use client';

import * as Toast from '@radix-ui/react-toast';
import React, { useMemo, useState } from 'react';
import { FormProvider } from 'react-hook-form';

import {
  buttonVariants,
  buttonContainer,
  uploadContentLayout,
  uploadLayout,
  headerTitle,
  headerSubTitle,
} from './UploadContainer.css';
import useManageExperimentPostForm from '../../hooks/useManageExperimentPostForm';
import ApplyMethodSection from '../ApplyMethodSection/ApplyMethodSection';
import DescriptionSection from '../DescriptionSection/DescriptionSection';
import OutlineSection from '../OutlineSection/OutlineSection';

import {
  copyToastLayout,
  copyToastTitle,
  copyToastViewport,
} from '@/app/post/[post_id]/desktop/components/ParticipationGuideModal/ParticipationGuideModal.css';
import Icon from '@/components/Icon';
import AlertModal from '@/components/Modal/AlertModal/AlertModal';
import ConfirmModal from '@/components/Modal/ConfirmModal/ConfirmModal';
import useLeaveConfirmModal from '@/hooks/useLeaveConfirmModal';
import { UploadExperimentPostSchemaType } from '@/schema/upload/uploadExperimentPostSchema';
import { colors } from '@/styles/colors';

const AUTO_INPUT_FIELDS: (keyof UploadExperimentPostSchemaType)[] = ['leadResearcher', 'place'];

const UploadContainer = () => {
  const [addLink, setAddLink] = useState<boolean>(false);
  const [addContact, setAddContact] = useState<boolean>(false);

  const [images, setImages] = useState<(File | string)[]>([]);
  const [successToast, setSuccessToast] = useState(false);

  const [openAlertModal, setOpenAlertModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { form, handleSubmit } = useManageExperimentPostForm({
    addLink,
    addContact,
    setOpenAlertModal,
    images,
    isEdit: false,
    setSuccessToast,
    setErrorMessage,
  });

  // 자동 입력 필드 제외 isDirty 체크
  const isUserInputDirty = useMemo(() => {
    return Object.keys(form.formState.dirtyFields).some(
      (key) => !AUTO_INPUT_FIELDS.includes(key as keyof UploadExperimentPostSchemaType),
    );
  }, [form.formState.dirtyFields]);

  const { isLeaveConfirmModalOpen, handleBackClick, handleCancelLeave, handleConfirmLeave } =
    useLeaveConfirmModal({ isUserInputDirty });

  return (
    <FormProvider {...form}>
      <div className={uploadLayout}>
        <div>
          <h2 className={headerTitle}>실험에 대한 정보를 입력해 주세요</h2>
          <p className={headerSubTitle}>구체적일수록 참여자 매칭 확률이 높아져요</p>
        </div>

        <div className={uploadContentLayout}>
          {/* 실험 설명 */}
          <DescriptionSection images={images} setImages={setImages} />

          {/* 실험 개요 */}
          <OutlineSection />

          {/* 실험 참여 방법 */}
          <ApplyMethodSection
            addLink={addLink}
            setAddLink={setAddLink}
            addContact={addContact}
            setAddContact={setAddContact}
          />
        </div>

        {/* 버튼 */}
        <div className={buttonContainer}>
          <button
            className={buttonVariants.active}
            onClick={() => handleBackClick({ goHome: false })}
          >
            이전으로
          </button>

          <button className={buttonVariants.upload} onClick={handleSubmit} type="submit">
            {form.formState.isSubmitting ? '공고 등록 중' : '공고 등록하기'}
          </button>
        </div>
      </div>

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

      {/* 공고 등록 성공 시 successToast */}
      <Toast.Provider swipeDirection="right">
        <Toast.Root
          className={copyToastLayout}
          open={successToast}
          onOpenChange={setSuccessToast}
          duration={1000}
        >
          <Toast.Title className={copyToastTitle}>
            <Icon icon="CheckRound" color={colors.primaryMint} width={24} height={24} />
            <p>공고가 등록되었어요!</p>
          </Toast.Title>
        </Toast.Root>
        <Toast.Viewport className={copyToastViewport} />
      </Toast.Provider>

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
