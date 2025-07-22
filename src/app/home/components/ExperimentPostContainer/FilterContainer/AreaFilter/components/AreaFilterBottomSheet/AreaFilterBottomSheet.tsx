import { useState } from 'react';

import {
  areaFilterBottomSheetContainer,
  contentWrapper,
  verticalLine,
  footerButtonContainer,
  resetButton,
  saveButton,
} from './AreaFilterBottomSheet.css';
import AreaContainer from '../AreaContainer/AreaContainer';
import RegionContainer from '../RegionContainer/RegionContainer';

import { AREA_ALL } from '@/app/home/home.constants';
import { AreaAll } from '@/app/home/home.types';
import usePostAreaCountQuery from '@/app/home/hooks/usePostAreaCountQuery';
import usePostRegionCountQuery from '@/app/home/hooks/usePostRegionCountQuery';
import Button from '@/components/Button/Button';
import { AreaType, RegionType } from '@/types/filter';

const MAX_SELECTED_AREAS = 5;

const isAreaAllType = (area: string) => {
  return AREA_ALL.includes(area as AreaAll);
};

const hasSelectedAreaAll = (selectedAreas: Record<string, boolean>) => {
  return AREA_ALL.some((area) => selectedAreas[area]);
};

interface AreaFilterBottomSheetProps {
  onChange: (filters: Record<string, string | string[] | number | null>) => void;
  onReset: () => void;
  onClose: () => void;
  initialRegion?: RegionType;
  initialAreas?: AreaType[];
}

const AreaFilterBottomSheet = ({
  onChange,
  onReset,
  onClose,
  initialRegion,
  initialAreas,
}: AreaFilterBottomSheetProps) => {
  const [selectedRegion, setSelectedRegion] = useState<RegionType | null>(initialRegion ?? null);
  const [selectedAreas, setSelectedAreas] = useState<Record<string, boolean>>(() =>
    [...(initialAreas ?? [])].reduce((acc, area) => {
      acc[area] = true;
      return acc;
    }, {} as Record<string, boolean>),
  );

  const { data: experimentPostRegion } = usePostRegionCountQuery(selectedRegion);
  const { data: experimentPostAreas } = usePostAreaCountQuery(selectedRegion);

  const selectedAreaList = Object.keys(selectedAreas).filter((key) => selectedAreas[key]);
  const isValidAreas = selectedAreaList.length < MAX_SELECTED_AREAS;
  const isValidSave = !selectedRegion || selectedAreaList.length > 0;

  const handleSelectRegion = (region: RegionType) => {
    setSelectedRegion((prev) => (prev === region ? null : region));
    setSelectedAreas({});
  };

  const handleSelectArea = (area: string) => {
    // 전체 지역을 클릭한 경우 | 전체 지역이 이미 선택되어 있는데 다른 지역을 클릭한 경우
    if (isAreaAllType(area) || hasSelectedAreaAll(selectedAreas)) {
      setSelectedAreas({ [area]: !selectedAreas[area] });
      return;
    }

    setSelectedAreas((prev) => ({
      ...prev,
      [area]: !prev[area],
    }));
  };

  const handleReset = () => {
    setSelectedRegion(null);
    setSelectedAreas({});
    onReset();
  };

  const handleConfirm = () => {
    onChange({
      region: selectedRegion,
      areas: selectedAreaList.length > 0 ? selectedAreaList : null,
    });
    onClose();
  };

  return (
    <div className={areaFilterBottomSheetContainer}>
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
      <div className={footerButtonContainer}>
        <Button variant="secondary" size="small" className={resetButton} onClick={handleReset}>
          초기화
        </Button>
        <Button
          variant="primary"
          size="small"
          className={saveButton}
          onClick={handleConfirm}
          disabled={!isValidSave}
        >
          저장
        </Button>
      </div>
    </div>
  );
};

export default AreaFilterBottomSheet;
