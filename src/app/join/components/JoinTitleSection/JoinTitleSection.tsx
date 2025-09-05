import { assignInlineVars } from '@vanilla-extract/dynamic';

import {
  titleContainer,
  joinTitle,
  progressBarContainer,
  progressBarFill,
} from './JoinTitleSection.css';
import { STEP } from '../../JoinPage.constants';
import { StepType } from '../../JoinPage.types';

interface JoinTitleSectionProps {
  title: string;
  step: StepType;
}

const JoinTitleSection = ({ title, step }: JoinTitleSectionProps) => {
  return (
    <div className={titleContainer}>
      <h2 className={joinTitle}>{title}</h2>
      <div className={progressBarContainer}>
        <div
          className={progressBarFill}
          style={assignInlineVars({
            '--progress-width': step === STEP.email ? '50%' : '100%',
          })}
        />
      </div>
    </div>
  );
};

export default JoinTitleSection;
