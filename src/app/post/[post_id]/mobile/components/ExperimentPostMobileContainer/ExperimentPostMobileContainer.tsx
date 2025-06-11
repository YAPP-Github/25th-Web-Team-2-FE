'use client';

import * as Toast from '@radix-ui/react-toast';
import { useParams } from 'next/navigation';
import { useState } from 'react';

import {
  buttonGradientBackground,
  experimentPostMobileContainerLayout,
  fixedBottomButtonLayout,
} from './ExperimentPostMobileContainer.css';
import useExperimentDetailsQuery from '../../../hooks/useExperimentDetailsQuery';
import ExperimentPostInfo from '../ExperimentPostInfo/ExperimentPostInfo';
import ExperimentPostTabs from '../ExperimentPostTabs/ExperimentPostTabs';
import ParticipationGuideBottomSheet from '../ParticipationGuideBottomSheet/ParticipationGuideBottomSheet';
import {
  copyToastLayout,
  copyToastTitle,
  copyToastViewport,
} from '../ParticipationGuideBottomSheet/ParticipationGuideBottomSheet.css';

import Button from '@/components/Button/Button';
import Icon from '@/components/Icon';
import useOverlay from '@/hooks/useOverlay';
import { colors } from '@/styles/colors';

const ExperimentPostMobileContainer = () => {
  const { open, close } = useOverlay();
  const [isCopyToastOpen, setIsCopyToastOpen] = useState(false);

  const { post_id } = useParams();
  const postId = Array.isArray(post_id) ? post_id[0] : post_id;

  /* 특정 공고 상세 조회 */
  const { data: postDetailData, isLoading: isLoadingPost } = useExperimentDetailsQuery({ postId });

  // todo 로딩 상태 및 EmptyView 추가 예정
  if (isLoadingPost) {
    return <div>로딩 중...</div>;
  }
  if (!postDetailData) return <div>데이터 없음</div>;

  const handleOpenBottomSheet = () => {
    open(
      () => (
        <ParticipationGuideBottomSheet
          onConfirm={close}
          postId={postId}
          setIsToastOpen={setIsCopyToastOpen}
        />
      ),
      {
        title: '참여 방법',
        headerMode: 'none',
      },
    );
  };

  return (
    <div className={experimentPostMobileContainerLayout}>
      <ExperimentPostInfo postDetailData={postDetailData} />
      <ExperimentPostTabs postDetailData={postDetailData} />

      <div className={buttonGradientBackground}>
        <div className={fixedBottomButtonLayout}>
          <Button variant="dark" size="medium" height={'5.6rem'} onClick={handleOpenBottomSheet}>
            참여 방법 확인하기
          </Button>
        </div>
      </div>

      {/* 복사 성공 토스트 알림 */}
      <Toast.Provider swipeDirection="right">
        <Toast.Root
          className={copyToastLayout}
          open={isCopyToastOpen}
          onOpenChange={setIsCopyToastOpen}
          duration={1500}
        >
          <Toast.Title className={copyToastTitle}>
            <Icon icon="CheckRound" color={colors.primaryMint} width={24} height={24} />
            <p>복사되었어요</p>
          </Toast.Title>
        </Toast.Root>
        <Toast.Viewport className={copyToastViewport} />
      </Toast.Provider>
    </div>
  );
};

export default ExperimentPostMobileContainer;
