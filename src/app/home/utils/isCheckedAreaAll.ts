import { AREA_ALL } from '../home.constants';

export const isCheckedAreaAll = (selectedAreas: Record<string, boolean>) => {
  return !AREA_ALL.some((area) => selectedAreas[area]);
};
