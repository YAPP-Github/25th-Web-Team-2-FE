'use client';

import ExperimentPostCard from '@home/components/ExperimentPostCardListContainer/ExperimentPostCardList/ExperimentPostCard';

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
            hideViews={isMobile}
            experimentPost={{
              postInfo: post,
              recruitStatus: true,
            }}
          />
        ))}
      </ul>
    </div>
  );
};

export default OtherPostsSection;
