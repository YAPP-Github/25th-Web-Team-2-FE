import { useState } from 'react';

import { AREA_ALL } from '@/app/home/home.constants';
import { AreaAll } from '@/app/home/home.types';
import { RegionType } from '@/types/filter';

const MAX_SELECTED_AREAS = 5;

const useAreaFilter = () => {
  // 지역 상태 관리
  const [selectedRegion, setSelectedRegion] = useState<RegionType | null>(null);
  const [selectedAreas, setSelectedAreas] = useState<Record<string, boolean>>({});

  // 선택된 지역 배열
  const selectedAreaList = Object.keys(selectedAreas).filter((key) => selectedAreas[key]);

  // 선택 가능 여부
  const isValidAreas = selectedAreaList.length < MAX_SELECTED_AREAS;

  // 저장 버튼 활성화 조건: region과 area 모두 선택했을 때, 아무것도 선택 안되었을 때
  const isValidSaveButton = !selectedRegion || (selectedRegion && selectedAreaList.length > 0);

  const handleReset = () => {
    setSelectedRegion(null);
    setSelectedAreas({});
  };

  const handleSelectRegion = (region: RegionType) => {
    setSelectedRegion(region);
    setSelectedAreas({});
  };

  const handleSelectArea = (area: string) => {
    const isClickAreaAll = AREA_ALL.includes(area as AreaAll);

    // 전체 지역을 클릭한 경우 - 기존 선택을 모두 지우고 AreaAll만 토글
    if (isClickAreaAll) {
      const targetArea = selectedAreas[area];
      setSelectedAreas({ [area]: !targetArea });
      return;
    }

    // 전체 지역이 선택되어 있는지 확인
    const hasSelectedAreaAll = AREA_ALL.some((area) => selectedAreas[area]);

    // 전체 지역이 이미 선택되어 있는데 다른 지역을 클릭한 경우
    if (hasSelectedAreaAll) {
      setSelectedAreas({ [area]: !selectedAreas[area] });
      return;
    }

    // 일반적인 토글 처리
    setSelectedAreas((prev) => ({
      ...prev,
      [area]: !prev[area],
    }));
  };

  return {
    // 상태
    selectedRegion,
    selectedAreas,
    selectedAreaList,

    // 플래그
    isValidAreas,
    isValidSaveButton,

    // 이벤트 핸들러
    handleReset,
    handleSelectRegion,
    handleSelectArea,
  };
};

export default useAreaFilter;
