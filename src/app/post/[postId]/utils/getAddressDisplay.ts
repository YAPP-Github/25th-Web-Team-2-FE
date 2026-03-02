import { MATCH_TYPE } from '@constants/filters';

import { getAreaLabel } from './getAreaLabel';
import { getRegionLabel } from './getRegionLabel';


export const getAddressDisplay = (
  matchType: string,
  address: {
    region: string | null;
    area: string | null;
    isOnCampus: boolean;
    place: string | null;
    detailedAddress: string | null;
  },
) => {
  if (matchType === MATCH_TYPE.ONLINE) return '본문 참고';

  if (!address.region || !address.area) return '본문 참고';

  const baseAddress = `${getRegionLabel(address.region)} ${getAreaLabel(
    address.region,
    address.area,
  )}`;

  if (address.isOnCampus) {
    const parts = [baseAddress, address.place, address.detailedAddress].filter(Boolean);
    return parts.join(' ');
  }

  const parts = [baseAddress, address.detailedAddress].filter(Boolean);
  return parts.join(' ');
};
