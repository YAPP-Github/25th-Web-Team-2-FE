import { useRef } from 'react';

import ExperimentPostCardList from './ExperimentPostCardList/ExperimentPostCardList';
import ExperimentPostContainerLayout from './ExperimentPostContainerLayout/ExperimentPostContainerLayout';

import { ExperimentPostResponse } from '@/apis/post';
import useExperimentPostListQuery from '@/app/home/hooks/useExperimentPostListQuery';
import useURLFilters from '@/app/home/hooks/useURLFilters';
import {
  postCardContainer,
  emptySubTitle,
  emptyViewLayout,
} from './ExperimentPostCardListContainer.css';
import IntersectionObserverScroll from '@/components/IntersectionObserverScroll/IntersectionObserverScroll';
import Spinner from '@/components/Spinner/Spinner';
import { isMobile } from '@/utils/deviceType';

interface PostCardListContainerProps {
  isUserInfoLoading: boolean;
  initialPosts: ExperimentPostResponse;
}

const ExperimentPostCardListContainer = ({
  isUserInfoLoading,
  initialPosts,
}: PostCardListContainerProps) => {
  const { filters } = useURLFilters();
  const {
    data: postListData,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isFetching,
  } = useExperimentPostListQuery(filters, isUserInfoLoading, initialPosts);

  const observerRef = useRef<HTMLDivElement>(null);

  const hasPost = postListData && postListData.pages[0].content.length > 0;
  const hasInitialPosts = initialPosts && initialPosts.content.length > 0;

  const hasPostList = hasPost || hasInitialPosts;
  const showLoading = !hasPostList && (isUserInfoLoading || isFetching);

  if (showLoading) {
    return (
      <div className={emptyViewLayout}>
        <Spinner />
        <p className={emptySubTitle}>로딩중</p>
      </div>
    );
  }

  return (
    <IntersectionObserverScroll
      observerRef={observerRef}
      enabled={isMobile() && !isFetching && hasNextPage}
      fetchNextPage={fetchNextPage}
    >
      <ExperimentPostContainerLayout
        isFetching={isFetching}
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
