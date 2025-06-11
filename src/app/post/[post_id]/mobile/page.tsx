'use client';

import * as Toast from '@radix-ui/react-toast';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

import EditNotReadyModal from './components/EditNotReadyModal/EditNotReadyModal';
import ExperimentPostMobileContainer from './components/ExperimentPostMobileContainer/ExperimentPostMobileContainer';
import ExperimentPostMobileHeader from './components/ExperimentPostMobileHeader/ExperimentPostMobileHeader';
import {
  copyToastLayout,
  copyToastTitle,
  copyToastViewport,
} from './components/ParticipationGuideBottomSheet/ParticipationGuideBottomSheet.css';
import PostMenuBottomSheet from './components/PostMenuBottomSheet/PostMenuBottomSheet';

import useDeleteExperimentPostMutation from '@/app/my-posts/hooks/useDeleteExperimentPostMutation';
import Icon from '@/components/Icon';
import ConfirmModal from '@/components/Modal/ConfirmModal/ConfirmModal';
import useOverlay from '@/hooks/useOverlay';
import { colors } from '@/styles/colors';

const ExperimentPostMobilePage = () => {
  const { open, close } = useOverlay();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const { post_id } = useParams();
  const postId = Array.isArray(post_id) ? post_id[0] : post_id;
  const router = useRouter();

  /* 공고 삭제 */
  const { mutate: deleteExperimentPostMutation } = useDeleteExperimentPostMutation();

  const handleDeletePost = () => {
    setIsDeleteModalOpen(false);
    setToastMessage('공고를 삭제하였습니다.');
    setIsToastOpen(true);

    deleteExperimentPostMutation(
      { postId },
      {
        onSuccess: () => {
          setTimeout(() => {
            router.push('/');
            setToastMessage('');
          }, 1700);
        },
        onError: () => {
          setToastMessage('공고 삭제를 실패하였습니다. 잠시 후 다시 시도해주세요.');
          setIsToastOpen(true);
        },
      },
    );
  };

  const handleOpenMenuBottomSheet = () => {
    open(
      () => (
        <PostMenuBottomSheet
          postId={postId}
          onConfirm={close}
          onEditClick={() => setIsEditModalOpen(true)}
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
          postId={postId}
          onOpenMenuBottomSheet={handleOpenMenuBottomSheet}
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
        onConfirm={handleDeletePost}
        isMobile
        closeIcon={false}
      />

      {/* 삭제 성공 토스트 알림 */}
      <Toast.Provider swipeDirection="right">
        <Toast.Root
          className={copyToastLayout}
          open={isToastOpen}
          onOpenChange={setIsToastOpen}
          duration={1700}
        >
          <Toast.Title className={copyToastTitle}>
            <Icon icon="Alert" color={colors.textAlert} width={24} height={24} />
            <p>{toastMessage}</p>
          </Toast.Title>
        </Toast.Root>
        <Toast.Viewport className={copyToastViewport} />
      </Toast.Provider>
    </>
  );
};

export default ExperimentPostMobilePage;
