import { PropsWithChildren } from 'react';

import { contentContainer } from '../../JoinPage.css';
import { StepType } from '../../JoinPage.types';
import FormGuard from '../FormGuard/FormGuard';
import JoinTitleSection from '../JoinTitleSection/JoinTitleSection';

import Logo from '@/components/Logo/Logo';

interface JoinLayoutTitleProps {
  title: string;
  step: StepType;
}

export const JoinLayout = {
  Header: () => <Logo />,
  Title: ({ title, step }: JoinLayoutTitleProps) => <JoinTitleSection title={title} step={step} />,
  Container: ({ children }: PropsWithChildren) => (
    <div className={contentContainer}>{children}</div>
  ),
  FormGuard: ({ children }: PropsWithChildren) => <FormGuard>{children}</FormGuard>,
};
