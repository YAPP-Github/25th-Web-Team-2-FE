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
import { formatPostDate } from '../../home.utils';

import Icon from '@/components/Icon';
import { Post } from '@/types/post';

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  const {
    postInfo: { experimentPostId, univName, views, title, reward, durationInfo },
    recruitStatus,
  } = post;

  return (
    <li>
      <Link href={`/post/${experimentPostId}`} key={experimentPostId} css={postCardLayout}>
        <div css={postHeader}>
          <div css={postCardHeader}>
            <span css={postLocation}>{univName}</span>
            <div css={postCardRightHeader}>
              <Icon icon="Eye" width={18} />
              <span css={postViews}>{views}</span>
            </div>
          </div>
          <h3 css={postTitle}>{title}</h3>
        </div>
        <div>
          {recruitStatus ? (
            <>
              <div css={postRewardContainer}>
                <span css={announceText}>보상</span>
                <span css={postReward}>{reward}</span>
              </div>
              <div css={postRewardContainer}>
                <span css={announceText}>일시</span>
                <span css={postDate}>
                  {formatPostDate({
                    startDate: durationInfo.startDate,
                    endDate: durationInfo.endDate,
                  })}
                </span>
              </div>
            </>
          ) : (
            <div css={contactedPostTag}>
              <span>모집 완료</span>
            </div>
          )}
        </div>
      </Link>
    </li>
  );
};

export default PostCard;
