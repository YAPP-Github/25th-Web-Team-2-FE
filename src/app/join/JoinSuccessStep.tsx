'use client';

import { css, Theme } from '@emotion/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

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

const joinSuccessLayout = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3.2rem;
  height: calc(100vh - 12.2rem);
`;

const title = (theme: Theme) => css`
  ${theme.fonts.title.large.SB24};
  color: ${theme.colors.text06};
`;

const image = css`
  margin: 3.2rem 0;
`;

const homeLink = (theme: Theme) => css`
  ${theme.fonts.body.normal.SB16};
  background-color: ${theme.colors.primaryMint};
  color: ${theme.colors.text01};
  border-radius: 1.2rem;
  padding: 1.2rem 3.35rem;
  margin-top: 2.6rem;
`;
