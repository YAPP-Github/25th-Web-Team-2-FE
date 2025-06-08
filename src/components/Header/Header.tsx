'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { backButtonRecipe, headerLayout, image, imageWrapperRecipe } from './Header.css';
import RightHeader from './RightHeader/RightHeader';
import Logo from '../../assets/images/logo.svg';
import Icon from '../Icon';

import { colors } from '@/styles/colors';

const Header = () => {
  const pathname = usePathname();
  const isPostDetailPage = pathname.startsWith('/post/');
  const router = useRouter();

  return (
    <nav className={headerLayout}>
      <div className={imageWrapperRecipe({ isPostDetailPage })}>
        <Link href={'/'}>
          <Image src={Logo} alt="로고" className={image} width={100} height={30} priority />
        </Link>
      </div>
      <button
        type="button"
        className={backButtonRecipe({ isPostDetailPage })}
        onClick={() => router.back()}
        aria-label="뒤로가기"
      >
        <Icon icon="Arrow" width={24} height={24} color={colors.text06} />
      </button>
      <RightHeader />
    </nav>
  );
};

export default Header;
