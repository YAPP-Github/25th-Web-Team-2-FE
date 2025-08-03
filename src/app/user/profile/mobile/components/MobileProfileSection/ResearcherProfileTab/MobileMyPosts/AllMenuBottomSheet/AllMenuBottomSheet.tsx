import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { deleteButton, divider, listBottomSheetLayout, listItem } from './AllMenuBottomSheet.css';

import useDeleteExperimentPostMutation from '@/app/my-posts/hooks/useDeleteExperimentPostMutation';
import useUpdateRecruitStatusInfiniteMutation from '@/app/my-posts/hooks/useUpdateRecruitStatusInfiniteMutation';
import MobileNotReadyModal from '@/components/MobileNotReadyModal/MobileNotReadyModal';
import { HIDE_MODAL_COOKIE_KEYS } from '@/components/MobileNotReadyModal/mobileNotReadyModal.constants';
import ConfirmModal from '@/components/Modal/ConfirmModal/ConfirmModal';
import Toggle from '@/components/Toggle/Toggle';
import { getHideModalCookie } from '@/lib/cookies';
import { colors } from '@/styles/colors';

const PAGE_SIZE = 10;

interface AllMenuBottomSheetProps {
  onClose: () => void;
  postId: string;
  initialRecruitStatus: boolean;
  currentPage: number;
  onRecruitComplete?: { onSuccess?: () => void; onError?: () => void };
  onDelete?: { onSuccess?: () => void; onError?: () => void };
}

const AllMenuBottomSheet = ({
  onClose,
  postId,
  initialRecruitStatus,
  currentPage,
  onRecruitComplete,
  onDelete,
}: AllMenuBottomSheetProps) => {
  const router = useRouter();
  const { mutate: updateRecruitStatus } = useUpdateRecruitStatusInfiniteMutation();
  const { mutate: deletePost } = useDeleteExperimentPostMutation();

  const [recruitStatus, setRecruitStatus] = useState(initialRecruitStatus);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isRecruitCompleteModalOpen, setIsRecruitCompleteModalOpen] = useState(false);

  const handleRecruitComplete = () => {
    updateRecruitStatus(
      { postId, params: { page: currentPage, count: PAGE_SIZE, order: 'DESC' } },
      {
        onSuccess: ({ recruitStatus }) => {
          setRecruitStatus(recruitStatus);
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

  const handleClickEditPost = () => {
    const shouldSkipModal = getHideModalCookie(HIDE_MODAL_COOKIE_KEYS.edit);

    onClose();

    if (shouldSkipModal) {
      router.push(`/edit/${postId}`);
    } else {
      setIsEditModalOpen(true);
    }
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
            value={recruitStatus}
            onChange={() => setIsRecruitCompleteModalOpen(true)}
            disabled={!recruitStatus}
          />
        </div>
        <button className={listItem} onClick={handleClickEditPost}>
          글 수정하기
        </button>
        <span className={divider} />
        <button className={`${listItem} ${deleteButton}`} onClick={handleClickDeletePost}>
          삭제하기
        </button>
      </section>

      {/* 공고 수정 모바일 준비중 모딜 */}
      <MobileNotReadyModal
        menu="edit"
        isOpen={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        editPostId={postId}
      />

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
