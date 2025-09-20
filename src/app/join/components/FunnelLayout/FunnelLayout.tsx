'use client';

import { PropsWithChildren, useEffect } from 'react';

import useFunnel from '../../hooks/useFunnel';
import { STEP } from '../../JoinPage.constants';
import { joinLayout } from '../../JoinPage.css';
import { JoinLayout } from '../JoinLayout/JoinLayout';

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
