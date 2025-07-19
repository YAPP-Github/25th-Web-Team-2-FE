import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import MobileProfileHeader from './components/MobileProfileHeader/MobileProfileHeader';
import MobileProfileSection from './components/MobileProfileSection/MobileProfileSection';
import MobileUserInfoSection from './components/MobileUserInfoSection/MobileUserInfoSection';

import { createSSRFetchClient } from '@/apis/config/fetchClient';
import { ParticipantResponse, ResearcherResponse } from '@/apis/login';
import { PATH } from '@/constants/path';
import { API_URL } from '@/constants/url';
import { authOptions } from '@/lib/auth-utils';
import { isParticipantInfo } from '@/utils/typeGuard';

const getUserInfo = async (role?: string, accessToken?: string) => {
  if (!role || !accessToken) {
    return null;
  }

  try {
    const fetchClient = createSSRFetchClient(accessToken);
    const response = await fetchClient.get<ParticipantResponse | ResearcherResponse>(
      API_URL.me(role.toLowerCase()),
    );

    return response;
  } catch (_) {
    return null;
  }
};

const MobileProfilePage = async () => {
  const session = await getServerSession(authOptions);
  const userInfo = await getUserInfo(session?.role, session?.accessToken);

  if (userInfo === null) {
    redirect(PATH.login);
  }

  if (isParticipantInfo(userInfo)) {
    return (
      <>
        <MobileProfileHeader />
        <MobileUserInfoSection userInfo={userInfo} />
        <MobileProfileSection userInfo={userInfo} />
      </>
    );
  }
};

export default MobileProfilePage;
