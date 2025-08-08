import { useState } from 'react';

import { deleteButton, divider, listBottomSheetLayout, listItem } from './AllMenuBottomSheet.css';

import useDeleteExperimentPostMutation from '@/app/my-posts/hooks/useDeleteExperimentPostMutation';
import useMyPostsInfiniteQuery from '@/app/my-posts/hooks/useMyPostsInfiniteQuery';
import useUpdateRecruitStatusInfiniteMutation from '@/app/my-posts/hooks/useUpdateRecruitStatusInfiniteMutation';
import ConfirmModal from '@/components/Modal/ConfirmModal/ConfirmModal';
import Toggle from '@/components/Toggle/Toggle';
import { colors } from '@/styles/colors';

const PAGE_SIZE = 10;

interface AllMenuBottomSheetProps {
  onClose: () => void;
  postId: string;
  handleClickEditPost: (postId: string) => void;
  onRecruitComplete?: { onSuccess?: () => void; onError?: () => void };
  onDelete?: { onSuccess?: () => void; onError?: () => void };
}

const AllMenuBottomSheet = ({
  onClose,
  postId,
  handleClickEditPost,
  onRecruitComplete,
  onDelete,
}: AllMenuBottomSheetProps) => {
  const { mutate: updateRecruitStatus } = useUpdateRecruitStatusInfiniteMutation();
  const { mutate: deletePost } = useDeleteExperimentPostMutation();
  const { data } = useMyPostsInfiniteQuery();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isRecruitCompleteModalOpen, setIsRecruitCompleteModalOpen] = useState(false);

  const posts = data?.pages?.flatMap((page) => page.content) ?? [];
  const currentRecruitStatus =
    posts.find((post) => post.experimentPostId === postId)?.recruitStatus ?? false;

  const handleRecruitComplete = () => {
    updateRecruitStatus(
      { postId, params: { count: PAGE_SIZE, order: 'DESC' } },
      {
        onSuccess: () => {
          onRecruitComplete?.onSuccess?.();
        },
        onError: () => {
          onRecruitComplete?.onError?.();
        },
      },
    );
  };

  const handleDeletePost = () => {
    deletePost(
      { postId },
      {
        onSuccess: () => {
          onDelete?.onSuccess?.();
          setIsDeleteModalOpen(false);
          onClose();
        },
        onError: () => {
          onDelete?.onError?.();
        },
      },
    );
  };

  const handleClickDeletePost = () => {
    setIsDeleteModalOpen(true);
  };

  return (
    <>
      <section className={listBottomSheetLayout}>
        <div className={listItem}>
          <span>모집 중</span>
          <Toggle
            value={currentRecruitStatus}
            onChange={() => setIsRecruitCompleteModalOpen(true)}
            disabled={!currentRecruitStatus}
          />
        </div>
        <button className={listItem} onClick={() => handleClickEditPost(postId)}>
          글 수정하기
        </button>
        <span className={divider} />
        <button className={`${listItem} ${deleteButton}`} onClick={handleClickDeletePost}>
          삭제하기
        </button>
      </section>

      {/* 삭제 확인 모달 */}
      <ConfirmModal
        isMobile
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        confirmTitle="정말 삭제하시겠어요?"
        descriptionText="공고를 삭제하면 다시 되돌릴 수 없어요"
        descriptionTextColor={colors.text03}
        cancelText="닫기"
        confirmText="삭제하기"
        confirmButtonColor={colors.field09}
        onConfirm={handleDeletePost}
      />

      {/* 모집 완료 처리 확인 모달 */}
      <ConfirmModal
        isMobile
        isOpen={isRecruitCompleteModalOpen}
        onOpenChange={setIsRecruitCompleteModalOpen}
        confirmTitle={`모집 완료를 누르면\n다시 모집 상태를 바꿀 수 없어요`}
        cancelText="닫기"
        confirmText="변경하기"
        onConfirm={handleRecruitComplete}
      />
    </>
  );
};

export default AllMenuBottomSheet;
