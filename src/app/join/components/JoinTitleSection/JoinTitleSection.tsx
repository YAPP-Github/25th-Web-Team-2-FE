import { assignInlineVars } from '@vanilla-extract/dynamic';

import {
  titleContainer,
  joinTitle,
  progressBarContainer,
  progressBarFill,
} from './JoinTitleSection.css';
import useFunnel from '../../hooks/useFunnel';

interface JoinTitleSectionProps {
  title: string;
}

const JoinTitleSection = ({ title }: JoinTitleSectionProps) => {
  const { progress } = useFunnel();

  return (
    <div className={titleContainer}>
      <h2 className={joinTitle}>{title}</h2>
      <div className={progressBarContainer}>
        <div
          className={progressBarFill}
          style={assignInlineVars({
            '--progress-width': `${progress}%`,
          })}
        />
      </div>
    </div>
  );
};

export default JoinTitleSection;
