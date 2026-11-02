'use client';

import { PropsWithChildren } from 'react';

import { STEP } from '@constants/steps';
import useFunnel from '@join/hooks/useFunnel';

import JoinHeader from '../JoinHeader';

interface MobileFunnelLayoutProps {
  title: string;
}

const MobileFunnelLayout = ({ children, title }: PropsWithChildren<MobileFunnelLayoutProps>) => {
  const { step } = useFunnel();

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
