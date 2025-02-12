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

// label -> value
const convertLabelToValue = (labelToConvert: string): string => {
  return labelValueMap.get(labelToConvert) || labelToConvert;
};

const convertValueToLabel = (valueToConvert: string | null): string => {
  const label = Array.from(labelValueMap.entries()).find(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ([_, value]) => value === valueToConvert,
  )?.[0];
  return label || valueToConvert;
};

// 업로드된 이미지 경로 변경
const convertToWebpUrl = (originalUrl: string) => {
  return originalUrl
    .replace('/images/', '/resized-images/') // 폴더 변경
    .replace(/\.\w+$/, '.webp'); // 확장자 변경 (jpg, png → webp)
};

export { formatRange, convertLabelToValue, convertValueToLabel, convertToWebpUrl };
