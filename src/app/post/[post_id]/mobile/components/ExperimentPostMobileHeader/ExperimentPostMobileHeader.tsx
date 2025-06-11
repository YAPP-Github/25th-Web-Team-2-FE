'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

import { experimentPostMobileHeaderLayout } from './ExperimentPostMobileHeader.css';
import useExperimentDetailsQuery from '../../../hooks/useExperimentDetailsQuery';

import RightHeader from '@/components/Header/RightHeader/RightHeader';
import Icon from '@/components/Icon';
import { colors } from '@/styles/colors';

const ExperimentPostMobileHeader = ({
  onOpenMenuBottomSheet,
  postId,
}: {
  onOpenMenuBottomSheet: VoidFunction;
  postId: string;
}) => {
  const router = useRouter();

  /* 특정 공고 상세 조회 */
  const { data: postDetailData, isLoading: isLoadingPost } = useExperimentDetailsQuery({ postId });
  const isAuthor = postDetailData?.isAuthor ?? false;

  if (isLoadingPost) return null;

  return (
    <div className={experimentPostMobileHeaderLayout}>
      <button onClick={() => router.back()} aria-label="뒤로가기">
        <Icon icon="Arrow" width={24} height={24} color={colors.text06} />
      </button>
      {isAuthor ? (
        <button onClick={onOpenMenuBottomSheet}>
          <Icon icon="MenuDots" width={24} height={24} />
        </button>
      ) : (
        <RightHeader />
      )}
    </div>
  );
};

export default ExperimentPostMobileHeader;
