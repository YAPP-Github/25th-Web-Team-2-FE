'use client';

import * as Popover from '@radix-ui/react-popover';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { useState } from 'react';

import {
  triggerWrapper,
  regionContentContainer,
  contentWrapper,
  verticalLine,
} from './AreaFilter.css';
import AreaContainer from './components/AreaContainer/AreaContainer';
import FooterButtonContainer from './components/FooterButtonContainer/FooterButtonContainer';
import RegionContainer from './components/RegionContainer/RegionContainer';
import useAreaFilter from './hooks/useAreaFilter';

import { ExperimentPostListFilters } from '@/apis/post';
import { getRegionFilterText } from '@/app/home/home.utils';
import usePostAreaCountQuery from '@/app/home/hooks/usePostAreaCountQuery';
import usePostRegionCountQuery from '@/app/home/hooks/usePostRegionCountQuery';
import Icon from '@/components/Icon';
import { colors } from '@/styles/colors';

interface AreaFilterProps {
  filters: ExperimentPostListFilters;
  onChange: (key: string, value: string | string[] | number | null) => void;
}

const AreaFilter = ({ filters, onChange }: AreaFilterProps) => {
  const {
    selectedRegion,
    selectedAreas,
    selectedAreaList,
    isValidAreas,
    isValidSaveButton,
    handleReset,
    handleSelectRegion,
    handleSelectArea,
  } = useAreaFilter();

  const { data: experimentPostRegion } = usePostRegionCountQuery(selectedRegion);
  const { data: experimentPostAreas } = usePostAreaCountQuery(selectedRegion);

  const isFiltered = Boolean(filters.region) || Boolean(filters.areas);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleSave = () => {
    setIsFilterOpen(false);
    onChange('region', selectedRegion);
    onChange('areas', selectedAreaList.length > 0 ? selectedAreaList : null);
  };

  return (
    <Popover.Root open={isFilterOpen} onOpenChange={setIsFilterOpen}>
      <Popover.Trigger
        className={triggerWrapper}
        style={assignInlineVars({
          '--trigger-color': isFiltered ? colors.text01 : colors.text06,
          '--trigger-bg': isFiltered ? colors.field09 : colors.field01,
        })}
      >
        <span>{getRegionFilterText(filters.region, filters.areas)}</span>
        <Icon icon="Chevron" width={20} rotate={isFilterOpen ? -180 : 0} cursor="pointer" />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className={regionContentContainer}>
          <div className={contentWrapper}>
            <RegionContainer
              experimentPostRegion={experimentPostRegion}
              selectedRegion={selectedRegion}
              handleSelectRegion={handleSelectRegion}
            />
            <span className={verticalLine} />
            <AreaContainer
              experimentPostAreas={experimentPostAreas}
              selectedRegion={selectedRegion}
              handleSelectArea={handleSelectArea}
              isValidAreas={isValidAreas}
              selectedAreas={selectedAreas}
            />
          </div>
          <FooterButtonContainer
            handleReset={handleReset}
            handleSave={handleSave}
            isValidSaveButton={isValidSaveButton}
          />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default AreaFilter;
