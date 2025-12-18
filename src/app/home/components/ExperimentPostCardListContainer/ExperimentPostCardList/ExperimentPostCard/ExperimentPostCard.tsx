import Link from 'next/link';

import {
  announceText,
  contactedPostTag,
  postCardLayout,
  postDate,
  postLocation,
  postReward,
  postRewardContainer,
  postTitle,
  postViews,
  postDetailsContainer,
  postViewsContainer,
} from './ExperimentPostCard.css';

import { formatExperimentTimeRequired } from '@/app/home/home.utils';
import Icon from '@/components/Icon';
import { startRecording } from '@/lib/mixpanelClient';
import { colors } from '@/styles/colors';
import { ExperimentPost } from '@/types/post';

interface ExperimentPostCardProps {
  experimentPost: ExperimentPost;
}

const ExperimentPostCard = ({ experimentPost }: ExperimentPostCardProps) => {
  const {
    postInfo: { experimentPostId, place, views, title, reward, timeRequired, count },
    recruitStatus,
  } = experimentPost;

  const goToPost = () => {
    startRecording();
  };

  return (
    <li>
      <Link
        href={`/post/${experimentPostId}`}
        key={experimentPostId}
        className={postCardLayout}
        onClick={goToPost}
      >
        {/* location */}
        <span className={postLocation}>{place ? place : '비대면'}</span>

        {/* views */}
        <div className={postViewsContainer}>
          <Icon icon="Eye" width={18} height={18} color={colors.icon02} />
          <span className={postViews}>{views}</span>
        </div>

        {/* title */}
        <h3 className={postTitle}>{title}</h3>

        {/* details */}
        {recruitStatus ? (
          <div className={postDetailsContainer}>
            <div className={postRewardContainer}>
              <span className={announceText}>보상</span>
              <span className={postReward}>{reward}</span>
            </div>
            <div className={postRewardContainer}>
              <span className={announceText}>시간</span>
              <div className={postDate}>
                {formatExperimentTimeRequired({ timeRequired, count }).map((text, index) => (
                  <span key={index}>{text}</span>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className={contactedPostTag}>
            <span>모집 완료</span>
          </div>
        )}
      </Link>
    </li>
  );
};

export default ExperimentPostCard;
