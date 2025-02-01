'use client';

import Image from 'next/image';

import ParticipantForm from './components/Participant/ParticipantForm';
import ResearcherForm from './components/Researcher/ResearcherForm';
import useFunnel from './hooks/useFunnel';
import {
  contentContainer,
  joinLayout,
  joinTitle,
  progressBarContainer,
  progressBarFill,
  titleContainer,
} from './JoinPage.styles';

import Logo from '@/assets/images/logo.svg';
import { ROLE } from '@/constants/config';
import useSessionStorage from '@/hooks/useSessionStorage';
import { STEP } from './JoinPage.constants';

export default function JoinPage() {
  const role = useSessionStorage('role');
  const { step } = useFunnel(['email', 'info', 'success'] as const);

  // TODO: 추후 스켈레톤 처리
  if (!role) return null;

  return (
    <section css={joinLayout}>
      <Image src={Logo} alt="로고" width={80} height={28} />
      <div css={contentContainer}>
        <div css={titleContainer}>
          <h2 css={joinTitle}>
            {role === ROLE.researcher ? '연구자 회원가입' : '참여자 회원가입'}
          </h2>
          <div css={progressBarContainer}>
            <div css={progressBarFill} style={{ width: step === STEP.email ? '50%' : '100%' }} />
          </div>
        </div>
        {role === ROLE.researcher ? <ResearcherForm /> : <ParticipantForm />}
      </div>
    </section>
  );
}
