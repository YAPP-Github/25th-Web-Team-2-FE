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
} from './PostCard.css';
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
      <Link href={`/post/${experimentPostId}`} key={experimentPostId} className={postCardLayout}>
        <div className={postHeader}>
          <div className={postCardHeader}>
            <span className={postLocation}>{univName}</span>
            <div className={postCardRightHeader}>
              <Icon icon="Eye" width={18} />
              <span className={postViews}>{views}</span>
            </div>
          </div>
          <h3 className={postTitle}>{title}</h3>
        </div>
        <div>
          {recruitStatus ? (
            <>
              <div className={postRewardContainer}>
                <span className={announceText}>보상</span>
                <span className={postReward}>{reward}</span>
              </div>
              <div className={postRewardContainer}>
                <span className={announceText}>일시</span>
                <span className={postDate}>
                  {formatPostDate({
                    startDate: durationInfo.startDate,
                    endDate: durationInfo.endDate,
                  })}
                </span>
              </div>
            </>
          ) : (
            <div className={contactedPostTag}>
              <span>모집 완료</span>
            </div>
          )}
        </div>
      </Link>
    </li>
  );
};

export default PostCard;
