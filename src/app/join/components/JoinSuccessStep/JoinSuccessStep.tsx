import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { homeLink, image, joinSuccessLayout, title } from './JoinSuccessStep.styles';

import JoinSuccess from '@/assets/images/joinSuccess.svg';

interface JoinSuccessStepProps {
  name: string;
}

const JoinSuccessStep = ({ name }: JoinSuccessStepProps) => {
  return (
    <div css={joinSuccessLayout}>
      <div>
        <h2 css={title}>{name} 님,</h2>
        <h2 css={title}>그라밋 가입을 환영해요!</h2>
      </div>
      <Image src={JoinSuccess} alt="회원가입 성공" width={160} height={140} css={image} />
      <Link href="/" css={homeLink}>
        홈 화면으로 돌아가기
      </Link>
    </div>
  );
};

export default JoinSuccessStep;
