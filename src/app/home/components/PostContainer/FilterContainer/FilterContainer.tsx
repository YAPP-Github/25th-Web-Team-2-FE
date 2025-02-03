import { filterLayout } from './FilterContainer.css';
import AreaFilter from '../AreaFilter/AreaFilter';
import ContactTargetFilter from '../ContactTargetPopover/ContactTargetFilter';
import ProgressMethodFilter from '../ProgressMethodFilter/ProgressMethodFilter';

interface FilterContainerProps {
  handleFilterChange: (key: string, value: string | number) => void;
}

const FilterContainer = ({ handleFilterChange }: FilterContainerProps) => {
  return (
    <div className={filterLayout}>
      <ProgressMethodFilter onChange={(value) => handleFilterChange('matchType', value)} />
      <ContactTargetFilter onChange={handleFilterChange} />
      <AreaFilter onChange={handleFilterChange} />
    </div>
  );
};

export default FilterContainer;
