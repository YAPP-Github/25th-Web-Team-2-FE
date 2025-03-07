import ExperimentPost from './ExperimentPostCardList/ExperimentPost';
import {
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
import Spinner from '@/components/Spinner/Spinner';

interface PostCardListContainerProps {
  filters: ExperimentPostListFilters;
  isLoading: boolean;
}

const ExperimentPostCardListContainer = ({ filters, isLoading }: PostCardListContainerProps) => {
  const {
    data: postListData,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isFetching,
    isLoading: isListLoading,
  } = useExperimentPostListQuery(filters, isLoading);

  if (isListLoading) {
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
    </div>
  );
};

export default ExperimentPostCardListContainer;
