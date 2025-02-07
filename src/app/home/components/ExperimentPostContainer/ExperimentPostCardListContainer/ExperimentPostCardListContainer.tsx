import ExperimentPost from './ExperimentPostCardList/ExperimentPost';
import {
  loadingMoreButton,
  postCardContainer,
  postCardContentContainer,
  totalPostCount,
  watchMoreButton,
} from './ExperimentPostCardListContainer.css';

import { ExperimentPostListFilters } from '@/apis/post';
import usePostListQuery from '@/app/home/hooks/usePostListQuery';

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
  } = usePostListQuery(filters, isLoading);

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
