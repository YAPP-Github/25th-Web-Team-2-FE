import { ParticipantResponse, ResearcherResponse } from '@apis/login';
import { isParticipantInfo } from '@utils/typeGuard';

export const filterParticipantInfo = (data?: ParticipantResponse | ResearcherResponse) => {
  if (data && isParticipantInfo(data)) {
    return data;
  }

  return null;
};
