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
 * Hook
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

  const Funnel = useMemo(() => {
    const FunnelComponent = ({ children }: FunnelProps) => {
      const targetStep = children.find((childStep) => childStep.props.name === currentStep);

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

      return <FunnelContext.Provider value={contextValue}>{targetStep}</FunnelContext.Provider>;
    };

    FunnelComponent.displayName = 'Funnel';
    return FunnelComponent;
  }, [currentStep, targetSteps, currentStepIdx, totalSteps, progress, setStep, goToPrev, goToNext]);

  const Step = useMemo(() => {
    const StepComponent = (props: StepProps<T[number]>) => {
      return <>{props.children}</>;
    };

    StepComponent.displayName = 'Step';
    return StepComponent;
  }, []);

  return {
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
