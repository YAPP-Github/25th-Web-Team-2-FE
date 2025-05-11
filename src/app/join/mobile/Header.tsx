import React from 'react';

import { headerTitle, headerWrapper, progressBar } from './page.css';

import Icon from '@/components/Icon';
import { ROLE } from '@/constants/config';
import { colors } from '@/styles/colors';
import { Role } from '@/types/user';

const headerTitleMap = {
  [ROLE.researcher]: '연구자 회원가입',
  [ROLE.participant]: '참여자 회원가입',
} as const;

const JoinHeader = ({ role }: { role?: Role }) => {
  if (!role) {
    return null;
  }

  return (
    <>
      <header className={headerWrapper}>
        <Icon icon="Chevron" width={20} height={20} color={colors.text06} rotate={90} />
        <h1 className={headerTitle}>{headerTitleMap[role]}</h1>
      </header>

      {/* 프로그래스 바 */}
      <div className={progressBar}></div>
    </>
  );
};

export default JoinHeader;
