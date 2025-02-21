import Image from 'next/image';
import Link from 'next/link';

import { goToHomeButton, h2, notFoundContent, notFoundLayout } from './not-found.css';

import NotFoundImage from '@/assets/images/notFound.svg';
import DefaultLayout from '@/components/layout/DefaultLayout/DefaultLayout';

export default function NotFound() {
  return (
    <DefaultLayout>
      <div className={notFoundLayout}>
        <Image src={NotFoundImage} alt="페이지를 찾을 수 없어요" width={160} height={140} />
        <h2 className={h2}>404</h2>
        <p className={notFoundContent}>원하는 페이지를 찾을 수 없어요</p>
        <Link href="/">
          <button className={goToHomeButton}>홈 화면으로 이동하기</button>
        </Link>
      </div>
    </DefaultLayout>
  );
}
