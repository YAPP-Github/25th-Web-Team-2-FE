'use client';

import { ReactNode } from 'react';

import TitleSection from '@/app/join/mobile/components/TitleSection/TitleSection';
import { mainContentLayout } from './EditFormLayout.css';

interface EditFormLayoutProps {
  title: string;
  children: ReactNode;
  description?: string;
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
