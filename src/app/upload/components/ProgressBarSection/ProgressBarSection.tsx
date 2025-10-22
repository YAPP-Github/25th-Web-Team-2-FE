import React from 'react';
import {
  progressBarContainer,
  progressBarInner,
  stepContainer,
  stepIconAndLine,
  stepIcon,
  stepIconActive,
  stepIconCompleted,
  stepIconInactive,
  stepIconText,
  progressLineContainer,
  progressLineFill,
  stepLabel,
} from './ProgressBarSection.css';
import useFunnel from '@/app/join/hooks/useFunnel';

const STEPS = [
  { id: 1, label: '공고 입력' },
  { id: 2, label: '실험 개요 확인' },
  { id: 3, label: '모집 대상 및 방법 확인' },
  { id: 4, label: '완료' },
] as const;

const getStepIconClass = (stepId: number, currentStepIdx: number) => {
  if (stepId < currentStepIdx) {
    return stepIconCompleted;
  }
  if (stepId === currentStepIdx) {
    return stepIconActive;
  }
  return stepIconInactive;
};

const getProgressLineWidth = (stepId: number, currentStepIdx: number) => {
  if (stepId < currentStepIdx) {
    return '100%';
  }
  if (stepId === currentStepIdx) {
    return '50%';
  }
  return '0%';
};

const getStepContent = (stepId: number, currentStepIdx: number) => {
  if (stepId < currentStepIdx) {
    return '✓';
  }
  return stepId.toString();
};

const ProgressBarSection = () => {
  const { currentStepIdx } = useFunnel();
  const currentStep = currentStepIdx + 1;
  return (
    <div className={progressBarContainer}>
      <div className={progressBarInner}>
        {STEPS.map((step, index) => {
          const isLastStep = index === STEPS.length - 1;

          return (
            <React.Fragment key={step.id}>
              <div className={stepContainer({ isLast: isLastStep })}>
                <div className={stepIconAndLine}>
                  <div className={`${stepIcon} ${getStepIconClass(step.id, currentStep)}`}>
                    <span className={stepIconText}>{getStepContent(step.id, currentStep)}</span>
                  </div>

                  {/* 프로그래스 라인 (마지막 단계 제외) */}
                  {!isLastStep && (
                    <div className={progressLineContainer}>
                      <div
                        className={progressLineFill}
                        style={{ width: getProgressLineWidth(step.id, currentStep) }}
                      />
                    </div>
                  )}
                </div>
                <div className={stepLabel({ completed: step.id <= currentStep })}>{step.label}</div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressBarSection;
