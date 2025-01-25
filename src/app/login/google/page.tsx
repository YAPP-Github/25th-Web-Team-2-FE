'use client';

import { useSearchParams } from 'next/navigation';
import React, { useEffect, useRef } from 'react';

import { emptyLayout } from './GoogleLoginPage.styles';
import useGoogleLoginMutation from '../hooks/useGoogleLoginMutation';

export default function GoogleLoginPage() {
  const { mutate: googleLogin } = useGoogleLoginMutation();
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const role = searchParams.get('state');
  const isSubmitted = useRef(false);

  useEffect(() => {
    if (isSubmitted.current) return;

    if (code && role) {
      sessionStorage.setItem('role', role);
      googleLogin({ code: encodeURIComponent(code), role });
      isSubmitted.current = true;
    }
  }, [code, role, googleLogin]);

  return <div css={emptyLayout}></div>;
}
