import { API } from './config';
import { ParticipantResponse } from './login';

import { API_URL } from '@/constants/url';
import { ParticipantUpdateSchemaType } from '@/schema/profile/ParticipantUpdateSchema';

export const updateParticipantInfo = async (params: ParticipantUpdateSchemaType) => {
  const res = await API.put<ParticipantResponse>(API_URL.me('participant'), { ...params });

  return res.data;
};
