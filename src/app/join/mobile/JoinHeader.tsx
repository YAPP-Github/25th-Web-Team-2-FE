import { assignInlineVars } from '@vanilla-extract/dynamic';
import React from 'react';

import { headerTitle, headerWrapper, progressBar } from './page.css';
import useFunnel from '../hooks/useFunnel';
import { progressBarFill } from '../JoinPage.css';

import Icon from '@/components/Icon';
import { ROLE } from '@/constants/config';
import { colors } from '@/styles/colors';
import { Role } from '@/types/user';
import { MOBILE_JOIN_STEP_LIST } from '../JoinPage.constants';

const headerTitleMap = {
  [ROLE.researcher]: '연구자 회원가입',
  [ROLE.participant]: '참여자 회원가입',
} as const;

const JoinHeader = ({ role }: { role?: Role }) => {
  const { steps, currentStepIdx } = useFunnel(MOBILE_JOIN_STEP_LIST);

  const progressPercentage =
    currentStepIdx + 1 === steps.length
      ? '100%'
      : `${((currentStepIdx + 1) / steps.length - 1) * 100}%`;

  if (!role) {
    return null;
  }

  return (
    <>
      <header className={headerWrapper}>
        <Icon icon="Arrow" width={20} height={20} color={colors.text06} />
        <h1 className={headerTitle}>{headerTitleMap[role]}</h1>
      </header>

      {/* 프로그래스 바 */}
      <div className={progressBar}>
        <div
          className={progressBarFill}
          style={assignInlineVars({ '--progress-width': progressPercentage })}
        />
      </div>
    </>
  );
};

export default JoinHeader;
