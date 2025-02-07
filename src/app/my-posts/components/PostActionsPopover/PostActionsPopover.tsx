'use client';

import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import { useState } from 'react';

import {
  postsActionsPopoverButton,
  postsActionsPopoverContainer,
  postsActionsPopoverContent,
} from './PostActionsPopover.css';

import Icon from '@/components/Icon';
import ConfirmModal from '@/components/Modal/ConfirmModal/ConfirmModal';
import { colors } from '@/styles/colors';

interface PostActionsPopoverProps {
  experimentPostId: string;
}

const PostActionsPopover = ({ experimentPostId }: PostActionsPopoverProps) => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleEdit = () => {
    // console.log('experimentPostId >> ', experimentPostId);
    setPopoverOpen(false);
  };

  const handleDelete = () => {
    setPopoverOpen(false);
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    // console.log(`Deleting post ${experimentPostId}`);
    setIsConfirmOpen(false);
  };

  return (
    <>
      <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
        <PopoverTrigger asChild>
          <button aria-label="수정 / 삭제 팝오버 열기" className={postsActionsPopoverContainer}>
            <Icon role="button" icon="MenuDots" width={20} height={20} cursor="pointer" />
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
