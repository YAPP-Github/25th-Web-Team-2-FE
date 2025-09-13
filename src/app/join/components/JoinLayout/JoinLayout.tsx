import { PropsWithChildren } from 'react';

import { contentContainer } from '../../JoinPage.css';
import FormGuard from '../FormGuard/FormGuard';
import JoinTitleSection from '../JoinTitleSection/JoinTitleSection';

import Logo from '@/components/Logo/Logo';

interface JoinLayoutTitleProps {
  title: string;
}

export const JoinLayout = {
  Header: () => <Logo />,
  Title: ({ title }: JoinLayoutTitleProps) => <JoinTitleSection title={title} />,
  Container: ({ children }: PropsWithChildren) => (
    <div className={contentContainer}>{children}</div>
  ),
  FormGuard: ({ children }: PropsWithChildren) => <FormGuard>{children}</FormGuard>,
};
