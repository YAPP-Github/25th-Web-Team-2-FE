import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

// middleware가 동작하지 않을 경우에 대응하는 페이지 컴포넌트
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
