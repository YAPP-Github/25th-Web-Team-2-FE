import { getPostMetadata } from '../server/getPostMetadata';

import MobilePostDetailLayout from '@/components/layout/MobilePostDetailLayout/MobilePostDetailLayout';

export async function generateMetadata({ params }: { params: { postId: string } }) {
  return getPostMetadata(params.postId);
}

function MobilePostLayout({ children }: { children: React.ReactNode }) {
  return <MobilePostDetailLayout>{children}</MobilePostDetailLayout>;
}

export default MobilePostLayout;
