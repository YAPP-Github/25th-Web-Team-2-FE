import { API } from './config';
import { ParticipantResponse, ResearcherResponse } from './login';

import { API_URL } from '@/constants/url';
import { ParticipantUpdateSchemaType } from '@/schema/profile/ParticipantUpdateSchema';
import { ResearcherUpdateSchemaType } from '@/schema/profile/ResearcherUpdateSchema';

export const updateParticipantInfo = async (params: ParticipantUpdateSchemaType) => {
  const res = await API.put<ParticipantResponse>(API_URL.me('participant'), { ...params });

  return res.data;
};

export const updateResearcherInfo = async (params: ResearcherUpdateSchemaType) => {
  const res = await API.put<ResearcherResponse>(API_URL.me('researcher'), { ...params });

  return res.data;
};
