'use client';

import ExperimentPostCard from '@home/components/ExperimentPostCardListContainer/ExperimentPostCardList/ExperimentPostCard';
import { CLICK_MORE_EXPERIMENT_POST } from '@lib/mixpanel/postEvents';
import { trackEvent } from '@lib/mixpanelClient';

import {
  otherPostsTitle,
  cardList,
  mobileCardList,
  otherPostsLayout,
} from './OtherPostsSection.css';
import { useFetchOtherExperimentPostsQuery } from '../../hooks/useFetchOtherExperimentPostsQuery';

interface OtherPostsSectionProps {
  postId: string;
  isMobile?: boolean;
}

const OtherPostsSection = ({ postId, isMobile = false }: OtherPostsSectionProps) => {
  const { data: otherPosts } = useFetchOtherExperimentPostsQuery(postId);

  if (!otherPosts) return null;

  return (
    <div className={otherPostsLayout}>
      <h2 className={otherPostsTitle}>다른 공고도 둘러보기</h2>
      <ul className={isMobile ? mobileCardList : cardList}>
        {otherPosts.map((post) => (
          <ExperimentPostCard
            key={post.experimentPostId}
            experimentPost={{
              postInfo: post,
              recruitStatus: true,
            }}
            hideViews={isMobile}
            onClickPost={() => {
              trackEvent(CLICK_MORE_EXPERIMENT_POST, { device: isMobile ? 'mobile' : 'desktop' });
            }}
          />
        ))}
      </ul>
    </div>
  );
};

export default OtherPostsSection;
