import 'server-only';

import { notFound } from 'next/navigation';
import { getServerSession } from 'next-auth';

import type { UseApplyMethodQueryResponse } from '../hooks/useApplyMethodQuery';
import type { UseQueryExperimentDetailsAPIResponse } from '../hooks/useExperimentDetailsQuery';

import { createSSRFetchClient } from '@/apis/config/fetchClient';
import { API_URL } from '@/constants/url';
import { authOptions } from '@/lib/auth-utils';

interface ApiError {
  status?: number;
  code?: string;
  message?: string;
  response?: { status?: number; data?: { code?: string; message?: string } };
}

const REVALIDATE_TAGS = {
  post: (id: string) => `experiment-post-${id}`,
  method: (id: string) => `experiment-post-${id}-method`,
};

type FetchResult = {
  postDetailData: UseQueryExperimentDetailsAPIResponse;
  applyMethodData: UseApplyMethodQueryResponse;
};

function extractStatusAndCode(error: ApiError | undefined): { status?: number; code?: string } {
  const status = error?.status ?? error?.response?.status;
  const code = error?.code ?? error?.response?.data?.code;
  return { status, code };
}

function isNotFoundError(error: ApiError): boolean {
  const { status, code } = extractStatusAndCode(error);
  return status === 404 || code === 'EP0001';
}

export async function fetchExperimentPost(postId: string): Promise<FetchResult> {
  const session = await getServerSession(authOptions);
  const accessToken = session?.accessToken;
  const fetchClient = createSSRFetchClient(accessToken);

  const [postDetailResult, applyMethodResult]: [
    PromiseSettledResult<UseQueryExperimentDetailsAPIResponse>,
    PromiseSettledResult<UseApplyMethodQueryResponse>,
  ] = await Promise.allSettled([
    fetchClient.post<UseQueryExperimentDetailsAPIResponse>(API_URL.viewExperimentDetails(postId), {
      next: { tags: [REVALIDATE_TAGS.post(postId)] },
    }),
    fetchClient.get<UseApplyMethodQueryResponse>(API_URL.applyMethod(postId), {
      requireAuth: false,
      next: { tags: [REVALIDATE_TAGS.method(postId)] },
    }),
  ]);

  // 해당 postId 공고가 없을 때
  if (postDetailResult.status === 'rejected' && isNotFoundError(postDetailResult.reason)) {
    notFound();
  }

  // 나머지 실패
  if (postDetailResult.status === 'rejected' || applyMethodResult.status === 'rejected') {
    throw new Error('공고 요청 실패');
  }

  return {
    postDetailData: postDetailResult.value,
    applyMethodData: applyMethodResult.value,
  };
}
