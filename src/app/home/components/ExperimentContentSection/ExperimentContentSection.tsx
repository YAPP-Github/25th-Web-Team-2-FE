import { Suspense } from 'react';

import {
  postContainerLayout,
  postContainerTitleDesktop,
  horizontalLineMobile,
  filterWrapper,
  totalPostCountWrapper,
  postListWrapper,
} from './ExperimentContentSection.css';
import ExperimentPostSection from '../ExperimentPostSection/ExperimentPostSection';
import ExperimentPostTotalCount from '../ExperimentPostTotalCount/ExperimentPostTotalCount';
import FilterSection from '../FilterSection/FilterSection';
import RecruitStatusCheckbox from '../RecruitStatusCheckbox/RecruitStatusCheckbox';

import { ExperimentPostListFilters } from '@/apis/post';
import FilterSkeleton from '@/components/Skeleton/FilterSkeleton/FilterSkeleton';
import PostListSkeleton from '@/components/Skeleton/PostListSkeleton/PostListSkeleton';
import TotalCountSkeleton from '@/components/Skeleton/TotalCountSkeleton/TotalCountSkeleton';

interface ExperimentContentSectionProps {
  searchParams: {
    [k in keyof ExperimentPostListFilters]?: string;
  };
}

const ExperimentContentSection = ({ searchParams }: ExperimentContentSectionProps) => {
  return (
    <section className={postContainerLayout}>
      <h2 className={postContainerTitleDesktop}>공고를 확인해 보세요</h2>
      <div className={horizontalLineMobile} />

      {/* 필터링 */}
      <div className={filterWrapper}>
        <Suspense fallback={<FilterSkeleton />}>
          <FilterSection searchParams={searchParams} />
        </Suspense>
      </div>

      {/* 모집 중인 공고만 보기 */}
      <RecruitStatusCheckbox />

      {/* 총 공고 개수 */}
      <div className={totalPostCountWrapper}>
        <Suspense fallback={<TotalCountSkeleton />}>
          <ExperimentPostTotalCount searchParams={searchParams} />
        </Suspense>
      </div>

      {/* 공고 목록 */}
      <div className={postListWrapper}>
        <Suspense fallback={<PostListSkeleton />}>
          <ExperimentPostSection searchParams={searchParams} />
        </Suspense>
      </div>
    </section>
  );
};

export default ExperimentContentSection;
