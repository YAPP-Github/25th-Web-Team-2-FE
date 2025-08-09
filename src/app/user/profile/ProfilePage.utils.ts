import { MATCH_TYPE_MAP } from './ProfilePage.constants';

import type { ParticipantResponse } from '@/apis/login';

export const getMatchTypeLabel = (matchType: ParticipantResponse['matchType']) => {
  if (matchType === null) return '-';

  return MATCH_TYPE_MAP[matchType];
};
