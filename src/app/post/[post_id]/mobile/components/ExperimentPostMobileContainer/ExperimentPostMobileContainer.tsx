'use client';
import { useParams } from 'next/navigation';

import {
  buttonGradientBackground,
  experimentPostMobileContainerLayout,
  fadeInWithDelay,
  fixedBottomButtonLayout,
} from './ExperimentPostMobileContainer.css';
import useExperimentDetailsQuery from '../../../hooks/useExperimentDetailsQuery';
import ExperimentPostInfo from '../ExperimentPostInfo/ExperimentPostInfo';
import ExperimentPostTabs from '../ExperimentPostTabs/ExperimentPostTabs';
import ParticipationGuideBottomSheet from '../ParticipationGuideBottomSheet/ParticipationGuideBottomSheet';

import Button from '@/components/Button/Button';
import useOverlay from '@/hooks/useOverlay';

const ExperimentPostMobileContainer = () => {
  const { open, close, isOpen } = useOverlay();

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
    open(() => <ParticipationGuideBottomSheet onConfirm={close} postId={postId} />, {
      title: '참여 방법',
      isDraggable: true,
    });
  };

  return (
    <div className={experimentPostMobileContainerLayout}>
      <ExperimentPostInfo postDetailData={postDetailData} />
      <ExperimentPostTabs postDetailData={postDetailData} />

      {!isOpen && (
        <div className={buttonGradientBackground}>
          <div className={`${fixedBottomButtonLayout} ${fadeInWithDelay}`}>
            <Button variant="dark" size="medium" height={'5.6rem'} onClick={handleOpenBottomSheet}>
              참여 방법 확인하기
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExperimentPostMobileContainer;
