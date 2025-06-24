import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: '그라밋 | 회원가입',
  description: '그라밋 | 회원가입',
};

export default function JoinLayout({ children }: { children: React.ReactNode }) {
  return <Suspense>{children}</Suspense>;
}
