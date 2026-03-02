import { MATCH_TYPE } from '@constants/filters';

export const getMatchTypeLabel = (matchType?: string) => {
  if (matchType === MATCH_TYPE.ALL) {
    return '전체';
  }
  if (matchType === MATCH_TYPE.OFFLINE) {
    return '대면';
  }
  if (matchType === MATCH_TYPE.ONLINE) {
    return '비대면';
  }
  return '진행 방식';
};
