import { MatchType } from '@/types/filter';

export const getMatchTypeText = (matchType: MatchType): string => {
  const matchTypeMap: Record<MatchType, string> = {
    OFFLINE: '대면',
    ONLINE: '비대면',
    ALL: '대면+비대면',
  };

  return matchTypeMap[matchType];
};
