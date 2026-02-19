import { getPostMetadata } from '../server/getPostMetadata';

import DefaultLayout from '@/components/layout/DefaultLayout/DefaultLayout';

export async function generateMetadata({ params }: { params: { postId: string } }) {
  return getPostMetadata(params.postId);
}

function DesktopPostLayout({ children }: { children: React.ReactNode }) {
  return <DefaultLayout>{children}</DefaultLayout>;
}

export default DesktopPostLayout;
