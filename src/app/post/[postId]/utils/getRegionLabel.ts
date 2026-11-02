import { UPLOAD_REGION } from '@constants/uploadRegion';

export const getRegionLabel = (region: string): string => {
  const foundRegion = UPLOAD_REGION.find((regionObj) => regionObj.value === region);
  return foundRegion ? foundRegion.label : '';
};
