import type { Metadata } from 'next';
import Head from 'next/head';
import Script from 'next/script';

import Providers from './providers';

import Footer from '@/components/Footer/Footer';
import pretendard from '@/fonts/local-font';

import '@/styles/reset.css';
import '@/styles/global.css';

export const metadata: Metadata = {
  title: '그라밋',
  description:
    '작은 연결로 시작되는 큰 발견 | 대학원생 연구자가 대학생 참여자를 모집하여 실험을 진행할 수 있도록 돕는 플랫폼',
  icons: [{ url: '/favicon.svg', sizes: '20x20' }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={pretendard.className}>
      <Head>
        <link
          rel="preload"
          href="/fonts/Pretendard-Regular.subset.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Pretendard-Medium.subset.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Pretendard-SemiBold.subset.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Pretendard-Bold.subset.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </Head>
      <body suppressHydrationWarning={true}>
        <Providers>
          {children}
          <Footer />
        </Providers>
        <Script
          id="beusable-script"
          dangerouslySetInnerHTML={{
            __html: `
            (function(w, d, a){
                w.__beusablerumclient__ = {
                    load: function(src){
                        var b = d.createElement("script");
                        b.src = src; 
                        b.async = true; 
                        b.type = "text/javascript";
                        d.getElementsByTagName("head")[0].appendChild(b);
                    }
                };
                w.__beusablerumclient__.load(a + "?url=" + encodeURIComponent(d.URL));
            })(window, document, "//rum.beusable.net/load/b250203e183750u380");
          `,
          }}
        />
      </body>
    </html>
  );
}
