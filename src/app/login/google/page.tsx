'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useRef } from 'react';

import { emptyLayout } from './GoogleLoginPage.css';
import useGoogleLoginMutation from '../hooks/useGoogleLoginMutation';

export default function GoogleLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const isSubmitted = useRef(false);

  const { mutate: googleLogin } = useGoogleLoginMutation({
    onSuccessLogin: () => {
      router.push('/');
    },
    onSuccessJoin: (oauthEmail: string) => {
      if (state) {
        const [role, provider] = state.split('|');
        sessionStorage.setItem('email', oauthEmail);
        sessionStorage.setItem('role', role);
        sessionStorage.setItem('provider', provider);
        router.push('/join');
      }
    },
    onError: () => {
      router.push('/login');
    },
  });

  useEffect(() => {
    if (isSubmitted.current) return;

    if (code && state) {
      const [role, _] = state.split('|');
      googleLogin({ code: encodeURIComponent(code), role });
      isSubmitted.current = true;
    }
  }, [code, state, googleLogin]);

  return <div className={emptyLayout}></div>;
}
