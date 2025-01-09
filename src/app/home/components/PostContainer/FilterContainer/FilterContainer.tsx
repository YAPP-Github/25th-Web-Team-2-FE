import { filterLayout } from './FilterContainer.styles';
import ContactTargetPopover from '../ContactTargetPopover/ContactTargetPopover';
import ProgressMethod from '../ProgressMethod/ProgressMethod';
import RegionPopover from '../RegionPopover/RegionPopover';

const FilterContainer = () => {
  return (
    <div css={filterLayout}>
      <ProgressMethod />
      <ContactTargetPopover />
      <RegionPopover />
    </div>
  );
};

export default FilterContainer;
