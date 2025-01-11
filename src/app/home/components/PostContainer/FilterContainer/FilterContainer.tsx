import AreaFilter from '../AreaFilter/AreaFilter';
import ContactTargetFilter from '../ContactTargetPopover/ContactTargetFilter';
import ProgressMethodFilter from '../ProgressMethodFilter/ProgressMethodFilter';
import { filterLayout } from './FilterContainer.styles';

const FilterContainer = () => {
  return (
    <div css={filterLayout}>
      <ProgressMethodFilter />
      <ContactTargetFilter />
      <AreaFilter />
    </div>
  );
};

export default FilterContainer;
