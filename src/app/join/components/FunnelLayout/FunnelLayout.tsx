'use client';

import { PropsWithChildren, useEffect } from 'react';

import useFunnel from '../../hooks/useFunnel';
import { joinLayout } from '../../JoinPage.css';
import { JoinLayout } from '../JoinLayout/JoinLayout';

import { STEP } from '@/constants/steps';
import { startRecording } from '@/lib/mixpanelClient';

interface FunnelLayoutProps {
  title: string;
}

const FunnelLayout = ({ children, title }: PropsWithChildren<FunnelLayoutProps>) => {
  const { step } = useFunnel();

  useEffect(() => {
    startRecording();
  }, []);

  if (step === STEP.success) {
    return <JoinLayout.Container>{children}</JoinLayout.Container>;
  }

  return (
    <main className={joinLayout}>
      <JoinLayout.Logo />
      <JoinLayout.Container>
        <JoinLayout.Header title={title} />
        {children}
      </JoinLayout.Container>
    </main>
  );
};

export default FunnelLayout;
