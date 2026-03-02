import type { ExperimentPost } from '@/types/post';
import ExperimentPostCard from '@home/components/ExperimentPostCardListContainer/ExperimentPostCardList/ExperimentPostCard';

import { otherPostsTitle, cardList, otherPostsLayout } from './OtherPostsSection.css';

const OTHER_POSTS: ExperimentPost[] = [
  {
    postInfo: {
      experimentPostId: 1,
      title: '(율전) 1월 fMRI-EEG 실험',
      views: 100000,
      place: '건국대학교 글로컬캠퍼스',
      reward: '30분당 15,000원',
      durationInfo: { startDate: '2025-01-31', endDate: '2025-02-08' },
      timeRequired: 'ABOUT_30M',
      count: 1,
    },
    recruitStatus: true,
  },
  {
    postInfo: {
      experimentPostId: 2,
      title: '강남 삼성서울병원 연구 참여자 (3개월 간 참여)',
      views: 100000,
      place: '성균관대학교 자연과학캠퍼스',
      reward: '세전 55만 원+갤럭시워치6 클래식 (참여율에 따라 지급)',
      durationInfo: { startDate: null, endDate: null },
      timeRequired: null,
      count: null,
    },
    recruitStatus: true,
  },
];

const OtherPostsSection = () => {
  return (
    <div className={otherPostsLayout}>
      <h2 className={otherPostsTitle}>다른 공고도 둘러보기</h2>
      <ul className={cardList}>
        {OTHER_POSTS.map((post) => (
          <ExperimentPostCard key={post.postInfo.experimentPostId} experimentPost={post} />
        ))}
      </ul>
    </div>
  );
};

export default OtherPostsSection;
