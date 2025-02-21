import { API } from './config';
import { ParticipantResponse, ResearcherResponse } from './login';

import { API_URL } from '@/constants/url';
import { ParticipantUpdateSchemaType } from '@/schema/profile/ParticipantUpdateSchema';
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
  reason: string | null;
}

export const updateParticipantInfo = async (params: ParticipantUpdateSchemaType) => {
  const res = await API.put<ParticipantResponse>(API_URL.me('participant'), { ...params });

  return res.data;
};

export const updateResearcherInfo = async (params: ResearcherUpdateSchemaType) => {
  const res = await API.put<ResearcherResponse>(API_URL.me('researcher'), { ...params });

  return res.data;
};

export const validateContactEmail = async ({ contactEmail }: ValidateContactEmailParams) => {
  const res = await API.get(API_URL.validateContactEmail(contactEmail));

  return res.data;
};

export const leaveUser = async ({ reasonType, reason }: LeaveUserParams) => {
  return await API.delete<ResearcherResponse>(API_URL.leave, { data: { reasonType, reason } });
};
