import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { DateRange } from 'react-day-picker';

import { UPLOAD_REGION } from '@/constants/uploadRegion';

// date 포맷 변환
const formatRange = (range: DateRange) => {
  return {
    from: range.from ? format(range.from, 'yyyy-MM-dd', { locale: ko }) : null,
    to: range.to ? format(range.to, 'yyyy-MM-dd', { locale: ko }) : null,
  };
};

// region value -> label 변환
const labelValueMap = new Map();

function initializeLabelValueMap() {
  UPLOAD_REGION.forEach((region) => {
    labelValueMap.set(region.label, region.value);
    region.children?.forEach((child) => {
      labelValueMap.set(child.label, child.value);
    });
  });
}

initializeLabelValueMap();

function convertLabelToValue(labelToConvert: string): string {
  return labelValueMap.get(labelToConvert) || labelToConvert;
}

export { formatRange, convertLabelToValue };
