import usePostListQuery from '@/app/home/hooks/usePostListQuery';
import { postCardListLayout } from './PostCardList.styles';
import PostCard from '../PostCard/PostCard';

const PostCardList = () => {
  const { data: postList } = usePostListQuery();

  return (
    <section css={postCardListLayout}>
      {postList?.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </section>
  );
};

export default PostCardList;
