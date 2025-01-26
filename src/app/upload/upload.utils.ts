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

// area label을 value로 변환하는 함수
function convertLabelToValue(labelToConvert: string): string {
  for (const region of UPLOAD_REGION) {
    if (region.label === labelToConvert) {
      return region.value;
    }

    for (const child of region.children || []) {
      if (child.label === labelToConvert) {
        return child.value;
      }
    }
  }

  return labelToConvert;
}

export { formatRange, convertLabelToValue };
