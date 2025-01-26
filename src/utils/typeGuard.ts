import { ParticipantResponse, ResearcherResponse } from '@/apis/login';

export const isParticipantInfo = (
  data: ParticipantResponse | ResearcherResponse,
): data is ParticipantResponse => {
  return 'matchType' in data;
};

export const isResearcherInfo = (
  data: ParticipantResponse | ResearcherResponse,
): data is ResearcherResponse => {
  return 'univEmail' in data;
};
