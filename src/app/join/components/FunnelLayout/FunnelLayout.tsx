import { PropsWithChildren } from 'react';

import useFunnel from '../../hooks/useFunnel';
import { STEP } from '../../JoinPage.constants';
import { JoinLayout } from '../JoinLayout/JoinLayout';

interface FunnelLayoutProps {
  title: string;
}

const FunnelLayout = ({ children, title }: PropsWithChildren<FunnelLayoutProps>) => {
  const { step } = useFunnel();

  if (step === STEP.success) {
    return <JoinLayout.Container>{children}</JoinLayout.Container>;
  }

  return (
    <>
      <JoinLayout.Logo />
      <JoinLayout.Container>
        <JoinLayout.Header title={title} />
        {children}
      </JoinLayout.Container>
    </>
  );
};

export default FunnelLayout;
