import AreaFilter from './AreaFilter/AreaFilter';
import ContactTargetFilter from './ContactTargetPopover/ContactTargetFilter';
import { filterContainerLayout, resetFilterButton, verticalLine } from './FilterContainer.css';
import MatchTypeFilter from './MatchTypeFilter/MatchTypeFilter';

import useURLFilters from '@/app/home/hooks/useURLFilters';
import Icon from '@/components/Icon';

const FilterContainer = () => {
  const { filters, handleFilterChange, handleResetFilter } = useURLFilters();

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
        onChange={(matchType) => handleFilterChange({ matchType })}
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
