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
        href={`/post/${post.id}`}
        key={post.id}
        css={postCardLayout}
        style={{
          backgroundColor: post.isContacted ? theme.colors.field01 : theme.colors.field01,
        }}
      >
        <div css={postHeader}>
          <div css={postCardHeader}>
            <span css={postLocation}>{post.place}</span>
            <div css={postCardRightHeader}>
              <Icon icon="Eye" width={18} />
              <span css={postViews}>{post.views}</span>
            </div>
          </div>
          <h3 css={postTitle}>{post.title}</h3>
        </div>
        <div>
          {post.isContacted ? (
            <div css={contactedPostTag}>
              <span>모집 완료</span>
            </div>
          ) : (
            <>
              <div css={postRewardContainer}>
                <span css={announceText}>보상</span>
                <span css={postReward}>{post.reward}</span>
              </div>
              <div css={postRewardContainer}>
                <span css={announceText}>일시</span>
                <span css={postDate}>{post.testDate}</span>
              </div>
            </>
          )}
        </div>
      </Link>
    </li>
  );
};

export default PostCard;
