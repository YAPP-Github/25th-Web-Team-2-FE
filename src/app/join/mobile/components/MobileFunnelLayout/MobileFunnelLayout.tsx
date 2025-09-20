'use client';

import { PropsWithChildren, useEffect } from 'react';

import JoinHeader from '../JoinHeader/JoinHeader';

import useFunnel from '@/app/join/hooks/useFunnel';
import { STEP } from '@/app/join/JoinPage.constants';
import { startRecording } from '@/lib/mixpanelClient';

interface MobileFunnelLayoutProps {
  title: string;
}

const MobileFunnelLayout = ({ children, title }: PropsWithChildren<MobileFunnelLayoutProps>) => {
  const { step } = useFunnel();

  useEffect(() => {
    startRecording();
  }, []);

  if (step === STEP.success) {
    return <>{children}</>;
  }

  return (
    <>
      <JoinHeader title={title} />
      {children}
    </>
  );
};

export default MobileFunnelLayout;
