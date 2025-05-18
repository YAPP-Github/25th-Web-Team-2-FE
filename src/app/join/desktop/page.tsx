'use client';

import { assignInlineVars } from '@vanilla-extract/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

import ParticipantForm from './Participant/ParticipantForm';
import ResearcherForm from './Researcher/ResearcherForm';
import useFunnel from '../hooks/useFunnel';
import { STEP } from '../JoinPage.constants';
import {
  contentContainer,
  joinLayout,
  joinTitle,
  progressBarContainer,
  progressBarFill,
  titleContainer,
} from '../JoinPage.css';

import Logo from '@/assets/images/logo.svg';
import { ROLE } from '@/constants/config';

export default function JoinPage() {
  const { data: session } = useSession();
  const role = session?.role;

  const { step } = useFunnel(['email', 'info', 'success'] as const);

  // TODO: 추후 스켈레톤 처리
  if (!role) return null;

  if (step === STEP.success) {
    return (
      <section className={joinLayout}>
        <div className={contentContainer}>
          {role === ROLE.researcher ? <ResearcherForm /> : <ParticipantForm />}
        </div>
      </section>
    );
  }

  return (
    <section className={joinLayout}>
      <Link href="/" aria-label="홈 화면으로 이동">
        <Image src={Logo} alt="로고" />
      </Link>
      <div className={contentContainer}>
        <div className={titleContainer}>
          <h2 className={joinTitle}>
            {role === ROLE.researcher ? '연구자 회원가입' : '참여자 회원가입'}
          </h2>
          <div className={progressBarContainer}>
            <div
              className={progressBarFill}
              style={assignInlineVars({
                '--progress-width': step === STEP.email ? '50%' : '100%',
              })}
            />
          </div>
        </div>
        {role === ROLE.researcher ? <ResearcherForm /> : <ParticipantForm />}
      </div>
    </section>
  );
}
