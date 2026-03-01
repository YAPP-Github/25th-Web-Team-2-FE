export const getMatchTypeText = (matchType: 'OFFLINE' | 'ONLINE' | 'ALL'): string => {
  const matchTypeMap: Record<'OFFLINE' | 'ONLINE' | 'ALL', string> = {
    OFFLINE: '대면',
    ONLINE: '비대면',
    ALL: '대면+비대면',
  };

  return matchTypeMap[matchType];
};
