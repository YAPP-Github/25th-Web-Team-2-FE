import { assignInlineVars } from '@vanilla-extract/dynamic';
import React from 'react';

import { progressBarFill } from './JoinHeader.css';
import { headerTitle, headerWrapper, progressBar } from '../../page.css';

import useFunnel from '@/app/join/hooks/useFunnel';
import Icon from '@/components/Icon';
import { colors } from '@/styles/colors';

interface JoinHeaderProps {
  title: string;
}

const JoinHeader = ({ title }: JoinHeaderProps) => {
  const { progress, goToPrev } = useFunnel();

  return (
    <>
      <header className={headerWrapper}>
        <Icon icon="Arrow" width={24} height={24} color={colors.text06} onClick={goToPrev} />
        <h1 className={headerTitle}>{title}</h1>
      </header>

      {/* 프로그래스 바 */}
      <div className={progressBar}>
        <div
          className={progressBarFill}
          style={assignInlineVars({ '--progress-width': `${progress}%` })}
        />
      </div>
    </>
  );
};

export default JoinHeader;
