'use client';

import { assignInlineVars } from '@vanilla-extract/dynamic';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

import ParticipantForm from './components/Participant/ParticipantForm';
import ResearcherForm from './components/Researcher/ResearcherForm';
import useFunnel from './hooks/useFunnel';
import { STEP } from './JoinPage.constants';
import {
  contentContainer,
  joinLayout,
  joinTitle,
  progressBarContainer,
  progressBarFill,
  titleContainer,
} from './JoinPage.css';

import Logo from '@/assets/images/logo.svg';
import ConfirmModal from '@/components/Modal/ConfirmModal/ConfirmModal';
import { ROLE } from '@/constants/config';
import useLeaveConfirmModal from '@/hooks/useLeaveConfirmModal';

export default function JoinPage() {
  const { data: session } = useSession();
  const role = session?.role;

  const { step } = useFunnel(['email', 'info', 'success'] as const);

  const [joinFormDirty, setJoinFormDirty] = useState(false);
  const { isLeaveConfirmModalOpen, handleBackClick, handleConfirmLeave, handleCancelLeave } =
    useLeaveConfirmModal({ isUserInputDirty: joinFormDirty, isHomePath: true });

  // TODO: 추후 스켈레톤 처리
  if (!role) return null;

  if (step === STEP.success) {
    return (
      <section className={joinLayout}>
        <div className={contentContainer}>
          {role === ROLE.researcher ? (
            <ResearcherForm onDirtyChange={setJoinFormDirty} />
          ) : (
            <ParticipantForm onDirtyChange={setJoinFormDirty} />
          )}
        </div>
      </section>
    );
  }

  return (
    <section className={joinLayout}>
      <button onClick={handleBackClick} aria-label="홈 화면으로 이동">
        <Image src={Logo} alt="로고" />
      </button>
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
        {role === ROLE.researcher ? (
          <ResearcherForm onDirtyChange={setJoinFormDirty} />
        ) : (
          <ParticipantForm onDirtyChange={setJoinFormDirty} />
        )}
      </div>

      {/* 회원가입 중 홈 이동 시 확인 모달 */}
      <ConfirmModal
        isOpen={isLeaveConfirmModalOpen}
        onOpenChange={(open) => {
          if (!open) {
            handleCancelLeave();
          }
        }}
        confirmTitle="페이지에서 나가시겠어요?"
        descriptionText="입력한 내용은 따로 저장되지 않아요"
        cancelText="취소"
        confirmText="나가기"
        onConfirm={handleConfirmLeave}
      />
    </section>
  );
}
