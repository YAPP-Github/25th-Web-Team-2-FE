import { ParticipantResponse, ResearcherResponse } from '@/apis/login';

export const isParticipantInfo = (
  data?: ParticipantResponse | ResearcherResponse,
): data is ParticipantResponse => {
  return !!data && 'matchType' in data;
};

export const isResearcherInfo = (
  data?: ParticipantResponse | ResearcherResponse,
): data is ResearcherResponse => {
  return !!data && 'univEmail' in data;
};
