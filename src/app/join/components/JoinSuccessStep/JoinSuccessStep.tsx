import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import {
  homeLink,
  image,
  joinSuccessLayout,
  joinTitleContainer,
  title,
} from './JoinSuccessStep.css';

import JoinSuccess from '@/assets/images/joinSuccess.svg';

interface JoinSuccessStepProps {
  name: string;
}

const JoinSuccessStep = ({ name }: JoinSuccessStepProps) => {
  return (
    <div className={joinSuccessLayout}>
      <div className={joinTitleContainer}>
        <div>
          <h2 className={title}>{name} 님,</h2>
          <h2 className={title}>그라밋 가입을 환영해요!</h2>
        </div>
        <Image src={JoinSuccess} alt="회원가입 성공" width={160} height={140} className={image} />
      </div>
      <Link href="/" className={homeLink}>
        홈 화면으로 돌아가기
      </Link>
    </div>
  );
};

export default JoinSuccessStep;
