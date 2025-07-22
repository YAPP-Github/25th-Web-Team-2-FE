import { useState, useEffect } from 'react';

import { AREA_ALL } from '@/app/home/home.constants';
import { AreaAll } from '@/app/home/home.types';
import { RegionType, AreaType } from '@/types/filter';

const MAX_SELECTED_AREAS = 5;

const isAreaAllType = (area: string) => {
  return AREA_ALL.includes(area as AreaAll);
};

const hasSelectedAreaAll = (selectedAreas: Record<string, boolean>) => {
  return AREA_ALL.some((area) => selectedAreas[area]);
};

const getInitialAreas = (initialAreas?: AreaType[]) => {
  return initialAreas ? initialAreas.reduce((acc, area) => ({ ...acc, [area]: true }), {}) : {};
};

interface UseAreaFilterProps {
  initialRegion?: RegionType;
  initialAreas?: AreaType[];
}

const useAreaFilter = ({ initialRegion, initialAreas }: UseAreaFilterProps = {}) => {
  const [selectedRegion, setSelectedRegion] = useState<RegionType | null>(initialRegion || null);
  const [selectedAreas, setSelectedAreas] = useState<Record<string, boolean>>(() =>
    getInitialAreas(initialAreas),
  );

  const selectedAreaList = Object.keys(selectedAreas).filter((key) => selectedAreas[key]);

  const isValidAreas = selectedAreaList.length < MAX_SELECTED_AREAS;

  // 저장 버튼 활성화 조건: region과 area 모두 선택했을 때 | 아무것도 선택 안되었을 때
  const isValidSaveButton = !selectedRegion || selectedAreaList.length > 0;

  const handleReset = () => {
    setSelectedRegion(null);
    setSelectedAreas({});
  };

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

  useEffect(() => {
    setSelectedRegion(initialRegion || null);
    setSelectedAreas(getInitialAreas(initialAreas));
  }, [initialRegion, initialAreas]);

  return {
    selectedRegion,
    selectedAreas,
    selectedAreaList,

    isValidAreas,
    isValidSaveButton,

    handleReset,
    handleSelectRegion,
    handleSelectArea,
  };
};

export default useAreaFilter;
