import { InfiniteData } from '@tanstack/react-query';

import EmptyPostCard from './EmptyPostCard/EmptyPostCard';
import ExperimentPostCard from './ExperimentPostCard/ExperimentPostCard';
import { experimentPostLayout } from './ExperimentPostCardList.css';

import { ExperimentPostResponse } from '@/apis/post';

interface ExperimentPostProps {
  postListData?: InfiniteData<ExperimentPostResponse, unknown> | undefined;
}

const ExperimentPostCardList = ({ postListData }: ExperimentPostProps) => {
  if (postListData?.pages[0].content.length === 0) {
    return <EmptyPostCard />;
  }

  return (
    <ul className={experimentPostLayout}>
      {postListData?.pages.map((page) =>
        page.content.map((post) => (
          <ExperimentPostCard key={post.postInfo.experimentPostId} experimentPost={post} />
        )),
      )}
    </ul>
  );
};

export default ExperimentPostCardList;
