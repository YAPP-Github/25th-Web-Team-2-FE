'use client';

import { useSearchParams } from 'next/navigation';
import React, { useEffect, useRef } from 'react';

import { emptyLayout } from './NaverLoginPage.styles';
import useNaverLoginMutation from '../hooks/useNaverLoginMutation';

export default function NaverLoginPage() {
  const { mutate: naverLogin } = useNaverLoginMutation();
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const stateParams = searchParams.get('state');
  const isSubmitted = useRef(false);

  useEffect(() => {
    if (isSubmitted.current) return;

    if (code && stateParams) {
      const [state, role] = stateParams.split('|');
      naverLogin({ code: encodeURIComponent(code), role, state: encodeURIComponent(state) });
      isSubmitted.current = true;
    }
  }, [code, stateParams, naverLogin]);

  return <div css={emptyLayout}></div>;
}
