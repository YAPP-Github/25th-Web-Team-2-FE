import { filterLayout } from './FilterContainer.styles';
import ContactTargetPopover from '../ContactTargetPopover/ContactTargetPopover';
import ProgressMethod from '../ProgressMethod/ProgressMethod';

const FilterContainer = () => {
  return (
    <div css={filterLayout}>
      <ProgressMethod />
      <ContactTargetPopover />
    </div>
  );
};

export default FilterContainer;
