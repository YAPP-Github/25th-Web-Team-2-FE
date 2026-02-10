import 'server-only';

import { getServerSession } from 'next-auth';

import { createSSRFetchClient } from '@/apis/config/fetchClient';
import { ParticipantResponse } from '@/apis/login';
import { ROLE } from '@/constants/config';
import { API_URL } from '@/constants/url';
import { authOptions } from '@/lib/auth-utils';
import { isUnauthorizedUser } from '@/lib/auth-utils';

export const fetchParticipantInfo = async () => {
  const session = await getServerSession(authOptions);
  const fetchClient = createSSRFetchClient(session?.accessToken);

  const participantInfo =
    !isUnauthorizedUser(session) && session?.role === ROLE.participant
      ? await fetchClient.get<ParticipantResponse>(API_URL.me(ROLE.participant.toLowerCase()))
      : null;

  return participantInfo;
};
