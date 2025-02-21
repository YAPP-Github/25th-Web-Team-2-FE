'use client';

import { useSearchParams } from 'next/navigation';
import React, { useEffect, useRef } from 'react';

import { emptyLayout } from './GoogleLoginPage.css';
import useGoogleLoginMutation from '../hooks/useGoogleLoginMutation';

export default function GoogleLoginPage() {
  const { mutate: googleLogin } = useGoogleLoginMutation();
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const state = searchParams.get('state');

  const isSubmitted = useRef(false);

  useEffect(() => {
    if (isSubmitted.current) return;

    if (code && state) {
      const [role, provider] = state.split('|');
      sessionStorage.setItem('role', role);
      sessionStorage.setItem('provider', provider);
      googleLogin({ code: encodeURIComponent(code), role });
      isSubmitted.current = true;
    }
  }, [code, state, googleLogin]);

  return <div className={emptyLayout}></div>;
}
