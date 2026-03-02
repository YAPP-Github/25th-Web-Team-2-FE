
import { ExperimentPostListFilters } from '@apis/post';
import { fetchExperimentPosts } from '@home/server/fetchExperimentPosts';

import { totalPostCount } from './ExperimentPostTotalCount.css';

interface ExperimentPostTotalCountProps {
  searchParams: {
    [k in keyof ExperimentPostListFilters]?: string;
  };
}

const ExperimentPostTotalCount = async ({ searchParams }: ExperimentPostTotalCountProps) => {
  const initialPosts = await fetchExperimentPosts({ searchParams });

  return (
    <span className={totalPostCount}>{initialPosts && `총 ${initialPosts.totalCount}개`}</span>
  );
};

export default ExperimentPostTotalCount;
