import type { Metadata } from 'next';
import Script from 'next/script';
import { getServerSession } from 'next-auth';

import { DEFAULT_OG_IMAGE_URL } from '@/constants/url';
import pretendard from '@/fonts/local-font';
import '@/styles/reset.css';
import '@/styles/global.css';
import { authOptions } from '@/lib/auth-utils';
import Providers from '@/providers/Providers';

export const metadata: Metadata = {
  metadataBase: new URL('https://gradmeet.co.kr'),
  title: '그라밋',
  description:
    '작은 연결로 시작되는 큰 발견 | 대학원생 연구자가 대학생 참여자를 모집하여 실험을 진행할 수 있도록 돕는 플랫폼',
  icons: [{ url: '/favicon.svg', sizes: '20x20' }],
  alternates: { canonical: 'https://gradmeet.co.kr' },
  openGraph: {
    title: '그라밋',
    description: '대학원생 연구자가 대학생 참여자를 모집하여 실험을 진행할 수 있도록 돕는 플랫폼',
    url: 'https://gradmeet.co.kr',
    siteName: '그라밋',
    type: 'website',
    locale: 'ko_KR',
    images: {
      url: DEFAULT_OG_IMAGE_URL,
      width: 100,
      height: 100,
    },
  },
  twitter: {
    card: 'summary_large_image',
    title: '그라밋',
    description: '대학원생 연구자가 대학생 참여자를 모집하여 실험을 진행할 수 있도록 돕는 플랫폼',
    images: {
      url: DEFAULT_OG_IMAGE_URL,
      width: 100,
      height: 100,
    },
  },
  keywords: [
    '그라밋',
    'gradmeet',
    '대학원생',
    '대학생',
    '연구',
    '실험',
    '테스트',
    '알바',
    '단기알바',
    '대학생알바',
    '용돈',
    '보상',
    '공강',
    '대면',
    '비대면',
    '대학생 보상',
    '대학생 용돈',
    '대학생 알바',
    '대학원생 연구 참여자 매칭 플랫폼',
  ],
  verification: {
    other: {
      'naver-site-verification': '30b0a9ec0a357ce934c3c90cf68aedd57b8ad2fd',
    },
  },
  formatDetection: {
    telephone: false,
    email: false,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="ko" className={pretendard.className}>
      <head>
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${process.env.NEXT_PUBLIC_GOOGLE_ADS_ID}`}
          crossOrigin="anonymous"
        />
      </head>
      <body suppressHydrationWarning={true}>
        <Providers session={session}>{children}</Providers>
      </body>
    </html>
  );
}
