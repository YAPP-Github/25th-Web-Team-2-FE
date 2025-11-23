'use client';

import React, { useMemo, useState } from 'react';
import { FormProvider } from 'react-hook-form';

import {
  buttonContainer,
  uploadContentLayout,
  uploadLayout,
  uploadContainerLayout,
} from './UploadContainer.css';
import useManageExperimentPostForm from '../../hooks/useManageExperimentPostForm';
import ApplyMethodSection from '../ApplyMethodSection/ApplyMethodSection';
import DescriptionSection from '../DescriptionSection/DescriptionSection';
import OutlineSection from '../OutlineSection/OutlineSection';
import ProgressBarSection from '../ProgressBarSection/ProgressBarSection';

import FunnelStepGuard from '@/app/join/components/FunnelStepGuard/FunnelStepGuard';
import useFunnel from '@/app/join/hooks/useFunnel';
import { STEP, UPLOAD_STEP_LIST } from '@/app/join/JoinPage.constants';
import Button from '@/components/Button/Button';
import AlertModal from '@/components/Modal/AlertModal/AlertModal';
import ConfirmModal from '@/components/Modal/ConfirmModal/ConfirmModal';
import useLeaveConfirmModal from '@/hooks/useLeaveConfirmModal';
import { UploadExperimentPostSchemaType } from '@/schema/upload/uploadExperimentPostSchema';
import { colors } from '@/styles/colors';

const AUTO_INPUT_FIELDS: (keyof UploadExperimentPostSchemaType)[] = ['leadResearcher', 'place'];

const VALIDATION_FIELDS_BY_STEP = {
  [STEP.description]: ['title', 'content'],

  [STEP.outline]: [
    'leadResearcher',
    'startDate',
    'endDate',
    'matchType',
    'place',
    'region',
    'area',
    'detailedAddress',
    'reward',
    'count',
    'timeRequired',
  ],

  [STEP.applyMethod]: ['applyMethodInfo', 'targetGroupInfo'],
} as const;

const UploadContainer = () => {
  const [images, setImages] = useState<(File | string)[]>([]);

  const [openAlertModal, setOpenAlertModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const { form, handleSubmit, extractKeywordsFromContent, isExtracting } =
    useManageExperimentPostForm({
      setOpenAlertModal,
      images,
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

  const { Funnel, currentStepIdx, Step, step, FunnelProvider, goToNext, goToPrev, isSubmitStep } =
    useFunnel(UPLOAD_STEP_LIST);

  const handleNext = async () => {
    const isValid = await form.trigger(
      VALIDATION_FIELDS_BY_STEP[step as keyof typeof VALIDATION_FIELDS_BY_STEP],
    );

    if (isValid) {
      goToNext();
    }
  };

  return (
    <section className={uploadContainerLayout({ step })}>
      <FormProvider {...form}>
        <FunnelProvider>
          <FunnelStepGuard isDirty={form.formState.isDirty}>
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
                  <div style={{ display: 'flex', gap: '1.6rem' }}>
                    <DescriptionSection
                      images={images}
                      setImages={setImages}
                      isLoading={isExtracting}
                    />
                    <OutlineSection
                      extractKeywordsFromContent={extractKeywordsFromContent}
                      isPending={isExtracting}
                    />
                  </div>
                </Step>
                {/* 실험 참여 방법 */}
                <Step name={STEP.applyMethod}>
                  <div style={{ display: 'flex', gap: '1.6rem' }}>
                    <DescriptionSection images={images} setImages={setImages} />
                    <ApplyMethodSection />
                  </div>
                </Step>
              </Funnel>
              {/* 버튼 */}
              <div className={buttonContainer}>
                {currentStepIdx > 0 && (
                  <Button variant="neutral" size="small" width="8.4rem" onClick={goToPrev}>
                    이전으로
                  </Button>
                )}
                <Button
                  variant="primary"
                  size="small"
                  width="20rem"
                  onClick={isSubmitStep ? handleSubmit : handleNext}
                >
                  {isSubmitStep ? '공고 등록하기' : '다음으로'}
                </Button>
              </div>
            </div>
          </FunnelStepGuard>
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
    </section>
  );
};

export default UploadContainer;
