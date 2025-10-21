'use client';

import { useRef } from 'react';

import ExperimentPostCardList from './ExperimentPostCardList/ExperimentPostCardList';
import { postCardContainer } from './ExperimentPostCardListContainer.css';
import ExperimentPostContainerLayout from './ExperimentPostContainerLayout/ExperimentPostContainerLayout';

import { ParticipantResponse } from '@/apis/login';
import { ExperimentPostResponse } from '@/apis/post';
import useExperimentPostListQuery from '@/app/home/hooks/useExperimentPostListQuery';
import useParticipantAutoFilter from '@/app/home/hooks/useParticipantAutoFilter';
import useURLFilters from '@/app/home/hooks/useURLFilters';
import IntersectionObserverScroll from '@/components/IntersectionObserverScroll/IntersectionObserverScroll';
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

  const observerRef = useRef<HTMLDivElement>(null);

  const hasPost = postListData && postListData.pages[0].content.length > 0;

  return (
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
  );
};

export default ExperimentPostCardListContainer;
