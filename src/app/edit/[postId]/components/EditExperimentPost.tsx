'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FormProvider } from 'react-hook-form';

import useFunnel from '@/app/join/hooks/useFunnel';
import { STEP, UPLOAD_STEP_LIST } from '@/app/join/JoinPage.constants';
import { emptySubTitle } from '@/app/my-posts/components/MyPostsTable/MyPostsTable.css';
import { emptyViewLayout } from '@/app/post/[postId]/desktop/components/ExperimentPostContainer/ExperimentPostContainer.css';
import ApplyMethodSection from '@/app/upload/components/ApplyMethodSection/ApplyMethodSection';
import DescriptionSection from '@/app/upload/components/DescriptionSection/DescriptionSection';
import OutlineSection from '@/app/upload/components/OutlineSection/OutlineSection';
import ProgressBarSection from '@/app/upload/components/ProgressBarSection/ProgressBarSection';
import {
  uploadLayout,
  buttonContainer,
  uploadContentLayout,
  uploadContainerLayout,
} from '@/app/upload/components/UploadContainer/UploadContainer.css';
import useManageExperimentPostForm from '@/app/upload/hooks/useManageExperimentPostForm';
import { VALIDATION_FIELDS_BY_STEP } from '@/app/upload/upload.constants';
import Button from '@/components/Button/Button';
import AlertModal from '@/components/Modal/AlertModal/AlertModal';
import ConfirmModal from '@/components/Modal/ConfirmModal/ConfirmModal';
import Spinner from '@/components/Spinner/Spinner';
import useLeaveConfirmModal from '@/hooks/useLeaveConfirmModal';
import { colors } from '@/styles/colors';

const EditExperimentPost = ({ params }: { params: { postId: string } }) => {
  const pathname = usePathname();
  const isEdit = pathname.startsWith('/edit');
  const router = useRouter();

  const [openSubmitAlertDialog, setOpenSubmitAlertDialog] = useState<boolean>(false);
  const [openUpdateAlertModal, setOpenUpdateAlertModal] = useState<boolean>(false);

  const [images, setImages] = useState<(File | string)[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const { Funnel, currentStepIdx, Step, step, FunnelProvider, goToNext, goToPrev, isSubmitStep } =
    useFunnel(UPLOAD_STEP_LIST);

  const { form, handleSubmit, isLoading, applyMethodData, isRecruitStatus, originExperimentError } =
    useManageExperimentPostForm({
      isEdit,
      postId: params.postId,
      setOpenAlertModal: setOpenSubmitAlertDialog,
      images,
      setImages,
      setErrorMessage,
    });

  const isUserInputDirty = form.formState.isDirty;

  const { isLeaveConfirmModalOpen, handleCancelLeave, handleConfirmLeave } = useLeaveConfirmModal({
    isUserInputDirty,
  });

  const handleNext = async () => {
    const isValid = await form.trigger(
      VALIDATION_FIELDS_BY_STEP[step as keyof typeof VALIDATION_FIELDS_BY_STEP],
    );

    if (isValid) {
      goToNext();
    }
  };

  useEffect(() => {
    if (originExperimentError) {
      setOpenUpdateAlertModal(true);
    }
  }, [originExperimentError]);

  // 모달 닫을 때 이전 페이지로 이동
  const handleCloseModal = () => {
    setOpenUpdateAlertModal(false);
    router.back();
  };

  useEffect(() => {
    if (applyMethodData) {
      form.reset({
        ...form.getValues(),
        addLink: !!applyMethodData.formUrl,
        addContact: !!applyMethodData.phoneNum,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [applyMethodData]);

  const experimentDateChecked =
    form.getValues('startDate') === null && form.getValues('endDate') === null;
  const durationChecked = form.getValues('timeRequired') === null;

  if (isLoading) {
    return (
      <div className={emptyViewLayout}>
        <Spinner />
        <p className={emptySubTitle}>로딩중</p>
      </div>
    );
  }
  return (
    <section className={uploadContainerLayout({ step })}>
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
                <div style={{ display: 'flex', gap: '1.6rem' }}>
                  <DescriptionSection images={images} setImages={setImages} />
                  <OutlineSection
                    experimentDateChecked={experimentDateChecked}
                    durationChecked={durationChecked}
                    isRecruitStatus={isRecruitStatus}
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
                variant={isSubmitStep ? 'dark' : 'primary'}
                size="small"
                width="20rem"
                onClick={isSubmitStep ? handleSubmit : handleNext}
              >
                {isSubmitStep
                  ? form.formState.isSubmitting
                    ? '수정 중'
                    : '수정 완료'
                  : '다음으로'}
              </Button>
            </div>
          </div>
        </FunnelProvider>

        {/* 공고 불러오기 실패 시 모달 */}
        <AlertModal
          open={openUpdateAlertModal}
          onOpenChange={setOpenUpdateAlertModal}
          handleCloseModal={handleCloseModal}
          title="공고를 불러오지 못했어요"
          description={errorMessage}
        />

        {/* 공고 수정 실패 시 모달 */}
        <AlertModal
          title="공고 수정에 실패했어요"
          description={errorMessage}
          open={openSubmitAlertDialog}
          onOpenChange={setOpenSubmitAlertDialog}
          handleCloseModal={() => {
            setOpenSubmitAlertDialog(false);
          }}
        />

        {/* 공고 수정 중 이탈 시 ConfirmModal */}
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

export default EditExperimentPost;
