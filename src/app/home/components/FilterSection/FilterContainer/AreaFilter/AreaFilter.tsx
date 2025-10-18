'use client';

import * as Popover from '@radix-ui/react-popover';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { useState } from 'react';

import { triggerWrapper, regionContentContainer } from './AreaFilter.css';
import AreaFilterBottomSheet from './components/AreaFilterBottomSheet/AreaFilterBottomSheet';
import AreaFilterContent from './components/AreaFilterContent/AreaFilterContent';

import { ExperimentPostListFilters } from '@/apis/post';
import { getFilterColors, getRegionFilterText } from '@/app/home/home.utils';
import useURLFilters from '@/app/home/hooks/useURLFilters';
import Icon from '@/components/Icon';
import useOverlay from '@/hooks/useOverlay';

interface AreaFilterProps {
  filters: ExperimentPostListFilters;
}

const AreaFilter = ({ filters }: AreaFilterProps) => {
  const { handleFilterChange } = useURLFilters();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { open, close } = useOverlay();

  const isFiltered = Boolean(filters.region) || Boolean(filters.areas);

  const handleOpenBottomSheet = (e: React.TouchEvent) => {
    e.preventDefault();
    open(
      () => (
        <AreaFilterBottomSheet
          initialRegion={filters.region}
          initialAreas={filters.areas}
          onChange={handleFilterChange}
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
          <AreaFilterContent
            initialRegion={filters.region}
            initialAreas={filters.areas}
            onChange={handleFilterChange}
            onClose={() => setIsFilterOpen(false)}
          />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default AreaFilter;
