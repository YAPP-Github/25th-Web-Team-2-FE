'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { createContext, ReactElement, ReactNode, useContext, useMemo, useCallback } from 'react';

import { StepType } from '../JoinPage.types';

const DEFAULT_STEP = 'email';

/**
 * Types & Interfaces
 */
type NonEmptyArray<T> = [T, ...T[]];

type Steps = Readonly<NonEmptyArray<StepType>>;

interface StepProps<T extends string = string> {
  name: T;
  children: ReactNode;
}

interface FunnelProps {
  children: Array<ReactElement<StepProps>>;
}

interface UseFunnelReturn<T extends Steps> extends FunnelState<T> {
  FunnelProvider: ({ children }: { children: ReactNode }) => JSX.Element;
  Funnel: ({ children }: FunnelProps) => JSX.Element;
  Step: (props: StepProps<T[number]>) => JSX.Element;
}

interface FunnelState<T extends Steps = Steps> {
  step: T[number];
  steps: T;
  currentStepIdx: number;
  totalSteps: number;
  progress: number;
  setStep: (step: T[number]) => void;
  goToPrev: () => void;
  goToNext: () => void;
}

/**
 * Context
 */
const FunnelContext = createContext<FunnelState | null>(null);

/**
 * @param steps - Funnel 컴포넌트 외부에서 선언할 땐 필수고, Funnel 컴포넌트 내부에서 선언할 땐 optional. Funnel 컴포넌트 내부에서는 외부에서 선언한 Funnel step을 따름.
 * @returns FunnelProvider: useFunnel 반환값을 context로 전달
 * @returns Funnel: currentStep과 Funnel의 children으로 있는 Step 컴포넌트를 맵핑하는 컴포넌트
 * @returns Step: name을 props로 받아 자식 컴포넌트를 렌더링하는 wrapper 컴포넌트
 * @returns setStep: currentStep 설정하는 함수
 * @returns goToPrev: 이전 step으로 이동하는 함수
 * @returns goToNext: 다음 step으로 이동하는 함수
 * @returns step: currentStep
 * @returns steps: 모든 step 배열
 * @returns currentStepIdx: 현재 단계 idx
 */
const useFunnel = <T extends Steps>(steps?: T): UseFunnelReturn<T> => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 현재 단계(step) 정보 가져오기
  const funnelContextValue = useContext(FunnelContext);
  const funnelContextSteps = funnelContextValue?.steps;
  const targetSteps = (steps ?? funnelContextSteps) as T;
  const currentStep = (searchParams.get('step') ?? targetSteps?.at(0) ?? DEFAULT_STEP) as T[number];

  const currentStepIdx = useMemo(
    () => targetSteps?.findIndex((step) => step === currentStep) ?? 0,
    [targetSteps, currentStep],
  );

  const totalSteps = targetSteps?.length ?? 0;
  const progress = totalSteps > 0 ? Math.round(((currentStepIdx + 1) / (totalSteps - 1)) * 100) : 0;
  const isLast = currentStepIdx === (Array.isArray(targetSteps) ? targetSteps.length - 1 : 0);

  const setStep = useCallback(
    (step: Steps[number]) => {
      router.push(`?step=${step}`);
    },
    [router],
  );

  const goToPrev = useCallback(() => {
    if (currentStepIdx === 0) {
      router.replace('/login');
      return;
    }

    if (targetSteps) {
      setStep(targetSteps[currentStepIdx - 1]);
    }
  }, [currentStepIdx, targetSteps, router, setStep]);

  const goToNext = useCallback(() => {
    if (!isLast && targetSteps) {
      setStep(targetSteps[currentStepIdx + 1]);
    }
  }, [isLast, targetSteps, currentStepIdx, setStep]);

  const FunnelProvider = useMemo(() => {
    const ProviderComponent = ({ children }: { children: ReactNode }) => {
      const contextValue = {
        step: currentStep,
        steps: targetSteps,
        currentStepIdx,
        totalSteps,
        progress,
        setStep,
        goToPrev,
        goToNext,
      };

      return <FunnelContext.Provider value={contextValue}>{children}</FunnelContext.Provider>;
    };

    ProviderComponent.displayName = 'FunnelProvider';
    return ProviderComponent;
    // FunnelProvider의 참조를 유지하여 자식 컴포넌트가 리렌더링되지 않도록 처리 (Title의 애니메이션 처리)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const Funnel = useMemo(() => {
    const FunnelComponent = ({ children }: FunnelProps) => {
      const targetStep = children.find((childStep) => childStep.props.name === currentStep);

      return <>{targetStep}</>;
    };

    FunnelComponent.displayName = 'Funnel';
    return FunnelComponent;
  }, [currentStep]);

  const Step = useMemo(() => {
    const StepComponent = (props: StepProps<T[number]>) => {
      return <>{props.children}</>;
    };

    StepComponent.displayName = 'Step';
    return StepComponent;
  }, []);

  return {
    FunnelProvider,
    Funnel,
    Step,
    setStep,
    step: currentStep,
    steps: targetSteps,
    currentStepIdx,
    totalSteps,
    progress,
    goToPrev,
    goToNext,
  } as const;
};

export default useFunnel;
