import ExperimentPost from './ExperimentPostCardList/ExperimentPost';
import {
  allPostsViewedContainer,
  allPostsViewedContentContainer,
  allPostsViewedSubTitle,
  allPostsViewedTitle,
  loadingMoreButton,
  postCardContainer,
  postCardContentContainer,
  totalPostCount,
  watchMoreButton,
} from './ExperimentPostCardListContainer.css';

import { ExperimentPostListFilters } from '@/apis/post';
import useExperimentPostListQuery from '@/app/home/hooks/useExperimentPostListQuery';
import { emptySubTitle } from '@/app/my-posts/components/MyPostsTable/MyPostsTable.css';
import { emptyViewLayout } from '@/app/post/[post_id]/components/ExperimentPostContainer/ExperimentPostContainer.css';
import Icon from '@/components/Icon';
import Spinner from '@/components/Spinner/Spinner';

interface PostCardListContainerProps {
  filters: ExperimentPostListFilters;
  isUserInfoLoading: boolean;
}

const ExperimentPostCardListContainer = ({
  filters,
  isUserInfoLoading,
}: PostCardListContainerProps) => {
  const {
    data: postListData,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isFetching,
    isLoading: isListLoading,
  } = useExperimentPostListQuery(filters, isUserInfoLoading);

  if (isUserInfoLoading || isListLoading) {
    return (
      <div className={emptyViewLayout}>
        <Spinner />
        <p className={emptySubTitle}>로딩중..</p>
      </div>
    );
  }

  return (
    <div className={postCardContentContainer}>
      <div className={postCardContainer}>
        <span className={totalPostCount}>
          {postListData ? `총 ${postListData?.pages[0].totalCount}개` : ''}
        </span>
        <ExperimentPost postListData={postListData} />
      </div>

      {isFetching && <div className={loadingMoreButton} />}
      {!isFetching && hasNextPage && (
        <button
          className={watchMoreButton}
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          더보기
        </button>
      )}
      {!isFetching && !hasNextPage && (
        <div className={allPostsViewedContainer}>
          <Icon icon="Golf" width={40} height={40} />
          <div className={allPostsViewedContentContainer}>
            <span className={allPostsViewedTitle}>모든 공고를 다 확인했어요!</span>
            <span className={allPostsViewedSubTitle}>새롭게 올라올 공고도 기대해 주세요</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExperimentPostCardListContainer;
