import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default function ProfilePage() {
  const header = headers();
  const userAgent = header.get('user-agent') || '';
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

  if (isMobile) {
    redirect('/user/profile/mobile');
  } else {
    redirect('/user/profile/desktop');
  }
}
