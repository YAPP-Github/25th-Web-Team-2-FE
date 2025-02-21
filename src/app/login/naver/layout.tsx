import React, { Suspense } from 'react';

function NaverLoginLayout({ children }: { children: React.ReactNode }) {
  return <Suspense>{children}</Suspense>;
}

export default NaverLoginLayout;
