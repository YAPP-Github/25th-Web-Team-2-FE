'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FormProvider } from 'react-hook-form';

import { emptySubTitle } from '@/app/my-posts/components/MyPostsTable/MyPostsTable.css';
import { emptyViewLayout } from '@/app/post/[postId]/desktop/components/ExperimentPostContainer/ExperimentPostContainer.css';
import ApplyMethodSection from '@/app/upload/components/ApplyMethodSection/ApplyMethodSection';
import DescriptionSection from '@/app/upload/components/DescriptionSection/DescriptionSection';
import OutlineSection from '@/app/upload/components/OutlineSection/OutlineSection';
import {
  uploadLayout,
  buttonVariants,
  buttonContainer,
  headerSubTitle,
  uploadContentLayout,
  headerTitle,
} from '@/app/upload/components/UploadContainer/UploadContainer.css';
import useManageExperimentPostForm from '@/app/upload/hooks/useManageExperimentPostForm';
import AlertModal from '@/components/Modal/AlertModal/AlertModal';
import ConfirmModal from '@/components/Modal/ConfirmModal/ConfirmModal';
import Spinner from '@/components/Spinner/Spinner';
import useLeaveConfirmModal from '@/hooks/useLeaveConfirmModal';
import { colors } from '@/styles/colors';

const EditExperimentPost = ({ params }: { params: { postId: string } }) => {
  const pathname = usePathname();
  const isEdit = pathname.startsWith('/edit');
  const router = useRouter();

  const [addLink, setAddLink] = useState<boolean>(false);
  const [addContact, setAddContact] = useState<boolean>(false);
  const [isOnCampus, setIsOnCampus] = useState<boolean>(true);

  const [openSubmitAlertDialog, setOpenSubmitAlertDialog] = useState<boolean>(false);
  const [openUpdateAlertModal, setOpenUpdateAlertModal] = useState<boolean>(false);

  const [images, setImages] = useState<(File | string)[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const { form, handleSubmit, isLoading, applyMethodData, isRecruitStatus, originExperimentError } =
    useManageExperimentPostForm({
      isEdit,
      postId: params.postId,
      addLink,
      addContact,
      isOnCampus,
      setOpenAlertModal: setOpenSubmitAlertDialog,
      images,
      setImages,
      setErrorMessage,
    });

  const isUserInputDirty = form.formState.isDirty;

  const { isLeaveConfirmModalOpen, handleBackClick, handleCancelLeave, handleConfirmLeave } =
    useLeaveConfirmModal({ isUserInputDirty });

  useEffect(() => {
    const formIsOnCampus = form.getValues('isOnCampus');
    setIsOnCampus(formIsOnCampus);
  }, [form, isUserInputDirty]);

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
      setAddLink(!!applyMethodData.formUrl);
      setAddContact(!!applyMethodData.phoneNum);
    }
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
    <FormProvider {...form}>
      <div className={uploadLayout}>
        <div>
          <h2 className={headerTitle}>실험에 대한 정보를 입력해 주세요</h2>
          <p className={headerSubTitle}>구체적일수록 참여자 매칭 확률이 높아져요</p>
        </div>

        <div className={uploadContentLayout}>
          <DescriptionSection images={images} setImages={setImages} />
          <OutlineSection
            experimentDateChecked={experimentDateChecked}
            durationChecked={durationChecked}
            isRecruitStatus={isRecruitStatus}
            setIsOnCampus={setIsOnCampus}
          />
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
            {form.formState.isSubmitting ? '공고 수정 중' : '공고 수정하기'}
          </button>
        </div>
      </div>

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
  );
};

export default EditExperimentPost;
