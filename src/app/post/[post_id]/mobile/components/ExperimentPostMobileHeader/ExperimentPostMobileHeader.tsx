'use client';

import { useParams, useRouter } from 'next/navigation';
import React from 'react';

import { experimentPostMobileHeaderLayout } from './ExperimentPostMobileHeader.css';
import useExperimentDetailsQuery from '../../../hooks/useExperimentDetailsQuery';

import RightHeader from '@/components/Header/RightHeader/RightHeader';
import Icon from '@/components/Icon';
import { colors } from '@/styles/colors';

const ExperimentPostMobileHeader = () => {
  const router = useRouter();
  const { post_id } = useParams();
  const postId = Array.isArray(post_id) ? post_id[0] : post_id;

  /* 특정 공고 상세 조회 */
  const { data: postDetailData, isLoading: isLoadingPost } = useExperimentDetailsQuery({ postId });

  if (isLoadingPost) return null;

  const isAuthor = postDetailData?.isAuthor ?? false;

  return (
    <div className={experimentPostMobileHeaderLayout}>
      <button onClick={() => router.back()} aria-label="뒤로가기">
        <Icon icon="Arrow" width={24} height={24} color={colors.text06} />
      </button>
      {isAuthor ? (
        <button>
          <Icon icon="MenuDots" width={24} height={24} />
        </button>
      ) : (
        <RightHeader />
      )}
    </div>
  );
};

export default ExperimentPostMobileHeader;
