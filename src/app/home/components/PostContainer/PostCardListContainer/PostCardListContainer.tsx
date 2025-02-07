import {
  postCardContainer,
  postCardContentContainer,
  totalPostCount,
  watchMoreButton,
} from './PostCardListContainer.css';
import PostCardList from '../../PostCardList/PostCardList';

import { ExperimentPostListFilters } from '@/apis/post';
import usePostListQuery from '@/app/home/hooks/usePostListQuery';

interface PostCardListContainerProps {
  filters: ExperimentPostListFilters;
  isLoading: boolean;
}

const PostCardListContainer = ({ filters, isLoading }: PostCardListContainerProps) => {
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
          {postListData ? `총 ${postListData?.pages[0].totalCount}개` : '로딩중...'}
        </span>
        <PostCardList postListData={postListData} />
      </div>

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

export default PostCardListContainer;
