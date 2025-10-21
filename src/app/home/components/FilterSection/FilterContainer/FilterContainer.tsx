'use client';

import AreaFilter from './AreaFilter/AreaFilter';
import ContactTargetFilter from './ContactTargetPopover/ContactTargetFilter';
import { filterContainerLayout, resetFilterButton, verticalLine } from './FilterContainer.css';
import MatchTypeFilter from './MatchTypeFilter/MatchTypeFilter';

import { ExperimentPostListFilters } from '@/apis/post';
import useURLFilters from '@/app/home/hooks/useURLFilters';
import Icon from '@/components/Icon';

interface FilterContainerProps {
  initialGender?: ExperimentPostListFilters['gender'];
  initialAge?: ExperimentPostListFilters['age'];
}

const FilterContainer = ({ initialGender, initialAge }: FilterContainerProps) => {
  const { filters, handleResetFilter } = useURLFilters();

  const isFiltered =
    initialGender ||
    initialAge ||
    filters.age ||
    filters.gender ||
    filters.matchType ||
    filters.region ||
    filters.areas;

  return (
    <div className={filterContainerLayout}>
      {/* 필터 초기화 버튼 */}
      {isFiltered && (
        <>
          <button className={resetFilterButton} onClick={handleResetFilter}>
            <Icon icon="Reset" width={16} height={16} cursor="pointer" />
          </button>
          <span className={verticalLine} />
        </>
      )}

      {/* 진행 방식 필터링 */}
      <MatchTypeFilter filters={filters} />

      {/* 모집 대상 필터링 */}
      <ContactTargetFilter
        filterGender={initialGender ?? filters.gender}
        filterAge={initialAge ?? filters.age}
      />

      {/* 지역 필터링 */}
      <AreaFilter filters={filters} />
    </div>
  );
};

export default FilterContainer;
