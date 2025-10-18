import { postCardSkeleton, postListSkeletonContainer } from './PostListSkeleton.css';

const POST_PER_PAGE = 15;

const PostListSkeleton = () => {
  return (
    <div className={postListSkeletonContainer}>
      {Array.from({ length: POST_PER_PAGE }, (_, index) => (
        <div key={index} className={postCardSkeleton} />
      ))}
    </div>
  );
};

export default PostListSkeleton;
