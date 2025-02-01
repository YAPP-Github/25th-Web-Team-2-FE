import { Suspense } from 'react';

function GoogleLoginLayout({ children }: { children: React.ReactNode }) {
  return <Suspense>{children}</Suspense>;
}

export default GoogleLoginLayout;
