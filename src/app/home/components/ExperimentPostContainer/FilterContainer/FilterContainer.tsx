import AreaFilter from './AreaFilter/AreaFilter';
import { verticalLine } from './AreaFilter/AreaFilter.css';
import ContactTargetFilter from './ContactTargetPopover/ContactTargetFilter';
import { filterContainerLayout, resetFilterButton } from './FilterContainer.css';
import MatchTypeFilter from './MatchTypeFilter/MatchTypeFilter';

import { ExperimentPostListFilters } from '@/apis/post';
import Icon from '@/components/Icon';


interface FilterContainerProps {
  filters: ExperimentPostListFilters;
  handleFilterChange: (key: string, value: string | string[] | number | null) => void;
  handleResetFilter: () => void;
}

const FilterContainer = ({
  filters,
  handleFilterChange,
  handleResetFilter,
}: FilterContainerProps) => {
  const isFiltered =
    filters.age || filters.gender || filters.matchType || filters.region || filters.areas;

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
      <MatchTypeFilter
        filters={filters}
        onChange={(value) => handleFilterChange('matchType', value)}
      />

      {/* 모집 대상 필터링 */}
      <ContactTargetFilter
        onChange={handleFilterChange}
        filterGender={filters.gender}
        filterAge={filters.age}
      />

      {/* 지역 필터링 */}
      <AreaFilter filters={filters} onChange={handleFilterChange} />
    </div>
  );
};

export default FilterContainer;
