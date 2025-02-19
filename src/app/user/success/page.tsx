'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect } from 'react';

import {
  homeLink,
  image,
  leaveSuccessLayout,
  leaveTitleContainer,
  subTitle,
  title,
} from './success.css';

import JoinSuccess from '@/assets/images/joinSuccess.svg';
import Logo from '@/assets/images/logo.svg';
import useSessionStorage from '@/hooks/useSessionStorage';

const LeaveSuccessPage = () => {
  const { clear } = useSessionStorage();

  useEffect(() => {
    clear();
  }, []);

  return (
    <div className={leaveSuccessLayout}>
      <div className={leaveTitleContainer}>
        <div>
          <Link href="/">
            <Image src={Logo} alt="로고" className={image} />
          </Link>
          <h2 className={title}>회원 탈퇴가 완료되었어요</h2>
          <h3 className={subTitle}>그라밋이 필요할 때 언제든 다시 찾아주세요</h3>
        </div>
        <Image src={JoinSuccess} alt="회원가입 성공" width={160} height={140} className={image} />
      </div>
      <Link href="/" className={homeLink}>
        홈 화면으로 돌아가기
      </Link>
    </div>
  );
};

export default LeaveSuccessPage;
