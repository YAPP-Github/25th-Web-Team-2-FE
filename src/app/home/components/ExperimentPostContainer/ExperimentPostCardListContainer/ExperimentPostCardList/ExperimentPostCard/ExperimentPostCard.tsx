import Link from 'next/link';

import {
  announceText,
  contactedPostTag,
  postCardLayout,
  postDate,
  postHeader,
  postInfoContainer,
  postLocation,
  postReward,
  postRewardContainer,
  postTitle,
  postViews,
  postFooter,
  postDetailsContainer,
  postViewWrapperDesktop,
  postViewWrapperMobile,
} from './ExperimentPostCard.css';

import { formatPostDate } from '@/app/home/home.utils';
import Icon from '@/components/Icon';
import { colors } from '@/styles/colors';
import { ExperimentPost } from '@/types/post';

interface ExperimentPostCardProps {
  experimentPost: ExperimentPost;
}

const ExperimentPostCard = ({ experimentPost }: ExperimentPostCardProps) => {
  const {
    postInfo: { experimentPostId, place, views, title, reward, durationInfo },
    recruitStatus,
  } = experimentPost;

  return (
    <li>
      <Link href={`/post/${experimentPostId}`} key={experimentPostId} className={postCardLayout}>
        <div className={postHeader}>
          <div className={postInfoContainer}>
            <span className={postLocation}>{place ? place : '비대면'}</span>
            <div className={postViewWrapperDesktop}>
              <Icon icon="Eye" width={18} height={18} color={colors.icon02} />
              <span className={postViews}>{views}</span>
            </div>
          </div>
          <h3 className={postTitle}>{title}</h3>
        </div>

        <div className={postFooter}>
          {recruitStatus ? (
            <div className={postDetailsContainer}>
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
            </div>
          ) : (
            <div className={contactedPostTag}>
              <span>모집 완료</span>
            </div>
          )}

          <div className={postViewWrapperMobile}>
            <Icon icon="Eye" width={18} height={18} color={colors.icon02} />
            <span className={postViews}>{views}</span>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default ExperimentPostCard;
