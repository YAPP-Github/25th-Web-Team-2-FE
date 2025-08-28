import { contentContainer } from '../../JoinPage.css';
import JoinTitleSection from '../JoinTitleSection/JoinTitleSection';

import Logo from '@/components/Logo/Logo';

interface JoinLayoutContainerProps {
  children: React.ReactNode;
}

interface JoinLayoutTitleProps {
  title: string;
  step: string;
}

export const JoinLayout = {
  Header: () => <Logo />,
  Container: ({ children }: JoinLayoutContainerProps) => (
    <div className={contentContainer}>{children}</div>
  ),
  Title: ({ title, step }: JoinLayoutTitleProps) => <JoinTitleSection title={title} step={step} />,
};
