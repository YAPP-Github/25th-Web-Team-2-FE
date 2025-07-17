import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: '그라밋 | 회원 정보',
  description: '그라밋 | 회원 정보',
};

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return <Suspense>{children}</Suspense>;
}
