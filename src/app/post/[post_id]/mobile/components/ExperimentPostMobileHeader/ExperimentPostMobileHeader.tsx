'use client';

import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react';

import { experimentPostMobileHeaderLayout } from './ExperimentPostMobileHeader.css';
import useExperimentDetailsQuery from '../../../hooks/useExperimentDetailsQuery';
import PostMenuBottomSheet from '../PostMenuBottomSheet/PostMenuBottomSheet';

import RightHeader from '@/components/Header/RightHeader/RightHeader';
import Icon from '@/components/Icon';
import useOverlay from '@/hooks/useOverlay';
import { colors } from '@/styles/colors';

const ExperimentPostMobileHeader = () => {
  const { open, close } = useOverlay();
  // todo 삭제 시 토스트 알림 고민
  const [_, setIsToastOpen] = useState(false);

  const router = useRouter();
  const { post_id } = useParams();
  const postId = Array.isArray(post_id) ? post_id[0] : post_id;

  /* 특정 공고 상세 조회 */
  const { data: postDetailData, isLoading: isLoadingPost } = useExperimentDetailsQuery({ postId });

  if (isLoadingPost) return null;

  const isAuthor = postDetailData?.isAuthor ?? false;

  const handleOpenBottomSheet = () => {
    open(
      () => (
        <PostMenuBottomSheet onConfirm={close} postId={postId} setIsToastOpen={setIsToastOpen} />
      ),
      {
        // title: '참여 방법',
        headerMode: 'drag-handle',
      },
    );
  };

  return (
    <div className={experimentPostMobileHeaderLayout}>
      <button onClick={() => router.back()} aria-label="뒤로가기">
        <Icon icon="Arrow" width={24} height={24} color={colors.text06} />
      </button>
      {isAuthor ? (
        <button onClick={handleOpenBottomSheet}>
          <Icon icon="MenuDots" width={24} height={24} />
        </button>
      ) : (
        <RightHeader />
      )}
    </div>
  );
};

export default ExperimentPostMobileHeader;
