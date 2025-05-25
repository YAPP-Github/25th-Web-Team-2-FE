'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Spinner from '@/components/Spinner/Spinner';
import { loginRedirectLayout } from './LoginPage.css';
import { getDeviceType } from '@/utils/deviceType';

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    const deviceType = getDeviceType();
    router.replace(`/login/${deviceType}`);
  }, [router]);

  return (
    <div className={loginRedirectLayout}>
      <Spinner />
      <span>로그인 페이지로 이동 중...</span>
    </div>
  );
}
