import type { Metadata } from 'next';
import Script from 'next/script';
import { getServerSession } from 'next-auth';

import Footer from '@/components/Footer/Footer';
import pretendard from '@/fonts/local-font';
import '@/styles/reset.css';
import '@/styles/global.css';
import { authOptions } from '@/lib/auth-utils';
import Providers from '@/providers/Providers';

export const metadata: Metadata = {
  title: '그라밋',
  description:
    '작은 연결로 시작되는 큰 발견 | 대학원생 연구자가 대학생 참여자를 모집하여 실험을 진행할 수 있도록 돕는 플랫폼',
  icons: [{ url: '/favicon.svg', sizes: '20x20' }],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="ko" className={pretendard.className}>
      <body suppressHydrationWarning={true}>
        <Providers session={session}>
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
