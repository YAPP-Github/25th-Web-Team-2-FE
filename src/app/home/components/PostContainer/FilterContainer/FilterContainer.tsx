import { filterContainerLayout } from './FilterContainer.css';
import AreaFilter from '../AreaFilter/AreaFilter';
import ContactTargetFilter from '../ContactTargetPopover/ContactTargetFilter';
import MatchTypeFilter from '../MatchTypeFilter/MatchTypeFilter';

import { ExperimentPostListFilters } from '@/apis/post';

interface FilterContainerProps {
  filters: ExperimentPostListFilters;
  handleFilterChange: (key: string, value: string | number) => void;
}

const FilterContainer = ({ filters, handleFilterChange }: FilterContainerProps) => {
  return (
    <div className={filterContainerLayout}>
      {/* 진행 방식 필터링 */}
      <MatchTypeFilter
        filters={filters}
        onChange={(value) => handleFilterChange('matchType', value)}
      />

      {/* 모집 대상 필터링 */}
      <ContactTargetFilter
        onChange={handleFilterChange}
        initialGender={filters.gender}
        initialAge={filters.age}
      />

      {/* 지역 필터링 */}
      <AreaFilter onChange={handleFilterChange} />
    </div>
  );
};

export default FilterContainer;
