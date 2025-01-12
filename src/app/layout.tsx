import type { Metadata } from 'next';

import Providers from './providers';

import Footer from '@/components/Footer/Footer';
import pretendard from 'public/fonts/local-font';

export const metadata: Metadata = {
  title: '그라밋',
  description:
    '작은 연결로 시작되는 큰 발견 | 대학원생 연구자가 대학생 참여자를 모집하여 실험을 진행할 수 있도록 돕는 플랫폼',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={pretendard.className}>
      <body suppressHydrationWarning={true}>
        <Providers>
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
