'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';

import { emptyLayout } from './NaverLoginPage.css';
import useNaverLoginMutation from '../hooks/useNaverLoginMutation';

import { joinWithCredentials } from '@/lib/auth-utils';

export default function NaverLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const stateParams = searchParams.get('state');
  const isSubmitted = useRef(false);

  const { mutate: naverLogin } = useNaverLoginMutation({
    onSuccessLogin: () => {
      router.push('/');
    },
    onSuccessJoin: async (oauthEmail: string) => {
      if (stateParams) {
        const [_, role, provider] = stateParams.split('|');

        await joinWithCredentials({
          oauthEmail,
          role,
          provider,
        });

        router.push('/join');
      }
    },
    onError: () => {
      router.push('/login');
    },
  });

  useEffect(() => {
    if (isSubmitted.current) return;

    if (code && stateParams) {
      const [state, role, _] = stateParams.split('|');
      naverLogin({ code: encodeURIComponent(code), role, state: encodeURIComponent(state) });
      isSubmitted.current = true;
    }
  }, [code, stateParams, naverLogin]);

  return <div className={emptyLayout}></div>;
}
