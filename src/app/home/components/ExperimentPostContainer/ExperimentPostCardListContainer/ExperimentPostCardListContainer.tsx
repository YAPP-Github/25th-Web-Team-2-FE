import ExperimentPost from './ExperimentPostCardList/ExperimentPost';
import {
  allPostsViewedContainer,
  allPostsViewedContentContainer,
  allPostsViewedSubTitle,
  allPostsViewedTitle,
  loadingMoreButton,
  postCardContainer,
  postCardContainerHeader,
  postCardContentContainer,
  totalPostCount,
  watchMoreButton,
} from './ExperimentPostCardListContainer.css';

import { ExperimentPostListFilters } from '@/apis/post';
import useExperimentPostListQuery from '@/app/home/hooks/useExperimentPostListQuery';
import JoinCheckbox from '@/app/join/components/JoinCheckboxContainer/JoinCheckbox/JoinCheckbox';
import { emptySubTitle } from '@/app/my-posts/components/MyPostsTable/MyPostsTable.css';
import { emptyViewLayout } from '@/app/post/[post_id]/components/ExperimentPostContainer/ExperimentPostContainer.css';
import Icon from '@/components/Icon';
import Spinner from '@/components/Spinner/Spinner';
import { colors } from '@/styles/colors';
import { recruitCheckLabel, recruitCheckWrapper } from '../ExperimentPostContainer.css';

interface PostCardListContainerProps {
  filters: ExperimentPostListFilters;
  isUserInfoLoading: boolean;
  isRecruiting: boolean;
  handleToggleRecruitStatus: () => void;
}

const ExperimentPostCardListContainer = ({
  filters,
  isUserInfoLoading,
  isRecruiting,
  handleToggleRecruitStatus,
}: PostCardListContainerProps) => {
  const {
    data: postListData,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isFetching,
    isLoading: isListLoading,
  } = useExperimentPostListQuery(filters, isUserInfoLoading);

  const hasData = postListData && postListData.pages && postListData.pages.length > 0;

  if (!hasData || isUserInfoLoading || isListLoading) {
    return (
      <div className={emptyViewLayout}>
        <Spinner />
        <p className={emptySubTitle}>로딩중</p>
      </div>
    );
  }

  return (
    <div className={postCardContentContainer}>
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
      {!isFetching && !hasNextPage && hasData && (
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
