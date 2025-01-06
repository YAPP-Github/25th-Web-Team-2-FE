import { filterLayout } from './FilterContainer.styles';
import ContactTargetPopover from '../ContactTargetPopover/ContactTargetPopover';

const FilterContainer = () => {
  return (
    <div css={filterLayout}>
      <ContactTargetPopover />
    </div>
  );
};

export default FilterContainer;
