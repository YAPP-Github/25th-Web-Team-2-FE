import { postCardListLayout } from './PostCardList.styles';
import PostCard from '../PostCard/PostCard';

import { Post } from '@/types/post';

interface PostCardListProps {
  postList?: Post[];
}

const PostCardList = ({ postList }: PostCardListProps) => {
  return (
    <ul css={postCardListLayout}>
      {postList?.map((post) => (
        <PostCard key={post.postInfo.experimentPostId} post={post} />
      ))}
    </ul>
  );
};

export default PostCardList;
