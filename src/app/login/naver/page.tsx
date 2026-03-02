'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';

import { joinWithCredentials } from '@lib/auth-utils';

import { emptyLayout } from './NaverLoginPage.css';
import useNaverLoginMutation from '../hooks/useNaverLoginMutation';


export default function NaverLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const stateParams = searchParams.get('state');
  const isSubmitted = useRef(false);

  const { mutate: naverLogin } = useNaverLoginMutation({
    onSuccessLogin: () => {
      router.replace('/');
    },
    onSuccessJoin: async (oauthEmail: string) => {
      if (stateParams) {
        const [_, role, provider] = stateParams.split('|');

        await joinWithCredentials({
          oauthEmail,
          role,
          provider,
        });

        router.replace('/join');
      }
    },
    onError: () => {
      router.replace('/login');
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
