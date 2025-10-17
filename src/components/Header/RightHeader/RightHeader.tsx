import Link from 'next/link';
import { getServerSession } from 'next-auth';

import { buttonContainer, loginButton } from '../Header.css';
import DesktopLoginHeader from './components/DesktopLoginHeader/DesktopLoginHeader';
import MobileLoginHeader from './components/MobileLoginHeader/MobileLoginHeader';

import { createSSRFetchClient } from '@/apis/config/fetchClient';
import { ParticipantResponse, ResearcherResponse } from '@/apis/login';
import { ROLE } from '@/constants/config';
import { API_URL } from '@/constants/url';
import { authOptions, isUnauthorizedUser } from '@/lib/auth-utils';

const RightHeader = async () => {
  const session = await getServerSession(authOptions);
  const fetchClient = createSSRFetchClient(session?.accessToken);

  if (!session || !session.role || isUnauthorizedUser(session)) {
    return (
      <Link href="/login" className={loginButton}>
        로그인
      </Link>
    );
  }

  const userInfo = await fetchClient.get<ParticipantResponse | ResearcherResponse>(
    API_URL.me(session.role.toLowerCase()),
  );

  const isResearcher = !isUnauthorizedUser(session) && session?.role === ROLE.researcher;

  return (
    <div className={buttonContainer}>
      <DesktopLoginHeader userInfo={userInfo} />
      <MobileLoginHeader isResearcher={isResearcher} />
    </div>
  );
};

export default RightHeader;
