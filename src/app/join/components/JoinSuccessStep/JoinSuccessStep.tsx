import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import {
  homeLink,
  image,
  joinContentContainer,
  joinSuccessLayout,
  joinTitleContainer,
  title,
} from './JoinSuccessStep.css';

import useUserInfo from '@/app/home/hooks/useUserInfo';
import JoinSuccess from '@/assets/images/joinSuccess.svg';
import Logo from '@/assets/images/logo.svg';

const JoinSuccessStep = () => {
  const { userInfo } = useUserInfo();

  return (
    <div className={joinSuccessLayout}>
      <div className={joinContentContainer}>
        <Image src={Logo} alt="로고" />
        <div className={joinTitleContainer}>
          <div>
            <h2 className={title}>{userInfo?.memberInfo.name} 님,</h2>
            <h2 className={title}>그라밋 가입을 환영해요!</h2>
          </div>
          <Image src={JoinSuccess} alt="회원가입 성공" width={160} height={140} className={image} />
        </div>
      </div>
      <Link href="/" className={homeLink}>
        홈 화면으로 돌아가기
      </Link>
    </div>
  );
};

export default JoinSuccessStep;
