import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default function ExperimentDetailPostPage() {
  const header = headers();
  const userAgent = header.get('user-agent') || '';
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

  const segments = headers().get('x-next-url')?.split('/') ?? [];
  const postId = segments[2] || '';

  if (!postId) {
    redirect('/');
  }

  if (isMobile) {
    redirect(`/post/${postId}/mobile`);
  } else {
    redirect(`/post/${postId}/desktop`);
  }
}
