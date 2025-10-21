import {
  postCardSkeleton,
  postListSkeletonContainer,
  postCardSkeletonHeader,
  postCardSkeletonInfo,
  postCardSkeletonViews,
  postCardSkeletonFooter,
} from './PostListSkeleton.css';

const POST_PER_PAGE = 15;

const PostListSkeleton = () => {
  return (
    <div className={postListSkeletonContainer}>
      {Array.from({ length: POST_PER_PAGE }, (_, index) => (
        <div key={index} className={postCardSkeleton}>
          <div className={postCardSkeletonHeader} />
          <div className={postCardSkeletonFooter}>
            <div className={postCardSkeletonInfo} />
            <div className={postCardSkeletonViews} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostListSkeleton;
