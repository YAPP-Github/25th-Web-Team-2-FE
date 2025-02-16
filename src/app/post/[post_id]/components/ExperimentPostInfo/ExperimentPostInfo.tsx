'use client';

import * as Toast from '@radix-ui/react-toast';
import { useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import {
  buttonStyles,
  postHeaderContainer,
  postInfoLayout,
  postSubInfo,
  viewsContainer,
} from './ExperimentPostInfo.css';
import { formatDate } from '../../ExperimentPostPage.utils';
import { UseQueryExperimentDetailsAPIResponse } from '../../hooks/useExperimentDetailsQuery';
import DeleteConfirmModal from '../DeleteConfirmModal/DeleteConfirmModal';
import {
  copyToastLayout,
  copyToastTitle,
  copyToastViewport,
} from '../ParticipationGuideModal/ParticipationGuideModal.css';

import useDeleteExperimentPostMutation from '@/app/my-posts/hooks/useDeleteExperimentPostMutation';
import Icon from '@/components/Icon';
import { QUERY_KEY } from '@/constants/queryKey';
import { colors } from '@/styles/colors';

interface ExperimentPostInfoProps {
  postDetailData: UseQueryExperimentDetailsAPIResponse;
}

const ExperimentPostInfo = ({ postDetailData }: ExperimentPostInfoProps) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [openToast, setOpenToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const router = useRouter();
  const queryClient = useQueryClient();

  /* 공고 삭제 */
  const { mutate: deleteExperimentPostMutation } = useDeleteExperimentPostMutation();

  const handleDeletePost = () => {
    setIsDeleteModalOpen(false);
    setToastMessage('공고를 삭제하였습니다.');
    setOpenToast(true);

    deleteExperimentPostMutation(
      { postId: postDetailData.experimentPostId },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY.experimentPostDetail],
            refetchType: 'all',
          });

          setTimeout(() => {
            router.push('/');
            setToastMessage('');
          }, 1700);
        },
        onError: () => {
          setToastMessage('공고 삭제를 실패하였습니다. 잠시 후 다시 시도해주세요.');
          setOpenToast(true);
        },
      },
    );
  };

  return (
    <>
      <div className={postInfoLayout}>
        <div className={postHeaderContainer}>
          <h2>{postDetailData.title}</h2>
          {postDetailData.isAuthor && (
            <div>
              <Link href={`/edit/${postDetailData.experimentPostId}`}>
                <button className={buttonStyles({ type: 'edit' })}>수정</button>
              </Link>
              <button className={buttonStyles()} onClick={() => setIsDeleteModalOpen(true)}>
                삭제
              </button>
            </div>
          )}
        </div>
        <div className={postSubInfo}>
          <div>{formatDate(postDetailData.uploadDate)}</div>
          <div>{postDetailData.uploaderName}</div>
          <div className={viewsContainer}>
            <Icon icon="EyeTwo" width={16} height={16} color={colors.field06} />
            {postDetailData.views}
          </div>
        </div>
      </div>

      {/* 삭제 confirm modal */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        onDelete={handleDeletePost}
      />

      {/* 삭제 성공/실패 Toast 알림 */}
      <Toast.Provider swipeDirection="right">
        <Toast.Root
          className={copyToastLayout}
          open={openToast}
          onOpenChange={setOpenToast}
          duration={1700}
        >
          <Toast.Title className={copyToastTitle}>
            <Icon icon="Alert" color={colors.field09} width={24} height={24} />
            <p>{toastMessage}</p>
          </Toast.Title>
        </Toast.Root>
        <Toast.Viewport className={copyToastViewport} />
      </Toast.Provider>
    </>
  );
};

export default ExperimentPostInfo;
