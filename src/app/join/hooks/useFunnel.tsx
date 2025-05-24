import { useRouter, useSearchParams } from 'next/navigation';
import { ReactElement, ReactNode, useMemo } from 'react';

const DEFAULT_STEP = 'email';

type NonEmptyArray<T> = [T, ...T[]];

type StepsType = Readonly<NonEmptyArray<string>>;

interface StepProps {
  name: string;
  children: ReactNode;
}

interface FunnelProps {
  children: Array<ReactElement<StepProps>>;
}

const useFunnel = <Steps extends StepsType>(steps: Steps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentStep = searchParams.get('step') || DEFAULT_STEP;

  const currentStepIdx = steps.findIndex((step) => step === currentStep);
  const isLast = currentStepIdx === steps.length - 2;

  const setStep = (step: string) => {
    if (isLast) {
      router.replace(`?step=${step}`);
    } else {
      router.push(`?step=${step}`);
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
    const StepComponent = (props: StepProps) => {
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
  } as const;
};

export default useFunnel;
