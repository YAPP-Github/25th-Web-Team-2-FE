import { postCardListLayout } from './PostCardList.styles';
import PostCard from '../PostCard/PostCard';
import { Post } from '@/types/post';

interface PostCardListProps {
  postList: Post[];
}

const PostCardList = ({ postList }: PostCardListProps) => {
  return (
    <section css={postCardListLayout}>
      {postList?.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </section>
  );
};

export default PostCardList;
