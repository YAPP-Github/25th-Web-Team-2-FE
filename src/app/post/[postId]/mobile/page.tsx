import { notFound } from 'next/navigation';
import { getServerSession } from 'next-auth';

import { UseApplyMethodQueryResponse } from '../hooks/useApplyMethodQuery';
import { UseQueryExperimentDetailsAPIResponse } from '../hooks/useExperimentDetailsQuery';
import ExperimentPostMobileContainer from './components/ExperimentPostMobileContainer/ExperimentPostMobileContainer';

import { createSSRFetchClient } from '@/apis/config/fetchClient';
import { API_URL } from '@/constants/url';
import { authOptions } from '@/lib/auth-utils';

interface MobilePageProps {
  params: { postId: string };
}

export default async function ExperimentDetailPostMobilePage({ params }: MobilePageProps) {
  const { postId } = params;

  const session = await getServerSession(authOptions);
  const accessToken = session?.accessToken;
  const fetchClient = createSSRFetchClient(accessToken);

  const [postDetailResult, applyMethodResult] = await Promise.allSettled([
    fetchClient.post<UseQueryExperimentDetailsAPIResponse>(API_URL.viewExperimentDetails(postId), {
      next: { tags: [`experiment-post-${postId}`] },
    }),
    fetchClient.get<UseApplyMethodQueryResponse>(API_URL.applyMethod(postId), {
      requireAuth: false,
      next: { tags: [`experiment-post-${postId}-method`] },
    }),
  ]);

  if (
    postDetailResult.status === 'rejected' &&
    (postDetailResult.reason?.status === 404 || postDetailResult.reason?.code === 'EP0001')
  ) {
    return notFound();
  }

  if (postDetailResult.status === 'rejected' || applyMethodResult.status === 'rejected') {
    throw new Error('공고 요청 실패');
  }

  return (
    <ExperimentPostMobileContainer
      postId={postId}
      postDetailData={postDetailResult.value}
      applyMethodData={applyMethodResult.value}
    />
  );
}
