'use client';

import { useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';

import { emptyLayout } from './GoogleLoginPage.styles';
import useGoogleLoginMutation from '../hooks/useGoogleLoginMutation';

export default function GoogleLoginPage() {
  const { mutate: googleLogin } = useGoogleLoginMutation();
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const role = searchParams.get('state');

  useEffect(() => {
    if (code && role) {
      googleLogin({ code: encodeURIComponent(code), role });
    }
  }, [code, role, googleLogin]);

  return <div css={emptyLayout}></div>;
}
