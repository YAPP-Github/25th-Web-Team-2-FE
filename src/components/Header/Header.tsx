'use client';

import Image from 'next/image';
import Link from 'next/link';

import { headerLayout, image } from './Header.css';
import Logo from '../../assets/images/logo.svg';

import RightHeader from './RightHeader/RightHeader';

const Header = () => {
  return (
    <div className={headerLayout}>
      <Link href="/">
        <Image
          src={Logo}
          alt="로고"
          className={image}
          width={100.5}
          height={30}
          priority
          style={{ width: 'auto', height: 'auto' }}
        />
      </Link>
      <RightHeader />
    </div>
  );
};

export default Header;
