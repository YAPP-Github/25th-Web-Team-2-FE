'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import {
  buttonStyles,
  postHeaderContainer,
  postInfoLayout,
  postSubInfo,
  postTitle,
  viewsContainer,
} from './ExperimentPostInfo.css';
import revalidateExperimentPosts from '../../../actions';
import { formatDate } from '../../../ExperimentPostPage.utils';
import { UseQueryExperimentDetailsAPIResponse } from '../../../hooks/useExperimentDetailsQuery';
import DeleteConfirmModal from '../DeleteConfirmModal/DeleteConfirmModal';

import useDeleteExperimentPostMutation from '@/app/my-posts/hooks/useDeleteExperimentPostMutation';
import Icon from '@/components/Icon';
import { useToast } from '@/hooks/useToast';
import { stopRecording } from '@/lib/mixpanelClient';
import { colors } from '@/styles/colors';

interface ExperimentPostInfoProps {
  postDetailData: UseQueryExperimentDetailsAPIResponse;
}

const ExperimentPostInfo = ({ postDetailData }: ExperimentPostInfoProps) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const toast = useToast();

  const router = useRouter();

  /* 공고 삭제 */
  const { mutate: deleteExperimentPostMutation } = useDeleteExperimentPostMutation();

  const handleDeletePost = () => {
    setIsDeleteModalOpen(false);

    deleteExperimentPostMutation(
      { postId: postDetailData.experimentPostId },
      {
        onSuccess: () => {
          toast.open({ message: '공고를 삭제하였습니다.', duration: 1700 });
          revalidateExperimentPosts();
          router.push('/');
        },
        onError: () => {
          toast.error({
            message: '공고 삭제를 실패하였습니다. 잠시 후 다시 시도해주세요.',
          });
        },
      },
    );
  };

  useEffect(() => {
    return () => {
      stopRecording();
    };
  }, []);

  return (
    <>
      <div className={postInfoLayout}>
        <div className={postHeaderContainer}>
          <h2 className={postTitle}>{postDetailData.title}</h2>
          {postDetailData.isAuthor && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              <Link href={`/edit/${postDetailData.experimentPostId}`}>
                <button className={buttonStyles}>수정</button>
              </Link>
              <div style={{ width: '0.1rem', height: '0.8rem', backgroundColor: colors.line03 }} />
              <button className={buttonStyles} onClick={() => setIsDeleteModalOpen(true)}>
                삭제
              </button>
            </div>
          )}
        </div>
        <div className={postSubInfo}>
          <div>{formatDate(postDetailData.uploadDate)}</div>
          <div>{postDetailData.isUploaderActive ? postDetailData.uploaderName : '탈퇴한 회원'}</div>
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
    </>
  );
};

export default ExperimentPostInfo;
