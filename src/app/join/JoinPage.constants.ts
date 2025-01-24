import { FilterOption } from './JoinPage.types';

import { UPLOAD_REGION } from '@/constants/uploadRegion';

export const JOIN_REGION = [
  { label: '서울특별시', value: 'SEOUL' },
  { label: '부산광역시', value: 'BUSAN' },
  { label: '인천광역시', value: 'INCHEON' },
  { label: '대구광역시', value: 'DAEGU' },
  { label: '광주광역시', value: 'GWANGJU' },
  { label: '대전광역시', value: 'DAEJEON' },
  { label: '울산광역시', value: 'ULSAN' },
  { label: '세종특별자치시', value: 'SEJONG' },
  { label: '경기도', value: 'GYEONGGI' },
  { label: '강원도', value: 'GANGWON' },
  { label: '충청북도', value: 'CHUNGBUK' },
  { label: '충청남도', value: 'CHUNGNAM' },
  { label: '전라북도', value: 'JEONBUK' },
  { label: '전라남도', value: 'JEONNAM' },
  { label: '경상북도', value: 'GYEONGBUK' },
  { label: '경상남도', value: 'GYEONGNAM' },
  { label: '제주특별자치도', value: 'JEJU' },
];

export const JOIN_SUB_REGION = JOIN_REGION.reduce(
  (acc: Record<string, Array<FilterOption>>, region) => {
    const subRegion = UPLOAD_REGION.find((item) => item.value === region.value);

    if (subRegion) {
      acc[region.value] = subRegion.children.map((child) => ({
        value: child.value,
        label: child.label,
      }));
    }

    return acc;
  },
  {},
);
