import { useState, useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

const useRegionSelect = () => {
  const { control, setValue } = useFormContext();

  // 기존 선택된 지역 및 지역구
  const watchedRegion = useWatch({ control, name: 'region' });
  const watchedArea = useWatch({ control, name: 'area' });

  // 지역 선택 상태
  const [selectedRegion, setSelectedRegion] = useState(watchedRegion);
  const [selectedSubRegion, setSelectedSubRegion] = useState(watchedArea);
  const [isOpenRegionPopover, setIsOpenRegionPopover] = useState(false);

  // 기존 선택 지역으로 업데이트 (edit)
  useEffect(() => {
    setSelectedRegion(watchedRegion);
    setSelectedSubRegion(watchedArea);
  }, [watchedRegion, watchedArea]);

  // 지역 선택 (regin)
  const handleRegionSelect = (region: string) => {
    setSelectedRegion(region);
    setSelectedSubRegion(null);
    setValue('region', region, { shouldValidate: true, shouldDirty: true });
    setValue('area', '', { shouldValidate: true, shouldDirty: true });
  };

  // 지역구 선택 (area)
  const handleSubRegionSelect = (subRegion: string) => {
    setSelectedSubRegion(subRegion);
    setIsOpenRegionPopover(false);
    setValue('area', subRegion, { shouldValidate: true, shouldDirty: true });
  };

  return {
    selectedRegion,
    selectedSubRegion,
    isOpenRegionPopover,
    setIsOpenRegionPopover,
    handleRegionSelect,
    handleSubRegionSelect,
  };
};

export default useRegionSelect;
