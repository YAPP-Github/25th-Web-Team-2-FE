'use client';

import { PropsWithChildren, useEffect } from 'react';


import { STEP } from '@constants/steps';
import useFunnel from '@join/hooks/useFunnel';
import { startRecording } from '@lib/mixpanelClient';

import JoinHeader from '../JoinHeader';

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
