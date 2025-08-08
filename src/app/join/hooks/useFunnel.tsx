import { useRouter, useSearchParams } from 'next/navigation';
import { ReactElement, ReactNode, useMemo } from 'react';

const DEFAULT_STEP = 'email';

type NonEmptyArray<T> = [T, ...T[]];

type StepsType = Readonly<NonEmptyArray<string>>;

interface StepProps<T extends string = string> {
  name: T;
  children: ReactNode;
}

interface FunnelProps {
  children: Array<ReactElement<StepProps>>;
}

const useFunnel = <Steps extends StepsType>(steps: Steps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentStep = searchParams.get('step') ?? steps?.[0] ?? DEFAULT_STEP;

  const currentStepIdx = useMemo(
    () => steps?.findIndex((step) => step === currentStep) ?? 0,
    [steps, currentStep],
  );

  const isLast = currentStepIdx === (Array.isArray(steps) ? steps.length - 1 : 0);

  const setStep = (step: Steps[number]) => {
    router.push(`?step=${step}`);
  };

  const goToPrev = () => {
    if (currentStepIdx === 0) {
      router.replace('/login');
      return;
    }

    setStep(steps[currentStepIdx - 1]);
  };

  const goToNext = () => {
    if (!isLast) {
      setStep(steps[currentStepIdx + 1]);
    }
  };

  const Funnel = useMemo(() => {
    const FunnelComponent = ({ children }: FunnelProps) => {
      const targetStep = children.find((childStep) => childStep.props.name === currentStep);

      return <>{targetStep}</>;
    };

    FunnelComponent.displayName = 'Funnel';
    return FunnelComponent;
  }, [currentStep]);

  const Step = useMemo(() => {
    const StepComponent = (props: StepProps<Steps[number]>) => {
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
    steps,
    currentStepIdx,
    goToPrev,
    goToNext,
  } as const;
};

export default useFunnel;
