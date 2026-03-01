import { UPLOAD_REGION } from '@/constants/uploadRegion';

export const getAreaLabel = (region: string, area: string): string => {
  const foundRegion = UPLOAD_REGION.find((regionObj) => regionObj.value === region);
  if (foundRegion) {
    const foundArea = foundRegion.children?.find((areaObj) => areaObj.value === area);
    return foundArea ? foundArea.label : '';
  }
  return '';
};
