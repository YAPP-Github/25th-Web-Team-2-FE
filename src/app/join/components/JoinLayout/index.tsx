import { PropsWithChildren } from 'react';

import Logo from '@common/Logo';

import { contentContainer } from '../../JoinPage.css';
import FormGuard from '../FormGuard';
import JoinTitleSection from '../JoinTitleSection';


interface JoinLayoutTitleProps {
  title: string;
}

export const JoinLayout = {
  Logo: () => <Logo />,
  Header: ({ title }: JoinLayoutTitleProps) => <JoinTitleSection title={title} />,
  Container: ({ children }: PropsWithChildren) => (
    <div className={contentContainer}>{children}</div>
  ),
  FormGuard: ({ children }: PropsWithChildren) => <FormGuard>{children}</FormGuard>,
};
