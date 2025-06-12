'use client';

import * as Toast from '@radix-ui/react-toast';
import { useState } from 'react';

import {
  buttonGradientBackground,
  contactButton,
  emptyView,
  emptyViewTitle,
  experimentPostMobileContentContainerLayout,
  fixedBottomButtonLayout,
} from './ExperimentPostMobileContentContainer.css';
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
import Spinner from '@/components/Spinner/Spinner';
import useOverlay from '@/hooks/useOverlay';
import { colors } from '@/styles/colors';

const ExperimentPostMobileContentContainer = ({
  experimentDetailResponse,
  postId,
}: {
  experimentDetailResponse: ReturnType<typeof useExperimentDetailsQuery>;
  postId: string;
}) => {
  const { open, close } = useOverlay();
  const [isCopyToastOpen, setIsCopyToastOpen] = useState(false);

  const postDetailData = experimentDetailResponse.data;

  if (experimentDetailResponse.isLoading) {
    return (
      <div className={emptyView}>
        <Spinner />
      </div>
    );
  }

  if (experimentDetailResponse.isError) {
    return (
      <div className={emptyView}>
        <p className={emptyViewTitle}>{experimentDetailResponse.error.message}</p>
        <button onClick={() => experimentDetailResponse.refetch()} className={contactButton}>
          재시도
        </button>
      </div>
    );
  }

  if (!postDetailData)
    return (
      <div className={emptyView}>
        <div className={emptyViewTitle}>공고 상세 정보가 없습니다.</div>
      </div>
    );

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
    <div className={experimentPostMobileContentContainerLayout}>
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

export default ExperimentPostMobileContentContainer;
