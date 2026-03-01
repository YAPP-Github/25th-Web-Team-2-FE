import { PropsWithChildren, useEffect } from 'react';

import useFunnel from '@/app/join/hooks/useFunnel';

interface FunnelStepGuardProps {
  isDirty: boolean;
}

/**
 * 폼데이터가 없을 경우 첫 번째 step으로 이동시키는 기능성 컴포넌트
 */
const FunnelStepGuard = ({ children, isDirty }: PropsWithChildren<FunnelStepGuardProps>) => {
  const { currentStepIdx, goToFirstStep } = useFunnel();

  useEffect(() => {
    if (currentStepIdx > 0 && !isDirty) {
      goToFirstStep();
    }
  }, [currentStepIdx]);

  return <>{children}</>;
};

export default FunnelStepGuard;
