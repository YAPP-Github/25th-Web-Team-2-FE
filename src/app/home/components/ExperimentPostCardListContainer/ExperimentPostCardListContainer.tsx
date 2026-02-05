'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import ExperimentPostCardList from './ExperimentPostCardList/ExperimentPostCardList';
import { postCardContainer } from './ExperimentPostCardListContainer.css';
import ExperimentPostContainerLayout from './ExperimentPostContainerLayout/ExperimentPostContainerLayout';

import { ParticipantResponse } from '@/apis/login';
import { ExperimentPostResponse } from '@/apis/post';
import PromotionModal from '@/app/home/components/PromotionModal/PromotionModal';
import useExperimentPostListQuery from '@/app/home/hooks/useExperimentPostListQuery';
import useParticipantAutoFilter from '@/app/home/hooks/useParticipantAutoFilter';
import useURLFilters from '@/app/home/hooks/useURLFilters';
import useUserInfo from '@/app/home/hooks/useUserInfo';
import firstPromotionBanner from '@/assets/images/firstPromotionBanner.webp';
import secondPromotionBanner from '@/assets/images/secondPromotionBanner.webp';
import thirdPromotionBanner from '@/assets/images/thirdPromotionBanner.webp';
import IntersectionObserverScroll from '@/components/IntersectionObserverScroll/IntersectionObserverScroll';
import { PATH } from '@/constants/path';
import { trackEvent } from '@/lib/mixpanelClient';
import { isDesktop, isMobile } from '@/utils/deviceType';

const IS_PROMOTION_POPUP_VIEWED = 'IS_PROMOTION_POPUP_VIEWED';
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
    // NOTE: localStorage 사용처가 더 생기면 추상화 고려 (+ key 관리)
    if (isResearcher && isDesktop() && localStorage.getItem(IS_PROMOTION_POPUP_VIEWED) === null) {
      localStorage.setItem(IS_PROMOTION_POPUP_VIEWED, 'true');
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
