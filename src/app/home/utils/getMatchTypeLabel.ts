export const getMatchTypeLabel = (matchType?: string) => {
  if (matchType === 'ALL') {
    return '전체';
  }
  if (matchType === 'OFFLINE') {
    return '대면';
  }
  if (matchType === 'ONLINE') {
    return '비대면';
  }
  return '진행 방식';
};
