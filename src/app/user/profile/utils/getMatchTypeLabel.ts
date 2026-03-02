import type { ParticipantResponse } from '@apis/login';

import { MATCH_TYPE_MAP } from '../constants/matchTypeMap';


export const getMatchTypeLabel = (matchType: ParticipantResponse['matchType']) => {
  if (matchType === null) return '-';

  return MATCH_TYPE_MAP[matchType];
};
