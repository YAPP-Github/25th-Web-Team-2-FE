import PostCard from '../PostCard/PostCard';
import EmptyPostCard from './EmptyPostCard/EmptyPostCard';
import { postCardListLayout } from './PostCardList.css';

import { ExperimentPost } from '@/types/post';

interface PostCardListProps {
  postList?: ExperimentPost[];
}

const PostCardList = ({ postList }: PostCardListProps) => {
  if (!postList) {
    return null;
  }

  if (postList.length === 0) {
    return <EmptyPostCard />;
  }

  return (
    <ul className={postCardListLayout}>
      {postList.map((post) => (
        <PostCard key={post.postInfo.experimentPostId} post={post} />
      ))}
    </ul>
  );
};

export default PostCardList;
