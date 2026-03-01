import { AREA_ALL } from '../constants/area';

export const isCheckedAreaAll = (selectedAreas: Record<string, boolean>) => {
  return !AREA_ALL.some((area) => selectedAreas[area]);
};
