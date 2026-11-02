import { AreaType, RegionType } from '@/types/filter';
import { AREA_MAPPER, REGION_MAPPER } from '@constants/filters';

export const getRegionFilterText = (region?: RegionType | null, areas?: AreaType[]) => {
  const isArea = areas && areas.length > 0;

  if (region) {
    if (!isArea) {
      return `${REGION_MAPPER[region]}`;
    }

    if (areas.length >= 2) {
      return `${REGION_MAPPER[region]} · ${AREA_MAPPER[areas[0]]} 외 ${areas.length - 1}`;
    }
    return `${REGION_MAPPER[region]} · ${AREA_MAPPER[areas[0]]}`;
  }

  return '지역';
};
