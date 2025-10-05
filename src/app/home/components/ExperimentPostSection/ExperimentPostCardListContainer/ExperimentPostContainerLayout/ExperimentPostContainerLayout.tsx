import { PropsWithChildren } from 'react';

import {
  allPostsViewedContainer,
  allPostsViewedContentContainer,
  allPostsViewedSubTitle,
  allPostsViewedTitle,
  loadingMoreButton,
  postCardContentContainer,
  watchMoreButton,
} from './ExperimentPostContainerLayout.css';

import Icon from '@/components/Icon';

interface ExperimentPostAdditionalLayoutProps {
  children: React.ReactNode;
  isFetching: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  hasPost: boolean;
  fetchNextPage: () => void;
}

const ExperimentPostContainerLayout = ({
  children,
  isFetching,
  isFetchingNextPage,
  hasNextPage,
  hasPost,
  fetchNextPage,
}: PropsWithChildren<ExperimentPostAdditionalLayoutProps>) => {
  return (
    <main className={postCardContentContainer}>
      {children}
      {isFetching && hasNextPage && <div className={loadingMoreButton} />}
      {!isFetching && hasNextPage && (
        <button
          className={watchMoreButton}
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          더보기
        </button>
      )}
      {!isFetching && !hasNextPage && hasPost && (
        <div className={allPostsViewedContainer}>
          <Icon icon="Golf" width={40} height={40} />
          <div className={allPostsViewedContentContainer}>
            <span className={allPostsViewedTitle}>모든 공고를 다 확인했어요!</span>
            <span className={allPostsViewedSubTitle}>새롭게 올라올 공고도 기대해 주세요</span>
          </div>
        </div>
      )}
    </main>
  );
};

export default ExperimentPostContainerLayout;
