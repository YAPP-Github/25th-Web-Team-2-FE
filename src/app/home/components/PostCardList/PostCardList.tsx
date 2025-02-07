import { InfiniteData } from '@tanstack/react-query';

import PostCard from '../PostCard/PostCard';
import EmptyPostCard from './EmptyPostCard/EmptyPostCard';
import { postCardListLayout } from './PostCardList.css';

import { ExperimentPostResponse } from '@/apis/post';

interface PostCardListProps {
  postListData?: InfiniteData<ExperimentPostResponse, unknown> | undefined;
}

const PostCardList = ({ postListData }: PostCardListProps) => {
  if (postListData?.pages[0].content.length === 0) {
    return <EmptyPostCard />;
  }

  return (
    <ul className={postCardListLayout}>
      {postListData?.pages.map((page) =>
        page.content.map((post) => <PostCard key={post.postInfo.experimentPostId} post={post} />),
      )}
    </ul>
  );
};

export default PostCardList;
