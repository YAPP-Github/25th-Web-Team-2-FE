'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';


import { ParticipantResponse } from '@apis/login';
import { ExperimentPostResponse } from '@apis/post';
import firstPromotionBanner from '@assets/images/firstPromotionBanner.webp';
import secondPromotionBanner from '@assets/images/secondPromotionBanner.webp';
import thirdPromotionBanner from '@assets/images/thirdPromotionBanner.webp';
import IntersectionObserverScroll from '@common/IntersectionObserverScroll';
import { PATH } from '@constants/path';
import PromotionModal from '@home/components/PromotionModal';
import useExperimentPostListQuery from '@home/hooks/useExperimentPostListQuery';
import useParticipantAutoFilter from '@home/hooks/useParticipantAutoFilter';
import useURLFilters from '@home/hooks/useURLFilters';
import useUserInfo from '@home/hooks/useUserInfo';
import { localStorageManager, STORAGE_KEYS } from '@lib/localStorageManager';
import { trackEvent } from '@lib/mixpanelClient';
import { isDesktop, isMobile } from '@utils/deviceType';

import ExperimentPostCardList from './ExperimentPostCardList';
import { postCardContainer } from './ExperimentPostCardListContainer.css';
import ExperimentPostContainerLayout from './ExperimentPostContainerLayout';

const PROMOTION_IMAGES = [firstPromotionBanner, secondPromotionBanner, thirdPromotionBanner];

interface PostCardListContainerProps {
  initialPosts: ExperimentPostResponse;
  participantInfo: ParticipantResponse | null;
}

const ExperimentPostCardListContainer = ({
  initialPosts,
  participantInfo,
}: PostCardListContainerProps) => {
  const { filters } = useURLFilters();
  const { isAutoFilled } = useParticipantAutoFilter({ participantInfo });
  const {
    data: postListData,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useExperimentPostListQuery({ filters, enabled: isAutoFilled, initialData: initialPosts });
  const { isResearcher } = useUserInfo();
  const router = useRouter();

  const [showPromotionPopup, setShowPromotionPopup] = useState(false);
  const observerRef = useRef<HTMLDivElement>(null);

  const hasPost = postListData && postListData.pages[0].content.length > 0;

  const handleConfirmPromotionPopup = () => {
    setShowPromotionPopup(false);
    router.push(PATH.upload);
  };

  const handleClosePromotionPopup = () => {
    setShowPromotionPopup(false);
  };

  useEffect(() => {
    if (
      isResearcher &&
      isDesktop() &&
      localStorageManager.get(STORAGE_KEYS.isPromotionPopupViewed) === null
    ) {
      localStorageManager.set(STORAGE_KEYS.isPromotionPopupViewed, true);
      setShowPromotionPopup(true);
      trackEvent('AI Extract Keywords Modal', {
        action: 'View',
      });
    }
  }, [isResearcher]);

  return (
    <>
      <IntersectionObserverScroll
        observerRef={observerRef}
        enabled={isMobile() && !isFetchingNextPage && hasNextPage}
        fetchNextPage={fetchNextPage}
      >
        <ExperimentPostContainerLayout
          isFetchingNextPage={isFetchingNextPage}
          hasNextPage={hasNextPage}
          hasPost={hasPost}
          fetchNextPage={fetchNextPage}
        >
          <div className={postCardContainer}>
            <ExperimentPostCardList postListData={postListData} />
          </div>
        </ExperimentPostContainerLayout>
      </IntersectionObserverScroll>
      <PromotionModal
        open={showPromotionPopup}
        onOpenChange={setShowPromotionPopup}
        onConfirm={handleConfirmPromotionPopup}
        onClose={handleClosePromotionPopup}
        images={PROMOTION_IMAGES}
        title="공고 등록 가이드"
        buttonText="빠르게 공고 등록하러 가기"
      />
    </>
  );
};

export default ExperimentPostCardListContainer;
