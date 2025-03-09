'use client';

import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import LoginCard from './components/LoginCard/LoginCard';
import {
  loginPageLayout,
  sloganContainer,
  sloganWrapper,
  loginCardContainer,
} from './LoginPage.css';
import EmailToast from '../join/components/EmailToast/EmailToast';

import Logo from '@/assets/images/logo.svg';

export default function LoginPage() {
  const queryClient = useQueryClient();

  const [errorMessage, setErrorMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);

  useEffect(() => {
    const storedErrorMessage = queryClient.getQueryData<string>(['loginError']);

    if (storedErrorMessage) {
      setErrorMessage(storedErrorMessage);
      setIsOpen(true);
      queryClient.removeQueries({ queryKey: ['loginError'] });
    }
  }, [queryClient]);

  return (
    <>
      <div className={loginPageLayout}>
        <div className={sloganContainer}>
          <Link href="/" aria-label="홈 화면으로 이동">
            <Image src={Logo} alt="로고" />
          </Link>
          <div className={sloganWrapper}>
            <span>작은 연결로 시작되는 큰 발견</span>
            <br />
            <span>그라밋이 도울게요</span>
          </div>
        </div>
        <div className={loginCardContainer}>
          <LoginCard
            role="연구자"
            description={['그라밋에서 손쉽게', '연구 참여자를 모아보세요']}
          />
          <LoginCard role="참여자" description={['정보를 등록하면', '딱 맞는 실험을 찾아드려요']} />
        </div>
      </div>
      {isOpen && (
        <EmailToast title={errorMessage} isToastOpen={isOpen} setIsToastOpen={close} isError />
      )}
    </>
  );
}
