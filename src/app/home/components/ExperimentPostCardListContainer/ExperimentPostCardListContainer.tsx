'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import ExperimentPostCardList from './ExperimentPostCardList/ExperimentPostCardList';
import { postCardContainer } from './ExperimentPostCardListContainer.css';
import ExperimentPostContainerLayout from './ExperimentPostContainerLayout/ExperimentPostContainerLayout';

import { ParticipantResponse } from '@/apis/login';
import { ExperimentPostResponse } from '@/apis/post';
import useExperimentPostListQuery from '@/app/home/hooks/useExperimentPostListQuery';
import useParticipantAutoFilter from '@/app/home/hooks/useParticipantAutoFilter';
import useURLFilters from '@/app/home/hooks/useURLFilters';
import useUserInfo from '@/app/home/hooks/useUserInfo';
import IntersectionObserverScroll from '@/components/IntersectionObserverScroll/IntersectionObserverScroll';
import ConfirmModal from '@/components/Modal/ConfirmModal/ConfirmModal';
import { PATH } from '@/constants/path';
import { isMobile } from '@/utils/deviceType';

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
  const [showPromotionPopup, setShowPromotionPopup] = useState(false);
  const router = useRouter();

  const observerRef = useRef<HTMLDivElement>(null);

  const hasPost = postListData && postListData.pages[0].content.length > 0;

  useEffect(() => {
    if (isResearcher && !localStorage.getItem('IS_PROMOTION_POPUP_VIEWED')) {
      localStorage.setItem('IS_PROMOTION_POPUP_VIEWED', 'true');
      setShowPromotionPopup(true);
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
      <ConfirmModal
        isOpen={showPromotionPopup}
        onOpenChange={setShowPromotionPopup}
        confirmTitle="AI 자동입력 오픈"
        descriptionText="공고를 읽고 입력칸을 자동으로 채워드려요"
        cancelText="닫기"
        confirmText="등록하기"
        onConfirm={() => {
          setShowPromotionPopup(false);
          router.push(PATH.upload);
        }}
      />
    </>
  );
};

export default ExperimentPostCardListContainer;
