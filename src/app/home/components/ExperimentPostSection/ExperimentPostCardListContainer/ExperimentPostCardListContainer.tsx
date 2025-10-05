import { useRef } from 'react';

import ExperimentPostCardList from './ExperimentPostCardList/ExperimentPostCardList';
import {
  postCardContainer,
  postCardContainerHeader,
  totalPostCount,
} from './ExperimentPostCardListContainer.css';
import { recruitCheckLabel, recruitCheckWrapper } from '../ExperimentPostSection.css';
import ExperimentPostContainerLayout from './ExperimentPostContainerLayout/ExperimentPostContainerLayout';

import { ExperimentPostResponse } from '@/apis/post';
import useExperimentPostListQuery from '@/app/home/hooks/useExperimentPostListQuery';
import useURLFilters from '@/app/home/hooks/useURLFilters';
import JoinCheckbox from '@/app/join/components/JoinCheckboxContainer/JoinCheckbox/JoinCheckbox';
import { emptySubTitle } from '@/app/my-posts/components/MyPostsTable/MyPostsTable.css';
import { emptyViewLayout } from '@/app/post/[postId]/desktop/components/ExperimentPostContainer/ExperimentPostContainer.css';
import Icon from '@/components/Icon';
import IntersectionObserverScroll from '@/components/IntersectionObserverScroll/IntersectionObserverScroll';
import Spinner from '@/components/Spinner/Spinner';
import { colors } from '@/styles/colors';
import { isMobile } from '@/utils/deviceType';

interface PostCardListContainerProps {
  isUserInfoLoading: boolean;
  initialPosts: ExperimentPostResponse;
}

const ExperimentPostCardListContainer = ({
  isUserInfoLoading,
  initialPosts,
}: PostCardListContainerProps) => {
  const { filters, isRecruiting, handleToggleRecruitStatus } = useURLFilters();
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
          <div className={postCardContainerHeader}>
            <span className={totalPostCount}>
              {postListData && `총 ${postListData?.pages[0].totalCount}개`}
            </span>
            <div className={recruitCheckWrapper({ isMobile: true })}>
              <JoinCheckbox
                labelClassName={recruitCheckLabel}
                label="모집 중인 공고만 보기"
                isChecked={isRecruiting}
                onChange={handleToggleRecruitStatus}
                emptyCheckIcon={
                  <Icon icon="CheckSquareFill" cursor="pointer" color={colors.icon02} />
                }
              />
            </div>
          </div>
          <ExperimentPostCardList postListData={postListData} />
        </div>
      </ExperimentPostContainerLayout>
    </IntersectionObserverScroll>
  );
};

export default ExperimentPostCardListContainer;
