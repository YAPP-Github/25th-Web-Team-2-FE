import {
  progressBarContainer,
  progressBarInner,
  stepContainer,
  stepIconAndLine,
  stepIconActive,
  stepIconInactive,
  stepIconText,
  progressLineContainer,
  progressLineFill,
  stepLabel,
} from './ProgressBarSection.css';
import useFunnel from '@/app/join/hooks/useFunnel';
import Icon from '@/components/Icon';
import { colors } from '@/styles/colors';
import { UPLOAD_STEP_LIST } from '@/app/join/JoinPage.constants';

const labelMapper = {
  description: '공고 입력',
  outline: '실험 개요 확인',
  applyMethod: '모집 대상 및 방법 확인',
  success: '완료',
} as const;

const getProgressLineWidth = (targetIdx: number, currentStepIdx: number) => {
  if (targetIdx < currentStepIdx) {
    return '100%'; // 완료된 스텝: 100%
  }
  if (targetIdx === currentStepIdx) {
    return '50%'; // 현재 스텝: 50%
  }
  return '0%'; // 미래 스텝: 0%
};

const ProgressBarSection = () => {
  const { currentStepIdx, steps } = useFunnel<typeof UPLOAD_STEP_LIST>();
  const currentStep = currentStepIdx + 1;

  return (
    <div className={progressBarContainer}>
      <div className={progressBarInner}>
        {steps.map((step, idx) => {
          const isLastStep = idx === steps.length - 1;
          const number = idx + 1;
          const isProgressed = number <= currentStep;
          const isCompleted = number < currentStep;

          return (
            <div key={step} className={stepContainer({ isLast: isLastStep })}>
              <div className={stepIconAndLine}>
                <div className={isProgressed ? stepIconActive : stepIconInactive}>
                  <span className={stepIconText}>
                    {isCompleted ? <Icon icon="Check" color={colors.icon01} /> : number}
                  </span>
                </div>

                {/* 프로그래스 라인 (마지막 단계 제외) */}
                {!isLastStep && (
                  <div className={progressLineContainer}>
                    <div
                      className={progressLineFill}
                      style={{ width: getProgressLineWidth(number, currentStep) }}
                    />
                  </div>
                )}
              </div>
              <div className={stepLabel({ isProgressed })}>{labelMapper[step]}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressBarSection;
