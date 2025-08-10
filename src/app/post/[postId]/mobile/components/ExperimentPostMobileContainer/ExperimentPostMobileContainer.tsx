'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { UseApplyMethodQueryResponse } from '../../../hooks/useApplyMethodQuery';
import { UseQueryExperimentDetailsAPIResponse } from '../../../hooks/useExperimentDetailsQuery';
import ExperimentPostMobileContentWrapper from '../ExperimentPostMobileContentWrapper/ExperimentPostMobileContentWrapper';
import ExperimentPostMobileHeader from '../ExperimentPostMobileHeader/ExperimentPostMobileHeader';
import PostMenuBottomSheet from '../PostMenuBottomSheet/PostMenuBottomSheet';

import useDeleteExperimentPostMutation from '@/app/my-posts/hooks/useDeleteExperimentPostMutation';
import MobileNotReadyModal from '@/components/MobileNotReadyModal/MobileNotReadyModal';
import { HIDE_MODAL_COOKIE_KEYS } from '@/components/MobileNotReadyModal/mobileNotReadyModal.constants';
import ConfirmModal from '@/components/Modal/ConfirmModal/ConfirmModal';
import useOverlay from '@/hooks/useOverlay';
import { useToast } from '@/hooks/useToast';
import { getHideModalCookie } from '@/lib/cookies';
import { colors } from '@/styles/colors';

interface ExperimentPostMobileContainerProps {
  postId: string;
  postDetailData: UseQueryExperimentDetailsAPIResponse;
  applyMethodData: UseApplyMethodQueryResponse;
}

const ExperimentPostMobileContainer = ({
  postId,
  postDetailData,
  applyMethodData,
}: ExperimentPostMobileContainerProps) => {
  const { open, close } = useOverlay();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const router = useRouter();
  const toast = useToast();

  /* 공고 삭제 */
  const { mutate: deleteExperimentPostMutation } = useDeleteExperimentPostMutation();

  const handleDeletePost = () => {
    setIsDeleteModalOpen(false);

    deleteExperimentPostMutation(
      { postId },
      {
        onSuccess: () => {
          toast.open({ message: '공고를 삭제하였습니다.' });

          setTimeout(() => {
            router.push('/');
          }, 1500);
        },
        onError: () => {
          toast.error({
            message: '공고 삭제를 실패하였습니다. 잠시 후 다시 시도해주세요.',
            duration: 1500,
          });
        },
      },
    );
  };

  const handleEditPost = () => {
    const shouldSkipModal = getHideModalCookie(HIDE_MODAL_COOKIE_KEYS.edit);

    if (shouldSkipModal) {
      router.push(`/edit/${postId}`);
    } else {
      setIsEditModalOpen(true);
    }
  };

  const handleOpenMenuBottomSheet = () => {
    open(
      () => (
        <PostMenuBottomSheet
          postId={postId}
          onConfirm={close}
          onEditClick={handleEditPost}
          onDeleteClick={() => setIsDeleteModalOpen(true)}
        />
      ),
      {
        headerMode: 'drag-handle',
      },
    );
  };

  return (
    <>
      <div>
        <ExperimentPostMobileHeader
          onOpenMenuBottomSheet={handleOpenMenuBottomSheet}
          postDetailData={postDetailData}
        />
        <ExperimentPostMobileContentWrapper
          postDetailData={postDetailData}
          applyMethodData={applyMethodData}
        />
      </div>

      {/* 공고 수정 모바일 화면 준비중 모달 */}
      <MobileNotReadyModal menu="edit" isOpen={isEditModalOpen} onOpenChange={setIsEditModalOpen} />

      {/* 삭제 확인 모달 */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        confirmTitle="해당 공고를 삭제할까요?"
        cancelText="닫기"
        confirmText="삭제하기"
        confirmButtonColor={colors.field09}
        onConfirm={handleDeletePost}
        isMobile
        closeIcon={false}
      />
    </>
  );
};

export default ExperimentPostMobileContainer;
