import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

// middleware단에서 desktop 또는 mobile 페이지로 rewrite 시킴
// middleware가 동작하지 않을 경우에 대응하는 페이지 컴포넌트
export default function JoinPage() {
  const header = headers();
  const userAgent = header.get('user-agent') || '';
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

  if (isMobile) {
    redirect('/join/mobile');
  } else {
    redirect('/join/desktop');
  }
}
