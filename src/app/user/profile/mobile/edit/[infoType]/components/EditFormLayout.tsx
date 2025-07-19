'use client';

import { ReactNode } from 'react';

import SaveButton from './SaveButton';

import TitleSection from '@/app/join/mobile/components/TitleSection/TitleSection';
import { mainContentLayout } from '@/app/join/mobile/page.css';

interface EditFormLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
  emailBadge?: ReactNode;
}

const EditFormLayout = ({ title, description, children, emailBadge }: EditFormLayoutProps) => {
  return (
    <main className={mainContentLayout}>
      <TitleSection title={title} description={description} emailBadge={emailBadge} />
      <>{children}</>
    </main>
  );
};

export default EditFormLayout;
