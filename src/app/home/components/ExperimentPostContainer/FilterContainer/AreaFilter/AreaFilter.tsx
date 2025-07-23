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
import AreaFilterBottomSheet from './components/AreaFilterBottomSheet/AreaFilterBottomSheet';
import FooterButtonContainer from './components/FooterButtonContainer/FooterButtonContainer';
import RegionContainer from './components/RegionContainer/RegionContainer';
import useAreaFilter from './hooks/useAreaFilter';

import { ExperimentPostListFilters } from '@/apis/post';
import { getFilterColors, getRegionFilterText } from '@/app/home/home.utils';
import usePostAreaCountQuery from '@/app/home/hooks/usePostAreaCountQuery';
import usePostRegionCountQuery from '@/app/home/hooks/usePostRegionCountQuery';
import Icon from '@/components/Icon';
import useOverlay from '@/hooks/useOverlay';
import { AreaType, ExperimentPostListFilterParams } from '@/types/filter';

interface AreaFilterProps {
  filters: ExperimentPostListFilters;
  onChange: (filters: ExperimentPostListFilterParams) => void;
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
  } = useAreaFilter({
    initialRegion: filters.region,
    initialAreas: filters.areas,
  });
  const { open, close } = useOverlay();

  const { data: experimentPostRegion } = usePostRegionCountQuery(selectedRegion);
  const { data: experimentPostAreas } = usePostAreaCountQuery(selectedRegion);

  const isFiltered = Boolean(filters.region) || Boolean(filters.areas);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleSave = () => {
    setIsFilterOpen(false);
    onChange({
      region: selectedRegion,
      areas: selectedAreaList.length > 0 ? (selectedAreaList as AreaType[]) : null,
    });
  };

  const handleOpenBottomSheet = (e: React.TouchEvent) => {
    e.preventDefault();
    open(
      () => (
        <AreaFilterBottomSheet
          initialRegion={filters.region}
          initialAreas={filters.areas}
          onReset={handleReset}
          onChange={onChange}
          onClose={close}
        />
      ),
      { headerMode: 'title-close', title: '지역' },
    );
  };

  return (
    <Popover.Root open={isFilterOpen} onOpenChange={setIsFilterOpen}>
      <Popover.Trigger
        className={triggerWrapper}
        style={assignInlineVars(getFilterColors(isFiltered))}
        onTouchEnd={handleOpenBottomSheet}
      >
        <span>{getRegionFilterText(filters.region, filters.areas)}</span>
        <Icon icon="Chevron" width={20} rotate={isFilterOpen ? -180 : 0} cursor="pointer" />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className={regionContentContainer} align="start">
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
