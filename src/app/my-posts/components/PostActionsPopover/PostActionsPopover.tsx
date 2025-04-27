'use client';

import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import * as Toast from '@radix-ui/react-toast';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import {
  postsActionsPopoverButton,
  postsActionsPopoverContainer,
  postsActionsPopoverContent,
} from './PostActionsPopover.css';
import useDeleteExperimentPostMutation from '../../hooks/useDeleteExperimentPostMutation';

import {
  copyToastLayout,
  copyToastTitle,
  copyToastViewport,
} from '@/app/post/[post_id]/components/ParticipationGuideModal/ParticipationGuideModal.css';
import Icon from '@/components/Icon';
import ConfirmModal from '@/components/Modal/ConfirmModal/ConfirmModal';
import { colors } from '@/styles/colors';

interface PostActionsPopoverProps {
  experimentPostId: string;
}

const PostActionsPopover = ({ experimentPostId }: PostActionsPopoverProps) => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [openToast, setOpenToast] = useState(false);

  const router = useRouter();

  const queryClient = useQueryClient();
  const { mutate: deleteExperimentPostMutation } = useDeleteExperimentPostMutation();

  const handleEdit = () => {
    setPopoverOpen(false);
    router.push(`/edit/${experimentPostId}`);
  };

  const handleDelete = () => {
    setPopoverOpen(false);
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    setIsConfirmOpen(false);
    deleteExperimentPostMutation(
      { postId: experimentPostId },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['myPosts'], refetchType: 'all' });
        },
        onError: () => {
          setOpenToast(true);
        },
      },
    );
  };

  return (
    <>
      <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
        <PopoverTrigger asChild>
          <button aria-label="수정 / 삭제 팝오버 열기" className={postsActionsPopoverContainer}>
            <Icon role="button" icon="MenuDots" width={12} height={12} cursor="pointer" />
          </button>
        </PopoverTrigger>
        <PopoverContent
          className={postsActionsPopoverContent}
          side="bottom"
          align="center"
          sideOffset={12}
        >
          <button className={postsActionsPopoverButton} onClick={handleEdit}>
            수정하기
          </button>
          <button className={postsActionsPopoverButton} onClick={handleDelete}>
            삭제하기
          </button>
        </PopoverContent>
      </Popover>

      {/* 삭제 confirm modal */}
      <ConfirmModal
        isOpen={isConfirmOpen}
        onOpenChange={setIsConfirmOpen}
        confirmTitle="정말 삭제하시겠어요?"
        descriptionText="공고를 삭제하면 다시 되돌릴 수 없어요"
        cancelText="취소"
        confirmText="삭제하기"
        confirmButtonColor={colors.field09}
        onConfirm={handleConfirmDelete}
      />

      {/* 삭제 실패 Toast 알림 */}
      <Toast.Provider swipeDirection="right">
        <Toast.Root
          className={copyToastLayout}
          open={openToast}
          onOpenChange={setOpenToast}
          duration={2500}
        >
          <Toast.Title className={copyToastTitle}>
            <Icon icon="Alert" color={colors.textAlert} width={24} height={24} />
            <p>공고 삭제를 실패하였습니다. 잠시 후 다시 시도해주세요.</p>
          </Toast.Title>
        </Toast.Root>
        <Toast.Viewport className={copyToastViewport} />
      </Toast.Provider>
    </>
  );
};

export default PostActionsPopover;
