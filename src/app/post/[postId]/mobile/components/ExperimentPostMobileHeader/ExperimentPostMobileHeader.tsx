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
  experimentDetailResponse,
}: {
  onOpenMenuBottomSheet: VoidFunction;
  experimentDetailResponse: ReturnType<typeof useExperimentDetailsQuery>;
}) => {
  const router = useRouter();

  const isAuthor = experimentDetailResponse.data?.isAuthor ?? false;
  if (experimentDetailResponse.isLoading) return null;

  const handleGoBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      // 공고 상세 직접 접근 시 홈으로 이동
      router.push('/');
    }
  };

  return (
    <div className={experimentPostMobileHeaderLayout}>
      <button onClick={handleGoBack} aria-label="뒤로가기">
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
