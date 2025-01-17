import Link from 'next/link';

import {
  announceText,
  contactedPostTag,
  postCardHeader,
  postCardLayout,
  postCardRightHeader,
  postDate,
  postHeader,
  postLocation,
  postReward,
  postRewardContainer,
  postTitle,
  postViews,
} from './PostCard.styles';

import Icon from '@/components/Icon';
import theme from '@/styles/theme';
import { Post } from '@/types/post';

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  return (
    <li>
      <Link
        href={`/post/${post.postInfo.experimentPostId}`}
        key={post.postInfo.experimentPostId}
        css={postCardLayout}
        style={{
          backgroundColor: post.recruitDone ? theme.colors.field01 : theme.colors.field01,
        }}
      >
        <div css={postHeader}>
          <div css={postCardHeader}>
            <span css={postLocation}>{post.postInfo.univName}</span>
            <div css={postCardRightHeader}>
              <Icon icon="Eye" width={18} />
              <span css={postViews}>{post.postInfo.views}</span>
            </div>
          </div>
          <h3 css={postTitle}>{post.postInfo.title}</h3>
        </div>
        <div>
          {post.recruitDone ? (
            <div css={contactedPostTag}>
              <span>모집 완료</span>
            </div>
          ) : (
            <>
              <div css={postRewardContainer}>
                <span css={announceText}>보상</span>
                <span css={postReward}>{post.postInfo.reward}</span>
              </div>
              <div css={postRewardContainer}>
                <span css={announceText}>일시</span>
                <span css={postDate}>{post.postInfo.durationInfo.startDate}</span>
              </div>
            </>
          )}
        </div>
      </Link>
    </li>
  );
};

export default PostCard;
