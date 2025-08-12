'use client';

import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import {
  postsActionsPopoverButton,
  postsActionsPopoverContainer,
  postsActionsPopoverContent,
} from './PostActionsPopover.css';
import useDeleteExperimentPostMutation from '../../hooks/useDeleteExperimentPostMutation';

import Icon from '@/components/Icon';
import ConfirmModal from '@/components/Modal/ConfirmModal/ConfirmModal';
import { useToast } from '@/hooks/useToast';
import { colors } from '@/styles/colors';

interface PostActionsPopoverProps {
  experimentPostId: string;
}

const PostActionsPopover = ({ experimentPostId }: PostActionsPopoverProps) => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const router = useRouter();
  const toast = useToast();

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
          toast.open({ message: '공고를 삭제하였습니다.', duration: 1500 });
          queryClient.invalidateQueries({ queryKey: ['myPosts'], refetchType: 'all' });
        },
        onError: () => {
          toast.error({
            message: '공고 삭제를 실패하였습니다. 잠시 후 다시 시도해주세요.',
          });
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
    </>
  );
};

export default PostActionsPopover;
