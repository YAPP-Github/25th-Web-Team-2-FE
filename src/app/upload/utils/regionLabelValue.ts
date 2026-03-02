import { UPLOAD_REGION } from '@constants/uploadRegion';

const labelValueMap = new Map<string, string>();

function initializeLabelValueMap() {
  UPLOAD_REGION.forEach((region) => {
    labelValueMap.set(region.label, region.value);
    region.children?.forEach((child) => {
      labelValueMap.set(child.label, child.value);
    });
  });
}

initializeLabelValueMap();

export const convertLabelToValue = (labelToConvert: string) => {
  return labelValueMap.get(labelToConvert) || labelToConvert;
};

export const convertValueToLabel = (valueToConvert: string | null) => {
  const label = Array.from(labelValueMap.entries()).find(
    ([, value]) => value === valueToConvert,
  )?.[0];
  return label || valueToConvert;
};
