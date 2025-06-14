import { fetchClient } from './config/fetchClient';
import { ParticipantResponse, ResearcherResponse } from './login';

import { ROLE } from '@/constants/config';
import { API_URL } from '@/constants/url';
import { ParticipantUpdateSubmitSchemaType } from '@/schema/profile/ParticipantUpdateSchema';
import { ResearcherUpdateSchemaType } from '@/schema/profile/ResearcherUpdateSchema';

export type ReasonType =
  | `RESEARCH_STOPPED`
  | `SECURITY_CONCERN`
  | `NO_NECESSARY_FUNCTION`
  | `TOO_MANY_EMAILS`
  | `INCONVENIENT_SITE`
  | `OTHER`;

export interface ValidateContactEmailParams {
  contactEmail: string;
}

export interface LeaveUserParams {
  reasonType: ReasonType;
  reason?: string;
}

export const getResearcherInfo = async () => {
  return await fetchClient.get<ResearcherResponse>(API_URL.me(ROLE.researcher.toLowerCase()));
};

export const getParticipantInfo = async () => {
  return await fetchClient.get<ParticipantResponse>(API_URL.me(ROLE.participant.toLowerCase()));
};

export const updateParticipantInfo = async (params: ParticipantUpdateSubmitSchemaType) => {
  return await fetchClient.put<ParticipantResponse>(API_URL.me(ROLE.participant.toLowerCase()), {
    body: params,
  });
};

export const updateResearcherInfo = async (params: ResearcherUpdateSchemaType) => {
  return await fetchClient.put<ResearcherResponse>(API_URL.me(ROLE.researcher.toLowerCase()), {
    body: params,
  });
};

export const validateContactEmail = async ({ contactEmail }: ValidateContactEmailParams) => {
  return await fetchClient.get(API_URL.validateContactEmail(contactEmail));
};

export const leaveUser = async ({ reasonType, reason }: LeaveUserParams) => {
  return await fetchClient.delete<ResearcherResponse>(API_URL.leave, {
    body: { reasonType, reason },
  });
};
